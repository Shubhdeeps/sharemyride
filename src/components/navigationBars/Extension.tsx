import React, { useState } from "react";

export default function Extension({ children }: { children: React.ReactNode }) {
  const [isFlexed, setFlex] = useState(false);
  return (
    <>
      <div className="d-flex flex-column align-items-end">
        <i
          className="bi bi-three-dots-vertical primary-color cursor"
          onClick={() => setFlex(!isFlexed)}
        />
        {isFlexed && (
          <>
            {/* <div className="screen-overlap"></div> */}
            <div
              onClick={() => setFlex(false)}
              className="position-relative d-flex flex-column align-items-end z-2"
            >
              <div
                style={{ marginTop: "" }}
                className="secondary-bg border-r1 position-absolute z-2 button-color-border p-2 text-3"
              >
                {children}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export function ExtensionLanguage({ children }: { children: React.ReactNode }) {
  const [isFlexed, setFlex] = useState(false);
  return (
    <>
      <div className="d-flex flex-column align-items-end">
        <i
          className="bi bi-translate secondary-color cursor text-1-5"
          onClick={() => setFlex(!isFlexed)}
        />
        {isFlexed && (
          <>
            {/* <div className="screen-overlap"></div> */}
            <div
              onClick={() => setFlex(false)}
              className="position-relative d-flex flex-column align-items-end z-2"
            >
              <div
                style={{ marginTop: "" }}
                className="secondary-color primary-bg border-r1 position-absolute z-2  p-2 text-3"
              >
                {children}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
