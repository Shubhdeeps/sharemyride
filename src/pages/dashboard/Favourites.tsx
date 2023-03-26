import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RouteCard from "../../components/cards/RouteCard";
import TitleHeader from "../../components/cards/TitleHeader";
import Error from "../../components/error/Error";
import FloatButton from "../../components/inputFields/FloatButton";
import Loader from "../../components/loader";
import NewRouteModal from "../../components/modals/NewRouteModal";
import NavButton from "../../components/navigationBars/NavButton";
import { getFavouriteRouteTiles } from "../../service/firebase/collectionOperations";
import { RouteTileDB } from "../../types/RoutesTile";
import { floatIcon } from "./floatIcon";

export default function Favourites() {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const [newRoutePopup, setNewRoutePopup] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<RouteTileDB[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFavouriteRouteTiles(setError, setLoading, setData);
  }, []);

  if (!!error) {
    return <Error errMessage={error} />;
  }
  return (
    <>
      {newRoutePopup && (
        <NewRouteModal setModelPopUp={() => setNewRoutePopup(false)} />
      )}
      <div className="empty-area"></div>
      <div className="filled-area">
        <div className="container top-negative d-flex flex-column gap-3">
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
            <TitleHeader heading="Favourite routes" />
            <div className="d-flex gap-2 flex-wrap">
              {data.map((routeData) => {
                return (
                  <React.Fragment key={routeData.routeId}>
                    <RouteCard
                      startPoint={routeData.depart}
                      countryName={routeData.country}
                      endPoint={routeData.arrive}
                      isFavourite={true}
                    />
                  </React.Fragment>
                );
              })}
            </div>
            {loading && <Loader />}
          </div>
          <FloatButton onClick={() => setNewRoutePopup(true)}>
            {floatIcon}
          </FloatButton>
        </div>
      </div>
    </>
  );
}
