import { Timestamp } from "../../service/firebase/firebaseConfig";
import { firebaseTimestampToDateString } from "../../service/helperFunctions/firebaseTimestampToString";

export const DateHeader = ({ date }: { date: typeof Timestamp }) => {
  return (
    <span className="p-2 text-center primary-bg border-r3 fontLight date-stamp">
      {firebaseTimestampToDateString(date)}
    </span>
  );
};
