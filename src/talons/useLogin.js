import { useState } from "react";
import {
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { useMutation } from "@apollo/client";
import { CHECK_EXISTING, LOGIN_USER } from "../constants";
import { toast } from "react-toastify";
import { toastConfig } from "../toast";
// import { result } from "lodash";

const useLogin = () => {
  const [loginType, setLoginType] = useState(true);
  const [otp, setOtp] = useState(false);
  const [loginUser] = useMutation(LOGIN_USER);
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
      console.log(data);
      return data.checkUser;
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async ({ email, password, countryCode, phone }) => {
    const notExisting = await checkExisiting(email, countryCode + phone);
    console.log(notExisting);
    if (notExisting === true) {
      toast.error("user does not exist", { ...toastConfig });
    } else {
      if (loginType) {
        const response = await setUpRecaptcha(countryCode + phone);
        window.captchaResponse = response;
        // const { user } = await signInWithPhoneNumber(auth, countryCode + phone);
        console.log(response);
        setOtp(true);
      } else {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(user.accessToken);
        const { data } = await loginUser({
          variables: {
            data: {
              token: user.accessToken,
            },
          },
        });
        console.log(data);
      }
    }
  };

  const submitOTP = async ({ otp }) => {
    try {
      console.log(otp);
      if (otp === "" || otp === undefined) return;
      console.log(window.captchaResponse, "window.captchaResponse");
      window.captchaResponse.confirm(otp).then((res) => {
        console.log(res);
        loginUser({
          variables: {
            data: {
              token: res._tokenResponse.idToken,
            },
          },
        }).then(({ data }) => {
          console.log(data);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    loginType,
    setLoginType,
    onSubmit,
    otp,
    submitOTP,
  };
};

export default useLogin;
