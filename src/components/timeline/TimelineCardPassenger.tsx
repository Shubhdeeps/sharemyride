import React from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth, Timestamp } from "../../service/firebase/firebaseConfig";
import { capitalizeFirstLetter } from "../../service/helperFunctions/captalizeFirstLetter";
import {
  firebaseTimestampToString,
  firebaseTimestampToTime,
} from "../../service/helperFunctions/firebaseTimestampToString";
import { PassengerDB } from "../../types/passenger.model";
import ContactAndButton from "../cards/cars/ContactAndButton";
import Cost from "../cards/cars/Cost";
import OutlinedButton from "../inputFields/OutlinedButton";

export default function TimelineCardPassenger({
  data,
  requestRideOnClick,
}: {
  data: PassengerDB;
  requestRideOnClick: Function;
}) {
  const isBelongToCurrentUser = data.authorId === auth.currentUser?.uid;
  const navigate = useNavigate();

  return (
    <div className="secondary-bg timelinecard position-relative">
      <div className="card-time fw-bold fontPrimary">
        {firebaseTimestampToTime(data.actualStartTime)}
      </div>
      <div className="card-ring">
        <Image className="border-r3" fluid src={data.photoURL} />
      </div>
      <div className="w-100 h-100 position-absolute p-2 ps-4 d-flex flex-column gap-2 align-items-start">
        <div className="d-flex align-items-center justify-content-between w-100 ps-1">
          <NameAndCreated date={data.created} name={data.displayName} />
          <Cost cost={data.cost.toString()} title="" />
        </div>
        <span className="text-4 fw-bold">
          {data.departFrom.toUpperCase()} TO {data.arriveAt.toUpperCase()}
        </span>
        <div className="d-flex gap-2 align-items-center">
          Passengers count: {data.additionalInfo.passengerCount}
        </div>
        {requestRideOnClick && !isBelongToCurrentUser ? (
          <ContactAndButton
            buttonText={"Request to join"}
            messanger={data.privacy.showContact ? data.contact.messanger : ""}
            text={data.privacy.showContact ? data.contact.text : ""}
            whatsapp={data.privacy.showContact ? data.contact.whatsapp : ""}
            onClick={() =>
              requestRideOnClick(`${data.authorId}_${data.passengerTicektId}`)
            }
          />
        ) : (
          <>
            {requestRideOnClick && (
              <OutlinedButton
                onClick={() =>
                  navigate(`/review-passenger/${data.passengerTicektId}`)
                }
                title="Visit"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

const NameAndCreated = ({
  name,
  date,
}: {
  name: string;
  date: typeof Timestamp;
}) => {
  return (
    <div className="d-flex flex-column align-items-start">
      <span className="text-2-5 fw-bold">{capitalizeFirstLetter(name)}</span>
      <span style={{ marginTop: "-10px" }} className="text-4">
        {firebaseTimestampToString(date)}
      </span>
    </div>
  );
};
