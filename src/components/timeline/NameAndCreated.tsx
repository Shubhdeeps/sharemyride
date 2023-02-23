import { Timestamp } from "../../service/firebase/firebaseConfig";
import { capitalizeFirstLetter } from "../../service/helperFunctions/captalizeFirstLetter";
import { firebaseTimestampToString } from "../../service/helperFunctions/firebaseTimestampToString";

export const NameAndCreated = ({
  name,
  date,
}: {
  name: string;
  date: typeof Timestamp;
}) => {
  return (
    <div className="d-flex flex-column align-items-start">
      <span className="text-2-5 fw-bold">{capitalizeFirstLetter(name)}</span>
      <span style={{ marginTop: "-8px" }} className="text-4">
        {firebaseTimestampToString(date)}
      </span>
    </div>
  );
};
