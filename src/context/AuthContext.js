import { useContext, createContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  OAuthProvider,
  getIdToken,
  GoogleAuthProvider,
  signInWithCredential,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

import { auth } from "../firebase";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [loginByGoogle, setLoginByGoogle] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(false);

  //google login
  // const success = (res) => {
  //   console.log("success:", res);
  //   setUser(res.profileObj);
  //   setAccessToken(res.accessToken);
  //   setIdToken(res.tokenId);
  //   setLoading(false);
  // };
  // const fail = (err) => {
  //   setLoading(false);
  //   console.log(err);
  // };

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
        console.log(currentUser);
        const token = await getIdToken(currentUser);
        setIdToken(token);
        setAccessToken(currentUser.accessToken);
      }
    });
    return () => {
      firebaseUser();
    };
  }, []);

  const appleSignIn = async () => {
    setLoginByGoogle(false);
    setLoading(true);
    const appleProvider = new OAuthProvider("apple.com");
    await signInWithPopup(auth, appleProvider);
  };

  //google signIn

  const googleSignIn = async () => {
    setLoginByGoogle(true);
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
