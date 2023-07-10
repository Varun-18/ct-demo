import { useState } from "react";
import {
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { useMutation } from "@apollo/client";
import { CHECK_EXISTING, LOGIN_USER } from "../constants";
import { toast } from "react-toastify";
import { toastConfig } from "../toast";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [loginType, setLoginType] = useState(true);
  const [otp, setOtp] = useState(false);
  const nav = useNavigate();
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
        const sending = toast.loading("sending otp");
        const response = await setUpRecaptcha(countryCode + phone);
        window.captchaResponse = response;
        // const { user } = await signInWithPhoneNumber(auth, countryCode + phone);
        console.log(response);
        toast.update(sending, {
          ...toastConfig,
          render: "otp sent..!!",
          type: "success",
          isLoading: false,
        });
        setOtp(true);
      } else {
        const check = toast.loading("Checking credentials..!!!");
        try {
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
          toast.update(check, {
            ...toastConfig,
            render: "Verification successfull..!!",
            isLoading: false,
            type: "success",
          });
          console.log(data);
          nav("/me");
        } catch (error) {
          toast.update(check, {
            ...toastConfig,
            render: "Verificaton Failed please try again..!!",
            isLoading: false,
            type: "error",
          });
        }
      }
    }
  };

  const submitOTP = async ({ otp }) => {
    try {
      const otpVerification = toast.loading("verifying otp..!!");
      console.log(otp);
      if (otp === "" || otp === undefined) return;
      console.log(window.captchaResponse, "window.captchaResponse");
      window.captchaResponse
        .confirm(otp)
        .then((res) => {
          console.log(res);
          loginUser({
            variables: {
              data: {
                token: res._tokenResponse.idToken,
              },
            },
          }).then(({ data }) => {
            toast.update(otpVerification, {
              ...toastConfig,
              render: "verification successful..!!!",
              isLoading: false,
              type: "success",
            });
            console.log(data);
            nav("/me");
          });
        })
        .catch(() => {
          toast.update(otpVerification, {
            ...toastConfig,
            type: "error",
            render: "invalid OTP",
            isLoading: false,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      console.log(user);
      const { data } = await loginUser({
        variables: {
          data: {
            token: user.accessToken,
          },
        },
      });
      console.log(data);
      toast.success(`Welcome User ${data.loginUser.email}...!!!`);
      nav("/me");
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
    googleLogin,
  };
};

export default useLogin;
