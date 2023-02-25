import React, { useState, useEffect } from "react";
import Error from "../../components/error/Error";
import Loader from "../../components/loader";
import { Timestamp } from "../../service/firebase/firebaseConfig";
import { getAllNotificationsByUid } from "../../service/firebase/notification";
import { NotificationDB } from "../../types/notification.model";
import { NotificationCard } from "./NotificationCard";

export default function Notification() {
  const [data, setData] = useState<NotificationDB[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<NotificationDB[]>([]);
  const noMoreToLoad = data.length === 0 || data.length < 20;
  const fetchData = (lastVisibleItemDate: typeof Timestamp | undefined) => {
    getAllNotificationsByUid(
      setError,
      setLoading,
      setData,
      lastVisibleItemDate
    );
  };

  const fetchMore = () => {
    const lastDate = notifications[notifications.length - 1].created;
    fetchData(lastDate);
  };

  useEffect(() => {
    fetchData(undefined);
  }, []);

  useEffect(() => {
    if (!!data.length) {
      setNotifications((prevState) => [...prevState, ...data]);
    }
  }, [data]);

  if (error) {
    return <Error errMessage={error} />;
  }

  return (
    <>
      <div className="empty-area"></div>
      <div className="filled-area">
        <div className="ps-2 text-4 mt-1 fw-bold container">NOTIFICATIONS</div>
        <div className="mt-3 d-flex flex-column container">
          {notifications.map((notification) => {
            return (
              <React.Fragment key={notification.notificationId}>
                <NotificationCard data={notification} />
              </React.Fragment>
            );
          })}
          {loading ? (
            <Loader />
          ) : (
            <>
              {!noMoreToLoad && (
                <div className="p-3 text-center w-100">
                  <i
                    onClick={() => fetchMore()}
                    className="bi bi-plus-circle text-2-5"
                  >
                    {" "}
                    Load more
                  </i>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
