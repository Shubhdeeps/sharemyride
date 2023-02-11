import React from "react";
import { CommuteOffer } from "../../types/marketPlace";
import Cost from "./cars/Cost";
import ProfileDetails from "./cars/ProfileDetails";

export default function CommuteOfferCard({ data }: { data: CommuteOffer }) {
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
    </div>
  );
}
