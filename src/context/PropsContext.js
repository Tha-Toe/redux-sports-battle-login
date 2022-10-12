import { useContext, createContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";
import { APIURLs } from "../api/ApiUrls";
import { makeGETAPICall } from "../api/methods";

const PropsContext = createContext();

export const PropsContextProvider = ({ children }) => {
  const { user, setChecking } = UserAuth();
  const [propsData, setPropsData] = useState(null);
  useEffect(() => {
    if (user) {
      console.log("calling api");
      var result = getUserById(user.uid);
      console.log(result);
      setChecking(false);
      setPropsData("props data comming from api");
    }
  }, [user]);

  return (
    <PropsContext.Provider value={{ propsData }}>
      {children}
    </PropsContext.Provider>
  );
};

export const PropsData = () => {
  return useContext(PropsContext);
};

export const getUserById = async userId => {
  var apiUrl = APIURLs.getUserInfo;
  console.log(apiUrl);
  apiUrl = apiUrl.replace('{userId}', userId);
  const apiResponse = await makeGETAPICall(apiUrl);
  if (apiResponse.status === 200) {
  return apiResponse.data;
  } else {
  return null;
  }
};