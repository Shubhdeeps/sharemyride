import React from "react";
import { Timestamp } from "../../../service/firebase/firebaseConfig";
import { firebaseTimestampToTime } from "../../../service/helperFunctions/firebaseTimestampToString";

// const data = {
//   startTime: ["16:00", "16:20"],
//   endTime: ["19:00"],
//   startPoint: "Kesklinn kess k linn",
//   endPoint: "Old town",
//   stoppage: ["Abc Town", "Cde Town"],
// };

type TimelineData = {
  startTime: (typeof Timestamp)[];
  endTime: (typeof Timestamp)[];
  startPoint: string;
  endPoint: string;
  stoppage: string[];
};
export default function Timeline(data: TimelineData) {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <Time time={data.startTime} />
        <Time time={data.endTime} />
      </div>
      <div className="d-flex align-items-center text-2 w-100 gap-1 justify-content-center">
        <div className="d-flex flex-column align-items-center">
          <i className="bi bi-car-front text-1-5"></i>
          <span className="text-3 text-center">{data.startPoint}</span>
        </div>
        <div className="position-relative">
          <div className="position-absolute w-100 h-100 d-flex justify-content-center gap-3">
            {data.stoppage.map((stop) => {
              return (
                <React.Fragment key={stop}>
                  <Stoppage name={stop} />
                </React.Fragment>
              );
            })}
          </div>
          {routeSVG}
        </div>
        <div className="d-flex flex-column align-items-center">
          <i className="bi bi-geo-alt text-1-5"></i>
          <span className="text-3 text-center">{data.endPoint}</span>
        </div>
      </div>
    </>
  );
}

// if current index is greater than zero, then make it red otherwise green
// index greater than zero means, there are multple enteries in array, so delayed.
const Time = ({ time }: { time: (typeof Timestamp)[] }) => {
  const timeLastIndex = time.length - 1;
  const timeAvail = time[0].seconds;
  if (isNaN(timeAvail)) {
    return <></>;
  }
  return (
    <div className="d-flex flex-column align-items-center text-4 mt-3">
      {time.map((time, ind) => {
        const timeFormatted = firebaseTimestampToTime(time);
        return (
          <span
            className={` ${ind > 0 ? "font-danger" : "font-safe "} ${
              ind === timeLastIndex && "text-3 fw-bold"
            }`}
            key={timeFormatted}
          >
            {timeFormatted} {ind > 0 && <>Delayed</>}
            {timeLastIndex === 0 && <>On-time</>}
          </span>
        );
      })}
    </div>
  );
};

const Stoppage = ({ name }: { name: string }) => (
  <div className="d-flex flex-column h-100 align-items-center">
    <i className="bi bi-geo-alt text-3 font-safe"></i>
    <span className="text-5 mt-1 font-safe">{name}</span>
  </div>
);

const routeSVG = (
  <svg width="100%" height="8" viewBox="0 0 285 8" fill="none">
    <path
      d="M284.354 4.35358C284.549 4.15832 284.549 3.84173 284.354 3.64647L281.172 0.464491C280.976 0.269229 280.66 0.269228 280.464 0.464491C280.269 0.659753 280.269 0.976335 280.464 1.1716L283.293 4.00002L280.464 6.82845C280.269 7.02371 280.269 7.3403 280.464 7.53556C280.66 7.73082 280.976 7.73082 281.172 7.53556L284.354 4.35358ZM-4.37114e-08 4.5L284 4.50002L284 3.50002L4.37114e-08 3.5L-4.37114e-08 4.5Z"
      fill="black"
    />
  </svg>
);
