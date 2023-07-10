import { useMutation } from "@apollo/client";
import {
  EmailAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  linkWithCredential,
} from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../config/firebase.config";
import { ADD_USER, CHECK_EXISTING } from "../constants";
import { toastConfig } from "../toast";

const useSignup = () => {
  const [check, setCheck] = useState(false);
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [addUser] = useMutation(ADD_USER);
  const [checkUser] = useMutation(CHECK_EXISTING);

  const setUpRecaptcha = (phone) => {
    console.log("in recaptcha");
    if (!window.recaptcha) {
      const recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            // getOtp({ phone: phone });
          },
        },
        auth
      );
      window.recaptcha = recaptchaVerifier;
      recaptchaVerifier.render();
      return signInWithPhoneNumber(auth, phone, recaptchaVerifier);
    }
  };

  const checkExisiting = async (email, phone) => {
    try {
      const { data } = await checkUser({
        variables: {
          data: {
            email,
            phone,
          },
        },
      });
      return data.checkUser;
    } catch (error) {
      console.log(error);
    }
  };

  const getOtp = async ({ email, password, countryCode, phone }) => {
    if (email) setEmail(email);
    if (password) setPass(password);

    if (phone === "" || phone === undefined) {
      console.log("enterred");
      toast.warn("please enter phone...!!!", {
        ...toastConfig,
      });
      return;
    }

    const notExisting = await checkExisiting(email, countryCode + phone);

    if (notExisting === true) {
      try {
        const response = await setUpRecaptcha(countryCode + phone);
        window.captchaResponse = response;
        setCheck(true);
      } catch (error) {
        console.log(error, "get otp error");
      }
    } else {
      console.log("in else");
      toast.error(notExisting, { ...toastConfig });
    }
  };

  const verifyOtp = ({ otp }) => {
    console.log(otp, email, pass, "otp");
    if (otp === "" || otp === undefined) return;
    console.log(window.captchaResponse, "window.captchaResponse");
    window.captchaResponse
      .confirm(otp)
      .then((res) => {
        addEmailPasswordProvider({
          email,
          pass,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addEmailPasswordProvider = async ({ email, pass }) => {
    const user = auth.currentUser;
    console.log(user);
    if (user) {
      const credential = EmailAuthProvider.credential(email, pass);
      console.log(credential);
      try {
        const response = await linkWithCredential(user, credential);
        console.log(
          response.user,
          "from the add user email and pass word provider "
        );
        const data = await addUser({
          variables: {
            data: response.user,
          },
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    check,
    getOtp,
    verifyOtp,
  };
};

export default useSignup;
