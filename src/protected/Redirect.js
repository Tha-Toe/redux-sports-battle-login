import React from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../component/loadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";

export default function Redirect({ children }) {
  const checking = useSelector((state) => state.user.checking);
  const user = useSelector((state) => state.user.user);
  if (checking) {
    return <LoadingSpinner />;
  } else if (user) {
    return <Navigate to="/home" />;
  }
  return children;
}
