import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CarsCard from "../../components/cards/CarsCard";
import PassengerCard from "../../components/cards/PassengerCard";
import TitleHeader from "../../components/cards/TitleHeader";
import Error from "../../components/error/Error";
import FloatButton from "../../components/inputFields/FloatButton";
import Loader from "../../components/loader";
import RequestModal from "../../components/modals/RequestRideModal";
import NavButton from "../../components/navigationBars/NavButton";
import RouteDetails from "../../components/route/RouteDetails";
import { getRideCardsBasedOnRouteId } from "../../service/collectionOperations";
import { RideDB } from "../../types/ride.model";

// pages to show routes
export default function RoutePage() {
  const { routeId } = useParams();

  const navigation = useNavigate();
  const [activeNavButton, setActiveNavButton] = useState("cars");
  const [requestRideFlex, setRequestRideFlex] = useState("");
  const [data, setData] = useState<RideDB[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [rides, setRides] = useState<RideDB[]>([]);

  useEffect(() => {
    getRideCardsBasedOnRouteId(
      routeId as string,
      setError,
      setLoading,
      setData,
      undefined,
      "desc"
    );
  }, []);

  useEffect(() => {
    setRides((prevState) => [...prevState, ...data]);
  }, [data]);

  const fetchMore = () => {
    const lastItemDate = rides[rides.length - 1].actualStartTime;
    getRideCardsBasedOnRouteId(
      routeId as string,
      setError,
      setLoading,
      setData,
      lastItemDate,
      "desc"
    );
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
        {loading && <Loader />}
        <div className="d-flex flex-wrap gap-3 position-relative">
          {activeNavButton === "cars" ? (
            <>
              <TitleHeader heading="03-02-2023" />
              {rides.map((ride) => {
                return (
                  <React.Fragment key={ride.rideTicektId}>
                    <CarsCard
                      requestRideOnClick={setRequestRideFlex}
                      data={ride}
                    />
                  </React.Fragment>
                );
              })}
            </>
          ) : (
            <>
              <TitleHeader heading="03-02-2023" />
              <PassengerCard />
            </>
          )}
        </div>
        <FloatButton onClick={() => navigation(`/route/${routeId}/new-ride`)}>
          {activeNavButton === "cars" ? floatIcon : floatIcon2}
        </FloatButton>
      </div>
    </>
  );
}

const floatIcon = (
  <svg
    width="36"
    height="30"
    viewBox="0 0 36 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.11111 26.7188V28.8281C3.11111 29.1667 3.00093 29.4466 2.78056 29.668C2.56019 29.8893 2.28148 30 1.94444 30H1.16667C0.82963 30 0.550926 29.8893 0.330556 29.668C0.110185 29.4466 0 29.1667 0 28.8281V16.1719L3.30556 6.17188C3.43519 5.80729 3.64907 5.52083 3.94722 5.3125C4.24537 5.10417 4.58889 5 4.97778 5H23.0222C23.4111 5 23.7546 5.10417 24.0528 5.3125C24.3509 5.52083 24.5648 5.80729 24.6944 6.17188L28 16.1719V28.8281C28 29.1667 27.8898 29.4466 27.6694 29.668C27.4491 29.8893 27.1704 30 26.8333 30H26.0167C25.6796 30 25.4074 29.8893 25.2 29.668C24.9926 29.4466 24.8889 29.1667 24.8889 28.8281V26.7188H3.11111ZM3.22778 13.8281H24.7722L22.6333 7.34375H5.36667L3.22778 13.8281ZM6.45556 22.4219C7.05185 22.4219 7.55093 22.2135 7.95278 21.7969C8.35463 21.3802 8.55556 20.8854 8.55556 20.3125C8.55556 19.7135 8.35463 19.1992 7.95278 18.7695C7.55093 18.3398 7.05185 18.125 6.45556 18.125C5.85926 18.125 5.34722 18.3398 4.91944 18.7695C4.49167 19.1992 4.27778 19.7135 4.27778 20.3125C4.27778 20.9115 4.49167 21.4128 4.91944 21.8164C5.34722 22.2201 5.85926 22.4219 6.45556 22.4219ZM21.5833 22.4219C22.1796 22.4219 22.6917 22.2135 23.1194 21.7969C23.5472 21.3802 23.7611 20.8854 23.7611 20.3125C23.7611 19.7135 23.5472 19.1992 23.1194 18.7695C22.6917 18.3398 22.1796 18.125 21.5833 18.125C20.987 18.125 20.488 18.3398 20.0861 18.7695C19.6843 19.1992 19.4833 19.7135 19.4833 20.3125C19.4833 20.9115 19.6907 21.4128 20.1056 21.8164C20.5204 22.2201 21.013 22.4219 21.5833 22.4219ZM2.33333 24.375H25.6667V16.1719H2.33333V24.375Z"
      fill="#FEFEFE"
    />
    <circle cx="27" cy="9" r="8.5" fill="#FEFEFE" stroke="#252C34" />
    <path
      d="M26.4643 14V9.53571H22V8.46429H26.4643V4H27.5357V8.46429H32V9.53571H27.5357V14H26.4643Z"
      fill="#252C34"
    />
  </svg>
);

const floatIcon2 = (
  <svg
    width="33"
    height="28"
    viewBox="0 0 33 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25.875 17.1787V11.3172H21V8.61192H25.875V2.7504H28.125V8.61192H33V11.3172H28.125V17.1787H25.875ZM12 13.5266C10.35 13.5266 9 12.8953 7.95 11.6329C6.9 10.3704 6.375 8.74718 6.375 6.76329C6.375 4.77939 6.9 3.1562 7.95 1.89372C9 0.63124 10.35 0 12 0C13.65 0 15 0.63124 16.05 1.89372C17.1 3.1562 17.625 4.77939 17.625 6.76329C17.625 8.74718 17.1 10.3704 16.05 11.6329C15 12.8953 13.65 13.5266 12 13.5266ZM0 28V23.7617C0 22.7096 0.21875 21.7552 0.65625 20.8985C1.09375 20.0419 1.725 19.4031 2.55 18.9823C4.425 17.9903 6.09375 17.2915 7.55625 16.8857C9.01875 16.4799 10.5 16.277 12 16.277C13.5 16.277 14.975 16.4799 16.425 16.8857C17.875 17.2915 19.5375 17.9903 21.4125 18.9823C22.2375 19.4332 22.875 20.0794 23.325 20.9211C23.775 21.7627 24 22.7096 24 23.7617V28H0ZM2.25 25.2947H21.75V23.7617C21.75 23.2807 21.6375 22.8223 21.4125 22.3865C21.1875 21.9506 20.8875 21.6275 20.5125 21.4171C18.7375 20.4251 17.2375 19.7713 16.0125 19.4557C14.7875 19.1401 13.45 18.9823 12 18.9823C10.55 18.9823 9.20625 19.1401 7.96875 19.4557C6.73125 19.7713 5.225 20.4251 3.45 21.4171C3.075 21.6275 2.78125 21.9506 2.56875 22.3865C2.35625 22.8223 2.25 23.2807 2.25 23.7617V25.2947ZM12 10.8213C12.975 10.8213 13.7813 10.438 14.4188 9.6715C15.0563 8.90499 15.375 7.93559 15.375 6.76329C15.375 5.59098 15.0563 4.62158 14.4188 3.85507C13.7813 3.08857 12.975 2.70531 12 2.70531C11.025 2.70531 10.2187 3.08857 9.58125 3.85507C8.94375 4.62158 8.625 5.59098 8.625 6.76329C8.625 7.93559 8.94375 8.90499 9.58125 9.6715C10.2187 10.438 11.025 10.8213 12 10.8213Z"
      fill="#FEFEFE"
    />
  </svg>
);
