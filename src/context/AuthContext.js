import { useContext, createContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  OAuthProvider,
  getIdToken,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { auth } from "../firebase";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [loginByGoogle, setLoginByGoogle] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(false);

  //google login
  const success = (res) => {
    console.log("success:", res);
    setUser(res.profileObj);
    setAccessToken(res.accessToken);
    setIdToken(res.tokenId);
    setLoading(false);
  };
  const fail = (err) => {
    setLoading(false);
    console.log(err);
  };

  //apple login
  useEffect(() => {
    const appleUser = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        console.log(currentUser);
        const token = await getIdToken(currentUser);
        setIdToken(token);
        setAccessToken(currentUser.accessToken);
      }
    });
    return () => {
      appleUser();
    };
  }, []);

  const appleSignIn = async () => {
    setLoginByGoogle(false);
    setLoading(true);
    const appleProvider = new OAuthProvider("apple.com");
    await signInWithPopup(auth, appleProvider);
  };

  //logout
  const logOut = () => {
    if (auth) {
      signOut(auth);
    }
    setIdToken(null);
    setAccessToken(null);
    setLoginByGoogle(false);
    setUser(null);
  };

  const [notAllowSameEmail, setNotAllowSameEmail] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        logOut,
        user,
        setUser,
        appleSignIn,
        idToken,
        setIdToken,
        loginByGoogle,
        accessToken,
        setAccessToken,
        setLoginByGoogle,
        loading,
        setLoading,
        success,
        fail,
        notAllowSameEmail,
        setNotAllowSameEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
