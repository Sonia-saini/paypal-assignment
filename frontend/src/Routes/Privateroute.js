import React from "react";
import { Navigate } from "react-router-dom";

function Privateroute({ children }) {
  let user = JSON.parse(localStorage.getItem("loginuser")) || {};
  if (user.user.admin !== undefined && user.user.admin !== false) {
    return children;
  } else {
    alert("you are not admin so you can't access admin page");
    return <Navigate to="/user" />;
  }
}

export default Privateroute;
