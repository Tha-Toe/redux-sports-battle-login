import { useContext, createContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";
import { APIURLs } from "../api/ApiUrls";
import { makeGETAPICall } from "../api/methods";
const PropsContext = createContext();

export const PropsContextProvider = ({ children }) => {
  const [propsDataCommingFromApi, setPropsDataCommingFromApi] = useState(null);
  const { userDetail, setChecking } = UserAuth();
  useEffect(() => {
    if (userDetail) {
      setPropsDataCommingFromApi("Props Data Comming From api");
    }
  }, [userDetail]);

  return (
    <PropsContext.Provider value={{ propsDataCommingFromApi }}>
      {children}
    </PropsContext.Provider>
  );
};

export const PropsData = () => {
  return useContext(PropsContext);
};

export const getAllSports = async () => {
  var apiUrl = APIURLs.getAllSports;
  const apiResponse = await makeGETAPICall(apiUrl);
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return null;
  }
};