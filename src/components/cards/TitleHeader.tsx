import React from "react";

export default function TitleHeader({ heading }: { heading: string }) {
  return (
    <div className="w-100 primary-bg p-2 border-r3 ps-4 fontLight">
      {heading}
    </div>
  );
}
