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

/**
 * Custom talon used for login component
 * @returns functions that used for login component
 */

const useLogin = () => {
  const [loginType, setLoginType] = useState(true);
  const [otp, setOtp] = useState(false);
  const nav = useNavigate();
  const [loginUser] = useMutation(LOGIN_USER);
  const [checkUser] = useMutation(CHECK_EXISTING);

  /**
   * This functions set-ups the Capthca if required
   * @param {string} phone The phone number to be verified
   * @returns The captcha to check wether te user is a human or a bot
   */

  const setUpRecaptcha = async (phone) => {
    console.log("in recaptcha");
    if (!window.recaptcha) {
      const recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {},
        },
        auth
      );
      window.recaptcha = recaptchaVerifier;
      await recaptchaVerifier.render();
      return await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
    }
  };

  /**
   * Check wheather the user exists or not in the firebase
   * @param {string} email email of the user
   * @param {*} phone phone number of the user
   * @returns true only if the user does not exists
   */

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

  /**
   * This functions handles the login of user based on the redentails entered by the user
   * @param {object} param0 contains the credentails with which the user is trying to loign
   * @returns it initiates the OTP process for the otp / credential verification
   */

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

  /**
   * Peforms the verification of the OTP entered by the user
   * @param {string} param0 contains the OTP entered by the user
   * and verifies it against the OTP object stored int the browser object
   * @returns verifies the OTP present in the browser window
   */

  const submitOTP = async ({ otp }) => {
    const otpVerification = toast.loading("verifying otp..!!");
    try {
      console.log(otp);
      if (otp === "" || otp === undefined) return;
      console.log(window.captchaResponse, "window.captchaResponse");
      window?.captchaResponse
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
      toast.update(otpVerification, {
        ...toastConfig,
        type: "error",
        render:
          "There was an error in sending OTP please refresh and  try again..!!",
        isLoading: false,
      });
      console.log(error);
    }
  };

  /**
   * Functions that is used to handle the signin using the google provider
   * @returns navigates the user to the /me end point if the user is valid
   */

  const googleLogin = async () => {
    const loading = toast.loading("Attempting to login please wait ..!!");
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
      toast.update(loading, {
        ...toastConfig,
        render: `Welcome User ${data.loginUser.email}...!!!`,
        type: "success",
        isLoading: false,
      });
      nav("/me");
    } catch (error) {
      toast.update(loading, {
        ...toastConfig,
        render: "SignIn failed please try again...!!",
        type: "error",
        isLoading: false,
      });
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
