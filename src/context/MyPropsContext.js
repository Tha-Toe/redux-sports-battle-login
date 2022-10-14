import { useContext, createContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";
import { APIURLs } from "../api/ApiUrls";
import { makeGETAPICall } from "../api/methods";
const MyPropsContext = createContext();

export const MyPropsContextProvider = ({ children }) => {
  const { userDetail, setChecking } = UserAuth();
  const [myPropsDataCommingFromApi, setMyPropsDataCommingFromApi] =
    useState(null);

  return (
    <MyPropsContext.Provider value={{ myPropsDataCommingFromApi }}>
      {children}
    </MyPropsContext.Provider>
  );
};

export const MyPropsData = () => {
  return useContext(MyPropsContext);
};
