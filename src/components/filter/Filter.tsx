import React from "react";

export default function Filter({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-r1 ps-3 pe-3 p-1 d-flex flex-column gap-2 w-100 mt--20">
      {children}
    </div>
  );
}
