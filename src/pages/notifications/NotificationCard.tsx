import { useNavigate } from "react-router-dom";
import ProfileDetails from "../../components/cards/cars/ProfileDetails";
import { capitalizeFirstLetter } from "../../service/helperFunctions/captalizeFirstLetter";
import { NotificationDB } from "../../types/notification.model";

export const NotificationCard = ({ data }: { data: NotificationDB }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/review-${data.parent}/${data.postId}`);
  };
  return (
    <div
      onClick={() => handleRedirect()}
      className="border-bottom noselect cursor p-2 d-flex flex-column align-items-start gap-2 w-100"
    >
      <div className="d-flex justify-content-between align-items-start w-100">
        <ProfileDetails
          created={data.created}
          displayName={data.displayName.split(" ")[0]}
          photoURL={data.photoURL}
        />
        <span className="text-3 fw-bold">
          {capitalizeFirstLetter(data.parent)}
        </span>
      </div>
      <span className="text-3">{data.content}</span>
    </div>
  );
};
