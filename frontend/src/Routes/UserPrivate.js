import React from "react";
import { Navigate } from "react-router-dom";

function UserPrivate({ children }) {
  let user = JSON.parse(localStorage.getItem("loginuser")) || {};
  if (user && user.user) {
    return children;
  } else {
    alert("please login frist");
    return <Navigate to="/login" />;
  }
}

export default UserPrivate;
