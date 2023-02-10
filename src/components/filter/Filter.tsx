import React from "react";

export default function Filter({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-r1 p-2 shadow-sm d-flex flex-column gap-2 w-100 justify-content-between">
      {children}
    </div>
  );
}
