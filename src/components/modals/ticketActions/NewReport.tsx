import React, { useState, useRef } from "react";
import { reportATicket } from "../../../service/firebase/collectionOperations";
import InputTextFieldSecondary from "../../inputFields/InputTextFieldSecondary";
import Loader from "../../loader";

export default function NewReport({
  ticketId,
  setAction,
  role,
}: {
  ticketId: string;
  setAction: Function;
  role: "passenger" | "ride";
}) {
  const reportRef = useRef("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => setAction(null);
  const handleReport = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await reportATicket(ticketId, reportRef.current, role);
    setLoading(false);
    handleClose();
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <form
      onSubmit={(e) => handleReport(e)}
      className="d-flex flex-column gap-2"
    >
      <span className="fw-bold text-3">REPORT</span>
      <InputTextFieldSecondary
        placeholder="report"
        textRef={reportRef}
        title="Comment"
        type="text"
      />
      <div className="d-flex gap-2 justify-content-end">
        <button type="button" onClick={handleClose}>
          Cancle
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
