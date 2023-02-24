import React from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../../service/firebase/firebaseConfig";
import { firebaseTimestampToTime } from "../../service/helperFunctions/firebaseTimestampToString";
import { PassengerDB } from "../../types/passenger.model";
import Cost from "../cards/cars/Cost";
import Extension from "../navigationBars/Extension";
import { NameAndCreated } from "./NameAndCreated";

export default function TimelineCardPassenger({
  data,
  requestRideOnClick,
  setRidePop,
}: {
  data: PassengerDB;
  requestRideOnClick: Function;
  setRidePop: Function;
}) {
  const isBelongToCurrentUser = data.authorId === auth.currentUser?.uid;
  const navigate = useNavigate();

  const handleVisitCard = () => {
    navigate(`/review-passenger/${data.passengerTicektId}`);
  };

  return (
    <div className="secondary-bg timelinecard position-relative">
      <div className="card-time fw-bold fontPrimary">
        {firebaseTimestampToTime(data.actualStartTime)}
      </div>
      <div className="card-ring">
        <Image className="border-r3" fluid src={data.photoURL} />
      </div>
      <div className="p-2 ps-4 d-flex flex-column gap-2 align-items-start">
        <div className="d-flex align-items-center justify-content-between w-100 ps-1">
          <NameAndCreated date={data.created} name={data.displayName} />
          <div className="d-flex gap-2">
            <Cost cost={data.cost.toString()} title="" />
            <Extension>
              <div className="d-flex flex-column gap-1 noselect width-100">
                {isBelongToCurrentUser && (
                  <span
                    onClick={() => setRidePop({ edit: data.passengerTicektId })}
                    className="cursor width-100 text-center"
                  >
                    Delay trip
                  </span>
                )}
                {isBelongToCurrentUser && (
                  <span
                    onClick={() =>
                      setRidePop({ delete: data.passengerTicektId })
                    }
                    className="cursor width-100 text-center"
                  >
                    Cancel trip
                  </span>
                )}
                {!isBelongToCurrentUser && (
                  <span
                    onClick={() =>
                      setRidePop({ report: data.passengerTicektId })
                    }
                    className="cursor font-danger width-100 text-center"
                  >
                    Report trip
                  </span>
                )}
              </div>
            </Extension>
          </div>
        </div>
        <span className="text-4 fw-bold">
          {data.departFrom.toUpperCase()} TO {data.arriveAt.toUpperCase()}
        </span>
        <div className="d-flex gap-2 align-items-center">
          Passengers count: {data.additionalInfo.passengerCount}
        </div>
        <span className="text-3">{data.additionalInfo.details}</span>
        <div className="d-flex align-items-center gap-3">
          {isBelongToCurrentUser ? (
            <button onClick={() => handleVisitCard()}>Visit</button>
          ) : (
            <button
              onClick={() =>
                requestRideOnClick(`${data.authorId}_${data.passengerTicektId}`)
              }
            >
              Request for seat
            </button>
          )}
          {petSvg(!!data.privacy.petsAllowed)}
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
