import React, { useState } from "react";
import { localization } from "../../service/languages/languages";

export default function FilterHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [flexFilter, setFlexFilter] = useState(false);
  return (
    <div className="w-100 d-flex flex-column border-r1 mt-2 border">
      <div
        onClick={() => setFlexFilter(!flexFilter)}
        className=" d-flex align-items-center gap-2 p-2 justify-content-between"
      >
        <span className="text-muted text-2-5">{localization["Filters"]}</span>
        <i
          className={`"text-muted cursor bi" ${
            flexFilter ? "bi-caret-down-fill" : "bi-caret-right-fill"
          }`}
        ></i>
      </div>
      {flexFilter && (
        <div className="d-flex flex-column gap-2 ps-3 pe-3 mt-4 mb-2">
          {children}
        </div>
      )}
    </div>
  );
}
