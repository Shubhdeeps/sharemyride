import React, { useEffect } from "react";

export default function ModalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  //disable bg scroll while popup
  useEffect(() => {
    const body = document.body;
    body.scrollTop = document.documentElement.scrollTop = 0;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="modal-wrapper d-flex justify-content-center pt-5">
      <div className="scroll">
        <div className="modal-container secondary-bg w-100 border-r1 p-3">
          {children}
        </div>
      </div>
    </div>
  );
}
