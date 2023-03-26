import React, { useEffect, useRef, useState } from "react";
import { createRouteTile } from "../../service/firebase/collectionOperations";
import { localization } from "../../service/languages/languages";
import FilledButton from "../inputFields/FIlledButton";
import InputTextFieldSecondary from "../inputFields/InputTextFieldSecondary";
import OutlinedButton from "../inputFields/OutlinedButton";
import Loader from "../loader";
import ModalWrapper from "./ModalWrapper";

type Props = {
  setModelPopUp: Function;
};
export default function NewRouteModal({ setModelPopUp }: Props) {
  const departCity = useRef("");
  const arriveCity = useRef("");
  const countryRef = useRef("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddTicket = () => {
    if (!departCity.current || !arriveCity.current || !countryRef.current) {
      setError("All fields are required!");
      return;
    }
    createRouteTile(
      departCity.current,
      arriveCity.current,
      countryRef.current,
      setError,
      setLoading,
      setSuccess
    );
  };
  useEffect(() => {
    if (success) {
      setModelPopUp();
    }
  }, [setModelPopUp, success]);

  return (
    <ModalWrapper>
      <span className="text-3 fw-bold">{localization["Create new route"]}</span>
      <br />
      <div className="d-flex flex-column gap-3 ">
        <InputTextFieldSecondary
          placeholder="Tallinn"
          title="Depart city*"
          type="text"
          textRef={departCity}
        />
        <InputTextFieldSecondary
          placeholder="Tartu"
          title="Ariving City*"
          type="text"
          textRef={arriveCity}
        />
        <InputTextFieldSecondary
          placeholder="Estonia"
          title="Country*"
          type="text"
          textRef={countryRef}
        />
      </div>
      {error && <span className="text-danger text-3">{error}</span>}
      {loading && <Loader />}
      <br />
      <div className="d-flex align-items-center gap-2">
        <OutlinedButton title="Cancel" onClick={() => setModelPopUp()} />
        <FilledButton title="Add Route" onClick={() => handleAddTicket()} />
      </div>
    </ModalWrapper>
  );
}
