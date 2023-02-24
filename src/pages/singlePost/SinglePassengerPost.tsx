import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PassengerCard from "../../components/cards/PassengerCard";
import TitleHeader from "../../components/cards/TitleHeader";
import Error from "../../components/error/Error";
import Loader from "../../components/loader";
import RideRequestTicket from "../../components/singleRequest/RideRequestTicket";
import {
  getPassengerRequestsBasedOnRideId,
  getSinglePassengerBasedOnRideId,
} from "../../service/firebase/collectionOperations";
import { PassengerDB } from "../../types/passenger.model";
import { RequestsDB } from "../../types/Requst.modal";

// page for comments in singel ride
export default function SinglePassengerPost() {
  const { passengerId } = useParams();
  const [data, setData] = useState<PassengerDB>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [requestsData, setRequestsData] = useState<RequestsDB[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  useEffect(() => {
    getSinglePassengerBasedOnRideId(
      passengerId as string,
      setError,
      setLoading,
      setData
    );
  }, []);

  useEffect(() => {
    if (data) {
      getPassengerRequestsBasedOnRideId(
        passengerId as string,
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
          {data && <PassengerCard data={data} requestRideOnClick={undefined} />}
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
                    role="passenger"
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
