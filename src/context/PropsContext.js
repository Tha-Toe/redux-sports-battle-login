import { useContext, createContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";
import { APIURLs } from "../api/ApiUrls";
import { makeGETAPICall } from "../api/methods";

const PropsContext = createContext();

export const PropsContextProvider = ({ children }) => {
  const { user, setChecking } = UserAuth();
  const [userDetail, setUserDetail] = useState(null);
  useEffect(() => {
    if (user) {
      console.log("calling api");
      getUserById(user.uid)
        .then((result) => {
          if (result) {
            //user is not null will get details
            setUserDetail(result);

          } else {
            //user is null create user
          }



          //loading false
          setChecking(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <PropsContext.Provider value={{ userDetail }}>
      {children}
    </PropsContext.Provider>
  );
};

export const PropsData = () => {
  return useContext(PropsContext);
};

export const getUserById = async (userId) => {
  var apiUrl = APIURLs.getUserInfo;
  console.log(apiUrl);
  apiUrl = apiUrl.replace("{userId}", userId);
  const apiResponse = await makeGETAPICall(apiUrl);
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return null;
  }
};
