import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

console.log(
  "%cWELCOME DEVELOPERS TO TRIP SHARE",
  "color:green;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
);
console.log(
  "%cThis is a browser feature intended for developers only.",
  "color:white;font-family:system-ui;font-size:2rem;font-weight:bold"
);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
