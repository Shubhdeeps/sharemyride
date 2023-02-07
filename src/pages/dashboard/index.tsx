import React, { useEffect, useState } from "react";
import RouteCard from "../../components/cards/RouteCard";
import TitleHeader from "../../components/cards/TitleHeader";
import Error from "../../components/error/Error";
import FloatButton from "../../components/inputFields/FloatButton";
import Loader from "../../components/loader";
import NewRouteModal from "../../components/modals/NewRouteModal";
import NavButton from "../../components/navigationBars/NavButton";
import { getRouteTilesData } from "../../service/collectionOperations";
import { RouteTileDB } from "../../types/RoutesTile";

export default function Dashboard() {
  const [activeNavButton, setActiveNavButton] = useState("dashboard");
  const [newRoutePopup, setNewRoutePopup] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<RouteTileDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [routes, setRoutes] = useState<RouteTileDB[]>([]);

  useEffect(() => {
    getRouteTilesData(setError, setLoading, setData, undefined);
  }, []);

  useEffect(() => {
    setRoutes((prevState) => [...prevState, ...data]);
  }, [data]);

  // for infinite scrolling
  const fetchMore = () => {
    const lastItemDate = routes[routes.length - 1].created;
    getRouteTilesData(setError, setLoading, setData, lastItemDate);
  };

  if (!!error) {
    return <Error errMessage={error} />;
  }
  return (
    <>
      {newRoutePopup && (
        <NewRouteModal setModelPopUp={() => setNewRoutePopup(false)} />
      )}
      <div className="empty-area"></div>
      <div className="filled-area container">
        <div className="w-100 d-flex justify-content-between">
          <NavButton
            title="Dashboard"
            currentState={activeNavButton}
            onClick={() => setActiveNavButton("dashboard")}
            icon="bi-house-fill"
          />
          <NavButton
            title="Favourites"
            currentState={activeNavButton}
            onClick={() => setActiveNavButton("favourites")}
            icon="bi-star-fill"
          />
        </div>
        <div className="d-flex flex-column gap-3 position-relative">
          <TitleHeader heading="Expore routes" />
          {routes.map((routeData) => {
            return (
              <React.Fragment key={routeData.routeId}>
                <RouteCard
                  startPoint={routeData.depart}
                  countryName={routeData.country}
                  endPoint={routeData.arrive}
                />
              </React.Fragment>
            );
          })}
          {loading ? (
            <Loader />
          ) : (
            <div className="p-3 text-center">
              <i
                onClick={() => fetchMore()}
                className="bi bi-plus-circle text-1-5"
              ></i>
            </div>
          )}
        </div>
        <FloatButton onClick={() => setNewRoutePopup(true)}>
          {floatIcon}
        </FloatButton>
      </div>
    </>
  );
}

const floatIcon = (
  <svg
    width="42"
    height="38"
    viewBox="0 0 42 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="33" cy="9" r="8.5" fill="#FEFEFE" stroke="#252C34" />
    <path
      d="M32.4643 14V9.53571H28V8.46429H32.4643V4H33.5357V8.46429H38V9.53571H33.5357V14H32.4643Z"
      fill="#252C34"
    />
    <path
      d="M11.75 38C9.58333 38 7.75 37.3891 6.25 36.1674C4.75 34.9456 4 33.4755 4 31.7569V17.7C2.83333 17.3509 1.875 16.7938 1.125 16.0285C0.375 15.2632 0 14.3972 0 13.4306C0 12.1954 0.541667 11.1481 1.625 10.2889C2.70833 9.42963 4 9 5.5 9C7.03333 9 8.33333 9.42963 9.4 10.2889C10.4667 11.1481 11 12.1954 11 13.4306C11 14.3972 10.625 15.2632 9.875 16.0285C9.125 16.7938 8.16667 17.3509 7 17.7V31.7569C7 32.8042 7.45833 33.7037 8.375 34.4556C9.29167 35.2074 10.4167 35.5833 11.75 35.5833C13.1167 35.5833 14.25 35.2074 15.15 34.4556C16.05 33.7037 16.5 32.8042 16.5 31.7569V15.2431C16.5 13.4977 17.25 12.0208 18.75 10.8125C20.25 9.60417 22.0833 9 24.25 9C26.4167 9 28.25 9.60417 29.75 10.8125C31.25 12.0208 32 13.4977 32 15.2431V29.3C33.1667 29.6491 34.125 30.2063 34.875 30.9715C35.625 31.7368 36 32.6028 36 33.5694C36 34.7778 35.4667 35.8183 34.4 36.691C33.3333 37.5637 32.0333 38 30.5 38C29 38 27.7083 37.5637 26.625 36.691C25.5417 35.8183 25 34.7778 25 33.5694C25 32.6028 25.375 31.7301 26.125 30.9514C26.875 30.1727 27.8333 29.6222 29 29.3V15.2431C29 14.169 28.5417 13.2627 27.625 12.5243C26.7083 11.7859 25.5833 11.4167 24.25 11.4167C22.9167 11.4167 21.7917 11.7859 20.875 12.5243C19.9583 13.2627 19.5 14.169 19.5 15.2431V31.7569C19.5 33.4755 18.75 34.9456 17.25 36.1674C15.75 37.3891 13.9167 38 11.75 38Z"
      fill="#FEFEFE"
    />
  </svg>
);
