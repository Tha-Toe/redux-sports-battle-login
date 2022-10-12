import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import LoadingSpinner from "../component/loadingSpinner/LoadingSpinner";
export default function Redirect({ children }) {
  const { user, checking } = UserAuth();
  if (checking) {
    return <LoadingSpinner />;
  } else if (user) {
    return <Navigate to="/home" />;
  }
  return children;
}
