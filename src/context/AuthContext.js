import { useContext, createContext, useState } from "react";
import {
  signInWithPopup,
  signOut,
  OAuthProvider,
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
  getIdToken,
} from "firebase/auth";

import { auth } from "../firebase";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [idToken, setIdToken] = useState(null);
  // const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(false);

  //apple signIn
  const appleSignIn = async () => {
    setLoading(true);
    const appleProvider = new OAuthProvider("apple.com");
    var aa = await signInWithPopup(auth, appleProvider);
    // console.log(aa.user);
    //var methods = await fetchSignInMethodsForEmail(auth, aa.user.email);
    //console.log(methods);
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
        //console.log(auth.currentUser);
        if (firebaseUser.user.uid === current_user.uid) {
          //console.log(current_user);
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

          //new format firebase
          var firUser = getUserInfoFromFirebaseUser(current_user, userName);
          console.log(firUser);

          setUser(current_user);
          setLoading(false);
          // console.log(current_user);
          // const token = await getIdToken(current_user);
          // setIdToken(token);
          // setAccessToken(current_user.accessToken);
        }
      }
    }
  };

  //google signIn

  const googleSignIn = async () => {
    setLoading(true);
    const googleProvider = new GoogleAuthProvider();
    var aa = await signInWithPopup(auth, googleProvider);
    // console.log(aa.user);

    //var methods = await fetchSignInMethodsForEmail(auth, aa.user.email);
    //console.log(methods);
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

          //new format firebase
          var firUser = getUserInfoFromFirebaseUser(current_user, userName);
          console.log(firUser);

          setUser(current_user);
          setLoading(false);

          // console.log(current_user);
          const token = await getIdToken(current_user);
          console.log(token);
          // setIdToken(token);
          // setAccessToken(current_user.accessToken);
        }
      }
    }
  };

  //logout
  const logOut = () => {
    if (auth) {
      signOut(auth);
    }
    // setIdToken(null);
    // setAccessToken(null);
    setUser(null);
  };

  const [errorPopUp, setErrorPopUp] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        logOut,
        user,
        setUser,
        appleSignIn,
        // idToken,
        // setIdToken,
        // accessToken,
        // setAccessToken,
        loading,
        setLoading,
        errorPopUp,
        setErrorPopUp,
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
