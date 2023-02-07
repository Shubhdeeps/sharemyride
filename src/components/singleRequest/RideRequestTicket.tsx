import React from "react";
import ContactRow from "../cards/cars/ContactRow";
import ProfileDetails from "../cards/cars/ProfileDetails";
import FilledButton from "../inputFields/FIlledButton";
import OutlinedButton from "../inputFields/OutlinedButton";

type Props = {
  whatsapp: string;
  messenger: string;
  text: string;
  additionalInfo: string;
};
export default function RideRequestTicket({ data }: { data: Props }) {
  return (
    <div className="mt-1 border-r1 shadow p-3 d-flex flex-column align-items-start">
      {/* <ProfileDetails /> */}
      <span className="text-3">Requested to join the ride</span>
      {!!data.additionalInfo && (
        <>
          <span className="text-4 mt-2">ADDITIONAL INFORMATION</span>
          <span className="mb-2 ps-2 pe-2">{data.additionalInfo}</span>
        </>
      )}
      <div className="w-100">
        <ContactRow
          messanger={data.messenger}
          text={data.text}
          whatsapp={data.whatsapp}
        />
      </div>
      <div className="d-flex gap-2 align-items-center w-100 mt-2">
        <OutlinedButton
          title="Reject"
          onClick={() => console.log("Cancelling")}
        />
        <FilledButton
          title="Accept"
          onClick={() => console.log("Cancelling")}
        />
      </div>
    </div>
  );
}
