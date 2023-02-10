import React, { useRef, useState } from "react";
import FilledButton from "../../components/inputFields/FIlledButton";
import InputTextFieldPrimary from "../../components/inputFields/InputTextFieldPrimary";
import { auth } from "../../service/firebase/firebaseConfig";

export default function Signup({ setIsLogIn }: { setIsLogIn: Function }) {
  const [error, setError] = useState("");

  const displayNameRef = useRef("");
  const email = useRef("");
  const password = useRef("");

  const handleRegister = () => {
    if (!displayNameRef.current || !email.current || !password.current) {
      setError("All the fields with * are required!");
      return;
    }
    auth
      .createUserWithEmailAndPassword(email.current, password.current)
      .then((user) => {
        user.user?.updateProfile({
          displayName: displayNameRef.current,
          photoURL: `https://api.dicebear.com/5.x/thumbs/svg?seed=${
            displayNameRef.current.split(" ")[0]
          }`,
        });
      })
      .catch((e) => {
        setError(e.message);
      });
  };
  return (
    <div className="h-100 container d-flex flex-column justify-content-between fontLight">
      <span className="text-2">Welcome Traveller</span>
      <form className="d-flex flex-column gap-1" autoComplete="off">
        <span className="text-2-5">{`Let's register`}</span>
        <InputTextFieldPrimary
          textRef={displayNameRef}
          placeholder="Jason Valiin"
          type="text"
          title="Display name*"
        />
        <InputTextFieldPrimary
          textRef={email}
          placeholder="Tell us your email address"
          type="text"
          title="Email*"
        />
        <InputTextFieldPrimary
          textRef={password}
          placeholder="Choose a password"
          type="password"
          title="Password*"
        />
        {/* <InputTextAreaPrimary
          textRef={description}
          placeholder="Tell others little about yourself"
          title="Description"
        /> */}
        {error && (
          <div className="text-center">
            <span>{error}</span>
          </div>
        )}
        <br />
        <div className="mt-2 d-flex justify-content-center">
          <span className="w-50">
            <FilledButton
              title="Register me :)"
              onClick={() => handleRegister()}
            />
          </span>
        </div>
      </form>
      <br />
      {/* <div className="d-flex flex-column align-items-center pb-2">
        <span className="text-3">
          Skip registration, and log me in with google
        </span>
        <div className="border-r2 textField1 w-50 p-1 mt-2 d-flex justify-content-center align-items-center gap-2">
          <i className="bi bi-google"></i>
          Google
        </div>
      </div> */}
      <div className="d-flex flex-column align-items-center pb-4">
        <span>
          I already have an account
          <span
            onClick={() => setIsLogIn(true)}
            className="highlight-color noselect cursor"
          >
            {" "}
            LOGIN
          </span>
        </span>
      </div>
    </div>
  );
}
