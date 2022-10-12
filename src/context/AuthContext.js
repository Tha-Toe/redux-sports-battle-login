import { useContext, createContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  OAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  getIdToken,
} from "firebase/auth";

import { auth } from "../firebase";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const firebaseUser = onAuthStateChanged(auth, async (currentUser) => {
      const user_from_localstorage = await JSON.parse(
        localStorage.getItem("user")
      );
      if (user_from_localstorage) {
        setUser(user_from_localstorage);
        // console.log(user_from_localstorage);
      } else if (currentUser && !user) {
        //get user name
        let userName = currentUser.displayName.replace("+", " ").toString();
        currentUser.userName = userName;
        //get first name letter
        let firstNameLetter = currentUser.displayName.slice(0, 2).toUpperCase();
        currentUser.firstNameLetter = firstNameLetter;
        var firUser = getUserInfoFromFirebaseUser(currentUser, userName);
        // console.log(firUser);
        setUser(firUser);
        localStorage.setItem("user", JSON.stringify(firUser));
        // const token = await getIdToken(currentUser);
        // console.log(token);
        setLoading(false);
      } else {
        setChecking(false);
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
    setUser(null);
    localStorage.removeItem("user");
  };

  const [errorPopUp, setErrorPopUp] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        logOut,
        user,
        setUser,
        appleSignIn,
        loading,
        setLoading,
        errorPopUp,
        setErrorPopUp,
        googleSignIn,
        checking,
        setChecking,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

export const getUserInfoFromFirebaseUser = (firUser, fullName) => ({
  uid: firUser.uid,
  name: firUser.displayName || fullName,
  email: firUser.email,
  emailVerified: firUser.emailVerified,
  phoneNumber: firUser.phoneNumber,
  picture: firUser.photoURL,
  providerId: firUser.providerId,
  username: firUser.userName,
  firstNameLetter: firUser.firstNameLetter,
});
