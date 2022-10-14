import { useContext, createContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";
import { APIURLs } from "../api/ApiUrls";
import { makeGETAPICall } from "../api/methods";
const EnterReferalContext = createContext();

export const EnterReferalContextProvider = ({ children }) => {
  const { userDetail, setChecking } = UserAuth();
  const [
    enterReferalCodeDataCommingFromApi,
    setEnterReferalCodeDataCommingFromApi,
  ] = useState(null);
  return (
    <EnterReferalContext.Provider
      value={{ enterReferalCodeDataCommingFromApi }}
    >
      {children}
    </EnterReferalContext.Provider>
  );
};

export const EnterReferalCodeData = () => {
  return useContext(EnterReferalContext);
};
