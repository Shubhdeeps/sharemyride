import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function Register() {
  const [isLogin, setIsLogIn] = useState(true);
  return (
    <>
      <div className="empty-area"></div>

      {isLogin ? (
        <Login setIsLogIn={setIsLogIn} />
      ) : (
        <Signup setIsLogIn={setIsLogIn} />
      )}
    </>
  );
}
