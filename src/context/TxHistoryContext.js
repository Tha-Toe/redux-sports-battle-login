import { useContext, createContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";
import { APIURLs } from "../api/ApiUrls";
import { makeGETAPICall } from "../api/methods";
const TxHistoryContext = createContext();

export const TxHistoryContextProvider = ({ children }) => {
  const { userDetail, setChecking } = UserAuth();
  return (
    <TxHistoryContext.Provider value={{}}>{children}</TxHistoryContext.Provider>
  );
};

export const TxHistoryData = () => {
  return useContext(TxHistoryContext);
};
