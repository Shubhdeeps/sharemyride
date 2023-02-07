import React from "react";

export default function FloatButton({
  onClick,
  children,
}: {
  onClick: Function;
  children: React.ReactNode;
}) {
  return (
    <div
      onClick={() => onClick()}
      className="border d-flex justify-content-end cursor noselect"
    >
      <div className="d-flex align-items-center justify-content-center primary-bg border-r3 float-btn position-fixed">
        {children}
      </div>
    </div>
  );
}
