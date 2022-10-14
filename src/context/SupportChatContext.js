import { useContext, createContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";
import { APIURLs } from "../api/ApiUrls";
import { makeGETAPICall } from "../api/methods";
const SupportChatContext = createContext();

export const SupportChatContextProvider = ({ children }) => {
  const { userDetail, setChecking } = UserAuth();
  const [supportChatDataCommingFromApi, setSupportChatDataCommingFromApi] =
    useState(null);

  const callSupportChatApi = () => {
    return;
  };
  return (
    <SupportChatContext.Provider
      value={{ supportChatDataCommingFromApi, callSupportChatApi }}
    >
      {children}
    </SupportChatContext.Provider>
  );
};

export const SupportChatContextData = () => {
  return useContext(SupportChatContext);
};
