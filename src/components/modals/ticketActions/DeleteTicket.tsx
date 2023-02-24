import React, { useState } from "react";
import { deleteMyAd } from "../../../service/firebase/marketPlace";
import { canclePassengerTrip } from "../../../service/firebase/passenger";
import { cancleMyRde } from "../../../service/firebase/rides";
import Loader from "../../loader";

const roles = {
  ride: "Confirm cancel ride",
  passenger: "Confirm cancel trip",
  market: "Confirm delete advertisement",
};
export default function DeleteTicket({
  ticketId,
  setAction,
  role,
}: {
  ticketId: string;
  setAction: Function;
  role: "ride" | "passenger" | "market";
}) {
  const [loading, setLoading] = useState(false);
  const handleClose = () => setAction(null);
  const handleDeleteRide = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (role === "ride") {
      await cancleMyRde(ticketId);
    } else if (role === "passenger") {
      await canclePassengerTrip(ticketId);
    } else if (role === "market") {
      await deleteMyAd(ticketId);
    }
    setLoading(false);
    handleClose();
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <form
      onSubmit={(e) => handleDeleteRide(e)}
      className="d-flex flex-column gap-2"
    >
      <span>{roles[role]}</span>
      <div className="d-flex gap-2 justify-content-end">
        <button type="button" onClick={handleClose}>
          Close
        </button>
        <button type="submit">Confirm</button>
      </div>
    </form>
  );
}
