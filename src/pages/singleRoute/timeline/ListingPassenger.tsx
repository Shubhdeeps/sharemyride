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
import TimelineCardPassenger from "../../../components/timeline/TimelineCardPassenger";
import { TimelineTag } from "../../../components/timeline/TimelineTag";
import { timestamp } from "../../../service/firebase/firebaseConfig";
import { getPassengerCardsBasedOnRouteId } from "../../../service/firebase/passenger";
import { firebaseTimestampToDayNumber } from "../../../service/helperFunctions/firebaseTimestampToString";
import { RidePopUp } from "../../../types/customTypes.model";
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

  // for card action
  const [tripPopUp, setTripPopup] = useState<RidePopUp>(null);

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

  const [noMoreRides, setNoMoreRides] = useState("");

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
        filterType,
        setNoMoreRides
      );
    }
  }, [dateFilter, filterType, routeId]);

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
      {!!tripPopUp && (
        <TripActionModal
          role="passenger"
          setAction={setTripPopup}
          action={tripPopUp}
        />
      )}
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
      <div className="filled-area">
        <div className="container h-100 d-flex flex-column align-items-center top-negative">
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

          <div className="d-flex align-items-stretch w-100 mt-3">
            <div className="left-lining"></div>
            <div className="right-lining d-flex flex-column gap-4">
              {passengerCards.map((passenger, index) => {
                const isCurrentTimeChanged =
                  firebaseTimestampToDayNumber(previousDateRef.current) !==
                  firebaseTimestampToDayNumber(passenger.actualStartTime);
                previousDateRef.current = passenger.actualStartTime;
                return (
                  <React.Fragment key={passenger.passengerTicektId}>
                    {(isCurrentTimeChanged || index === 0) && (
                      <DateHeader date={previousDateRef.current} />
                    )}
                    <TimelineCardPassenger
                      requestRideOnClick={setRequestPassengerFlex}
                      data={passenger}
                      setRidePop={setTripPopup}
                    />
                  </React.Fragment>
                );
              })}
              {!!passengerCards.length && noMoreRides && (
                <TimelineTag data="End" />
              )}
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
          <FloatButton
            onClick={() => navigation(`/route/${routeId}/new-passenger`)}
          >
            {activeNavButton === "cars" ? floatIcon : floatIcon2}
          </FloatButton>
        </Container>
      </div>
    </>
  );
}
