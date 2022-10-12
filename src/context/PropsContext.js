import { useContext, createContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";
const PropsContext = createContext();

export const PropsContextProvider = ({ children }) => {
  const { user, setChecking } = UserAuth();
  const [propsData, setPropsData] = useState(null);
  useEffect(() => {
    if (user) {
      console.log("calling api");
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
