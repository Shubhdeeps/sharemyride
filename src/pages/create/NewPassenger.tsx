import React, { useRef, useState, useEffect } from "react";
import FilledButton from "../../components/inputFields/FIlledButton";
import InputTextFieldSecondary from "../../components/inputFields/InputTextFieldSecondary";
import Timeline from "../../components/cards/cars/Timeline";
import InputCheckboxField from "../../components/inputFields/InputCheckboxField";
import InputTextFieldwitState from "../../components/inputFields/InputTextFieldwithState";
import Loader from "../../components/loader";
import { PassengerModel } from "../../types/passenger.model";
import { timestamp } from "../../service/firebaseConfig";

export default function NewPassenger() {
  const [loading, setLoading] = useState(true);

  //stoppages
  const stopRef1 = useRef("");
  const stopRef2 = useRef("");
  const stopRef3 = useRef("");
  const stopRefs = [stopRef1, stopRef2, stopRef3];
  const [stoppageRef, setStoppageRef] = useState<
    React.MutableRefObject<string>[]
  >([stopRefs[0]]);
  const [departTime, setDepartTime] = useState([]);
  const [arriveTime, setArriveTime] = useState([]);
  const [departFrom, setDepartFrom] = useState("");
  const [arriveAt, setArriveAt] = useState("");

  //All refs
  const costRef = useRef(0);
  const numberOfPassengerRef = useRef(0); //
  const luggageCarryingRef = useRef("");
  const additionalData = useRef("");
  const eventRef = useRef("");
  const eventURLRef = useRef("");
  const dayOfTravelling = useRef<Date | null>(null);

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
    // Data to be stored
    const data: PassengerModel = {
      stoppages: stoppageRef.map((stop) => stop.current),
      departTime,
      arriveTime,
      departFrom,
      arriveAt,
      cost: costRef.current,
      dayOfTravel: dayOfTravelling.current,
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
    localStorage.setItem("new-passenger-info", JSON.stringify(data));
  };
  const handleCancel = () => {};

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="empty-area">
        <br />
      </div>
      <div className="filled-area container noselect">
        <span className="text-2 fw-bold fontLigh">Request new ride</span>
        <Timeline
          endPoint={arriveAt}
          startPoint={departFrom}
          startTime={[timestamp.fromMillis(+new Date(departTime[0]))]}
          endTime={[timestamp.fromMillis(+new Date(arriveTime[0]))]}
          stoppage={[...stoppageRef.map((eachRef) => eachRef.current)]}
        />

        <br />
        <div className="d-flex flex-column gap-1">
          <span className="text-5 fontSecondary">TIME*</span>

          <InputTextFieldwitState
            placeholder="14:00"
            setData={setDepartTime}
            title="Depart time*"
            type="time"
            isAnArray={true}
            currValue={departTime}
          />
          <InputTextFieldwitState
            placeholder="20:00"
            setData={setArriveTime}
            title="Arriving time*"
            type="time"
            isAnArray={true}
            currValue={arriveTime}
          />
          <InputTextFieldSecondary
            placeholder="20:00"
            textRef={dayOfTravelling}
            title="Day of travelling*"
            type="date"
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
            title="Departing from*"
            type="text"
            isAnArray={false}
            currValue={departFrom}
          />
          <InputTextFieldwitState
            placeholder="Old town, Tartu"
            setData={setArriveAt}
            title="Arriving at*"
            type="text"
            isAnArray={false}
            currValue={arriveAt}
          />
          <br />
          <span className="text-5 fontSecondary">{`Stoppages (max 3)`}</span>
          {Array.from({ length: stoppageRef.length }, (_, i) => i + 1).map(
            (stop) => {
              return (
                <React.Fragment key={stop}>
                  <InputTextFieldSecondary
                    placeholder={`Xyz city ${stop}`}
                    textRef={stoppageRef[stop - 1]}
                    title={`Stoppage ${stop}`}
                    type="text"
                  />
                </React.Fragment>
              );
            }
          )}

          <span className="mt-2 d-flex justify-content-center noselect">
            <i
              onClick={() => {
                if (stoppageRef.length < 3) {
                  setStoppageRef((prevState) => [
                    ...prevState,
                    stopRefs[prevState.length],
                  ]);
                } else {
                  setStoppageRef((prevState) => [...prevState]);
                }
              }}
              className="cursor bi bi-plus-circle text-2 p-2 primary-bg border-r1 fontLight d-flex gap-2 justify-content-center align-items-center w-75"
            >
              Add Stoppage
            </i>
          </span>
          <span className="mt-2 d-flex justify-content-center noselect">
            <i
              onClick={() => {
                if (stoppageRef.length === 1) {
                  stoppageRef[0].current = "";
                  setStoppageRef([stoppageRef[0]]);
                }
                if (stoppageRef.length > 1) {
                  console.log("clicking..");
                  const newStopRefs = stoppageRef;
                  const removedRef = newStopRefs.pop();
                  if (removedRef && removedRef.current) {
                    removedRef.current = "";
                  }
                  setStoppageRef([...newStopRefs]);
                }
              }}
              className="cursor bi bi-x-circle text-2 p-2 primary-bg border-r1 fontLight d-flex gap-2 justify-content-center align-items-center w-75"
            >
              Remove Stoppage
            </i>
          </span>
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
            <InputCheckboxField
              placeholder=""
              switchRef={showContactDetails}
              title="Pick me from my depart point."
            />
          </div>
        </div>
        <hr />
        <br />
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
