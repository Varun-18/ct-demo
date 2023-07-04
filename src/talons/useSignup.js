import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase.config";

const useSignup = () => {
  const [check, setCheck] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  console.log(otp, "otp");

  const setUpRecaptcha = () => {
    if (!window.recaptcha) {
      const recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            getOtp();
          },
          // "expired-callback": () => {},
        },
        auth
      );
      window.recaptcha = recaptchaVerifier;
      console.log(phone, "form recaptcha");
      recaptchaVerifier.render();
      return signInWithPhoneNumber(auth, "+" + phone, recaptchaVerifier);
    }
  };

  const getOtp = async (e) => {
    e?.preventDefault();
    if (phone === "" || phone === undefined) return;

    try {
      const response = await setUpRecaptcha();
      window.captchaResponse = response;
      console.log(response);
      setCheck(true);
    } catch (error) {
      console.log(error, "get oto error");
    }
  };

  // function onCaptchVerify() {
  //   if (!window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new RecaptchaVerifier(
  //       "recaptcha-container",

  //       {
  //         size: "invisible",

  //         callback: (response) => {
  //           getOtp();
  //         },

  //         "expired-callback": () => {},
  //       },

  //       auth
  //     );
  //   }
  // }

  // function getOtp(e) {
  //   e.preventDefault();
  //   onCaptchVerify();

  //   const appVerifier = window.recaptchaVerifier;

  //   // const formatPh = "+" + ph;

  //   // const formatPh = "+919924757959";

  //   signInWithPhoneNumber(auth, "+"+phone , appVerifier)
  //     .then((confirmationResult) => {
  //       window.confirmationResult = confirmationResult;

  //       // setLoading(false);

  //       // setShowOTP(true);

  //       console.log("OTP sended successfully!");
  //     })

  //     .catch((error) => {
  //       console.log(error);

  //       // setLoading(false);
  //     });
  // }

  const verifyOtp = (e) => {
    e.preventDefault();
    if (otp === "" || otp === undefined) return;
    // try {
    console.log(window.captchaResponse, "window.captchaResponse");
    window.captchaResponse
      .confirm(otp)
      .then((res) => {
        console.log("otp confirmed.!!!", res);
      })
      .catch((err) => {
        console.log(err);
      });
    // } catch (error) {
    // console.log(error);
    // }
  };

  return {
    check,
    phone,
    setPhone,
    setOtp,
    getOtp,
    verifyOtp,
  };
};

export default useSignup;
