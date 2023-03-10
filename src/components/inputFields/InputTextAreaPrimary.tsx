import React from "react";

type Props = {
  placeholder: string;
  title: string;
  textRef: React.MutableRefObject<string>;
};
export default function InputTextAreaPrimary(props: Props) {
  return (
    <div className="d-flex flex-column align-items-start fontPrimary gap-1">
      <span className="text-3">{props.title}</span>
      <div className="border-r1 w-100 p-2 ps-3 textField2">
        <textarea
          onChange={(e) => (props.textRef.current = e.target.value)}
          className="fontPrimary"
          cols={2}
          rows={3}
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
}
