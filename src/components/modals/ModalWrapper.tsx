import React, { useEffect } from "react";

export default function ModalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  //disable bg scroll while popup
  useEffect(() => {
    const main = document.querySelector(".main");
    if (main) {
      main.scrollTo({ top: 0, behavior: "smooth" });
      main.classList.add("no-scroll");
    }
    return () => {
      main?.classList.remove("no-scroll");
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
