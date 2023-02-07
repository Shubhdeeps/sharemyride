import { Timestamp } from "./firebaseConfig";

export const firebaseTimestampToString = (time: typeof Timestamp) => {
  const seconds = time.seconds;

  if (seconds < 60) {
    return `${seconds} secs ago`;
  }
  if (seconds < 3600) {
    return `${seconds / 60} mins ago`;
  }
  if (seconds < 24 * 3600) {
    return `${seconds / 3600} hrs ago`;
  }
  if (seconds < 30 * 24 * 3600) {
    return `${seconds / (24 * 3600)} days ago`;
  }
};

export const firebaseTimestampToTime = (firebaseDate: typeof Timestamp) => {
  const hrs = firebaseDate.toDate().getHours().toString().padStart(2, "0");
  const mins = firebaseDate.toDate().getMinutes().toString().padStart(2, "0");
  const time = `${hrs}:${mins}`;
  return time;
};
