import React, { useRef, useState } from "react";
import { createCommuteOffer } from "../../service/firebase/marketPlace";
import Error from "../error/Error";
import TimeHeader from "../headers/TimeHeader";
import FilledButton from "../inputFields/FIlledButton";
import InputTextFieldSecondary from "../inputFields/InputTextFieldSecondary";
import OutlinedButton from "../inputFields/OutlinedButton";
import Loader from "../loader";
import ModalWrapper from "./ModalWrapper";

export default function CreateCommuteOfferModal({
  commuteId,
  setModalFlex,
}: {
  commuteId: string;
  setModalFlex: Function;
}) {
  const additionalInfoRef = useRef("");
  const messangerRef = useRef("");
  const textRef = useRef("");
  const whatsappRef = useRef("");
  const offerPriceRef = useRef(0);
  const [status, setStatus] = useState("pending");
  const handlePurchase = () => {
    const contact = {
      messenger: messangerRef.current,
      text: textRef.current,
      whatsapp: whatsappRef.current,
    };
    createCommuteOffer(
      commuteId,
      offerPriceRef.current,
      additionalInfoRef.current,
      setStatus,
      contact
    );
  };

  const setModelPopUp = () => {
    setModalFlex("");
  };

  return (
    <ModalWrapper>
      <div style={{ minWidth: "300px" }}>
        {status === "pending" ? (
          <div className="d-flex flex-column gap-3">
            <span className="fw-bold text-4">BUY</span>
            <InputTextFieldSecondary
              placeholder="$"
              title="Offer price"
              type="number"
              textRef={offerPriceRef}
            />
            <InputTextFieldSecondary
              placeholder="additional information"
              title="Additional Information"
              type="text"
              textRef={additionalInfoRef}
            />
            <InputTextFieldSecondary
              placeholder="john_simon"
              title="Messenger"
              type="text"
              textRef={messangerRef}
            />
            <InputTextFieldSecondary
              placeholder="+372 0330-0002"
              title="Text"
              type="text"
              textRef={textRef}
            />
            <InputTextFieldSecondary
              placeholder="+372 0330-0002"
              title="WhatsApp"
              type="text"
              textRef={whatsappRef}
            />
            <FilledButton title="Set Offer" onClick={() => handlePurchase()} />
            <OutlinedButton title="Cancel" onClick={() => setModelPopUp()} />
          </div>
        ) : (
          <>
            {status === "loading" && <Loader />}
            {status === "success" && (
              <div className="d-flex flex-column gap-3 text-center fw-bold">
                <span className="text-3">Offer has been made successfully</span>
                <OutlinedButton title="Close" onClick={() => setModelPopUp()} />
              </div>
            )}
            {status === "error" && (
              <Error errMessage="Something went wrong, please try again later!" />
            )}
          </>
        )}
      </div>
    </ModalWrapper>
  );
}
