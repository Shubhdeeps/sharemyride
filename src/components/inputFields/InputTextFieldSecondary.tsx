import React, { useState } from "react";
import { localization } from "../../service/languages/languages";

const titles = [
  "Ariving City*",
  "Offer price",
  "Additional Information",
  "Messenger",
  "Text",
  "WhatsApp",
  "Depart city*",
  "Country*",
  "",
  "Departure Point",
  "Comment",
  "Ticket price*",
  "Messanger Username",
  "WhatsApp Number",
  "Text Message",
  "Details",
  "Offered price*",
  "Number of Passengers*",
  "Cost*",
  "Seats offering (minimum 1)",
];
const placeholders = [
  "Tartu",
  "$",
  "additional information",
  "john_simon",
  "+372 0330-0002",
  "Tallinn",
  "Estonia",
  "Ride description",
  "Messanger",
  "Phone Number",
  "WhatsApp",
  "john01",
  "+372 3994 ....",
  "The ticket is from Tart",
  "",
  "$15",
  "I would like to travel back too...",
  "Passenger seats",
];

type Props = {
  placeholder:
    | "Tartu"
    | "$"
    | "additional information"
    | "john_simon"
    | "+372 0330-0002"
    | "Tallinn"
    | "Estonia"
    | "Ride description"
    | "Messanger"
    | "Phone Number"
    | "WhatsApp"
    | "john01"
    | "+372 3994 ...."
    | "The ticket is from Tart"
    | ""
    | "$15"
    | "I would like to travel back too..."
    | "Passenger seats"
    | "report"
    | "RANDOM";
  type: string;
  title:
    | "Ariving City*"
    | "Offer price"
    | "Additional Information"
    | "Messenger"
    | "Text"
    | "WhatsApp"
    | "Depart city*"
    | "Country*"
    | ""
    | "Departure Point"
    | "Comment"
    | "Ticket price*"
    | "Messanger Username"
    | "WhatsApp Number"
    | "Text Message"
    | "Details"
    | "Offered price*"
    | "Number of Passengers*"
    | "Cost*"
    | "Seats offering (minimum 1)"
    | "RANDOM";
  textRef: React.MutableRefObject<string | number | Date | null>;
};
export default function InputTextFieldSecondary(props: Props) {
  const title =
    titles.includes(props.title) && props.title !== "RANDOM"
      ? localization[props.title]
      : props.title;
  const placeholder =
    titles.includes(props.title) && props.placeholder !== "RANDOM"
      ? localization[props.placeholder]
      : props.title;

  const [value, setValue] = useState<any>(props.textRef.current);
  const handleChange = (CurrValue: any) => {
    setValue(CurrValue);
    props.textRef.current = CurrValue;
  };
  return (
    <div className="d-flex flex-column align-items-start fontPrimary gap-1">
      <span className="text-3">{title}</span>
      <div className="border-r1 w-100 p-2 ps-3 textField2">
        <input
          className="fontPrimary"
          autoComplete="new-password"
          value={value}
          type={props.type}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          min={0}
        />
      </div>
    </div>
  );
}
