import React, { useRef, useState } from "react";
import FilledButton from "../../components/inputFields/FIlledButton";
import InputTextFieldPrimary from "../../components/inputFields/InputTextFieldPrimary";
import { auth } from "../../service/firebase/firebaseConfig";
export default function Login({ setIsLogIn }: { setIsLogIn: Function }) {
  const [error, setError] = useState("");
  const email = useRef("");
  const password = useRef("");

  const handleSubmit = () => {
    if (!email.current && !password.current) {
      setError("Both fields are required!");
      return;
    }
    auth
      .signInWithEmailAndPassword(email.current, password.current)
      .catch((e) => {
        console.log("Errrr:", e);
        setError(e.message);
      });
  };
  return (
    <div className="h-100 container d-flex flex-column justify-content-between fontLight">
      <span className="text-2">Welcome Traveller</span>
      <form className="d-flex flex-column gap-1" autoComplete="off">
        <span className="text-2-5">{`Let's register`}</span>

        <InputTextFieldPrimary
          placeholder="Tell us your email address"
          type="text"
          title="Email"
          textRef={email}
        />
        <InputTextFieldPrimary
          placeholder="Choose a password"
          type="password"
          title="Password"
          textRef={password}
        />
        {error && (
          <div className="text-center">
            <span>{error}</span>
          </div>
        )}
        <br />
        <div className="mt-2 d-flex justify-content-center">
          <span className="w-50">
            <FilledButton title="Let's travel" onClick={() => handleSubmit()} />
          </span>
        </div>
      </form>
      {/* <div className="d-flex flex-column align-items-center pb-2">
        <div className="text-2 text-center pb-2">Or</div>
        <span className="text-3">Log me in with google account</span>
        <div className="border-r2 textField1 w-50 p-1 mt-2 d-flex justify-content-center align-items-center gap-2">
          <i className="bi bi-google"></i>
          Google
        </div>
      </div> */}
      <br />
      <div className="d-flex flex-column align-items-center pb-4">
        <span>
          I want to register a new account
          <span
            onClick={() => setIsLogIn(false)}
            className="highlight-color noselect cursor"
          >
            {" "}
            Signup
          </span>
        </span>
      </div>
    </div>
  );
}
