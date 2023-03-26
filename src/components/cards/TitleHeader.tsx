import React from "react";
import { localization } from "../../service/languages/languages";

type Headings =
  | "Expore routes"
  | "Favourite routes"
  | "Traffic Alerts and General News"
  | "Feedback or Report an issue"
  | "Buy and Sell Bus/Train tickets"
  | "On sale"
  | "Offers"
  | "My Schedule"
  | "Requests";

export default function TitleHeader({ heading }: { heading: Headings }) {
  return (
    <div className="w-100 primary-bg p-2 border-r3 ps-4 fontLight">
      {localization[heading]}
    </div>
  );
}
