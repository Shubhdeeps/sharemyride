import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../service/firebase/firebaseConfig";
import { PassengerDB } from "../../types/passenger.model";
import OutlinedButton from "../inputFields/OutlinedButton";
import { AdditionalInfoBox } from "./AdditionalInfoBlock";
import ContactAndButton from "./cars/ContactAndButton";
import Cost from "./cars/Cost";
import ProfileDetails from "./cars/ProfileDetails";
import Timeline from "./cars/Timeline";

type Props = {
  data: PassengerDB;
  requestRideOnClick: Function | undefined;
};
export default function PassengerCard({ data, requestRideOnClick }: Props) {
  const navigate = useNavigate();
  const isBelongToCurrentUser = data.authorId === auth.currentUser?.uid;

  const additionalInformation = [
    {
      value: data.privacy.EVCar ? "Yes" : "No",
      key: "Prefer Electric Vehical?",
      show: !!data.privacy.EVCar,
    },
    {
      value: data.additionalInfo.carryingLuggage,
      key: "Luggage",
      show: !!data.additionalInfo.carryingLuggage,
    },
    {
      value: data.additionalInfo.eventName,
      key: "Going to event?",
      show: !!data.additionalInfo.eventName,
    },
    // {
    //   value: data.additionalInfo.passengerCount,
    //   key: "Passenger count",
    //   show: !!,
    // },
    {
      value: data.privacy.requestDoorToDoor ? "Yes" : "No",
      key: "Requested for door to door pickup and dropoff",
      show: !!data.privacy.requestDoorToDoor,
    },
    {
      value: data.privacy.petsAllowed ? "Yes" : "No",
      key: "Travelling with pets",
      show: !!data.privacy.petsAllowed,
    },
  ];
  return (
    <div className="cards shadow border-r1">
      <div className="d-flex justify-content-between">
        <ProfileDetails
          created={data.created}
          displayName={data.displayName}
          photoURL={data.photoURL}
        />
        <div className="d-flex flex-column gap-1  align-items-end">
          <Cost cost={`${data.cost}`} title="cost" />
          <Cost
            cost={`${data.additionalInfo.passengerCount}`}
            title="passengers"
          />
        </div>
      </div>
      <Timeline
        startPoint={data.departFrom}
        endPoint={data.arriveAt}
        endTime={[data.actualEndTime]}
        startTime={[data.actualStartTime]}
        stoppage={[]}
      />
      <br />
      <span className="fw-bold text-4">ADDITIONAL INFORMATION</span>
      <div className="d-flex gap-2 flex-wrap">
        {additionalInformation.map((info) => {
          return (
            <React.Fragment key={info.key}>
              {info.show && (
                <AdditionalInfoBox title={info.key} value={`${info.value}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="d-flex gap-2 flex-wrap mb-2">
        {data.additionalInfo.details}
      </div>
      {requestRideOnClick && !isBelongToCurrentUser && (
        <ContactAndButton
          buttonText={"Request to join"}
          messanger={data.privacy.showContact ? data.contact.messanger : ""}
          text={data.privacy.showContact ? data.contact.text : ""}
          whatsapp={data.privacy.showContact ? data.contact.whatsapp : ""}
          onClick={() =>
            requestRideOnClick(`${data.authorId}_${data.passengerTicektId}`)
          }
        />
      )}
      <div className="mt-2"></div>

      {requestRideOnClick && (
        <OutlinedButton
          onClick={() =>
            navigate(`/review-passenger/${data.passengerTicektId}`)
          }
          title="Visit"
        />
      )}
    </div>
  );
}
