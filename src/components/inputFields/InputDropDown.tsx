import React from "react";
import { countries } from "../../service/helperFunctions/countries";

type Props = {
  currValue: string;
  setValue: Function;
};
export default function InputDropDown(data: Props) {
  const handleChange = (value: string) => {
    data.setValue(value);
  };
  return (
    <select
      value={data.currValue}
      onChange={(e) => handleChange(e.currentTarget.value)}
    >
      {countries.map((country) => {
        return (
          <option key={country.code} value={country.name}>
            {country.name}
          </option>
        );
      })}
    </select>
  );
}
