import { useContext, createContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  OAuthProvider,
  getIdToken,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "../firebase";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const firebaseUser = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        //get user name
        let userName = currentUser.displayName.replace("+", " ").toString();
        currentUser.userName = userName;
        //get first name letter
        let firstNameLetter = currentUser.displayName.slice(0, 2).toUpperCase();
        currentUser.firstNameLetter = firstNameLetter;
        setUser(currentUser);
        setLoading(false);
        // console.log(currentUser);
        const token = await getIdToken(currentUser);
        setIdToken(token);
        setAccessToken(currentUser.accessToken);
      }
    });
    return () => {
      firebaseUser();
    };
  }, []);

  //apple signIn
  const appleSignIn = async () => {
    setLoading(true);
    const appleProvider = new OAuthProvider("apple.com");
    await signInWithPopup(auth, appleProvider);
  };

  //google signIn

  const googleSignIn = async () => {
    setLoading(true);
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider);
  };

  //logout
  const logOut = () => {
    if (auth) {
      signOut(auth);
    }
    setIdToken(null);
    setAccessToken(null);
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
        accessToken,
        setAccessToken,
        loading,
        setLoading,
        notAllowSameEmail,
        setNotAllowSameEmail,
        googleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
