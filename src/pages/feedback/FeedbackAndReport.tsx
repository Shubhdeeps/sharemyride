import React, { useRef, useState } from "react";
import TitleHeader from "../../components/cards/TitleHeader";
import InputTextAreaPrimary from "../../components/inputFields/InputTextAreaPrimary";
import Loader from "../../components/loader";
import { setFeedBack } from "../../service/firebase/collectionOperations";
import { localization } from "../../service/languages/languages";

export default function FeedbackAndReport() {
  const feedbackRef = useRef("");
  const reportRef = useRef("");
  const [isSubmitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (!!feedbackRef.current || !!reportRef.current) {
      setLoading(true);
      await setFeedBack(feedbackRef.current, reportRef.current);
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="d-flex flex-column gap-2">
      <div className="empty-area"></div>
      <div className="filled-area container">
        <div className="top-negative d-flex flex-column gap-3">
          <TitleHeader heading="Feedback or Report an issue" />
          {loading ? (
            <Loader />
          ) : (
            <>
              {isSubmitted ? (
                <div className="fw-bold font-safe text-2 d-flex gap-2 align-items-center justify-content-center">
                  {localization["Submitted"]}
                  <i className="bi bi-check-lg"></i>
                </div>
              ) : (
                <>
                  <InputTextAreaPrimary
                    placeholder="feedback"
                    textRef={feedbackRef}
                    title="Feedback"
                  />
                  <InputTextAreaPrimary
                    placeholder="Report an issue"
                    textRef={reportRef}
                    title="Report"
                  />
                  <button onClick={() => handleSubmit()}>
                    {localization["Submit"]}
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
