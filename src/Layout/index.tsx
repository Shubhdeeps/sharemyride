import React from "react";
import { backgroundSVG } from "./backgroundSVG";

export default function Layout({ children }: { children: React.ReactNode }) {
  // function scrolling(e: React.UIEvent<HTMLDivElement, UIEvent>) {
  //   const main = document.querySelector(".main");
  //   const scrollValue = main?.scrollTop!;
  //   if (scrollValue < 50) {
  //   }
  // }
  return (
    <div className="main noselect">
      <div className="w-100 d-flex justify-content-center text-center position-fixed z-0">
        {backgroundSVG}
      </div>
      <div className="position-relative z-1">{children}</div>
    </div>
  );
}
