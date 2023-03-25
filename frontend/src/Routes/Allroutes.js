import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../Pages/Admin";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import User from "../Pages/User";
import Privateroute from "./Privateroute";
import UserPrivate from "./UserPrivate";

function Allroutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register/>}/> */}
        <Route
          path="/user"
          element={
            <UserPrivate>
              <User />
            </UserPrivate>
          }
        />
        <Route
          path="/admin"
          element={
            <Privateroute>
              <Admin />
            </Privateroute>
          }
        />
      </Routes>
    </div>
  );
}

export default Allroutes;
