import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../service/helperFunctions/captalizeFirstLetter";
import {
  addRouteToFavourite,
  removeFromFavourite,
} from "../../service/firebase/collectionOperations";
import OutlinedButton from "../inputFields/OutlinedButton";
type Props = {
  countryName: string;
  startPoint: string;
  endPoint: string;
  isFavourite: boolean;
};

export default function RouteCard(data: Props) {
  const [isFav, setFavourite] = useState(data.isFavourite);
  const navigation = useNavigate();
  const handleAddToFav = () => {
    setFavourite((prevState) => !prevState);
    if (isFav) {
      //already fav, remove it

      removeFromFavourite(data.startPoint, data.endPoint, data.countryName);
    } else {
      // not fav, add to fav
      addRouteToFavourite(data.startPoint, data.endPoint, data.countryName);
    }
  };

  const handleRoute = () => {
    const routeId = `${data.startPoint.toLowerCase()}_${data.endPoint.toLowerCase()}_${data.countryName.toLowerCase()}`;
    navigation(`/route/${routeId}`);
  };
  return (
    <Container className="primary-color container border-r1 route-card p-3 shadow d-flex flex-column justify-content-between">
      <span className="text-3 fw-bold">
        {capitalizeFirstLetter(data.countryName)} <i className="bi bi-flag"></i>
      </span>
      <div className="d-flex align-items-center text-2 w-100 gap-1">
        <span>{capitalizeFirstLetter(data.startPoint)}</span>
        <i className="bi bi-car-front"></i>
        <div className="flex-grow-1">{routeSVG}</div>
        <i className="bi bi-geo-alt"></i>
        <span>{capitalizeFirstLetter(data.endPoint)}</span>
      </div>
      <div
        onClick={() => handleAddToFav()}
        className="text-3 d-flex gap-2 align-items-center cursor noselect"
      >
        {isFav ? (
          <>
            <i className="bi bi-star-fill highlight-color"></i> Favourite
          </>
        ) : (
          <>
            <i className="bi bi-star"></i> Add to favourite
          </>
        )}
      </div>
      <br />
      <OutlinedButton title="See Rides" onClick={() => handleRoute()} />
    </Container>
  );
}

const routeSVG = (
  <svg width="100%" height="1" fill="none">
    <line
      x1="0.5"
      y1="0.5"
      x2="100%"
      y2="0.5"
      stroke="black"
      strokeLinecap="round"
      strokeDasharray="10 10"
    />
  </svg>
);
