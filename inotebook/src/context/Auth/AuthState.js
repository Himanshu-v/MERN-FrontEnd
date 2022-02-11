import React, { useState } from "react";
import AuthContext from "./AuthContext";

export const AuthState = (props) => {
  const [authtoken, setAuthtoken] = useState("");

  const setAuthentication = async (token) => {
    await setAuthtoken(token);
  };

  return (
    <AuthContext.Provider value={{ authtoken, setAuthentication }}>
      {" "}
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
