import React from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../../service/firebase/firebaseConfig";
import { firebaseTimestampToTime } from "../../service/helperFunctions/firebaseTimestampToString";
import { RideDB } from "../../types/ride.model";
import Cost from "../cards/cars/Cost";
import Timeline from "../cards/cars/Timeline";
import { NameAndCreated } from "./NameAndCreated";

export default function TimelineCard({
  data,
  requestRideOnClick,
}: {
  data: RideDB;
  requestRideOnClick: Function | undefined;
}) {
  const isBelongToCurrentUser = data.authorId === auth.currentUser?.uid;
  const navigate = useNavigate();
  const isCurrentUserAPassengerOfRide = data.passengerUids.includes(
    auth.currentUser?.uid as string
  );

  const handleVisitCard = () => {
    navigate(`/review-ride/${data.rideTicektId}`);
  };
  const additionalInformation = [
    {
      icon: evSvg(!!data.privacy.EVCar),
      key: "Electric Car",
    },
    {
      icon: parcelSvg(!!data.privacy.acceptParcel),
      key: "Accepting Parcels",
    },
    {
      icon: petSvg(!!data.privacy.petsAllowed),
      key: "Pets allowed",
    },
  ];

  return (
    <div className="button-color-border secondary-bg timelinecard">
      <div className="card-time fw-bold fontPrimary">
        {firebaseTimestampToTime(data.actualStartTime)}
      </div>
      <div className="card-ring">
        <Image className="border-r3" fluid src={data.photoURL} />
      </div>
      <div className="p-2 ps-4 d-flex flex-column gap-2 align-items-start">
        <div className="d-flex align-items-center justify-content-between w-100 ps-1">
          <NameAndCreated date={data.created} name={data.displayName} />
          <Cost cost={data.cost.toString()} title="" />
        </div>
        <div style={{ marginTop: "-20px" }}>
          <Timeline
            startPoint={data.departFrom}
            endPoint={data.arriveAt}
            startTime={[data.actualStartTime]}
            endTime={[data.actualEndTime]}
            stoppage={[]}
            commute="car"
          />
        </div>
        <div className="d-flex gap-2 align-items-center">
          Seats
          {data.passengerUids.map((x) => {
            return (
              <React.Fragment key={x}>
                {x !== data.authorId && (
                  <span className="seat-blank d-flex align-items-center justify-content-center">
                    <i className=" bi bi-person-fill font-safe text-center text-2"></i>
                  </span>
                )}
              </React.Fragment>
            );
          })}
          {Array.from(
            Array(data.passengerSeats - data.passengerUids.length).keys()
          ).map((x) => {
            return (
              <React.Fragment key={x}>
                <span className="seat-blank"></span>
              </React.Fragment>
            );
          })}
        </div>
        {isCurrentUserAPassengerOfRide && (
          <div className="text-4 fw-bold font-safe">ACCEPTED</div>
        )}
        <div className="d-flex align-items-center gap-3">
          {isBelongToCurrentUser || isCurrentUserAPassengerOfRide ? (
            <button className="btn-height" onClick={() => handleVisitCard()}>
              Visit
            </button>
          ) : (
            requestRideOnClick && (
              <button
                className="btn-height"
                onClick={() =>
                  requestRideOnClick(`${data.authorId}_${data.rideTicektId}`)
                }
              >
                Request for seat
              </button>
            )
          )}
          {additionalInformation.map((icon) => {
            return <React.Fragment key={icon.key}>{icon.icon}</React.Fragment>;
          })}
        </div>
      </div>
    </div>
  );
}

