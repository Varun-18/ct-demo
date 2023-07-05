import React, { useState } from "react";

const useLogin = () => {
  const [loginType, setLoginType] = useState(true);

  return {
    loginType,
    setLoginType,
  };
};

export default useLogin;
