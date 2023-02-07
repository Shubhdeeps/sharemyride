import React, { useState } from "react";

type Props = {
  placeholder: string;
  type: string;
  title: string;
  textRef: React.MutableRefObject<string | number | Date | null>;
};
export default function InputTextFieldSecondary(props: Props) {
  const [value, setValue] = useState<any>(props.textRef.current);
  const handleChange = (CurrValue: any) => {
    setValue(CurrValue);
    props.textRef.current = CurrValue;
  };
  const defaultValue = props.textRef.current;
  return (
    <div className="d-flex flex-column align-items-start fontPrimary gap-1">
      <span className="text-3">{props.title}</span>
      <div className="border-r1 w-100 p-2 ps-3 textField2">
        <input
          className="fontPrimary"
          autoComplete="new-password"
          value={value}
          type={props.type}
          placeholder={props.placeholder}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </div>
  );
}
