import React, { useRef, useState, useEffect } from "react";
import FilledButton from "../../components/inputFields/FIlledButton";
import InputTextFieldSecondary from "../../components/inputFields/InputTextFieldSecondary";
import Timeline from "../../components/cards/cars/Timeline";
import InputCheckboxField from "../../components/inputFields/InputCheckboxField";
import InputTextFieldwitState from "../../components/inputFields/InputTextFieldwithState";
import Loader from "../../components/loader";
import { PassengerModel } from "../../types/passenger.model";
import { timestamp } from "../../service/firebase/firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { createNewPassengerTile } from "../../service/firebase/collectionOperations";
import RouteDetails from "../../components/route/RouteDetails";
import { capitalizeFirstLetter } from "../../service/helperFunctions/captalizeFirstLetter";

export default function NewPassenger() {
  const { routeId } = useParams();
  const routes = routeId?.split("_") as string[];
  const navigate = useNavigate();

  const departingCity = capitalizeFirstLetter(routes[0]);
  const arrivingCity = capitalizeFirstLetter(routes[1]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [departTime, setDepartTime] = useState("");
  const [arriveTime, setArriveTime] = useState("");
  const [departFrom, setDepartFrom] = useState("");
  const [arriveAt, setArriveAt] = useState("");

  //All refs
  const costRef = useRef(0);
  const numberOfPassengerRef = useRef(0);
  const additionalData = useRef("");

  //message refS
  const messangerRef = useRef("");
  const whatsappRef = useRef("");
  const textRef = useRef("");

  //Boolean refs
  const arePetsAllowedRef = useRef<boolean | null>(null);
  const showContactDetails = useRef<boolean | null>(null);

  //Rehydrating the data
  useEffect(() => {
    const storedData = localStorage.getItem("new-passenger-info");
    // setDepartFrom(capitalizeFirstLetter(routes[0]));
    // setArriveAt(capitalizeFirstLetter(routes[1]));
    //stroing local data
    if (storedData) {
      const data = JSON.parse(storedData) as PassengerModel;

      additionalData.current = data.additionalInfo.details;
      //contact details
      messangerRef.current = data.contact.messanger;
      whatsappRef.current = data.contact.whatsapp;
      textRef.current = data.contact.text;

      //privacy settings
      arePetsAllowedRef.current = data.privacy.petsAllowed;
      showContactDetails.current = data.privacy.showContact;
    }
    setLoading(false);
  }, []);

  const handlePost = () => {
    if (
      !departTime ||
      !arriveTime ||
      !costRef.current ||
      !numberOfPassengerRef.current
    ) {
      setError("All field with * are required!");
      return;
    }
    // Data to be stored
    const data: PassengerModel = {
      actualStartTime: timestamp.fromMillis(+new Date(departTime)),
      actualEndTime: timestamp.fromMillis(+new Date(arriveTime)),
      departFrom: !!departFrom ? departFrom : departingCity,
      arriveAt: !!arriveAt ? arriveAt : arrivingCity,
      cost: costRef.current,
      additionalInfo: {
        passengerCount: numberOfPassengerRef.current,
        details: additionalData.current,
      },
      contact: {
        messanger: messangerRef.current,
        whatsapp: whatsappRef.current,
        text: textRef.current,
      },
      privacy: {
        petsAllowed: arePetsAllowedRef.current,
        showContact: showContactDetails.current,
      },
    };
    //saving to local storage
    localStorage.setItem("new-passenger-info", JSON.stringify(data));

    //upload to firestore
    if (routeId) {
      createNewPassengerTile(data, routeId);
      setError("");
      handleCancel();
    } else {
      setError("Something went wrong, please try again later.");
      return;
    }
  };
  const handleCancel = () => {
    navigate(`/route/${routeId}`);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="empty-area">
        <RouteDetails />
      </div>
      <div className="filled-area container noselect">
        <span className="text-2 fw-bold fontLigh">Request new ride</span>
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
          <span className="text-5 fontSecondary">TIME*</span>

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
        <div className="d-flex flex-column gap-1 mt-2">
          <span className="text-5 fontSecondary">EXPENSES*</span>
          <InputTextFieldSecondary
            placeholder="$15"
            textRef={costRef}
            title="Offered price*"
            type="number"
          />
          <InputTextFieldSecondary
            placeholder=""
            textRef={numberOfPassengerRef}
            title="Number of Passengers*"
            type="number"
          />
        </div>
        <hr />
        <div className="d-flex flex-column gap-1 mt-2">
          <span className="text-5 fontSecondary">LOCATION*</span>
          <div className="d-flex align-items-end gap-1">
            <InputTextFieldwitState
              placeholder="Kristiine"
              setData={setDepartFrom}
              title="Departing from"
              type="text"
              isAnArray={false}
              currValue={departFrom}
            />
            <span className="text-2">, {departingCity}</span>
          </div>
          <div className="d-flex align-items-end gap-1">
            <InputTextFieldwitState
              placeholder="Old town"
              setData={setArriveAt}
              title="Arriving at"
              type="text"
              isAnArray={false}
              currValue={arriveAt}
            />
            <span className="text-2">, {arrivingCity}</span>
          </div>
          <br />
        </div>

        <hr />
        <div className="d-flex flex-column gap-1 mt-2">
          <span className="text-5 fontSecondary">CONTACT DETAILS</span>

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
          <span className="text-5 fontSecondary">ADDITIONAL INFORMATION</span>

          <InputTextFieldSecondary
            placeholder="I would like to travel back too..."
            textRef={additionalData}
            title="Details"
            type="number"
          />
        </div>
        <hr />
        <div className="d-flex flex-column gap-1 mt-2">
          <span className="text-5 fontSecondary">PRIVACY SETTINGS</span>
          <div className="d-flex flex-wrap gap-2">
            <InputCheckboxField
              placeholder=""
              switchRef={arePetsAllowedRef}
              title="Are you travelling with pets?"
            />
            <InputCheckboxField
              placeholder=""
              switchRef={showContactDetails}
              title="Show contact details?"
            />
          </div>
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
