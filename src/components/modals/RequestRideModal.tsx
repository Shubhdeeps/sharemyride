import React, { useRef, useState } from "react";
import { requestToJoinTheRide } from "../../service/firebase/collectionOperations";
import { localization } from "../../service/languages/languages";
import { Contact } from "../../types/Requst.modal";
import Error from "../error/Error";
import FilledButton from "../inputFields/FIlledButton";
import InputTextFieldSecondary from "../inputFields/InputTextFieldSecondary";
import OutlinedButton from "../inputFields/OutlinedButton";
import Loader from "../loader";
import ModalWrapper from "./ModalWrapper";

export default function RequestModal({
  setRequestRideFlex,
  rideTicketId,
  role,
}: {
  setRequestRideFlex: Function;
  rideTicketId: string;
  role: "passenger" | "ride" | "ticket";
}) {
  const additionalInfoRef = useRef(
    localization["Hello, I would like to join."]
  );
  const messangerRef = useRef("");
  const textRef = useRef("");
  const whatsappRef = useRef("");
  const [status, setStatus] = useState("pending");
  const handleCloseTicket = () => {
    setRequestRideFlex("");
  };
  const handleRequest = () => {
    const contact: Contact = {
      messanger: messangerRef.current,
      text: textRef.current,
      whatsapp: whatsappRef.current,
    };
    const ids = rideTicketId.split("_");

    //new request
    requestToJoinTheRide(
      ids[1],
      additionalInfoRef.current,
      setStatus,
      contact,
      ids[0],
      role
    );
  };
  return (
    <ModalWrapper>
      <div style={{ width: "300px" }}>
        {status === "loading" && <Loader />}
        {status === "error" && (
          <Error
            errMessage={"Failed to make a request, please try again later!"}
          />
        )}
        {status === "success" && (
          <>
            <div className="text-3 fw-bold text-center">
              {localization["Request sent successfully"]}.
            </div>
            <br />
            <OutlinedButton title="Close" onClick={() => handleCloseTicket()} />
          </>
        )}
        {status === "pending" && (
          <>
            <span className="text-3 fw-bold">
              {localization["Request ride"]}
            </span>
            <br />
            <span className="text-5">
              {localization["ADDITIONAL INFORMATION"]}
            </span>
            <InputTextFieldSecondary
              placeholder="Ride description"
              title=""
              type="text"
              textRef={additionalInfoRef}
            />
            <span className="text-5">{localization["CONTACT DETAILS"]}</span>
            <InputTextFieldSecondary
              placeholder="Messanger"
              title=""
              type="text"
              textRef={messangerRef}
            />
            <InputTextFieldSecondary
              placeholder="Phone Number"
              title=""
              type="text"
              textRef={textRef}
            />
            <InputTextFieldSecondary
              placeholder="WhatsApp"
              title=""
              type="text"
              textRef={whatsappRef}
            />
            <br />
            <div className="d-flex align-items-center gap-2">
              <OutlinedButton
                title="Cancel"
                onClick={() => handleCloseTicket()}
              />
              <FilledButton title="Request" onClick={() => handleRequest()} />
            </div>
          </>
        )}
      </div>
    </ModalWrapper>
  );
}
