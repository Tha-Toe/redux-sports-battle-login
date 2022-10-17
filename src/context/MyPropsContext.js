import { useContext, createContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";
import { APIURLs } from "../api/ApiUrls";
import { makeGETAPICall } from "../api/methods";
const MyPropsContext = createContext();

export const MyPropsContextProvider = ({ children }) => {
  const { userDetail, setChecking } = UserAuth();
  const user_from_localstorage = JSON.parse(localStorage.getItem("user"));
  //upcomming
  const [upComingDataCommingFromApi, setUpComingDataCommingFromApi] =
    useState(null);
  let calling = false;
  const callUpCommingMyPropsApi = () => {
    if (!calling) {
      calling = true;
      setUpComingDataCommingFromApi(null);
      setCompleteDataCommingFromApi(null);
      setLiveDataCommingFromApi(null);

      if (user_from_localstorage) {
        getMyProps(user_from_localstorage.uid, "upcoming")
          .then((result) => {
            if (result) {
              console.log(result);
              setUpComingDataCommingFromApi(result);
              calling = false;
            } else {
              console.log("null");
              calling = false;
            }
          })
          .catch((err) => {
            console.log(err);
            calling = false;
          });
      }
    } else {
      return;
    }
  };

  //live
  const [liveDataCommingFromApi, setLiveDataCommingFromApi] = useState(null);
  const callLiveMyPropsApi = () => {
    setLiveDataCommingFromApi(null);
    setUpComingDataCommingFromApi(null);
    setCompleteDataCommingFromApi(null);

    if (user_from_localstorage) {
      getMyProps(user_from_localstorage.uid, "live")
        .then((result) => {
          if (result) {
            console.log(result);
            setLiveDataCommingFromApi(result);
          } else {
            console.log("null");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //completed
  const [completeDataCommingFromApi, setCompleteDataCommingFromApi] =
    useState(null);
  const callCompletedMyPropsApi = () => {
    setCompleteDataCommingFromApi(null);
    setUpComingDataCommingFromApi(null);
    setLiveDataCommingFromApi(null);

    if (user_from_localstorage) {
      getMyProps(user_from_localstorage.uid, "completed")
        .then((result) => {
          if (result) {
            console.log(result);
            setCompleteDataCommingFromApi(result);
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
    <MyPropsContext.Provider
      value={{
        upComingDataCommingFromApi,
        liveDataCommingFromApi,
        completeDataCommingFromApi,
        callUpCommingMyPropsApi,
        callCompletedMyPropsApi,
        callLiveMyPropsApi,
      }}
    >
      {children}
    </MyPropsContext.Provider>
  );
};

export const MyPropsData = () => {
  return useContext(MyPropsContext);
};

export const getMyProps = async (userId, status) => {
  var apiUrl = APIURLs.getMyProps;
  apiUrl = apiUrl.replace("{userId}", userId);
  apiUrl = apiUrl.replace("{status}", status);
  const apiResponse = await makeGETAPICall(apiUrl,[{'app-version': 2},{"page-num":1}]);
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return null;
  }
};