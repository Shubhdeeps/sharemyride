import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TitleHeader from "../../../components/cards/TitleHeader";
import Error from "../../../components/error/Error";
import Filter from "../../../components/filter/Filter";
import FloatButton from "../../../components/inputFields/FloatButton";
import Loader from "../../../components/loader";
import RequestModal from "../../../components/modals/RequestRideModal";
import NavButton from "../../../components/navigationBars/NavButton";
import RouteDetails from "../../../components/route/RouteDetails";
import TimelineCardPassenger from "../../../components/timeline/TimelineCardPassenger";
import { timestamp, Timestamp } from "../../../service/firebase/firebaseConfig";
import { getPassengerCardsBasedOnRouteId } from "../../../service/firebase/passenger";
import {
  firebaseTimestampToDateString,
  firebaseTimestampToDayNumber,
} from "../../../service/helperFunctions/firebaseTimestampToString";
import { PassengerDB } from "../../../types/passenger.model";
import { floatIcon, floatIcon2 } from "../icons";

export default function ListingPassengers({
  setActiveNavButton,
  activeNavButton,
}: {
  setActiveNavButton: Function;
  activeNavButton: "cars" | "passenger";
}) {
  const { routeId } = useParams();

  const navigation = useNavigate();
  const [requestPassengerFlex, setRequestPassengerFlex] = useState("");
  const [data, setData] = useState<PassengerDB[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [passengerCards, setPassengerCards] = useState<PassengerDB[]>([]);
  var now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const [dateFilter, setDateFilter] = useState(now.toISOString().slice(0, 16));
  const [fetchMoreData, setFetchMoreData] = useState<PassengerDB[]>([]);
  const [filterType, setFilterType] = useState<"ALL" | "MINE">("ALL");

  //Timeline headers
  const previousDateRef = useRef(timestamp.now());
  useEffect(() => {
    if (!!dateFilter) {
      getPassengerCardsBasedOnRouteId(
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
      setPassengerCards((prevState) => [...prevState, ...fetchMoreData]);
    }
  }, [fetchMoreData]);

  useEffect(() => {
    if (!!data.length) {
      setPassengerCards(data);
    }
  }, [data]);

  const fetchMore = () => {
    if (!!passengerCards.length) {
      const lastItemDate =
        passengerCards[passengerCards.length - 1].actualStartTime;
      getPassengerCardsBasedOnRouteId(
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
      {!!requestPassengerFlex && (
        <RequestModal
          setRequestRideFlex={setRequestPassengerFlex}
          rideTicketId={requestPassengerFlex}
          role="passenger"
        />
      )}
      <div className="empty-area">
        <RouteDetails />
      </div>
      <div className="filled-area container">
        <div className="h-100 d-flex flex-column align-items-center top-negative">
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

          <div className="d-flex flex-wrap gap-3 position-relative mt-2">
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
          </div>

          <div className="d-flex align-items-stretch w-100 mt-3">
            <div className="left-lining"></div>
            <div className="right-lining d-flex flex-column gap-4">
              {passengerCards.map((passenger) => {
                const isCurrentTimeChanged =
                  firebaseTimestampToDayNumber(previousDateRef.current) !==
                  firebaseTimestampToDayNumber(passenger.actualStartTime);
                previousDateRef.current = passenger.actualStartTime;
                return (
                  <React.Fragment key={passenger.passengerTicektId}>
                    {isCurrentTimeChanged && (
                      <DateHeader date={previousDateRef.current} />
                    )}
                    <TimelineCardPassenger
                      requestRideOnClick={setRequestPassengerFlex}
                      data={passenger}
                    />
                  </React.Fragment>
                );
              })}

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
          </div>
        </div>
        <FloatButton onClick={() => navigation(`/route/${routeId}/new-ride`)}>
          {activeNavButton === "cars" ? floatIcon : floatIcon2}
        </FloatButton>
      </div>
    </>
  );
}

const DateHeader = ({ date }: { date: typeof Timestamp }) => {
  return (
    <span className="p-2 text-center primary-bg border-r3 fontLight date-stamp">
      {firebaseTimestampToDateString(date)}
    </span>
  );
};
