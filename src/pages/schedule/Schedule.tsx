import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TitleHeader from "../../components/cards/TitleHeader";
import Error from "../../components/error/Error";
import Filter from "../../components/filter/Filter";
import FilterHeader from "../../components/headers/TimeHeader";
import FloatButton from "../../components/inputFields/FloatButton";
import Loader from "../../components/loader";
import { DateHeader } from "../../components/timeline/DateTimestampHeader";
import TimelineCard from "../../components/timeline/TimelineCard";
import { TimelineTag } from "../../components/timeline/TimelineTag";
import { getMyScheduledRides } from "../../service/firebase/collectionOperations";
import { timestamp } from "../../service/firebase/firebaseConfig";
import { firebaseTimestampToDayNumber } from "../../service/helperFunctions/firebaseTimestampToString";
import { RidePopUp } from "../../types/customTypes.model";
import { RideDB } from "../../types/ride.model";
import { floatIcon } from "../dashboard/floatIcon";

export default function Schedule() {
  const { routeId } = useParams();

  const navigation = useNavigate();
  const [data, setData] = useState<RideDB[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [rides, setRides] = useState<RideDB[]>([]);
  var now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const [dateFilter, setDateFilter] = useState(now.toISOString().slice(0, 16));
  const [fetchMoreData, setFetchMoreData] = useState<RideDB[]>([]);
  const [noMoreRides, setNoMoreRides] = useState("");

  //for reporting, edit, deleting ride
  const [ridePopUp, setRidePop] = useState<RidePopUp>(null);

  //Timeline headers
  const previousDateRef = useRef(timestamp.now());
  useEffect(() => {
    if (!!dateFilter) {
      getMyScheduledRides(
        setError,
        setLoading,
        setData,
        timestamp.fromMillis(+new Date(dateFilter)),
        setNoMoreRides
      );
    }
  }, [dateFilter]);

  useEffect(() => {
    if (!!fetchMoreData.length) {
      setRides((prevState) => [...prevState, ...fetchMoreData]);
    }
  }, [fetchMoreData]);

  useEffect(() => {
    if (!!data.length) {
      setRides(data);
    }
  }, [data]);

  const fetchMore = () => {
    if (!!rides.length) {
      const lastItemDate = rides[rides.length - 1].actualStartTime;

      getMyScheduledRides(
        setError,
        setLoading,
        setFetchMoreData,
        lastItemDate,
        setNoMoreRides
      );
    }
  };

  if (!!error) {
    return <Error errMessage={error} />;
  }

  return (
    <>
      <div className="empty-area"></div>
      <div className="filled-area container">
        <div className="h-100 d-flex flex-column align-items-center top-negative">
          <TitleHeader heading="My Schedule" />
          <FilterHeader>
            <Filter>
              <label htmlFor="dateTime" className="fw-bold">
                Show Rides after
              </label>
              <input
                name="dateTime"
                type="datetime-local"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </Filter>
          </FilterHeader>
          <div className="d-flex align-items-stretch w-100 mt-3">
            <div className="left-lining"></div>
            <div className="right-lining d-flex flex-column gap-4">
              {rides.map((ride, index) => {
                const isCurrentTimeChanged =
                  firebaseTimestampToDayNumber(previousDateRef.current) !==
                  firebaseTimestampToDayNumber(ride.actualStartTime);
                previousDateRef.current = ride.actualStartTime;
                return (
                  <React.Fragment key={ride.rideTicektId}>
                    {(isCurrentTimeChanged || index === 0) && (
                      <DateHeader date={previousDateRef.current} />
                    )}
                    <TimelineCard
                      requestRideOnClick={undefined}
                      data={ride}
                      setRidePop={setRidePop}
                    />
                  </React.Fragment>
                );
              })}
              {!!rides.length && noMoreRides && <TimelineTag data="End" />}
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="p-3 text-center w-100 text-3">
              {noMoreRides ? (
                <>{noMoreRides}</>
              ) : (
                <i
                  onClick={() => fetchMore()}
                  className="bi bi-arrow-clockwise text-1-5"
                ></i>
              )}
            </div>
          )}
        </div>
        <FloatButton onClick={() => navigation(`/route/${routeId}/new-ride`)}>
          {floatIcon}
        </FloatButton>
      </div>
    </>
  );
}