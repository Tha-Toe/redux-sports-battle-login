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

  const appleSignIn = async () => {
    setLoginByGoogle(false);
    setLoading(true);
    const appleProvider = new OAuthProvider("apple.com");
    var aa = await signInWithPopup(auth, appleProvider);
    // console.log(aa.user);
    var methods = await fetchSignInMethodsForEmail(auth, aa.user.email);
    console.log(methods);
    // if (methods.length >= 1 && methods[0] !== "apple.com") {
    //   console.log(true);
    // } else {
    //   console.log(false);
    // }
    // if (!aa.user.accessToken) {
    //   // console.log("Apple Sign-In failed - no identify token returned");
    //   setErrorPopUp("Apple Sign-In failed - no identify token returned");
    //   setLoading(false);
    // } else if (!aa.user.email) {
    //   // console.log(
    //   //   "Please go to settings -> iCloud -> Password & Security -> Apps using your Apple ID and remove the app"
    //   // );
    //   setErrorPopUp(
    //     "Please go to settings -> iCloud -> Password & Security -> Apps using your Apple ID and remove the app"
    //   );
    //   setLoading(false);
    // } else if (methods.length >= 1 && methods[0] !== "apple.com") {
    //   setErrorPopUp(
    //     `You have previously logged in with ${methods[0]}. please use the same method to login.`
    //   );
    //   console.log(
    //     `you have previously logged in with ${methods[0]}. please use the same method to login.`
    //   );
    //   setLoading(false);
    // }
    const credential = OAuthProvider.credentialFromResult(aa);
    if (credential) {
      var firebaseUser = await signInWithCredential(auth, credential);
      if (firebaseUser) {
        var current_user = auth.currentUser;
        console.log(auth.currentUser);
        if (firebaseUser.user.uid === current_user.uid) {
          console.log(current_user);
          //get user name
          let userName =
            current_user.displayName &&
            current_user.displayName.replace("+", " ").toString();

          current_user.userName = userName;
          //get first name letter

          let firstNameLetter =
            current_user.displayName &&
            current_user.displayName.slice(0, 2).toUpperCase();
          current_user.firstNameLetter = firstNameLetter;
          setUser(current_user);
          setLoading(false);
          // console.log(current_user);
          const token = await getIdToken(current_user);
          setIdToken(token);
          setAccessToken(current_user.accessToken);
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
    // console.log(aa.user);

    var methods = await fetchSignInMethodsForEmail(auth, aa.user.email);
    console.log(methods);
    // console.log(methods);
    // if (methods.length >= 1 && methods[0] !== "google.com") {
    //   setErrorPopUp(
    //     `You have previously logged in with ${methods[0]}. please use the same method to login.`
    //   );
    //   // console.log(
    //   //   `you have previously logged in with ${methods[0]}. please use the same method to login.`
    //   // );
    //   setLoading(false);
    // };
    // console.log(methods[0]);
    const credential = OAuthProvider.credentialFromResult(aa);
    if (credential) {
      var firebaseUser = await signInWithCredential(auth, credential);
      if (firebaseUser) {
        var current_user = auth.currentUser;
        if (firebaseUser.user.uid === current_user.uid) {
          //get user name
          let userName = current_user.displayName.replace("+", " ").toString();
          current_user.userName = userName;
          //get first name letter
          let firstNameLetter = current_user.displayName
            .slice(0, 2)
            .toUpperCase();
          current_user.firstNameLetter = firstNameLetter;
          setUser(current_user);
          setLoading(false);
          // console.log(current_user);
          const token = await getIdToken(current_user);
          setIdToken(token);
          setAccessToken(current_user.accessToken);
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

  const [errorPopUp, setErrorPopUp] = useState(null);

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
        errorPopUp,
        setErrorPopUp,
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
