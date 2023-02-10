import React, { useState } from "react";
import { requestIdUpdateStatus } from "../../service/firebase/collectionOperations";
import { auth } from "../../service/firebase/firebaseConfig";
import { RequestsDB } from "../../types/Requst.modal";
import ContactRow from "../cards/cars/ContactRow";
import ProfileDetails from "../cards/cars/ProfileDetails";
import FilledButton from "../inputFields/FIlledButton";
import OutlinedButton from "../inputFields/OutlinedButton";
import Loader from "../loader";

export default function RideRequestTicket({
  data,
  rideOwner,
  role,
}: {
  data: RequestsDB;
  rideOwner: string;
  role: "passenger" | "ride" | "ticket";
}) {
  const isViewerRideOwner = rideOwner === auth.currentUser?.uid;
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(data.status);

  if (loading) {
    return (
      <div className="mt-1 border-r1 shadow p-3 d-flex flex-column align-items-start">
        <Loader />
      </div>
    );
  }
  return (
    <div className="mt-1 border-r1 shadow p-3 d-flex flex-column align-items-start">
      <ProfileDetails
        displayName={data.displayName}
        photoURL={data.photoURL}
        created={data.created}
      />
      {!!data.description && (
        <>
          <span className="text-4 mt-2">ADDITIONAL INFORMATION</span>
          <span className="mb-2 ps-2 pe-2">{data.description}</span>
        </>
      )}
      <div className="w-100">
        <ContactRow
          messanger={data.contact.messanger}
          text={data.contact.text}
          whatsapp={data.contact.whatsapp}
        />
      </div>
      <div className="d-flex gap-2 align-items-center w-100 mt-2">
        {status === "pending" && isViewerRideOwner ? (
          <>
            <OutlinedButton
              title="Reject"
              onClick={() => {
                setStatus("rejected");
                requestIdUpdateStatus(
                  data.uid,
                  data.rideId,
                  "rejected",
                  setLoading,
                  role
                );
              }}
            />
            <FilledButton
              title="Accept"
              onClick={() => {
                setStatus("accepted");
                requestIdUpdateStatus(
                  data.uid,
                  data.rideId,
                  "accepted",
                  setLoading,
                  role
                );
              }}
            />
          </>
        ) : (
          <span className="noselect p-2 ps-3 pe-3 highlight fontLight border-r1">
            {status.toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
}
