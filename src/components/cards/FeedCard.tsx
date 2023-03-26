import React from "react";
import { auth } from "../../service/firebase/firebaseConfig";
import { localization } from "../../service/languages/languages";
import { FeedModalDB } from "../../types/Feed";
import Extension from "../navigationBars/Extension";
import ProfileDetails from "./cars/ProfileDetails";

export default function FeedCard({
  data,
  handleDeletePost,
}: {
  data: FeedModalDB;
  handleDeletePost: Function;
}) {
  const isBelongToCurrUser = data.author === auth.currentUser?.uid!;
  return (
    <div className="d-flex flex-column gap-2 p-2 feed-card border border-r1">
      <div className="d-flex justify-content-between align-items-start">
        <ProfileDetails
          created={data.created}
          displayName={data.displayName}
          photoURL={data.photoURL}
        />
        {isBelongToCurrUser && (
          <Extension>
            <span
              onClick={() => handleDeletePost(data.id)}
              className="text-3 font-danger ps-3 pe-3"
            >
              {localization.Delete}
            </span>
          </Extension>
        )}
      </div>
      <span className="text-3 ">{data.text}</span>
    </div>
  );
}
