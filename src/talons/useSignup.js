import { useMutation } from "@apollo/client";
import {
  EmailAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  linkWithCredential,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../config/firebase.config";
import { ADD_SOCIALS_USER, ADD_USER, CHECK_EXISTING } from "../constants";
import { toastConfig } from "../toast";

/**
 * Custom talon used for signup component
 * @returns functions that used for signup component
 */

const useSignup = () => {
  const [check, setCheck] = useState(false);
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [addUser] = useMutation(ADD_USER);
  const [addSocialsUser] = useMutation(ADD_SOCIALS_USER);
  const [checkUser] = useMutation(CHECK_EXISTING);
  const nav = useNavigate();

  /**
   * This functions set-ups the Capthca if required
   * @param {string} phone The phone number to be verified
   * @returns The captcha to check wether te user is a human or a bot
   */

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
      return data.checkUser;
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * This function is used to set up the OTP process
   * @param {object} param0 contains the deatils of the user who is trying to login
   * @returns Initiates the OTP process
   */

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

  /**
   * @param {string} param0 contains the OTP entered by the user
   * and verifies it against the OTP object stored int the browser object
   * @returns verifies the OTP present in the browser window
   */

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

  /**
   * This functions links the email and password of the user
   * @param {object} param0 contains the email and password of the user
   *  when the user tries to sign-up with credentials
   * @returns navigates the user to the  /me endpoint if the user is authentic
   */

  const addEmailPasswordProvider = async ({ email, pass }) => {
    const user = auth.currentUser;
    console.log(user);
    if (user) {
      const creating = toast.loading("Signing you up Please wait..!!");
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
          render: "Welcome...!!!",
          type: "success",
        });
        nav("/me");
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

  /**
   * Functions that is used to handle the signup using the google provider
   * @returns navigates the user to the /me end point if the user is valid
   */

  const googleSignup = async () => {
    const loading = toast.loading("Attempting to login please wait ..!!");
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("email");
      const { user } = await signInWithPopup(auth, provider);
      console.log(user);
      const { data } = await addSocialsUser({
        variables: {
          data: user,
        },
      });

      console.log(data);
      if (data.addSocialsUser.status === 400) {
        toast.update(loading, {
          ...toastConfig,
          render: data.addSocialsUser.message,
          type: "error",
          isLoading: false,
        });
      } else {
        toast.update(loading, {
          ...toastConfig,
          render: "SignIn Successful...!!!",
          type: "success",
          isLoading: false,
        });
        nav("/me");
      }
    } catch (error) {
      toast.update(loading, {
        ...toastConfig,
        render: "Unknown error occured",
        type: "error",
        isLoading: false,
      });
      console.log(error, "from google signup error block");
    }
  };

  /**
   * Functions that is used to handle the signup using the github provider
   * @returns navigates the user to the /me end point if the user is valid
   */

  const githubSignup = async () => {
    const loading = toast.loading("Attempting to login please wait ..!!");
    try {
      const provider = new GithubAuthProvider();
      provider.addScope("repo");
      const { user } = await signInWithPopup(auth, provider);
      console.log(user);
      toast.update(loading, {
        ...toastConfig,
        render: "SignIn Successful...!!!",
        type: "success",
        isLoading: false,
      });
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
    check,
    getOtp,
    verifyOtp,
    googleSignup,
    githubSignup,
  };
};

export default useSignup;
