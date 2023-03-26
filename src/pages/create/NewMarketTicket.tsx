import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Timeline from "../../components/cards/cars/Timeline";
import FilledButton from "../../components/inputFields/FIlledButton";
import InputTextFieldSecondary from "../../components/inputFields/InputTextFieldSecondary";
import InputTextFieldwitState from "../../components/inputFields/InputTextFieldwithState";
import { auth, timestamp } from "../../service/firebase/firebaseConfig";
import { setNewMarketSale } from "../../service/firebase/marketPlace";
import { localization } from "../../service/languages/languages";
import { MarketPlace } from "../../types/marketPlace";

export default function NewMarketTicket() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [departTime, setDepartTime] = useState("");
  const [arriveTime, setArriveTime] = useState("");

  const [departFrom, setDepartFrom] = useState("");
  const [arriveAt, setArriveAt] = useState("");
  const [country, setCountry] = useState("");

  const costRef = useRef(0);
  const messangerRef = useRef("");
  const whatsappRef = useRef("");
  const textRef = useRef("");
  const additionalData = useRef("");
  const [commute, setCommute] = useState<"bus" | "train">("bus");

  const handlePost = () => {
    if (
      !departTime ||
      !arriveTime ||
      !departFrom ||
      !arriveAt ||
      !costRef.current ||
      !country
    ) {
      setError("All fields with * are required!");
    }
    const data: MarketPlace = {
      commute: commute,
      endPoint: arriveAt,
      endTime: timestamp.fromMillis(+new Date(arriveTime)),
      startPoint: departFrom,
      startTime: timestamp.fromMillis(+new Date(departTime)),
      price: costRef.current,
      status: "Onsale",
      country,
      messenger: messangerRef.current,
      text: textRef.current,
      whatsapp: whatsappRef.current,
      authorId: auth.currentUser?.uid!,
    };
    setNewMarketSale(data);
    navigate("/market");
  };
  const handleCancel = () => {
    navigate("/market");
  };

  return (
    <>
      <div className="empty-area"></div>
      <div className="filled-area container noselect">
        <span className="text-2 fw-bold fontLigh">
          {localization["New Sale"]}
        </span>
        <Timeline
          endPoint={arriveAt}
          startPoint={departFrom}
          startTime={[timestamp.fromMillis(+new Date(departTime))]}
          endTime={[timestamp.fromMillis(+new Date(arriveTime))]}
          stoppage={[]}
          commute="car"
        />

        <br />
        <div className="d-flex flex-column gap-1">
          <span className="text-5 fontSecondary">{localization["TIME*"]}</span>

          <InputTextFieldwitState
            placeholder="14:00"
            setData={setDepartTime}
            title="Depart time*"
            type="datetime-local"
            isAnArray={false}
            currValue={departTime}
          />
          <InputTextFieldwitState
            placeholder="20:00"
            setData={setArriveTime}
            title="Arriving time*"
            type="datetime-local"
            isAnArray={false}
            currValue={arriveTime}
          />
        </div>
        <hr />
        <div className="d-flex flex-column gap-1">
          <span className="text-5 fontSecondary">
            {localization["TYPE OF TICKET*"]}
          </span>
          <div className="d-flex gap-2 noselect">
            <div className="d-flex align-items-center gap-1 border border-r1 p-2 cursor">
              <i className="bi bi-bus-front"></i>
              <span onClick={() => setCommute("bus")}>
                {localization["BUS"]}
              </span>
              {commute === "bus" && (
                <i className="bi bi-check font-safe text-2"></i>
              )}
            </div>
            <div className="d-flex align-items-center gap-1 border border-r1 p-2 cursor">
              <i className="bi bi-train-lightrail-front"></i>
              <span onClick={() => setCommute("train")}>
                {localization["TRAIN"]}
              </span>
              {commute === "train" && (
                <i className="bi bi-check font-safe text-2"></i>
              )}
            </div>
          </div>
        </div>
        <hr />
        <div className="d-flex flex-column gap-1 mt-2">
          <span className="text-5 fontSecondary">
            {localization["EXPENSES*"]}
          </span>
          <InputTextFieldSecondary
            placeholder="$15"
            textRef={costRef}
            title="Ticket price*"
            type="number"
          />
        </div>
        <hr />
        <div className="d-flex flex-column gap-1 mt-2">
          <span className="text-5 fontSecondary">{localization["ROUTE"]}</span>
          <InputTextFieldwitState
            placeholder="City/Country"
            setData={setDepartFrom}
            title="Departing point*"
            type="text"
            isAnArray={false}
            currValue={departFrom}
          />
          <InputTextFieldwitState
            placeholder="City/Country"
            setData={setArriveAt}
            title="Arriving point*"
            type="text"
            isAnArray={false}
            currValue={arriveAt}
          />
          <InputTextFieldwitState
            placeholder="Country*"
            setData={setCountry}
            title="Country"
            type="text"
            isAnArray={false}
            currValue={country}
          />
        </div>
        <hr />
        <div className="d-flex flex-column gap-1 mt-2">
          <span className="text-5 fontSecondary">
            {localization["CONTACT DETAILS"]}
          </span>

          <InputTextFieldSecondary
            placeholder="john01"
            textRef={messangerRef}
            title="Messanger Username"
            type="text"
          />
          <InputTextFieldSecondary
            placeholder="+372 3994 ...."
            textRef={whatsappRef}
            title="WhatsApp Number"
            type="text"
          />
          <InputTextFieldSecondary
            placeholder="+372 3994 ...."
            textRef={textRef}
            title="Text Message"
            type="text"
          />
        </div>
        <hr />
        <div className="d-flex flex-column gap-1 mt-2">
          <span className="text-5 fontSecondary">
            {localization["ADDITIONAL INFORMATION"]}
          </span>

          <InputTextFieldSecondary
            placeholder="The ticket is from Tart"
            textRef={additionalData}
            title="Details"
            type="number"
          />
        </div>
        <hr />
        {error && (
          <div className="text-danger text-3 mb-3 text-center">{error}</div>
        )}
        <div className="d-flex gap-2">
          <FilledButton title="Cancel" onClick={() => handleCancel()} />
          <FilledButton title="Post" onClick={() => handlePost()} />
        </div>
        <br />
        <br />
        <br />
      </div>
    </>
  );
}
