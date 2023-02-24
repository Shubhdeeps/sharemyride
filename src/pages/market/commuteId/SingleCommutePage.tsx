import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CommuteOfferCard from "../../../components/cards/CommuteOfferCard";
import MarketCard from "../../../components/cards/MarketCard";
import TitleHeader from "../../../components/cards/TitleHeader";
import Error from "../../../components/error/Error";
import Loader from "../../../components/loader";
import {
  getCommuteOfferRequests,
  getSingleCommute,
} from "../../../service/firebase/marketPlace";
import { CommuteOffer, MarketPlaceDB } from "../../../types/marketPlace";

export default function SingleCommutePage() {
  const { commuteId } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [loading1, setLoading1] = useState("");
  const [data, setData] = useState<MarketPlaceDB | undefined>(undefined);
  const [offers, setOffers] = useState<CommuteOffer[]>([]);

  useEffect(() => {
    getSingleCommute(setError, setLoading, setData, commuteId as string);
  }, []);

  useEffect(() => {
    if (data) {
      getCommuteOfferRequests(
        setError,
        setLoading1,
        setOffers,
        commuteId as string
      );
    }
  }, [data]);
  if (error) {
    return <Error errMessage={error} />;
  }
  return (
    <>
      <div className="empty-area"></div>
      <div className="filled-area">
        <Container className="d-flex flex-column gap-3 pt-3 pb-3">
          <TitleHeader heading="On sale" />
          {loading && <Loader />}
          {data && <MarketCard data={data} />}
          <TitleHeader heading="Offers" />
          {loading1 ? (
            <Loader />
          ) : (
            <>
              {data &&
                offers.map((offer) => {
                  return (
                    <React.Fragment key={offer.offerId}>
                      <CommuteOfferCard
                        data={offer}
                        ownerAutorId={data.authorId}
                      />
                    </React.Fragment>
                  );
                })}
            </>
          )}
        </Container>
      </div>
    </>
  );
}
