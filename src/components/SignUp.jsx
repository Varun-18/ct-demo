import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import useSignup from "../talons/useSignup";

export const SignUp = () => {
  const { check, phone, setPhone, setOtp, getOtp, verifyOtp } = useSignup();
  console.log(phone, "phone");
  return (
    <div>
      {!check ? (
        <form onSubmit={(e) => getOtp(e)}>
          <PhoneInput country="IND" onChange={setPhone} />
          <button type="submit">get otp</button>
        </form>
      ) : (
        <form onSubmit={(e) => verifyOtp(e)}>
          <input type="text" onChange={(e) => setOtp(e.target.value)} />
          <button type="submit">verify otp</button>
        </form>
      )}
      <div id="recaptcha-container" />
    </div>
  );
};
