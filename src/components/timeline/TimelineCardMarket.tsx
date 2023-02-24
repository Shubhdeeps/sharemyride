import React from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../../service/firebase/firebaseConfig";
import { firebaseTimestampToTime } from "../../service/helperFunctions/firebaseTimestampToString";
import { MarketPlaceDB } from "../../types/marketPlace";
import ContactRow from "../cards/cars/ContactRow";
import Cost from "../cards/cars/Cost";
import Timeline from "../cards/cars/Timeline";
import Extension from "../navigationBars/Extension";
import { NameAndCreated } from "./NameAndCreated";

const status = {
  Onsale: {
    color: "font-safe",
    status: "ON SALE",
  },
  Sold: {
    color: "font-safe",
    status: "SOLD",
  },
  cancelled: {
    color: "font-danger",
    status: "SALE CANCELLED",
  },
};
export default function TimelineCardMarket({
  data,
  setCommuteOffer,
  setRidePop,
}: {
  data: MarketPlaceDB;
  setCommuteOffer: Function | undefined;
  setRidePop: Function;
}) {
  const isBelongToCurrentUser = data.authorId === auth.currentUser?.uid;
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
    <div className="secondary-bg timelinecard-market position-relative">
      <div className="card-time fw-bold fontPrimary">
        <div className="d-flex flex-column align-items-start">
          {firebaseTimestampToTime(data.startTime)}
          <span className="text-4 fw-bold mt--10">
            {data.commute.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="card-ring">
        <Image
          className="border-r3"
          fluid
          src={`https://api.dicebear.com/5.x/thumbs/svg?seed=${
            data.authorName.split(" ")[0]
          }`}
        />
      </div>
      <div className="p-2 ps-4 d-flex flex-column gap-2 align-items-start">
        <div className="d-flex align-items-center justify-content-between w-100 ps-1">
          <NameAndCreated
            date={data.created}
            name={data.authorName.split(" ")[0]}
          />
          <div className="d-flex gap-2">
            <Cost cost={data.price.toString()} title="" />
            {isBelongToCurrentUser && (
              <Extension>
                <div
                  onClick={() => setRidePop(data.commuteId)}
                  className="cursor font-danger text-center width-100"
                >
                  Delete ad.
                </div>
              </Extension>
            )}
          </div>
        </div>
        <div style={{ marginTop: "-25px" }}>
          <Timeline
            startTime={[data.startTime]}
            endPoint={data.endPoint}
            endTime={[data.endTime]}
            startPoint={data.endPoint}
            stoppage={[""]}
            commute={data.commute}
          />
        </div>
        {isBelongToCurrentUser && (
          <div className={`${status[data.status].color} fw-bold text-3`}>
            {status[data.status].status}
          </div>
        )}
        <div className="d-flex align-items-center gap-3">
          {isBelongToCurrentUser ? (
            <button className="p-2 ps-3 pe-3" onClick={() => handleVisit()}>
              Visit
            </button>
          ) : (
            <>
              <button className="p-2 ps-3 pe-3" onClick={handleBuy}>
                Buy
              </button>
              <ContactRow
                messanger={data.messenger}
                text={data.text}
                whatsapp={data.whatsapp}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
