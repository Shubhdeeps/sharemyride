import React from "react";
import { Image } from "react-bootstrap";
import { Timestamp } from "../../../service/firebase/firebaseConfig";
import { firebaseTimestampToString } from "../../../service/helperFunctions/firebaseTimestampToString";

type Props = {
  created: typeof Timestamp;
  photoURL: string;
  displayName: string;
};
export default function ProfileDetails({
  photoURL,
  displayName,
  created,
}: Props) {
  return (
    <div className="d-flex gap-1 align-items-center">
      {!!photoURL ? (
        <Image
          style={{ width: "55px", height: "55px" }}
          className="border-r1"
          fluid
          src={photoURL}
        />
      ) : (
        <div className="card-pfp primary-bg d-flex align-items-center justify-content-center fontLight fw-bold">
          J
        </div>
      )}
      <div className="d-flex flex-column align-items-start">
        <span className="text-2">{displayName.split(" ")[0]}</span>
        <span className="text-4 mt--1">
          {firebaseTimestampToString(created)}
        </span>
      </div>
    </div>
  );
}
