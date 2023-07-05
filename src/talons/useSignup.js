import {
  EmailAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
  linkWithCredential,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase.config";

const useSignup = () => {
  const [check, setCheck] = useState(false);
  // const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  // const [otp, setOtp] = useState("");
  // console.log(otp, "otp");

  const setUpRecaptcha = (phone) => {
    if (!window.recaptcha) {
      const recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            getOtp({ phone: phone });
          },
          // "expired-callback": () => {},
        },
        auth
      );
      window.recaptcha = recaptchaVerifier;
      console.log(phone, "form recaptcha");
      recaptchaVerifier.render();
      return signInWithPhoneNumber(auth, phone, recaptchaVerifier);
    }
  };

  const getOtp = async ({ email, password, countrycode, phone }) => {
    console.log(email, password, countrycode, phone);
    if (email) setEmail(email);
    if (password) setPass(password);

    if (phone === "" || phone === undefined) return; // show an alert after this

    try {
      const response = await setUpRecaptcha(countrycode + phone);
      window.captchaResponse = response;
      console.log(response);
      setCheck(true);
    } catch (error) {
      console.log(error, "get otp error");
    }
  };

  const verifyOtp = ({ otp }) => {
    if (otp === "" || otp === undefined) return;
    console.log(window.captchaResponse, "window.captchaResponse");
    window.captchaResponse
      .confirm(otp)
      .then((res) => {
        console.log("otp confirmed.!!!", res);
        addEmailPasswordProvider({
          email,
          pass,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addEmailPasswordProvider = ({ email, password }) => {
    const user = auth.currentUser;
    if (user) {
      const credential = EmailAuthProvider.credential(email, password);

      linkWithCredential(user, credential)
        .then((userCredential) => {
          console.log(
            "Email and password provider added.",
            userCredential.user
          );
          // Email and password provider added successfully, you can perform additional actions or redirect to a new page
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return {
    check,
    getOtp,
    verifyOtp,
  };
};

export default useSignup;
