import React, { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../../../components/error/Error";
import Filter from "../../../components/filter/Filter";
import FilterHeader from "../../../components/headers/TimeHeader";
import FloatButton from "../../../components/inputFields/FloatButton";
import Loader from "../../../components/loader";
import RequestModal from "../../../components/modals/RequestRideModal";
import TripActionModal from "../../../components/modals/TripActionModal";
import NavButton from "../../../components/navigationBars/NavButton";
import RouteDetails from "../../../components/route/RouteDetails";
import { DateHeader } from "../../../components/timeline/DateTimestampHeader";
import TimelineCard from "../../../components/timeline/TimelineCard";
import { TimelineTag } from "../../../components/timeline/TimelineTag";
import { timestamp } from "../../../service/firebase/firebaseConfig";
import { getRideCardsBasedOnRouteId } from "../../../service/firebase/rides";
import { firebaseTimestampToDayNumber } from "../../../service/helperFunctions/firebaseTimestampToString";
import { RidePopUp } from "../../../types/customTypes.model";
import { RideDB } from "../../../types/ride.model";
import { floatIcon, floatIcon2 } from "../icons";

export default function ListingCarRides({
  setActiveNavButton,
  activeNavButton,
}: {
  setActiveNavButton: Function;
  activeNavButton: "cars" | "passenger";
}) {
  const { routeId } = useParams();

  const navigation = useNavigate();

  // for card action
  const [ridePopUp, setRidePop] = useState<RidePopUp>(null);

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

  const [noMoreRides, setNoMoreRides] = useState("");
  //Timeline headers
  const previousDateRef = useRef(timestamp.now());

  // 1. on first render, this side effect runs, which changes the data state and trigger other side-effect
  useEffect(() => {
    if (!!dateFilter) {
      getRideCardsBasedOnRouteId(
        routeId as string,
        setError,
        setLoading,
        setData,
        timestamp.fromMillis(+new Date(dateFilter)),
        "asc",
        filterType,
        setNoMoreRides
      );
    }
    //this routeId does not have any role here
  }, [dateFilter, filterType, routeId]);

  //this gets trigger when fetchmore is called
  useEffect(() => {
    if (!!fetchMoreData.length) {
      setRides((prevState) => [...prevState, ...fetchMoreData]);
    }
  }, [fetchMoreData]);

  //2. this got trigger everytime data state changes, and hence setting up new state of rides
  useEffect(() => {
    if (!!data.length) {
      console.log("updating...");
      setRides(data);
    }
  }, [data]);

  // when fetch more is called, the setFetchmore state changes and trigger side effect
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
        filterType,
        setNoMoreRides
      );
    }
  };

  if (!!error) {
    return <Error errMessage={error} />;
  }

  return (
    <>
      {!!ridePopUp && (
        <TripActionModal
          role="ride"
          setAction={setRidePop}
          action={ridePopUp}
        />
      )}
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
      <div className="filled-area">
        <div className="h-100 d-flex flex-column align-items-center top-negative container">
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
          </FilterHeader>
          <div className="d-flex align-items-stretch w-100 mt-3 h-100">
            <div className="left-lining"></div>
            <div className="right-lining d-flex flex-column gap-5 h-100">
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
                      requestRideOnClick={setRequestRideFlex}
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
        <Container>
          <FloatButton onClick={() => navigation(`/route/${routeId}/new-ride`)}>
            {activeNavButton === "cars" ? floatIcon : floatIcon2}
          </FloatButton>
        </Container>
      </div>
    </>
  );
}