const petSvg = (accept: boolean) => (
  <>
    {accept && (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.475 10.1316C1.77833 10.1316 1.19167 9.8807 0.715 9.37895C0.238333 8.87719 0 8.25965 0 7.52632C0 6.79298 0.238333 6.17544 0.715 5.67368C1.19167 5.17193 1.77833 4.92105 2.475 4.92105C3.17167 4.92105 3.75833 5.17193 4.235 5.67368C4.71167 6.17544 4.95 6.79298 4.95 7.52632C4.95 8.25965 4.71167 8.87719 4.235 9.37895C3.75833 9.8807 3.17167 10.1316 2.475 10.1316ZM7.5625 5.21053C6.86583 5.21053 6.27917 4.95965 5.8025 4.45789C5.32583 3.95614 5.0875 3.3386 5.0875 2.60526C5.0875 1.87193 5.32583 1.25439 5.8025 0.752632C6.27917 0.250877 6.86583 0 7.5625 0C8.25917 0 8.84583 0.250877 9.3225 0.752632C9.79917 1.25439 10.0375 1.87193 10.0375 2.60526C10.0375 3.3386 9.79917 3.95614 9.3225 4.45789C8.84583 4.95965 8.25917 5.21053 7.5625 5.21053ZM14.4375 5.21053C13.7408 5.21053 13.1542 4.95965 12.6775 4.45789C12.2008 3.95614 11.9625 3.3386 11.9625 2.60526C11.9625 1.87193 12.2008 1.25439 12.6775 0.752632C13.1542 0.250877 13.7408 0 14.4375 0C15.1342 0 15.7208 0.250877 16.1975 0.752632C16.6742 1.25439 16.9125 1.87193 16.9125 2.60526C16.9125 3.3386 16.6742 3.95614 16.1975 4.45789C15.7208 4.95965 15.1342 5.21053 14.4375 5.21053ZM19.525 10.1316C18.8283 10.1316 18.2417 9.8807 17.765 9.37895C17.2883 8.87719 17.05 8.25965 17.05 7.52632C17.05 6.79298 17.2883 6.17544 17.765 5.67368C18.2417 5.17193 18.8283 4.92105 19.525 4.92105C20.2217 4.92105 20.8083 5.17193 21.285 5.67368C21.7617 6.17544 22 6.79298 22 7.52632C22 8.25965 21.7617 8.87719 21.285 9.37895C20.8083 9.8807 20.2217 10.1316 19.525 10.1316ZM5.115 22C4.345 22 3.7125 21.6961 3.2175 21.0882C2.7225 20.4803 2.475 19.7614 2.475 18.9316C2.475 18.1211 2.70875 17.4022 3.17625 16.775C3.64375 16.1478 4.14333 15.5447 4.675 14.9658C5.07833 14.5412 5.45417 14.0925 5.8025 13.6197C6.15083 13.1469 6.48083 12.6596 6.7925 12.1579C7.32417 11.3088 7.92 10.5175 8.58 9.78421C9.24 9.05088 10.0467 8.68421 11 8.68421C11.9533 8.68421 12.7646 9.05088 13.4337 9.78421C14.1029 10.5175 14.7033 11.3184 15.235 12.1868C15.5467 12.6886 15.8721 13.1711 16.2112 13.6342C16.5504 14.0974 16.9217 14.5412 17.325 14.9658C17.8567 15.5447 18.3562 16.1478 18.8237 16.775C19.2912 17.4022 19.525 18.1211 19.525 18.9316C19.525 19.7614 19.2775 20.4803 18.7825 21.0882C18.2875 21.6961 17.655 22 16.885 22C15.895 22 14.9142 21.9132 13.9425 21.7395C12.9708 21.5658 11.99 21.4789 11 21.4789C10.01 21.4789 9.02917 21.5658 8.0575 21.7395C7.08583 21.9132 6.105 22 5.115 22Z"
          fill="#008D38"
        />
      </svg>
    )}
  </>
);

