import { useContext, createContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";
import { APIURLs } from "../api/ApiUrls";
import { makeGETAPICall } from "../api/methods";
const EnterReferalContext = createContext();

export const EnterReferalContextProvider = ({ children }) => {
  const { userDetail, setChecking } = UserAuth();
  return (
    <EnterReferalContext.Provider value={{}}>
      {children}
    </EnterReferalContext.Provider>
  );
};

export const EnterReferalCodeData = () => {
  return useContext(EnterReferalContext);
};
