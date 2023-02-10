import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Index() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!pathname.split("/")[1]) {
      navigate("/dashboard");
    }
  });
  return <></>;
}
