import React, { useState } from "react";

type Props = {
  placeholder: string;
  title: string;
  switchRef: React.MutableRefObject<boolean | null>;
};
export default function InputCheckboxField(props: Props) {
  const [isActive, setActive] = useState(!!props.switchRef.current);
  const handleClick = () => {
    setActive((prevState) => !prevState);
    props.switchRef.current = !props.switchRef.current;
  };
  return (
    <div
      style={{ width: "fit-content" }}
      className="border-r1 fontPrimary border d-flex align-items-center p-3 gap-3"
    >
      <span>{props.title}</span>
      <span className="text-1-5" onClick={() => handleClick()}>
        {isActive ? (
          <i className="bi bi-toggle-on font-safe"></i>
        ) : (
          <i className="bi bi-toggle-off "></i>
        )}
      </span>
    </div>
  );
}
