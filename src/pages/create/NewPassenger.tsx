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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [departTime, setDepartTime] = useState("");
  const [arriveTime, setArriveTime] = useState("");
  const [departFrom, setDepartFrom] = useState("");
  const [arriveAt, setArriveAt] = useState("");

  //All refs
  const costRef = useRef(0);
  const numberOfPassengerRef = useRef(0); //
  const luggageCarryingRef = useRef("");
  const additionalData = useRef("");
  const eventRef = useRef("");
  const eventURLRef = useRef("");

  //message refS
  const messangerRef = useRef("");
  const whatsappRef = useRef("");
  const textRef = useRef("");

  //Boolean refs
  const requestDoorToDoorDetailsRef = useRef<boolean | null>(null);
  const arePetsAllowedRef = useRef<boolean | null>(null);
  const EVCarRef = useRef<boolean | null>(null);
  const showContactDetails = useRef<boolean | null>(null);

  //Rehydrating the data
  useEffect(() => {
    const storedData = localStorage.getItem("new-passenger-info");
    setDepartFrom(capitalizeFirstLetter(routes[0]));
    setArriveAt(capitalizeFirstLetter(routes[1]));
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
      EVCarRef.current = data.privacy.EVCar;
      requestDoorToDoorDetailsRef.current = data.privacy.requestDoorToDoor;
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
      departFrom,
      arriveAt,
      cost: costRef.current,
      additionalInfo: {
        eventName: eventRef.current,
        eventURL: eventURLRef.current,
        passengerCount: numberOfPassengerRef.current,
        carryingLuggage: luggageCarryingRef.current,
        details: additionalData.current,
      },
      contact: {
        messanger: messangerRef.current,
        whatsapp: whatsappRef.current,
        text: textRef.current,
      },
      privacy: {
        petsAllowed: arePetsAllowedRef.current,
        EVCar: EVCarRef.current,
        requestDoorToDoor: requestDoorToDoorDetailsRef.current,
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
          <InputTextFieldSecondary
            placeholder="2 bags of 5kg"
            textRef={luggageCarryingRef}
            title="Are you carrying luggage"
            type="text"
          />
        </div>
        <hr />
        <div className="d-flex flex-column gap-1 mt-2">
          <span className="text-5 fontSecondary">LOCATION*</span>
          <InputTextFieldwitState
            placeholder="Kristiine, Tallinn"
            setData={setDepartFrom}
            title="Departing from"
            type="text"
            isAnArray={false}
            currValue={departFrom}
          />
          <InputTextFieldwitState
            placeholder="Old town, Tartu"
            setData={setArriveAt}
            title="Arriving at"
            type="text"
            isAnArray={false}
            currValue={arriveAt}
          />
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
          <span className="text-5 fontSecondary">TRAVELLING TO AN EVENT</span>

          <InputTextFieldSecondary
            placeholder="Event name"
            textRef={eventRef}
            title="Event name"
            type="number"
          />
          <InputTextFieldSecondary
            placeholder="https://facebook.com/event-abc"
            textRef={eventURLRef}
            title="Event URL (FB page or website)"
            type="number"
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
              switchRef={requestDoorToDoorDetailsRef}
              title="Request door to door pickup and drop off."
            />
            <InputCheckboxField
              placeholder=""
              switchRef={EVCarRef}
              title="Do you prefer Electric car?"
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
          <FilledButton title="Cancel" onClick={() => console.log("Cancel")} />
          <FilledButton title="Post" onClick={() => handlePost()} />
        </div>
        <br />
        <br />
        <br />
      </div>
    </>
  );
}
