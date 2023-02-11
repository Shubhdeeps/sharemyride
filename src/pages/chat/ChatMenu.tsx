import React, { useState, useEffect } from "react";
import ChatMenuCard from "../../components/cards/ChatMenuCard";
import Error from "../../components/error/Error";
import Loader from "../../components/loader";
import { Chat } from "../../types/chat";
import { NotificationCard } from "../notifications/NotificationCard";

const dataarray: Chat[] = [
  {
    authorId: "abc",
    displayName: "shubh",
    newChat: false,
  },
  {
    authorId: "abc",
    displayName: "John",
    newChat: true,
  },
  {
    authorId: "abc",
    displayName: "Simon",
    newChat: false,
  },
  {
    authorId: "abc",
    displayName: "Username",
    newChat: false,
  },
];
export default function ChatMenu() {
  const [data, setData] = useState<Chat[]>(dataarray);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  if (error) {
    return <Error errMessage={error} />;
  }

  return (
    <>
      <div className="empty-area"></div>
      <div className="filled-area container">
        <div className="ps-2 text-3 mt-1 fw-bold">MESSAGES</div>
        <div className="mt-3 d-flex flex-column">
          {data.map((eachChat) => {
            return (
              <React.Fragment key={eachChat.authorId}>
                <ChatMenuCard data={eachChat} />
              </React.Fragment>
            );
          })}
          {loading && <Loader />}
        </div>
      </div>
    </>
  );
}
