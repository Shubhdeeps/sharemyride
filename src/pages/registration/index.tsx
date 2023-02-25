import React, { useState } from "react";
import PasswordReset from "./EmailReset";
import Login from "./Login";
import Signup from "./Signup";

export default function Register() {
  const [isLogin, setIsLogIn] = useState<"login" | "register" | "password">(
    "login"
  );
  return (
    <>
      <div className="empty-area"></div>
      {isLogin === "login" && <Login setIsLogIn={setIsLogIn} />}
      {isLogin === "register" && <Signup setIsLogIn={setIsLogIn} />}
      {isLogin === "password" && <PasswordReset setIsLogIn={setIsLogIn} />}
    </>
  );
}
