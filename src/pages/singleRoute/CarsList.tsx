import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CarsCard from "../../components/cards/CarsCard";
import TitleHeader from "../../components/cards/TitleHeader";
import Error from "../../components/error/Error";
import Filter from "../../components/filter/Filter";
import FloatButton from "../../components/inputFields/FloatButton";
import Loader from "../../components/loader";
import RequestModal from "../../components/modals/RequestRideModal";
import NavButton from "../../components/navigationBars/NavButton";
import RouteDetails from "../../components/route/RouteDetails";
import { getRideCardsBasedOnRouteId } from "../../service/firebase/collectionOperations";
import { timestamp } from "../../service/firebase/firebaseConfig";
import {
  firebaseTimestampToDateString,
  firebaseTimestampToDayNumber,
} from "../../service/helperFunctions/firebaseTimestampToString";
import { RideDB } from "../../types/ride.model";
import { floatIcon, floatIcon2 } from "./icons";

export default function CarsList({
  setActiveNavButton,
  activeNavButton,
}: {
  setActiveNavButton: Function;
  activeNavButton: "cars" | "passenger";
}) {
  const { routeId } = useParams();

  const navigation = useNavigate();
  const [requestRideFlex, setRequestRideFlex] = useState(""); // authorId_rideId
  const [data, setData] = useState<RideDB[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [rides, setRides] = useState<RideDB[]>([]);
  var now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const [dateFilter, setDateFilter] = useState(now.toISOString().slice(0, 16));
  const [fetchMoreData, setFetchMoreData] = useState<RideDB[]>([]);
  const [filterType, setFilterType] = useState<"ALL" | "MINE">("ALL");

  console.log(data.length);
  //Timeline headers
  const previousDateRef = useRef(timestamp.now());
  useEffect(() => {
    if (!!dateFilter) {
      getRideCardsBasedOnRouteId(
        routeId as string,
        setError,
        setLoading,
        setData,
        timestamp.fromMillis(+new Date(dateFilter)),
        "asc",
        filterType
      );
    }
  }, [dateFilter, filterType]);

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
      getRideCardsBasedOnRouteId(
        routeId as string,
        setError,
        setLoading,
        setFetchMoreData,
        lastItemDate,
        "asc",
        filterType
      );
    }
  };

  if (!!error) {
    return <Error errMessage={error} />;
  }

  return (
    <>
      {!!requestRideFlex && (
        <RequestModal
          setRequestRideFlex={setRequestRideFlex}
          rideTicketId={requestRideFlex}
          role="ride"
        />
      )}
      <div className="empty-area">
        <RouteDetails />
      </div>
      <div className="filled-area container">
        <div className="w-100 d-flex justify-content-between">
          <NavButton
            title="Cars"
            currentState={activeNavButton}
            onClick={() => setActiveNavButton("cars")}
            icon="bi-car-front-fill"
          />
          <NavButton
            title="Passenger"
            currentState={activeNavButton}
            onClick={() => setActiveNavButton("passenger")}
            icon="bi-people-fill"
          />
        </div>
        <div className="d-flex flex-wrap gap-3 position-relative">
          <TitleHeader heading="Filters" />
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
          <div className="d-flex gap-2 noselect">
            <div className="d-flex align-items-center gap-1 border border-r1 p-2 cursor">
              <span onClick={() => setFilterType("ALL")}>ALL</span>
              {filterType === "ALL" && (
                <i className="bi bi-check font-safe text-2"></i>
              )}
            </div>
            <div className="d-flex align-items-center gap-1 border border-r1 p-2 cursor">
              <span onClick={() => setFilterType("MINE")}>MINE</span>
              {filterType === "MINE" && (
                <i className="bi bi-check font-safe text-2"></i>
              )}
            </div>
          </div>
          <TitleHeader heading="Rides" />
          <>
            {rides.map((ride) => {
              const isCurrentTimeChanged =
                firebaseTimestampToDayNumber(previousDateRef.current) !==
                firebaseTimestampToDayNumber(ride.actualStartTime);
              previousDateRef.current = ride.actualStartTime;
              return (
                <React.Fragment key={ride.rideTicektId}>
                  {isCurrentTimeChanged && (
                    <TitleHeader
                      heading={firebaseTimestampToDateString(
                        previousDateRef.current
                      )}
                    />
                  )}
                  <CarsCard
                    requestRideOnClick={setRequestRideFlex}
                    data={ride}
                  />
                </React.Fragment>
              );
            })}
          </>
          {loading ? (
            <Loader />
          ) : (
            <div className="p-3 text-center w-100">
              <i
                onClick={() => fetchMore()}
                className="bi bi-plus-circle text-1-5"
              >
                {" "}
                Load more
              </i>
            </div>
          )}
        </div>
        <FloatButton onClick={() => navigation(`/route/${routeId}/new-ride`)}>
          {activeNavButton === "cars" ? floatIcon : floatIcon2}
        </FloatButton>
      </div>
    </>
  );
}
