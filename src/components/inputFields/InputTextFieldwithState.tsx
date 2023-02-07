import React from "react";

type Props = {
  placeholder: string;
  type: string;
  title: string;
  setData: Function;
  isAnArray: boolean;
  currValue: any;
};
export default function InputTextFieldwitState(props: Props) {
  return (
    <div className="d-flex flex-column align-items-start fontPrimary gap-1">
      <span className="text-3">{props.title}</span>
      <div className="border-r1 w-100 p-2 ps-3 textField2">
        <input
          className="fontPrimary"
          autoComplete="new-password"
          type={props.type}
          placeholder={props.placeholder}
          onChange={(e) => {
            if (props.isAnArray) {
              props.setData(() => [e.target.value]);
            } else {
              props.setData(e.target.value);
            }
          }}
        />
      </div>
    </div>
  );
}
