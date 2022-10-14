import { useContext, createContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";
import { APIURLs } from "../api/ApiUrls";
import { makeGETAPICall } from "../api/methods";
const MyAccountContext = createContext();

export const MyAccountContextProvider = ({ children }) => {
  const { userDetail, setChecking } = UserAuth();
  const [myAccountDataCommingFromApi, setMyAccountDataCommingFromApi] =
    useState(null);
  return (
    <MyAccountContext.Provider value={{ myAccountDataCommingFromApi }}>
      {children}
    </MyAccountContext.Provider>
  );
};

export const MyAccountContextData = () => {
  return useContext(MyAccountContext);
};
