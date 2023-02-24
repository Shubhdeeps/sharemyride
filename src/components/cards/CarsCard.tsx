import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../service/firebase/firebaseConfig";
import { RideDB } from "../../types/ride.model";
import OutlinedButton from "../inputFields/OutlinedButton";
import { AdditionalInfoBox } from "./AdditionalInfoBlock";
import ContactAndButton from "./cars/ContactAndButton";
import Cost from "./cars/Cost";
import ProfileDetails from "./cars/ProfileDetails";
import Timeline from "./cars/Timeline";

const status = {
  ongoing: {
    color: "font-safe",
    status: "LIVE",
  },
  cancelled: {
    color: "font-danger",
    status: "CANCELLED",
  },
  full: {
    color: "",
    status: "RESERVED",
  },
};

type Props = {
  data: RideDB;
  requestRideOnClick: Function | undefined;
};
export default function CarsCard({ data, requestRideOnClick }: Props) {
  const navigate = useNavigate();
  const isCurrUserAccepted = data.passengerUids.includes(
    auth.currentUser?.uid as string
  );
  const isBelongToCurrentUser = data.authorId === auth.currentUser?.uid;
  const additionalInformation = [
    {
      value: data.privacy.EVCar ? "Yes" : "No",
      key: "Electric Car",
      show: !!data.privacy.EVCar,
    },
    {
      value: data.privacy.acceptParcel ? "Yes" : "No",
      key: "Accepting Parcels",
      show: !!data.privacy.acceptParcel,
    },
    {
      value: data.privacy.petsAllowed ? "Yes" : "No",
      key: "Pets allowed",
      show: !!data.privacy.petsAllowed,
    },
  ];

  return (
    <>
      <div className="cards shadow border-r1">
        <div className="d-flex justify-content-between">
          <ProfileDetails
            created={data.created}
            displayName={data.displayName}
            photoURL={data.photoURL}
          />
          <Cost cost={`${data.cost}`} title="cost" />
        </div>
        <div className="d-flex align-items-center gap-1 d-flex justify-content-end">
          {!!data.passengerSeats && (
            <>
              <span className="text-4 fw-bold">Seats left</span>
              <span className="text-1-5 highlight-color">
                {data.passengerSeats - data.passengerUids.length}/
                {data.passengerSeats}
              </span>
            </>
          )}
        </div>
        <span className={`${status[data.status].color} fw-bold text-3`}>
          {status[data.status].status}
        </span>
        <Timeline
          startTime={data.departTime}
          endPoint={data.arriveAt}
          endTime={data.arriveTime}
          startPoint={data.departFrom}
          stoppage={data.stoppages}
          commute="car"
        />
        <br />
        <span className="fw-bold text-4">ADDITIONAL INFORMATION</span>
        <div className="d-flex gap-2 flex-wrap mb-2">
          {additionalInformation.map((info) => {
            return (
              <React.Fragment key={info.key}>
                {info.show && (
                  <AdditionalInfoBox title={info.key} value={info.value} />
                )}
              </React.Fragment>
            );
          })}
        </div>
        {requestRideOnClick && !isBelongToCurrentUser && (
          <ContactAndButton
            buttonText={isCurrUserAccepted ? "Accepted" : "Request ride"}
            messanger={data.privacy.showContact ? data.contact.messanger : ""}
            text={data.privacy.showContact ? data.contact.text : ""}
            whatsapp={data.privacy.showContact ? data.contact.whatsapp : ""}
            onClick={() => {
              if (!isCurrUserAccepted) {
                requestRideOnClick(`${data.authorId}_${data.rideTicektId}`);
              } else {
              }
            }}
          />
        )}
        <div className="mt-2"></div>
        {requestRideOnClick && (
          <OutlinedButton
            onClick={() => navigate(`/review-ride/${data.rideTicektId}`)}
            title="Visit"
          />
        )}
      </div>
    </>
  );
}
