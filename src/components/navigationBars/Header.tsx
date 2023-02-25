import React, { useEffect, useState } from "react";
import { Image, Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, database } from "../../service/firebase/firebaseConfig";
import addNotification from "react-push-notification";

export default function Header({
  setSideBarFlex,
  sideBarFlex,
}: {
  setSideBarFlex: Function;
  sideBarFlex: boolean;
}) {
  const displayName = auth.currentUser?.displayName;
  const photoURL = auth.currentUser?.photoURL;
  const location = useLocation();
  const isOnDashboard =
    location.pathname === "/favourites" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/";
  const navigation = useNavigate();
  const [newNotification, setNewNotification] = useState(false);
  const [headerBackground, setHeaderBackground] = useState<
    "active-bg" | "inactive-bg"
  >("inactive-bg");

  useEffect(() => {
    const main = document.querySelector(".main");
    // local variable to handle the change
    let currBg: "active-bg" | "inactive-bg" = "inactive-bg";
    main!.addEventListener("scroll", (e) => {
      const scrollValue = main?.scrollTop!;

      if (scrollValue > 140 && currBg !== "active-bg") {
        currBg = "active-bg";
        setHeaderBackground(currBg);
      }
      if (scrollValue < 140 && currBg === "active-bg") {
        currBg = "inactive-bg";
        setHeaderBackground(currBg);
      }
    });
  }, []);

  useEffect(() => {
    const uid = auth.currentUser?.uid as string;
    const dataRef = database.ref(`notification/${uid}`);
    dataRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setNewNotification(data["new"]);
        if (data["new"]) {
          // send push notification
          addNotification({
            title: "Share My Ride",
            message: "New Request from the user",
            theme: "darkblue",
            native: true,
          });
        }
      }
    });
  }, []);

  const handleBellIcon = () => {
    const uid = auth.currentUser?.uid as string;
    database.ref("notification/" + uid).set({
      new: false,
    });
    setNewNotification(false);
    navigation(`/notification`);
  };
  return (
    <div
      className={`d-flex justify-content-center topbar position-fixed ${headerBackground}`}
    >
      <Container className="d-flex justify-content-between pt-1 pb-1 fontLight">
        <div className="d-flex gap-1 align-items-center ">
          {!isOnDashboard && (
            <i
              onClick={() => navigation(-1)}
              className="bi bi-caret-left text-2"
            ></i>
          )}
          <span className="small-container primaryOverlay-bg d-flex align-items-center justify-content-center">
            {photoURL ? (
              <Image className="small-container" src={photoURL} />
            ) : (
              <>{displayName && displayName.split("")[0]}</>
            )}
          </span>
          <div className="d-flex flex-column align-items-start">
            <span className="text-2">
              Hello {displayName && displayName.split(" ")[0]},
            </span>
            <span className="text-3 header-title">Ready to travel?</span>
          </div>
        </div>
        <div className="d-flex gap-3 align-items-center">
          <span onClick={() => handleBellIcon()}>
            {newNotification ? bellActive : bell}
          </span>
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
        </div>
      </Container>
    </div>
  );
}

const bell = (
  <svg
    width="27"
    height="34"
    viewBox="0 0 27 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 28.9V26.35H3.54375V13.345C3.54375 10.965 4.23984 8.84708 5.63203 6.99125C7.02422 5.13542 8.85938 3.96667 11.1375 3.485V2.2525C11.1375 1.60083 11.3695 1.0625 11.8336 0.6375C12.2977 0.2125 12.8531 0 13.5 0C14.1469 0 14.7023 0.2125 15.1664 0.6375C15.6305 1.0625 15.8625 1.60083 15.8625 2.2525V3.485C18.1406 3.96667 19.9828 5.13542 21.3891 6.99125C22.7953 8.84708 23.4984 10.965 23.4984 13.345V26.35H27V28.9H0ZM13.5 34C12.6 34 11.8125 33.6671 11.1375 33.0013C10.4625 32.3354 10.125 31.535 10.125 30.6H16.875C16.875 31.535 16.5445 32.3354 15.8836 33.0013C15.2227 33.6671 14.4281 34 13.5 34Z"
      fill="#ECF3FF"
    />
  </svg>
);

const bellActive = (
  <svg
    width="28"
    height="34"
    viewBox="0 0 28 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 28.9V26.35H3.54375V13.345C3.54375 10.965 4.23984 8.84708 5.63203 6.99125C7.02422 5.13542 8.85938 3.96667 11.1375 3.485V2.2525C11.1375 1.60083 11.3695 1.0625 11.8336 0.6375C12.2977 0.2125 12.8531 0 13.5 0C14.1469 0 14.7023 0.2125 15.1664 0.6375C15.6305 1.0625 15.8625 1.60083 15.8625 2.2525V3.485C18.1406 3.96667 19.9828 5.13542 21.3891 6.99125C22.7953 8.84708 23.4984 10.965 23.4984 13.345V26.35H27V28.9H0ZM13.5 34C12.6 34 11.8125 33.6671 11.1375 33.0013C10.4625 32.3354 10.125 31.535 10.125 30.6H16.875C16.875 31.535 16.5445 32.3354 15.8836 33.0013C15.2227 33.6671 14.4281 34 13.5 34Z"
      fill="#ECF3FF"
    />
    <rect
      x="13.5"
      y="3.5"
      width="14"
      height="14"
      rx="7"
      fill="#FF1585"
      stroke="#7C5283"
    />
  </svg>
);
