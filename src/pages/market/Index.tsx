import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TitleHeader from "../../components/cards/TitleHeader";
import Error from "../../components/error/Error";
import FloatButton from "../../components/inputFields/FloatButton";
import Loader from "../../components/loader";
import CreateCommuteOfferModal from "../../components/modals/CommuteOfferModal";
import DeleteMarketPlaceAdConfirmation from "../../components/modals/DeleteMarketPlaceAdConfirmation";
import { DateHeader } from "../../components/timeline/DateTimestampHeader";
import TimelineCardMarket from "../../components/timeline/TimelineCardMarket";
import { TimelineTag } from "../../components/timeline/TimelineTag";
import { Timestamp, timestamp } from "../../service/firebase/firebaseConfig";
import { getMarketPlacePosts } from "../../service/firebase/marketPlace";
import { firebaseTimestampToDayNumber } from "../../service/helperFunctions/firebaseTimestampToString";
import { RidePopUp } from "../../types/customTypes.model";
import { MarketPlaceDB } from "../../types/marketPlace";

export default function MarketPlace() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [data, setData] = useState<MarketPlaceDB[]>([]);
  const [dataFilter, setDataFilter] = useState<MarketPlaceDB[]>([]);
  const [filter, setFilter] = useState<"ALL" | "MINE">("ALL");
  const [marketPlaceData, setMarketPlaceData] = useState<MarketPlaceDB[]>([]);
  const [commuteOffer, setCommuteOffer] = useState("");
  const [noMoreRides, setNoMoreRides] = useState("");

  const [marketPopUp, setMarketPopUp] = useState<string | null>(null);

  // for timestamp on timeline
  const previousDateRef = useRef(timestamp.now());

  const handleFloatButton = () => {
    navigate("/market/create");
  };

  //run when data arrives
  // set marketData when new dat arrives
  useEffect(() => {
    if (!!data.length) {
      setMarketPlaceData((prevState) => [...prevState, ...data]);
    }
  }, [data]);

  // run on filter change
  // when filter changes, set marketData from index 0
  useEffect(() => {
    if (!!dataFilter.length) {
      setMarketPlaceData(dataFilter);
      setDataFilter([]);
    }
  }, [dataFilter]);

  // run only once
  useEffect(() => {
    const now = timestamp.now();
    fetchData(now, setData, filter);
  }, []);

  const handleFilterChange = (filterName: "ALL" | "MINE") => {
    setFilter(filterName);
    const now = timestamp.now();
    fetchData(now, setDataFilter, filterName);
  };

  const fetchMore = () => {
    const lastPostDate = marketPlaceData[marketPlaceData.length - 1].startTime;
    fetchData(lastPostDate, setData, filter);
  };

  const fetchData = (
    time: typeof Timestamp,
    setData: Function,
    filterName: "ALL" | "MINE"
  ) => {
    getMarketPlacePosts(
      setError,
      setLoading,
      setData,
      time,
      filterName,
      setNoMoreRides
    );
  };

  if (error) {
    return <Error errMessage={error} />;
  }

  return (
    <>
      {!!marketPopUp && (
        <DeleteMarketPlaceAdConfirmation
          marketTicketId={marketPopUp}
          setAction={setMarketPopUp}
        />
      )}
      {!!commuteOffer && (
        <CreateCommuteOfferModal
          commuteId={commuteOffer}
          setModalFlex={setCommuteOffer}
        />
      )}
      <div className="empty-area"></div>
      <div className="filled-area container">
        <div className="h-100 d-flex flex-column top-negative">
          <TitleHeader heading="Buy and Sell Bus/Train tickets" />
          <div className="d-flex gap-2 noselect mt-2">
            <div className="d-flex align-items-center gap-1 border border-r1 p-2 cursor">
              <span
                onClick={() => {
                  handleFilterChange("ALL");
                }}
              >
                ALL
              </span>
              {filter === "ALL" && (
                <i className="bi bi-check font-safe text-2"></i>
              )}
            </div>
            <div className="d-flex align-items-center gap-1 border border-r1 p-2 cursor">
              <span
                onClick={() => {
                  handleFilterChange("MINE");
                }}
              >
                MINE
              </span>
              {filter === "MINE" && (
                <i className="bi bi-check font-safe text-2"></i>
              )}
            </div>
          </div>
          <div className="d-flex align-items-stretch w-100 mt-3">
            <div className="left-lining"></div>
            <div className="right-lining d-flex flex-column gap-4">
              {marketPlaceData.map((sale, index) => {
                const isCurrentTimeChanged =
                  firebaseTimestampToDayNumber(previousDateRef.current) !==
                  firebaseTimestampToDayNumber(sale.startTime);
                previousDateRef.current = sale.startTime;
                return (
                  <React.Fragment key={sale.commuteId}>
                    {(isCurrentTimeChanged || index === 0) && (
                      <DateHeader date={previousDateRef.current} />
                    )}
                    <TimelineCardMarket
                      data={sale}
                      setCommuteOffer={setCommuteOffer}
                      setRidePop={setMarketPopUp}
                    />
                  </React.Fragment>
                );
              })}
              {!!marketPlaceData.length && noMoreRides && (
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
          <FloatButton onClick={handleFloatButton}>{btnSVG}</FloatButton>
        </div>
      </div>
    </>
  );
}

const btnSVG = (
  <svg
    width="40"
    height="32"
    viewBox="0 0 40 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.65 30.9V19.55L19.5 11.15C19.5667 10.9167 19.7 10.7167 19.9 10.55C20.1 10.3833 20.3833 10.3 20.75 10.3H35.9C36.2667 10.3 36.5417 10.375 36.725 10.525C36.9083 10.675 37.05 10.8833 37.15 11.15L40 19.55V30.9C40 31.2 39.8917 31.4583 39.675 31.675C39.4583 31.8917 39.2 32 38.9 32H37.8C37.5 32 37.2417 31.8917 37.025 31.675C36.8083 31.4583 36.7 31.2 36.7 30.9V28.65H19.95V30.9C19.95 31.2 19.8417 31.4583 19.625 31.675C19.4083 31.8917 19.15 32 18.85 32H17.75C17.45 32 17.1917 31.8917 16.975 31.675C16.7583 31.4583 16.65 31.2 16.65 30.9ZM19.3 18.05H37.35L35.45 12.3H21.2L19.3 18.05ZM22 25.35C22.5667 25.35 23.0333 25.1667 23.4 24.8C23.7667 24.4333 23.95 23.9667 23.95 23.4C23.95 22.8333 23.7667 22.3667 23.4 22C23.0333 21.6333 22.5667 21.45 22 21.45C21.4333 21.45 20.9667 21.6333 20.6 22C20.2333 22.3667 20.05 22.8333 20.05 23.4C20.05 23.9667 20.2333 24.4333 20.6 24.8C20.9667 25.1667 21.4333 25.35 22 25.35ZM34.65 25.35C35.2167 25.35 35.6833 25.1667 36.05 24.8C36.4167 24.4333 36.6 23.9667 36.6 23.4C36.6 22.8333 36.4167 22.3667 36.05 22C35.6833 21.6333 35.2167 21.45 34.65 21.45C34.0833 21.45 33.6167 21.6333 33.25 22C32.8833 22.3667 32.7 22.8333 32.7 23.4C32.7 23.9667 32.8833 24.4333 33.25 24.8C33.6167 25.1667 34.0833 25.35 34.65 25.35ZM4.2 32V30.95L7.05 28.1C5.15 28.1 3.5 27.525 2.1 26.375C0.7 25.225 0 23.75 0 21.95V5.55C0 3.35 0.866667 1.875 2.6 1.125C4.33333 0.375 7.76667 0 12.9 0C17.6667 0 21.0083 0.408334 22.925 1.225C24.8417 2.04167 25.8 3.48333 25.8 5.55V8.8H22.8V4.95H3V18.4H15.15V32H4.2ZM5.55 23.9C6.11667 23.9 6.58333 23.7167 6.95 23.35C7.31667 22.9833 7.5 22.5167 7.5 21.95C7.5 21.3833 7.31667 20.9167 6.95 20.55C6.58333 20.1833 6.11667 20 5.55 20C4.98333 20 4.51667 20.1833 4.15 20.55C3.78333 20.9167 3.6 21.3833 3.6 21.95C3.6 22.5167 3.78333 22.9833 4.15 23.35C4.51667 23.7167 4.98333 23.9 5.55 23.9ZM18.65 26.65H38V20.05H18.65V26.65Z"
      fill="#FEFEFE"
    />
    <circle cx="31" cy="9" r="8.5" fill="#FEFEFE" stroke="#252C34" />
    <path
      d="M30.4643 14V9.53571H26V8.46429H30.4643V4H31.5357V8.46429H36V9.53571H31.5357V14H30.4643Z"
      fill="#252C34"
    />
  </svg>
);
