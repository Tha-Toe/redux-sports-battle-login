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
      getAllSports()
        .then((result) => {
          if (result) {
            console.log(result);
            setPropsDataCommingFromApi(result);
          } else {
            console.log("null");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userDetail]);

  const callPropsApi = () => {
    if (userDetail) {
      setPropsDataCommingFromApi(null);
      getAllSports()
        .then((result) => {
          if (result) {
            console.log(result);
            setPropsDataCommingFromApi(result);
          } else {
            console.log("null");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <PropsContext.Provider value={{ propsDataCommingFromApi, callPropsApi }}>
      {children}
    </PropsContext.Provider>
  );
};

export const PropsData = () => {
  return useContext(PropsContext);
};

export const getAllSports = async () => {
  var apiUrl = APIURLs.getAllSports;
  console.log(apiUrl);
  const apiResponse = await makeGETAPICall(apiUrl); //[{"Access-Control-Allow-Origin":"*"},{"Access-Control-Allow-Headers":"*"}]
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return null;
  }
};