const evSvg = (accept: boolean) => (
  <>
    {accept && (
      <svg
        width="20"
        height="22"
        viewBox="0 0 20 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.22222 13.9V15.25C2.22222 15.4667 2.14352 15.6458 1.98611 15.7875C1.8287 15.9292 1.62963 16 1.38889 16H0.833333C0.592593 16 0.393519 15.9292 0.236111 15.7875C0.0787038 15.6458 0 15.4667 0 15.25V7.15L2.36111 0.75C2.41667 0.516667 2.56019 0.333333 2.79167 0.2C3.02315 0.0666667 3.27778 0 3.55556 0H16.4444C16.7222 0 16.9769 0.0666667 17.2083 0.2C17.4398 0.333333 17.5833 0.516667 17.6389 0.75L20 7.15V15.25C20 15.4667 19.9213 15.6458 19.7639 15.7875C19.6065 15.9292 19.4074 16 19.1667 16H18.5833C18.3426 16 18.1435 15.9292 17.9861 15.7875C17.8287 15.6458 17.75 15.4667 17.75 15.25V13.9H2.22222ZM2.30556 5.65H17.6944L16.1667 1.5H3.83333L2.30556 5.65ZM4.61111 11.15C5.03704 11.15 5.39352 11.0167 5.68056 10.75C5.96759 10.4833 6.11111 10.1667 6.11111 9.8C6.11111 9.41667 5.96759 9.0875 5.68056 8.8125C5.39352 8.5375 5.03704 8.4 4.61111 8.4C4.18519 8.4 3.81944 8.5375 3.51389 8.8125C3.20833 9.0875 3.05556 9.41667 3.05556 9.8C3.05556 10.1833 3.20833 10.5042 3.51389 10.7625C3.81944 11.0208 4.18519 11.15 4.61111 11.15ZM15.4167 11.15C15.8426 11.15 16.2083 11.0167 16.5139 10.75C16.8194 10.4833 16.9722 10.1667 16.9722 9.8C16.9722 9.41667 16.8194 9.0875 16.5139 8.8125C16.2083 8.5375 15.8426 8.4 15.4167 8.4C14.9907 8.4 14.6343 8.5375 14.3472 8.8125C14.0602 9.0875 13.9167 9.41667 13.9167 9.8C13.9167 10.1833 14.0648 10.5042 14.3611 10.7625C14.6574 11.0208 15.0093 11.15 15.4167 11.15ZM11 22L4.77778 19.05H8.88889V17.15L15.2222 20H11V22ZM1.66667 12.4H18.3333V7.15H1.66667V12.4Z"
          fill="#008D38"
        />
      </svg>
    )}
  </>
);

const parcelSvg = (accept: boolean) => (
  <>
    {accept && (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.74936 22H1.68798C1.23785 22 0.84399 21.8312 0.506394 21.4936C0.168798 21.156 0 20.7621 0 20.312V3.93862C0 3.48849 0.145354 3.09463 0.436061 2.75703C0.726769 2.41944 0.975277 2.25064 1.18159 2.25064H6.86445C6.99574 1.5942 7.31927 1.05499 7.83504 0.632992C8.35081 0.210997 8.94629 0 9.62148 0C10.2967 0 10.8922 0.210997 11.4079 0.632992C11.9237 1.05499 12.2472 1.5942 12.3785 2.25064H18.0614C18.5115 2.25064 18.9054 2.41944 19.243 2.75703C19.5806 3.09463 19.7494 3.48849 19.7494 3.93862V9.64962H18.0614V3.93862H15.0793V7.59591H4.67008V3.93862H1.68798V20.312H8.74936V22ZM14.0665 21.2967L9.56522 16.7954L10.7749 15.5857L14.0665 18.8772L20.7903 12.1535L22 13.3632L14.0665 21.2967ZM10.1279 3.82609C10.4467 3.82609 10.714 3.71824 10.9297 3.50256C11.1454 3.28687 11.2532 3.01961 11.2532 2.70077C11.2532 2.38193 11.1454 2.11466 10.9297 1.89898C10.714 1.68329 10.4467 1.57545 10.1279 1.57545C9.80904 1.57545 9.54177 1.68329 9.32609 1.89898C9.1104 2.11466 9.00256 2.38193 9.00256 2.70077C9.00256 3.01961 9.1104 3.28687 9.32609 3.50256C9.54177 3.71824 9.80904 3.82609 10.1279 3.82609Z"
          fill="#008D38"
        />
      </svg>
    )}
  </>
);
