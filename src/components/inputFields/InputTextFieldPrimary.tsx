import React from "react";
import { localization } from "../../service/languages/languages";

type Props = {
  placeholder:
    | "Email address"
    | "Tell us your email address"
    | "Choose a password"
    | "Jason Valiin";
  type: string;
  title: "Email" | "Password" | "Display name*" | "Email*" | "Password*";
  textRef: React.MutableRefObject<string>;
};
export default function InputTextFieldPrimary(props: Props) {
  const title = localization[props.title];
  const placeholder = localization[props.placeholder];
  return (
    <div className="d-flex flex-column align-items-start fontLight gap-1">
      <span className="text-3">{title}</span>
      <div className="border-r1 w-100 p-2 ps-3 textField1">
        <input
          className="fontLight"
          autoComplete="new-password"
          type={props.type}
          placeholder={placeholder}
          onChange={(e) => (props.textRef.current = e.target.value)}
        />
      </div>
    </div>
  );
}
