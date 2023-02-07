import React, { useRef } from "react";
import { requestToJoinTheRide } from "../../service/collectionOperations";
import FilledButton from "../inputFields/FIlledButton";
import InputTextFieldSecondary from "../inputFields/InputTextFieldSecondary";
import OutlinedButton from "../inputFields/OutlinedButton";
import ModalWrapper from "./ModalWrapper";

export default function RequestModal({
  setRequestRideFlex,
  rideTicketId,
}: {
  setRequestRideFlex: Function;
  rideTicketId: string;
}) {
  const additionalInfoRef = useRef("");
  const handleCloseTicket = () => {
    setRequestRideFlex("");
  };
  const handleRequest = () => {
    //new request
    requestToJoinTheRide(rideTicketId, additionalInfoRef.current);
    handleCloseTicket();
  };
  return (
    <ModalWrapper>
      <span className="text-3 fw-bold">Request ride</span>
      <br />
      <span className="text-5">ADDITIONAL INFORMATION</span>
      <InputTextFieldSecondary
        placeholder="Ride description"
        title=""
        type="text"
        textRef={additionalInfoRef}
      />
      <br />
      <div className="d-flex align-items-center gap-2">
        <OutlinedButton title="Cancel" onClick={() => handleCloseTicket()} />
        <FilledButton title="Request" onClick={() => handleRequest()} />
      </div>
    </ModalWrapper>
  );
}
