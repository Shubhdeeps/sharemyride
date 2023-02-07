import React from "react";
import CarsCard from "../../components/cards/CarsCard";
import TitleHeader from "../../components/cards/TitleHeader";
import RouteDetails from "../../components/route/RouteDetails";
import RideRequestTicket from "../../components/singleRequest/RideRequestTicket";

const requestData = {
  whatsapp: "string",
  messenger: "string",
  text: "string",
  additionalInfo:
    "Hello, I can pick you up from xyz Point. Contact me with followin number",
};

// page for comments in singel ride
export default function SingleRidePost() {
  return (
    <>
      <div className="empty-area">
        <RouteDetails />
      </div>
      <div className="filled-area container">
        <br />
        {/* <CarsCard /> */}
        <br />
        <TitleHeader heading="Requests" />
        <div className="d-flex flex-column gap-2 mt-2">
          <RideRequestTicket data={requestData} />
          <RideRequestTicket data={requestData} />
          <RideRequestTicket data={requestData} />
          <RideRequestTicket data={requestData} />
          <RideRequestTicket data={requestData} />
          <RideRequestTicket data={requestData} />
        </div>
        <br />
      </div>
    </>
  );
}
