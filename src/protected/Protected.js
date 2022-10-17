import { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import LoadingSpinner from "../component/loadingSpinner/LoadingSpinner";
import { auth } from "../config/firebase";
export default function Protected({ children }) {
  const { user, checking } = UserAuth();
  if (checking) {
    return <LoadingSpinner />;
  } else if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}
