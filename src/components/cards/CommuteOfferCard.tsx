import React, { useState } from "react";
import { auth } from "../../service/firebase/firebaseConfig";
import { acceptOfferAndSetSold } from "../../service/firebase/marketPlace";
import { capitalizeFirstLetter } from "../../service/helperFunctions/captalizeFirstLetter";
import { CommuteOffer } from "../../types/marketPlace";
import ContactRow from "./cars/ContactRow";
import Cost from "./cars/Cost";
import ProfileDetails from "./cars/ProfileDetails";

export default function CommuteOfferCard({
  data,
  ownerAutorId,
}: {
  data: CommuteOffer;
  ownerAutorId: string;
}) {
  const [state, setStatus] = useState(data.status);
  const isCurrUserTheOwnerOfAd = ownerAutorId === auth.currentUser?.uid;

  const handleOfferResult = (status: "rejected" | "accepted") => {
    setStatus(status);
    acceptOfferAndSetSold(data.offerId, status);
  };
  return (
    <div className="d-flex flex-column gap-2 p-3 shadow border-r1">
      <div className="d-flex justify-content-between align-items-start">
        <ProfileDetails
          created={data.created}
          displayName={data.displayName.split(" ")[0]}
          photoURL={`https://api.dicebear.com/5.x/thumbs/svg?seed=${
            data.displayName.split(" ")[0]
          }`}
        />
        <Cost cost={data.offeredPrice.toString()} title="Offered Price" />
      </div>
      {data.additionalInfo && (
        <span className="text-4 fw-bold">{data.additionalInfo}</span>
      )}
      <ContactRow
        messanger={data.contact.messenger}
        text={data.contact.text}
        whatsapp={data.contact.whatsapp}
      />
      {isCurrUserTheOwnerOfAd && state === "pending" ? (
        <div className="d-flex align-items-center gap-2">
          <button onClick={() => handleOfferResult("rejected")}>Reject</button>
          <button onClick={() => handleOfferResult("accepted")}>Accept</button>
        </div>
      ) : (
        <span className="text-center w-50 p-2 ps-3 pe-3 border-r1 button-color fontLight">
          {capitalizeFirstLetter(state)}
        </span>
      )}
    </div>
  );
}
