import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../service/firebase/collectionOperations";
import SideBarButton from "../inputFields/SideBarButton";

export default function Sidebar({
  sideBarFlex,
  SetFlex,
}: {
  sideBarFlex: boolean;
  SetFlex: Function;
}) {
  const navigate = useNavigate();
  const handleClick = (clickFN: Function) => {
    clickFN();
    SetFlex(false);
  };
  useEffect(() => {
    const body = document.body;
    body.style.overflow = "hidden";

    if (!sideBarFlex) {
      body.style.overflow = "auto";
    }
  }, [sideBarFlex]);
  return (
    <div
      className={`position-fixed primary-bg w-100 h-100 ${
        sideBarFlex ? "sidebar-active" : "sidebar-inactive"
      }`}
    >
      <div className="d-flex flex-column gap-2 align-items-center justify-content-center h-100 p-4">
        <SideBarButton
          onClick={() => handleClick(() => navigate("/dashboard"))}
          title="Dashboard"
        />
        <SideBarButton
          onClick={() => handleClick(() => navigate("/profile"))}
          title="Profile"
        />
        <SideBarButton
          onClick={() => handleClick(() => navigate("/feedback-report"))}
          title="Feedback/Report"
        />
        <SideBarButton
          onClick={() => handleClick(() => logout())}
          title="Log out"
        />
      </div>
    </div>
  );
}
