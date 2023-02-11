import React from "react";
import { Image } from "react-bootstrap";
import { Chat } from "../../types/chat";

export default function ChatMenuCard({ data }: { data: Chat }) {
  return (
    <div
      className={`d-flex align-items-center gap-2 border-bottom p-3 border-r1 ${
        data.newChat && "highlight-chatcard"
      }`}
    >
      <Image
        className="border-r3 card-pfp"
        src={`https://api.dicebear.com/5.x/thumbs/svg?seed=${
          data.displayName.split(" ")[0]
        }`}
      />
      <span className={`${data.newChat && "fw-bold"} text-4`}>
        {data.displayName}
      </span>
    </div>
  );
}
