import React from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth, Timestamp } from "../../service/firebase/firebaseConfig";
import { capitalizeFirstLetter } from "../../service/helperFunctions/captalizeFirstLetter";
import {
  firebaseTimestampToString,
  firebaseTimestampToTime,
} from "../../service/helperFunctions/firebaseTimestampToString";
import { MarketPlaceDB } from "../../types/marketPlace";
import ContactRow from "../cards/cars/ContactRow";
import Cost from "../cards/cars/Cost";
import Timeline from "../cards/cars/Timeline";
import { NameAndCreated } from "./NameAndCreated";

export default function TimelineCardMarket({
  data,
  setCommuteOffer,
}: {
  data: MarketPlaceDB;
  setCommuteOffer: Function | undefined;
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
      <div className="w-100 h-100 position-absolute p-2 ps-4 d-flex flex-column gap-2 align-items-start">
        <div className="d-flex align-items-center justify-content-between w-100 ps-1">
          <NameAndCreated
            date={data.created}
            name={data.authorName.split(" ")[0]}
          />
          <Cost cost={data.price.toString()} title="" />
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
