import { useContext, createContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";
import { APIURLs } from "../api/ApiUrls";
import { makeGETAPICall } from "../api/methods";
const KnowMoreContext = createContext();

export const KnowMoreContextProvider = ({ children }) => {
  const { userDetail, setChecking } = UserAuth();
  const [knowMoreDataCommingFromApi, setKnowMoreDataCommingFromApi] =
    useState(null);
  return (
    <KnowMoreContext.Provider value={{ knowMoreDataCommingFromApi }}>
      {children}
    </KnowMoreContext.Provider>
  );
};

export const KnowMoreData = () => {
  return useContext(KnowMoreContext);
};
