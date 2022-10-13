import { useContext, createContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";

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
