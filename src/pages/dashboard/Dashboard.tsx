import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RouteCard from "../../components/cards/RouteCard";
import TitleHeader from "../../components/cards/TitleHeader";
import Error from "../../components/error/Error";
import Filter from "../../components/filter/Filter";
import FloatButton from "../../components/inputFields/FloatButton";
import Loader from "../../components/loader";
import NewRouteModal from "../../components/modals/NewRouteModal";
import RouteFiltersModal from "../../components/modals/RouteFiltersModal";
import NavButton from "../../components/navigationBars/NavButton";
import { getRouteTilesData } from "../../service/firebase/collectionOperations";
import { capitalizeFirstLetter } from "../../service/helperFunctions/captalizeFirstLetter";
import { localization } from "../../service/languages/languages";
import { RouteTileDB } from "../../types/RoutesTile";
import { floatIcon } from "./floatIcon";

export default function Dashboard() {
  // get localstorage filter name
  const storedRouteName = localStorage.getItem("route-filter");
  let localData: string | undefined = undefined;
  if (storedRouteName) {
    localData = JSON.parse(storedRouteName) as string;
  }
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const [newRoutePopup, setNewRoutePopup] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<RouteTileDB[]>([]);
  const [countrySpecificData, setCountrySpecificData] = useState<RouteTileDB[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [routes, setRoutes] = useState<RouteTileDB[]>([]);

  //Filters
  const [filterFlex, setFilterFlex] = useState(false);

  // user can set start point only after selecting a country name
  const [startPoint, setStartPoint] = useState("");
  const [appliedFilter, setAppliedFilters] = useState<string | undefined>(
    localData
  );
  const [noMoreRides, setNoMoreRides] = useState("");

  const handleFilterApply = (country: string, start: string) => {
    setAppliedFilters(country);
    setStartPoint(start);
    setFilterFlex(false);
    //saving filter to local storage
    localStorage.setItem("route-filter", JSON.stringify(country));
  };

  const handleClear = () => {
    setFilterFlex(false);
    setAppliedFilters(undefined);
    setStartPoint("");
    localStorage.setItem("route-filter", JSON.stringify(""));
  };

  // first fetch from here, if there was filter applied in the past
  // run on filter change
  useEffect(() => {
    getRouteTilesData(
      setError,
      setLoading,
      setCountrySpecificData,
      undefined,
      appliedFilter,
      setNoMoreRides,
      startPoint
    );
  }, [appliedFilter, startPoint]);

  useEffect(() => {
    setRoutes((prevState) => [...prevState, ...data]);
  }, [data]);

  useEffect(() => {
    setRoutes(countrySpecificData);
  }, [countrySpecificData]);

  // for infinite scrolling
  const fetchMore = () => {
    const lastItemDate = routes[routes.length - 1].created;
    getRouteTilesData(
      setError,
      setLoading,
      setData,
      lastItemDate,
      appliedFilter,
      setNoMoreRides,
      startPoint
    );
  };

  if (!!error) {
    return <Error errMessage={error} />;
  }
  let currentPath = pathname.split("/")[1];
  if (currentPath === "") {
    currentPath = "dashboard";
  }
  return (
    <>
      {filterFlex && (
        <RouteFiltersModal
          onClick={handleFilterApply}
          handleClear={handleClear}
          defaultCountry={!!localData ? localData : ""}
          startPoint={startPoint}
        />
      )}
      {newRoutePopup && (
        <NewRouteModal setModelPopUp={() => setNewRoutePopup(false)} />
      )}
      <div className="empty-area"></div>
      <div className="filled-area">
        <div className="top-negative container">
          <div className="w-100 d-flex justify-content-between">
            <NavButton
              title="Dashboard"
              currentState={currentPath}
              onClick={() => navigate("/dashboard")}
              icon="bi-house-fill"
            />
            <NavButton
              title="Favourites"
              currentState={currentPath}
              onClick={() => navigate("/favourites")}
              icon="bi-star-fill"
            />
          </div>
          <div className="d-flex flex-column gap-2 position-relative">
            <br />
            <span onClick={() => setFilterFlex(true)}>
              <Filter>
                <span className="text-4 fw-bold">{localization["Search"]}</span>
                {!!appliedFilter && (
                  <span className="text-2-5">{appliedFilter}</span>
                )}
                {!!startPoint && (
                  <span className="text-2-5">
                    {localization["Start Point"]}:{" "}
                    {capitalizeFirstLetter(startPoint)}
                  </span>
                )}
              </Filter>
            </span>
            <TitleHeader heading="Expore routes" />
            <div className="d-flex gap-2 flex-wrap">
              {routes.map((routeData) => {
                return (
                  <React.Fragment key={routeData.routeId}>
                    <RouteCard
                      startPoint={routeData.depart}
                      countryName={routeData.country}
                      endPoint={routeData.arrive}
                      isFavourite={false}
                    />
                  </React.Fragment>
                );
              })}
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
          <FloatButton onClick={() => setNewRoutePopup(true)}>
            {floatIcon}
          </FloatButton>
        </div>
      </div>
    </>
  );
}
