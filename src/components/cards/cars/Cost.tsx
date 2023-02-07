import React from "react";

export default function Cost({ cost }: { cost: string }) {
  return (
    <div className="d-flex align-items-center gap-1">
      <span className="text-4 fw-bold">cost</span>
      <span className="text-1-5 font-safe">{cost}</span>
    </div>
  );
}
