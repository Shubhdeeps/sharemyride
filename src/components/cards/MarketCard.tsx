import { useNavigate } from "react-router-dom";
import { auth } from "../../service/firebase/firebaseConfig";
import { MarketPlaceDB } from "../../types/marketPlace";
import OutlinedButton from "../inputFields/OutlinedButton";
import ContactAndButton from "./cars/ContactAndButton";
import Cost from "./cars/Cost";
import ProfileDetails from "./cars/ProfileDetails";
import Timeline from "./cars/Timeline";
// { data }: { data: MarketPlace }

export default function MarketCard({
  data,
  setCommuteOffer,
}: {
  data: MarketPlaceDB;
  setCommuteOffer: Function | undefined;
}) {
  const currUserId = auth.currentUser?.uid as string;
  const navigate = useNavigate();
  const handleVisit = () => {
    navigate(`/review-ticket/${data.commuteId}`);
  };
  const handleBuy = () => {
    if (setCommuteOffer) {
      setCommuteOffer(data.commuteId);
    }
  };
  return (
    <div className="market-card shadow border-r1 p-3 d-flex flex-column gap-2">
      <div className="d-flex justify-content-between align-items-start">
        <ProfileDetails
          created={data.created}
          displayName={data.authorName.split(" ")[0]}
          photoURL={`https://api.dicebear.com/5.x/thumbs/svg?seed=${
            data.authorName.split(" ")[0]
          }`}
        />
        <div className="d-flex flex-column align-items-end">
          <span className="text-4 fw-bold">{data.commute.toUpperCase()}</span>
          <Cost cost={`${data.price}`} title="Price" />
        </div>
      </div>
      <Timeline
        startTime={[data.startTime]}
        endPoint={data.endPoint}
        endTime={[data.endTime]}
        startPoint={data.endPoint}
        stoppage={[""]}
        commute={data.commute}
      />
      {data.authorId !== currUserId && (
        <ContactAndButton
          buttonText="Request to buy"
          messanger={data.messenger}
          onClick={handleBuy}
          text={data.text}
          whatsapp={data.whatsapp}
        />
      )}
      {data.authorId === currUserId && (
        <OutlinedButton onClick={handleVisit} title="Visit" />
      )}
    </div>
  );
}
