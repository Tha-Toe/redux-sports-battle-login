import { useContext, createContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";
import { APIURLs } from "../api/ApiUrls";
import { makeGETAPICall } from "../api/methods";
const MyAccountContext = createContext();

export const MyAccountContextProvider = ({ children }) => {
  const { userDetail, setChecking } = UserAuth();
  const [myAccountDataCommingFromApi, setMyAccountDataCommingFromApi] =
    useState(null);

  const callProfileApi = () => {
    return;
  };
  return (
    <MyAccountContext.Provider
      value={{ myAccountDataCommingFromApi, callProfileApi }}
    >
      {children}
    </MyAccountContext.Provider>
  );
};

export const MyAccountContextData = () => {
  return useContext(MyAccountContext);
};
