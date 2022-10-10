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
    var aa = await signInWithPopup(auth, appleProvider);
    console.log(aa.user);
    if (!aa.user.accessToken) {
      console.log("Apple Sign-In failed - no identify token returned");
    }

    if (!aa.user.email) {
      console.log(
        "Please go to settings -> iCloud -> Password & Security -> Apps using your Apple ID and remove the app"
      );
    }

    var methods = await fetchSignInMethodsForEmail(auth, aa.user.email);

    if (methods.length >= 1 && methods[0] !== "apple.com") {
      console.log(
        `you have previously logged in with ${methods[0]}. please use the same method to login.`
      );
    }

    const credential = OAuthProvider.credentialFromResult(aa);
    if (credential) {
      var firebaseUser = await signInWithCredential(auth, credential);
      if (firebaseUser) {
        var current_user = auth.currentUser;
        if (firebaseUser.user.uid === current_user.uid) {
          setUser(current_user);
          var name = current_user.displayName;
          //console.log(name);
          //console.log(current_user);
          //getUserInfoFromFirebaseUser(current_user,name);
        }
      }
    }
  };

  //google signIn

  const googleSignIn = async () => {
    setLoginByGoogle(true);
    setLoading(true);
    const googleProvider = new GoogleAuthProvider();
    var aa = await signInWithPopup(auth, googleProvider);
    console.log(aa.user);

    var methods = await fetchSignInMethodsForEmail(auth, aa.user.email);

    if (methods.length >= 1 && methods[0] !== "google.com") {
      console.log(
        `you have previously logged in with ${methods[0]}. please use the same method to login.`
      );
    }

    const credential = OAuthProvider.credentialFromResult(aa);
    if (credential) {
      var firebaseUser = await signInWithCredential(auth, credential);
      if (firebaseUser) {
        var current_user = auth.currentUser;
        if (firebaseUser.user.uid === current_user.uid) {
          setUser(current_user);
          var name = current_user.displayName;
          //console.log(name);
          //console.log(current_user);
          //getUserInfoFromFirebaseUser(current_user,name);
        }
      }
    }
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
        // success,
        // fail,
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
