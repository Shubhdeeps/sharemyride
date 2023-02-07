import React from "react";

type Props = {
  placeholder: string;
  type: string;
  title: string;
  textRef: React.MutableRefObject<string>;
};
export default function InputTextFieldPrimary(props: Props) {
  return (
    <div className="d-flex flex-column align-items-start fontLight gap-1">
      <span className="text-3">{props.title}</span>
      <div className="border-r1 w-100 p-2 ps-3 textField1">
        <input
          className="fontLight"
          autoComplete="new-password"
          type={props.type}
          placeholder={props.placeholder}
          onChange={(e) => (props.textRef.current = e.target.value)}
        />
      </div>
    </div>
  );
}
