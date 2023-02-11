import React from "react";

export default function TimeHeader({ time }: { time: string }) {
  return (
    <div className="d-flex align-items-center gap-2 p-3">
      <span className="text-muted text-2-5">{time}</span>
      <span>{lingSVG}</span>
    </div>
  );
}

const lingSVG = (
  <svg width="100%" height="1">
    <line y1="0.5" x2="747" y2="0.5" stroke="#DFDFDF" />
  </svg>
);
