import React from "react";

export default function Error({ errMessage }: { errMessage: string }) {
  return <div className="text-2 text-danger text-center">{errMessage}</div>;
}
