import React from "react";
import InputTextFieldSecondary from "../inputFields/InputTextFieldSecondary";
import OutlinedButton from "../inputFields/OutlinedButton";
import ModalWrapper from "./ModalWrapper";

export default function RouteFiltersModal({
  countryRef,
  onClick,
  handleClear,
}: {
  countryRef: React.MutableRefObject<string>;
  onClick: Function;
  handleClear: Function;
}) {
  return (
    <ModalWrapper>
      <span className="text-3 fw-bold">Apply filter</span>
      <br />
      <div className="d-flex flex-column gap-3 ">
        <InputTextFieldSecondary
          placeholder="Estonia"
          title="Country"
          type="text"
          textRef={countryRef}
        />
        <OutlinedButton onClick={() => onClick()} title="Apply" />
        <OutlinedButton onClick={() => handleClear()} title="Clear" />
      </div>
    </ModalWrapper>
  );
}
