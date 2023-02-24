import React, { useState } from "react";
import InputDropDown from "../inputFields/InputDropDown";
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
  const [selectedCountry, setSelectedCountry] = useState(countryRef.current);
  return (
    <ModalWrapper>
      <span className="text-3 fw-bold">Apply filter</span>
      <br />
      <div className="d-flex flex-column gap-3 ">
        <InputDropDown
          currValue={selectedCountry}
          setValue={(val: string) => {
            setSelectedCountry(val);
            countryRef.current = val;
          }}
        />
        <OutlinedButton onClick={() => onClick()} title="Apply" />
        <OutlinedButton onClick={() => handleClear()} title="Clear" />
      </div>
    </ModalWrapper>
  );
}
