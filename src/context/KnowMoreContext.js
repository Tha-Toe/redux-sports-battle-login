import { useContext, createContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";
import { APIURLs } from "../api/ApiUrls";
import { makeGETAPICall } from "../api/methods";
const KnowMoreContext = createContext();

export const KnowMoreContextProvider = ({ children }) => {
  const { userDetail, setChecking } = UserAuth();
  return (
    <KnowMoreContext.Provider value={{}}>{children}</KnowMoreContext.Provider>
  );
};

export const KnowMoreData = () => {
  return useContext(KnowMoreContext);
};
