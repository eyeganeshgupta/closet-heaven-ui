import React from "react";
import Login from "../Users/Forms/Login";
import NotAuthorized from "../NotAuthorized/NotAuthorized";

const AuthRoute = ({ children }) => {
  // TODO: get user from localStorage
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const isLoggedIn = user?.token ? true : false;

  if (!isLoggedIn) {
    // return <Login />;
    return <NotAuthorized/>;
  }

  return <>{children}</>;
};

export default AuthRoute;
