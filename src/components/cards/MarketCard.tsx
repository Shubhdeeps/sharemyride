import { MarketPlaceDB } from "../../types/marketPlace";
import Cost from "./cars/Cost";
import ProfileDetails from "./cars/ProfileDetails";
import Timeline from "./cars/Timeline";
// { data }: { data: MarketPlace }

export default function MarketCard({ data }: { data: MarketPlaceDB }) {
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
    </div>
  );
}
