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
import { RouteTileDB } from "../../types/RoutesTile";
import { floatIcon } from "./floatIcon";

export default function Dashboard() {
  // get localstorage filter name
  const storedRouteName = localStorage.getItem("route-filter");
  let localData = undefined;
  const countryRef = useRef("");
  if (storedRouteName) {
    localData = JSON.parse(storedRouteName);
    countryRef.current = localData;
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
  const [appliedFilter, setAppliedFilters] = useState<string | undefined>(
    localData
  );

  const [noMoreRides, setNoMoreRides] = useState("");

  const handleFilterApply = () => {
    setAppliedFilters(countryRef.current);
    setFilterFlex(false);

    //saving filter to local storage
    localStorage.setItem("route-filter", JSON.stringify(countryRef.current));
  };

  const handleClear = () => {
    countryRef.current = "";
    setFilterFlex(false);
    setAppliedFilters("");
    localStorage.setItem("route-filter", JSON.stringify(""));
  };

  useEffect(() => {
    if (appliedFilter !== undefined) {
      getRouteTilesData(
        setError,
        setLoading,
        setCountrySpecificData,
        undefined,
        appliedFilter,
        setNoMoreRides
      );
    }
  }, [appliedFilter]);

  useEffect(() => {
    if (!appliedFilter) {
      getRouteTilesData(
        setError,
        setLoading,
        setData,
        undefined,
        "",
        setNoMoreRides
      );
    }
  }, []);

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
      setNoMoreRides
    );
  };

  if (!!error) {
    return <Error errMessage={error} />;
  }
  return (
    <>
      {filterFlex && (
        <RouteFiltersModal
          countryRef={countryRef}
          onClick={handleFilterApply}
          handleClear={handleClear}
        />
      )}
      {newRoutePopup && (
        <NewRouteModal setModelPopUp={() => setNewRoutePopup(false)} />
      )}
      <div className="empty-area"></div>
      <div className="filled-area container">
        <div className="top-negative">
          <div className="w-100 d-flex justify-content-between">
            <NavButton
              title="Dashboard"
              currentState={pathname.split("/")[1]}
              onClick={() => navigate("/dashboard")}
              icon="bi-house-fill"
            />
            <NavButton
              title="Favourites"
              currentState={pathname.split("/")[1]}
              onClick={() => navigate("/favourites")}
              icon="bi-star-fill"
            />
          </div>
          <div className="d-flex flex-column gap-3 position-relative">
            <br />
            <span onClick={() => setFilterFlex(true)}>
              <Filter>
                <span className="text-4 fw-bold">Search</span>
                {!!appliedFilter && (
                  <span className="text-4 mt-1">{appliedFilter}</span>
                )}
              </Filter>
            </span>
            <TitleHeader heading="Expore routes" />
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
