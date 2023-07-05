import {
  EmailAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  linkWithCredential
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase.config";

const useSignup = () => {
  const [check, setCheck] = useState(false);
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");

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
      console.log(phone);
      window.recaptcha = recaptchaVerifier;
      console.log(phone, "form recaptcha");
      recaptchaVerifier.render();
      return signInWithPhoneNumber(auth, phone, recaptchaVerifier);
    }
  };

  const getOtp = async ({ email, password, countryCode, phone }) => {
    // console.log(email, password, countryCode, phone);
    if (email) setEmail(email);
    if (password) setPass(password);

    if (phone === "" || phone === undefined) return; // show an alert after this

    try {
      const response = await setUpRecaptcha(countryCode + phone);
      window.captchaResponse = response;
      console.log(response);
      setCheck(true);
    } catch (error) {
      console.log(error, "get otp error");
    }
  };

  const verifyOtp = ({ otp }) => {
    console.log(otp, email, pass, "otp");
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

  const addEmailPasswordProvider = async({ email, pass }) => {
    const user = auth.currentUser;
    console.log(user);
    if (user) {
      const credential = EmailAuthProvider.credential(email, pass);
      console.log(credential);
      await linkWithCredential(user,credential)
      // await linkWithCredential(user, credential)
      //   .then((userCredential) => {
      //     console.log(
      //       "Email and password provider added.",
      //       userCredential
      //     );
          // Email and password provider added successfully, you can perform additional actions or redirect to a new page
        // })
        // .catch((error) => {
        //   console.log(error);
        // });
    }
  };

  return {
    check,
    getOtp,
    verifyOtp,
  };
};

export default useSignup;
