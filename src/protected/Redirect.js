import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
export default function Redirect({ children }) {
  const { user } = UserAuth();
  if (user) {
    return <Navigate to="/home" />;
  }
  return children;
}
