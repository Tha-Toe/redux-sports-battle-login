import { useContext, createContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";

const PropsContext = createContext();

export const PropsContextProvider = ({ children }) => {
  const { user, setChecking } = UserAuth();
  useEffect(() => {
    if (user) {
      console.log("calling props apis");
    }
  }, [user]);

  return <PropsContext.Provider value={{}}>{children}</PropsContext.Provider>;
};

export const PropsData = () => {
  return useContext(PropsContext);
};
