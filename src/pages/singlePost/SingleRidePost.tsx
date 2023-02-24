import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CarsCard from "../../components/cards/CarsCard";
import TitleHeader from "../../components/cards/TitleHeader";
import Error from "../../components/error/Error";
import Loader from "../../components/loader";
import RideRequestTicket from "../../components/singleRequest/RideRequestTicket";
import {
  getRideRequestsBasedOnRideId,
  getSingleRideBasedOnRideId,
} from "../../service/firebase/collectionOperations";
import { RequestsDB } from "../../types/Requst.modal";
import { RideDB } from "../../types/ride.model";

// page for comments in singel ride
export default function ReviewRidePost() {
  const { rideId } = useParams();
  const [data, setData] = useState<RideDB>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [requestsData, setRequestsData] = useState<RequestsDB[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  useEffect(() => {
    getSingleRideBasedOnRideId(rideId as string, setError, setLoading, setData);
  }, []);

  useEffect(() => {
    if (data) {
      getRideRequestsBasedOnRideId(
        rideId as string,
        setError,
        setLoadingRequests,
        setRequestsData
      );
    }
  }, [data]);

  if (!!error) {
    return <Error errMessage={error} />;
  }

  return (
    <>
      <div className="empty-area"></div>
      <div className="filled-area">
        <Container>
          <br />
          {loading && <Loader />}
          {data && <CarsCard data={data} requestRideOnClick={undefined} />}
          <br />
          <TitleHeader heading="Requests" />
          {loadingRequests && <Loader />}
          <div className="d-flex flex-column gap-2 mt-2">
            {requestsData.map((request) => {
              return (
                <React.Fragment key={request.uid}>
                  <RideRequestTicket
                    data={request}
                    rideOwner={data?.authorId as string}
                    role="ride"
                  />
                </React.Fragment>
              );
            })}
          </div>
          <br />
        </Container>
      </div>
    </>
  );
}
