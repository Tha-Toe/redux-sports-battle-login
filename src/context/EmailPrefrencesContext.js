import { useContext, createContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";
import { APIURLs } from "../api/ApiUrls";
import { makeGETAPICall } from "../api/methods";
const EmailPrefrenceContext = createContext();

export const EmailPrefrenceContextProvider = ({ children }) => {
  const { userDetail, setChecking } = UserAuth();
  return (
    <EmailPrefrenceContext.Provider value={{}}>
      {children}
    </EmailPrefrenceContext.Provider>
  );
};

export const EmailPrefrenceContextData = () => {
  return useContext(EmailPrefrenceContext);
};
