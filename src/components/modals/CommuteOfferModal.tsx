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
  const offerPriceRef = useRef(0);
  const [status, setStatus] = useState("pending");
  const handlePurchase = () => {
    createCommuteOffer(
      commuteId,
      offerPriceRef.current,
      additionalInfoRef.current,
      setStatus
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
            <TimeHeader time="New Offer" />
            <InputTextFieldSecondary
              placeholder="Tallinn"
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