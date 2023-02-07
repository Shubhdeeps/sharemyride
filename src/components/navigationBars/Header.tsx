import React from "react";
import { Image, Container } from "react-bootstrap";

export default function Header({
  setSideBarFlex,
  sideBarFlex,
  displayName,
  photoURL,
}: {
  setSideBarFlex: Function;
  sideBarFlex: boolean;
  photoURL: string;
  displayName: string;
}) {
  return (
    <div className="d-flex justify-content-center topbar">
      <Container className="position-fixed d-flex justify-content-between mt-2 fontLight">
        <div className="d-flex gap-1 align-items-center ">
          <span className="small-container primaryOverlay-bg d-flex align-items-center justify-content-center">
            {photoURL ? (
              <Image src={photoURL} />
            ) : (
              <>{displayName.split("")[0]}</>
            )}
          </span>
          <div className="d-flex flex-column align-items-start">
            <span className="text-2">Hello {displayName.split(" ")[0]},</span>
            <span className="text-3 header-title">Ready to travel?</span>
          </div>
        </div>
        <div
          onClick={() => setSideBarFlex((prevState: boolean) => !prevState)}
          className="small-container cursor primary-bg d-flex align-items-center justify-content-center"
        >
          {sideBarFlex ? (
            <i className="bi bi-x-circle noselect"></i>
          ) : (
            <i className="bi bi-three-dots noselect"></i>
          )}
        </div>
      </Container>
    </div>
  );
}
