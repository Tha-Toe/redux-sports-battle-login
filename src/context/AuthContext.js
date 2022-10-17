import { useContext, createContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  OAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { APIURLs } from "../api/ApiUrls";
import { makeGETAPICall } from "../api/methods";

import { auth } from "../config/firebase";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [userDetail, setUserDetail] = useState(null);

  const [preventFromMultipleTimesRun, setPreventFromMulitpleTimesRun] =
    useState(false);
  useEffect(() => {
    const firebaseUser = onAuthStateChanged(auth, async (currentUser) => {
      const user_from_localstorage = await JSON.parse(
        localStorage.getItem("user")
      );
      if (user_from_localstorage) {
        //if user exists in local storage

        console.log("user exists running");

        setUser(user_from_localstorage);
        setPreventFromMulitpleTimesRun(true);
      } else if (currentUser && !user) {
        //if user not exists in local storage but exists in firebase
        console.log("user not exists running");
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
        getUserById(firUser.uid)
          .then((result) => {
            if (result) {
              //user is not null will get details
              console.log(result);
              setUserDetail(result);
            } else {
              //user is null create user
              setUserDetail("null");
            }
            //loading false
            setChecking(false);
          })
          .catch((err) => {
            console.log(err);
          });
        setLoading(false);
      } else {
        setChecking(false);
      }
    });
    return () => {
      firebaseUser();
    };
  }, []);

  useEffect(() => {
    if (preventFromMultipleTimesRun) {
      getUserById(user.uid)
        .then((result) => {
          if (result) {
            //user is not null will get details
            setUserDetail(result);
            console.log(result);
          } else {
            //user is null create user
            setUserDetail("null");
          }
          //loading false
          setChecking(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [preventFromMultipleTimesRun]);
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
        userDetail,
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

export const getUserById = async (userId) => {
  var apiUrl = APIURLs.getUserInfo;
  apiUrl = apiUrl.replace("{userId}", userId);
  const apiResponse = await makeGETAPICall(apiUrl);
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return null;
  }
};
