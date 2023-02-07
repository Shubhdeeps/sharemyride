import React from "react";

type Props = {
  title: string;
  currentState: string;
  onClick: Function;
  icon: string;
};
export default function NavButton({
  icon,
  title,
  onClick,
  currentState,
}: Props) {
  return (
    <div
      className={`noselect shadow-sm cursor nav-button border-r3 d-flex flex-column align-items-center justify-content-center ${
        currentState === title.toLowerCase()
          ? "button-color fontLight"
          : "button-inactive-color fontPrimary"
      }`}
      onClick={() => onClick()}
    >
      <i className={`bi text-1-5 ${icon}`}></i>
      <span className="text-3">{title}</span>
    </div>
  );
}
