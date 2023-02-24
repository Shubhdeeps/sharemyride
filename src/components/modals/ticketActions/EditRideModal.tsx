import React, { useState, useEffect } from "react";
import { timestamp } from "../../../service/firebase/firebaseConfig";
import {
  delayMyTrip,
  getSinglePassengerBasedOnRideId,
} from "../../../service/firebase/passenger";
import {
  delayMyRide,
  getSingleRideBasedOnRideId,
} from "../../../service/firebase/rides";
import { RideDB } from "../../../types/ride.model";
import Error from "../../error/Error";
import InputTextFieldwitState from "../../inputFields/InputTextFieldwithState";
import Loader from "../../loader";

export default function EditRide({
  ticketId,
  setAction,
  role,
}: {
  ticketId: string;
  setAction: Function;
  role: "ride" | "passenger";
}) {
  const [data, setData] = useState<RideDB>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  let now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const [departTime, setDepartTime] = useState(now.toISOString().slice(0, 16));

  useEffect(() => {
    if (role === "ride") {
      getSingleRideBasedOnRideId(
        ticketId as string,
        setError,
        setLoading,
        setData
      );
    } else if (role === "passenger") {
      getSinglePassengerBasedOnRideId(ticketId, setError, setLoading, setData);
    }
  }, []);

  useEffect(() => {
    if (data) {
      const departTime = data.actualStartTime.toDate();
      departTime.setMinutes(
        departTime.getMinutes() - departTime.getTimezoneOffset()
      );
      const arriveTime = data.actualEndTime.toDate();
      arriveTime.setMinutes(
        arriveTime.getMinutes() - arriveTime.getTimezoneOffset()
      );
      setDepartTime(departTime.toISOString().slice(0, 16));
    }
  }, [data]);
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error errMessage={error} />;
  }

  if (!!status) {
    if (status === "pending") {
      return <Loader />;
    }
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleClose();
        }}
        className="d-flex align-items-center gap-2"
      >
        <span className="fw-bold text-3 font-safe">{status.toUpperCase()}</span>
        <button type="submit">Close</button>
      </form>
    );
  }
  const handleUpdate = (e: any) => {
    e.preventDefault();
    // dont update if user accidently clears the time.
    if (!departTime) {
      handleClose();
      return;
    }
    // else get the new times and compare with older time
    const newDepartTime = timestamp.fromMillis(+new Date(departTime));
    const timeDifference =
      newDepartTime.seconds - data?.actualStartTime.seconds!;

    const newArriveTimeInSeconds =
      data?.actualEndTime.seconds! + timeDifference;
    const newArriveTime = timestamp.fromMillis(1000 * newArriveTimeInSeconds);
    if (role === "ride") {
      delayMyRide(ticketId, newDepartTime, newArriveTime, setStatus);
    } else if (role === "passenger") {
      delayMyTrip(ticketId, newDepartTime, newArriveTime, setStatus);
    }
  };
  function handleClose() {
    setAction(null);
  }
  return (
    <form
      onSubmit={(e) => handleUpdate(e)}
      className="d-flex flex-column gap-2"
    >
      <InputTextFieldwitState
        placeholder="14:00"
        setData={setDepartTime}
        title="New depart time"
        type="datetime-local"
        isAnArray={false}
        currValue={departTime}
      />
      <div className="d-flex gap-2 align-items-center justify-content-end mt-2">
        <button type="button" onClick={handleClose}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </div>
    </form>
  );
}
