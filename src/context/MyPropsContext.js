import { useContext, createContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";
import { APIURLs } from "../api/ApiUrls";
import { makeGETAPICall } from "../api/methods";
const MyPropsContext = createContext();

export const MyPropsContextProvider = ({ children }) => {
  const { userDetail, setChecking } = UserAuth();
  const [myPropsDataComingFromApi, setMyPropsDataComingFromApi] =
    useState(null);

  return (
    <MyPropsContext.Provider value={{ myPropsDataComingFromApi }}>
      {children}
    </MyPropsContext.Provider>
  );
};

export const MyPropsData = () => {
  return useContext(MyPropsContext);
};

export const getMyProps = async (userId,status) => {
  var apiUrl = APIURLs.getMyProps;
  apiUrl = apiUrl.replace("{userId}", userId);
  apiUrl = apiUrl.replace("{status}", status);
  const apiResponse = await makeGETAPICall(apiUrl);
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return null;
  }
};
