import { useMutation } from "@apollo/client";
import {
  EmailAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  linkWithCredential,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../config/firebase.config";
import { ADD_SOCIALS_USER, ADD_USER, CHECK_EXISTING } from "../constants";
import { toastConfig } from "../toast";

const useSignup = () => {
  const [check, setCheck] = useState(false);
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [addUser] = useMutation(ADD_USER);
  const [addSocialsUser] = useMutation(ADD_SOCIALS_USER);
  const [checkUser] = useMutation(CHECK_EXISTING);
  const nav = useNavigate();

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
    if (email) {
      setEmail(email);
    } else {
      return toast.error("please enter you email..!!");
    }

    if (password) {
      setPass(password);
    } else {
      return toast.error("please enter your password..!!");
    }

    if (phone === "" || phone === undefined) {
      console.log("enterred");
      toast.warn("please enter phone...!!!", {
        ...toastConfig,
      });
      return;
    }
    const check = toast.loading("checking credentials..!!");

    const notExisting = await checkExisiting(email, countryCode + phone);

    if (notExisting === true) {
      try {
        const response = await setUpRecaptcha(countryCode + phone);
        window.captchaResponse = response;
        toast.update(check, {
          ...toastConfig,
          render: "OTP sent successfully..!!",
          isLoading: false,
          type: "success",
        });
        setCheck(true);
      } catch (error) {
        console.log(error, "get otp error");
      }
    } else {
      console.log("in else");
      toast.update(check, {
        ...toastConfig,
        render: notExisting,
        isLoading: false,
        type: "error",
      });
    }
  };

  const verifyOtp = ({ otp }) => {
    console.log(otp, email, pass, "otp");
    const check = toast.loading("Verifiying OTP");
    if (otp === "" || otp === undefined)
      return toast.update(check, {
        ...toastConfig,
        render: "Please enter a OTP",
        isLoading: false,
        type: "error",
      });
    console.log(window.captchaResponse, "window.captchaResponse");
    window.captchaResponse
      .confirm(otp)
      .then((res) => {
        toast.update(check, {
          ...toastConfig,
          isLoading: false,
          render: "OTP verifcation successful..!!",
          type: "success",
        });
        addEmailPasswordProvider({
          email,
          pass,
        });
      })
      .catch((err) => {
        toast.update(check, {
          ...toastConfig,
          type: "error",
          isLoading: false,
          render: "Invlaid OTP",
        });
        console.log(err);
      });
  };

  const addEmailPasswordProvider = async ({ email, pass }) => {
    const user = auth.currentUser;
    console.log(user);
    if (user) {
      const creating = toast.loading("Creating a user Please wait..!!");
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
        toast.update(creating, {
          ...toastConfig,
          isLoading: false,
          render: "User Created Please Login",
          type: "success",
        });
        nav("/login");
        console.log(data);
      } catch (error) {
        toast.update(creating, {
          ...toastConfig, 
          isLoading: false,
          render:
            "There was an error in creating the user please signup again..!! ",
          type: "error",
        });
        console.log(error);
      }
    }
  };

  const googleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      console.log(user);
      const { data } = await addSocialsUser({
        variables: {
          data: user,
        },
      });
      console.log(data);
      toast.success("User Created...!!!");
      nav("/me");
    } catch (error) {
      console.log(error, "from google signup error block");
    }
  };

  return {
    check,
    getOtp,
    verifyOtp,
    googleSignup,
  };
};

export default useSignup;
