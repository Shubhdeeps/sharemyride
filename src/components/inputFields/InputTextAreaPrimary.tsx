import React from "react";
import { localization } from "../../service/languages/languages";

type Props = {
  placeholder: "feedback" | "Report an issue";
  title: "Feedback" | "Report";
  textRef: React.MutableRefObject<string>;
};
export default function InputTextAreaPrimary(props: Props) {
  const title = localization[props.title];
  const placeholder = localization[props.placeholder];
  return (
    <div className="d-flex flex-column align-items-start fontPrimary gap-1">
      <span className="text-3">{title}</span>
      <div className="border-r1 w-100 p-2 ps-3 textField2">
        <textarea
          onChange={(e) => (props.textRef.current = e.target.value)}
          className="fontPrimary"
          cols={2}
          rows={3}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
