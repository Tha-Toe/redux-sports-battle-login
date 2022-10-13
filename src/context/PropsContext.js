import { useContext, createContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";

const PropsContext = createContext();

export const PropsContextProvider = ({ children }) => {
  const { userDetail, setChecking } = UserAuth();
  useEffect(() => {
    if (userDetail) {
      console.log("calling props apis");
    }
  }, [userDetail]);

  return <PropsContext.Provider value={{}}>{children}</PropsContext.Provider>;
};

export const PropsData = () => {
  return useContext(PropsContext);
};
