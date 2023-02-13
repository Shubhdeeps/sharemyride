import React, { useRef, useState, useEffect } from "react";
import FilledButton from "../../components/inputFields/FIlledButton";
import InputTextFieldSecondary from "../../components/inputFields/InputTextFieldSecondary";
import Timeline from "../../components/cards/cars/Timeline";
import InputCheckboxField from "../../components/inputFields/InputCheckboxField";
import InputTextFieldwitState from "../../components/inputFields/InputTextFieldwithState";
import Loader from "../../components/loader";
import { NewRideModal } from "../../types/ride.model";
import { useNavigate, useParams } from "react-router-dom";
import RouteDetails from "../../components/route/RouteDetails";
import { createNewRideTile } from "../../service/firebase/collectionOperations";
import { capitalizeFirstLetter } from "../../service/helperFunctions/captalizeFirstLetter";
import { timestamp } from "../../service/firebase/firebaseConfig";

export default function NewRide() {
  const { routeId } = useParams();
  const routes = routeId?.split("_") as string[];
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //stoppages
  const stopRef1 = useRef("");
  const stopRef2 = useRef("");
  const stopRef3 = useRef("");
  const stopRefs = [stopRef1, stopRef2, stopRef3];
  const [stoppageRef, setStoppageRef] = useState<
    React.MutableRefObject<string>[]
  >([stopRefs[0]]);
  const [departTime, setDepartTime] = useState<any>([]);
  const [arriveTime, setArriveTime] = useState([]);
  const [departFrom, setDepartFrom] = useState("");
  const [arriveAt, setArriveAt] = useState("");

  //All refs
  const costRef = useRef(0);
  const passengerSeatsRef = useRef(0);

  //message refS
  const messangerRef = useRef("");
  const whatsappRef = useRef("");
  const textRef = useRef("");

  //Boolean refs
  const arePetsAllowedRef = useRef<boolean | null>(null);
  const acceptParcelRef = useRef<boolean | null>(null);
  const EVCarRef = useRef<boolean | null>(null);
  const showContactDetails = useRef<boolean | null>(null);

  //Rehydrating the data
  useEffect(() => {
    const storedData = localStorage.getItem("new-ride-info");
    setDepartFrom(capitalizeFirstLetter(routes[0]));
    setArriveAt(capitalizeFirstLetter(routes[1]));

    //stroing local data
    if (storedData) {
      const data = JSON.parse(storedData) as NewRideModal;

      //car details
      passengerSeatsRef.current = data.passengerSeats;

      //contact details
      messangerRef.current = data.contact.messanger;
      whatsappRef.current = data.contact.whatsapp;
      textRef.current = data.contact.text;

      //privacy settings
      arePetsAllowedRef.current = data.privacy.petsAllowed;
      acceptParcelRef.current = data.privacy.acceptParcel;
      EVCarRef.current = data.privacy.EVCar;
      showContactDetails.current = data.privacy.showContact;
      // allowDoorToDoorDetails.current = data.privacy.allowDoorToDoorPickup;
    }
    setLoading(false);
  }, []);

  const handlePost = () => {
    if (!departTime || !arriveTime || !costRef.current) {
      setError("All field with * are required!");
      return;
    }

    // Data to be stored
    const data: NewRideModal = {
      stoppages: stoppageRef.map((stop) => stop.current),
      departTime: [timestamp.fromMillis(+new Date(departTime[0]))],
      arriveTime: [timestamp.fromMillis(+new Date(arriveTime[0]))],
      departFrom,
      arriveAt,
      cost: costRef.current,
      passengerSeats: passengerSeatsRef.current,
      contact: {
        messanger: messangerRef.current,
        whatsapp: whatsappRef.current,
        text: textRef.current,
      },
      privacy: {
        petsAllowed: arePetsAllowedRef.current,
        acceptParcel: acceptParcelRef.current,
        EVCar: EVCarRef.current,
        showContact: showContactDetails.current,
      },
    };
    localStorage.setItem("new-ride-info", JSON.stringify(data));
    //firebase upload here
    if (routeId) {
      createNewRideTile(data, routeId);
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
        <span className="text-2 fw-bold fontLigh">New Ride</span>
        <Timeline
          endPoint={arriveAt}
          startPoint={departFrom}
          startTime={[timestamp.fromMillis(+new Date(departTime[0]))]}
          endTime={[timestamp.fromMillis(+new Date(arriveTime[0]))]}
          stoppage={[...stoppageRef.map((eachRef) => eachRef.current)]}
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
            isAnArray={true}
            currValue={departTime}
          />
          <InputTextFieldwitState
            placeholder="20:00"
            setData={setArriveTime}
            title="Arriving time*"
            type="datetime-local"
            isAnArray={true}
            currValue={arriveTime}
          />
        </div>
        <hr />
        <div className="d-flex flex-column gap-1 mt-2">
          <span className="text-5 fontSecondary">EXPENSES*</span>
          <InputTextFieldSecondary
            placeholder="$15"
            textRef={costRef}
            title="Cost*"
            type="number"
          />
        </div>
        <hr />
        <div className="d-flex flex-column gap-1 mt-2">
          <span className="text-5 fontSecondary">ROUTE</span>
          <InputTextFieldwitState
            placeholder="Kristiine, Tallinn"
            setData={setDepartFrom}
            title="Departing point"
            type="text"
            isAnArray={false}
            currValue={departFrom}
          />
          <InputTextFieldwitState
            placeholder="Old Town, Tartu"
            setData={setArriveAt}
            title="Arriving point"
            type="text"
            isAnArray={false}
            currValue={arriveAt}
          />
          <br />
          <span className="text-5 fontSecondary">DESCRIBE THE ROUTE</span>
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
          <span className="text-5 fontSecondary">CAR DETAILS</span>

          <InputTextFieldSecondary
            placeholder="Passenger seats"
            textRef={passengerSeatsRef}
            title="Seats offering"
            type="number"
          />
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
          <span className="text-5 fontSecondary">PRIVACY SETTINGS</span>
          <div className="d-flex flex-wrap gap-2">
            <InputCheckboxField
              placeholder=""
              switchRef={arePetsAllowedRef}
              title="Are pets allowed in your car?"
            />
            <InputCheckboxField
              placeholder=""
              switchRef={acceptParcelRef}
              title="Are you accepting parcels?"
            />
            <InputCheckboxField
              placeholder=""
              switchRef={EVCarRef}
              title="I am travelling with electric car"
            />
            <InputCheckboxField
              placeholder=""
              switchRef={showContactDetails}
              title="Show contact details"
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
      </div>
    </>
  );
}
