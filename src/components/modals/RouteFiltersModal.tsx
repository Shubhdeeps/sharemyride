import { useState, useRef } from "react";
import { localization } from "../../service/languages/languages";
import InputDropDown from "../inputFields/InputDropDown";
import InputTextFieldSecondary from "../inputFields/InputTextFieldSecondary";
import OutlinedButton from "../inputFields/OutlinedButton";
import ModalWrapper from "./ModalWrapper";

export default function RouteFiltersModal({
  onClick,
  handleClear,
  defaultCountry,
  startPoint,
}: {
  onClick: Function;
  handleClear: Function;
  defaultCountry: string;
  startPoint: string;
}) {
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const city1Ref = useRef(startPoint);
  return (
    <ModalWrapper>
      <span className="text-3 fw-bold">
        {localization["Choose a country and cities"]}
      </span>
      <br />
      <div className="d-flex flex-column gap-3 ">
        <InputDropDown
          currValue={selectedCountry}
          setValue={(val: string) => setSelectedCountry(val)}
        />
        {selectedCountry && (
          <InputTextFieldSecondary
            placeholder="Tallinn"
            textRef={city1Ref}
            title="Departure Point"
            type="text"
          />
        )}

        <OutlinedButton
          onClick={() => onClick(selectedCountry, city1Ref.current)}
          title="Apply"
        />
        <OutlinedButton onClick={() => handleClear()} title="Clear" />
      </div>
    </ModalWrapper>
  );
}
