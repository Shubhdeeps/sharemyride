import React from "react";
import ContactAndButton from "./cars/ContactAndButton";
import Cost from "./cars/Cost";
import ProfileDetails from "./cars/ProfileDetails";
import Timeline from "./cars/Timeline";

const data = {
  cost: "$15",
  totalSeats: 4,
  seatsOccupied: ["UserID1", "UserId2"],
  additionalInfo:
    "Hello, I would like to travel from to and fro from tln to tartu and back home later",
  contactInfo: {
    whatsapp: "+9199930030",
    messanger: "shubhdeeps",
    text: undefined,
    buttonText: "Ask to join",
  },
};

export default function PassengerCard() {
  return (
    <div className="cards shadow border-r1">
      <div className="d-flex justify-content-between">
        {/* <ProfileDetails /> */}
        <Cost cost={data.cost} />
      </div>
      {/* <Timeline /> */}
      <br />
      <span className="fw-bold text-4">ADDITIONAL INFORMATION</span>
      <div className="d-flex gap-2 flex-wrap">{data.additionalInfo}</div>
      <br />
      {/* <ContactAndButton
        buttonText={data.contactInfo.buttonText}
        messanger={data.contactInfo.messanger}
        text={data.contactInfo.text}
        whatsapp={data.contactInfo.whatsapp}
      /> */}
    </div>
  );
}
