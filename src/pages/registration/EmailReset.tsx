import React, { useRef, useState } from "react";
import InputTextFieldPrimary from "../../components/inputFields/InputTextFieldPrimary";
import Loader from "../../components/loader";
import { auth } from "../../service/firebase/firebaseConfig";
import { localization } from "../../service/languages/languages";
export default function PasswordReset({
  setIsLogIn,
}: {
  setIsLogIn: Function;
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const email = useRef("");

  const handleSubmit = async () => {
    if (!email.current) {
      setError("Enter your email address");
      return;
    }
    setLoading(true);
    await auth.sendPasswordResetEmail(email.current);
    setIsLogIn("login");
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="h-100 container d-flex flex-column justify-content-between fontLight">
      <form
        onSubmit={() => handleSubmit()}
        className="d-flex flex-column gap-1"
        autoComplete="off"
      >
        <span className="text-2-5">{localization["Password reset"]}</span>
        <InputTextFieldPrimary
          placeholder="Email address"
          type="text"
          title="Email"
          textRef={email}
        />

        {error && (
          <div className="text-center">
            <span>{error}</span>
          </div>
        )}
        <br />
        <div className="text-3 text-center">
          <button type="submit" className="p-2 ps-5 pe-5 border-r3">
            {localization["Reset password"]}
          </button>
        </div>
        <br />
        <div className="text-center text-3">
          {
            localization[
              "An email with link to reset your password will be sent to you."
            ]
          }
        </div>
      </form>
      <br />
    </div>
  );
}
