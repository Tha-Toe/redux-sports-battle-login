import { Box, Button, Container } from "@mui/material";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Choose from "./component/SignUp/choose/Choose";
import EnterYourDetail from "./component/SignUp/enter-your-detail/EnterYourDetail";
import LoginFlow from "./component/Login/loginFlow/LoginFlow";
import EnterVerificationCodeSignup from "./component/SignUp/enter-verification-signup/EnterVerificationCodeSignup";
import ForgotPassword from "./component/Forgot/forgotPassword/ForgotPassword";
import NewPassword from "./component/Forgot/newPassword/NewPassword";
import CreatePassword from "./component/SignUp/createPassword/CreatePassword";
import CreateUserName from "./component/SignUp/createUserName/CreateUserName";
import EnterYourName from "./component/SignUp/enter-your-name/EnterYourName";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CheckMail from "./component/Forgot/checkMail/CheckMail";
import { Home } from "./component/Home/home/Home";
import { useContext, useState, useEffect, useRef } from "react";
import Protected from "./protected/Protected";
import Redirect from "./protected/Redirect";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { makeGETAPICall } from "./api/methods";
import { APIURLs } from "./api/ApiUrls";

import { auth } from "./config/firebase";
import {
  setGoSignUpPage,
  addUserInfo,
  removeUserInfo,
  endChecking,
  startChecking,
  addUserDetail,
  setUserAccountNotExist,
  setUserAccountExist,
  logoutUser
} from "./feature/userSlice";
import { useDispatch, useSelector } from "react-redux";
import SelectUserName from "./component/SignUp/SignUpWithGoogleOrEmail/SelectUserName";
import ChooseRedirect from "./protected/ChooseRedirect";
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

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [preventFromMultipleTimesRun, setPreventFromMulitpleTimesRun] =
    useState(false);

  const [clickedSignUp, setClickedSignUp] = useState(false);
  useEffect(() => {
    const firebaseUser = onAuthStateChanged(auth, async (currentUser) => {
      const user_from_localstorage = await JSON.parse(
        localStorage.getItem("user")
      );
      if (user_from_localstorage) {
        //if user exists in local storage
        dispatch(addUserInfo(user_from_localstorage));
        setPreventFromMulitpleTimesRun(true);
      } else if (currentUser && !user) {
        //if user not exists in local storage but exists in firebase
        console.log("user not exists running");
        dispatch(logoutUser());
        //get user name
        let userName = currentUser.displayName.replace("+", " ").toString();
        currentUser.userName = userName;
        //get first name letter
        let firstNameLetter = currentUser.displayName.slice(0, 2).toUpperCase();
        currentUser.firstNameLetter = firstNameLetter;
        var firUser = getUserInfoFromFirebaseUser(currentUser, userName);
        //console.log(firUser);
        //console.log(clickedSignUp);
        if (clickedSignUp) {
          getUserById(firUser.uid)
            .then((result) => {
              console.log(result);
              if (result) {
                //user is exist return to login page
                localStorage.removeItem("user");
                dispatch(
                  setUserAccountExist(
                    "Your account exists with us. Please login to continue in login section."
                  )
                );
                dispatch(addUserDetail(null));
                dispatch(setGoSignUpPage(false));
                if (auth) {
                  signOut(auth);
                }
                dispatch(removeUserInfo());
                setClickedSignUp(false);
                dispatch(endChecking());
              } else {
                setClickedSignUp(false);
                dispatch(endChecking());
                dispatch(setGoSignUpPage(true));
              }
              //loading false
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          getUserById(firUser.uid)
            .then((result) => {
              if (result) {
                localStorage.setItem("user", JSON.stringify(firUser));
                dispatch(addUserInfo(currentUser));
                //user is not null will get details
                dispatch(addUserDetail(result));
                //console.log(result);
              } else {
                //user is null create user
                localStorage.removeItem("user");
                dispatch(addUserDetail(null));
                dispatch(
                  setUserAccountNotExist(
                    "Your account doesn't exists with us. Please sign up from the sign up section."
                  )
                );
                if (auth) {
                  signOut(auth);
                }
                dispatch(removeUserInfo());
              }
              //loading false
              dispatch(endChecking());
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        if (!clickedSignUp) {
          dispatch(endChecking());
        }
      }
    });
    return () => {
      firebaseUser();
    };
  }, [clickedSignUp]);

  useEffect(() => {
    if (preventFromMultipleTimesRun) {
      getUserById(user.uid)
        .then((result) => {
          if (result) {
            //user is not null will get details
            dispatch(addUserDetail(result));
            // console.log(result);
          } else {
            //user is null create user
            dispatch(addUserDetail(null));
          }
          //loading false
          dispatch(endChecking());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [preventFromMultipleTimesRun]);
  const [updatingUserDetail, setUpdatingUserDetail] = useState(false);

  const updateGetUserById = () => {
    setUpdatingUserDetail(true);
    getUserById(user.uid)
      .then((result) => {
        if (result) {
          console.log("updated");
          //user is not null will get details
          dispatch(addUserDetail(result));
          setUpdatingUserDetail(false);
          // console.log(result);
        } else {
          //user is null create user
          dispatch(addUserDetail(null));
          setUpdatingUserDetail(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [mode, setMode] = useState("dark");
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#000000", //black
        light: "#242423", //rgba(36, 36, 35, 1)
        dark_gray: "#000000",
        dark: "#2C2C2C",
        gray: "#2E2D2D",
      },
      secondary: {
        main: "#ffffff", //white
        dark: "#FAFAFA",
        gray: "#ffffff",
        dark_gray: "#ffffff",
      },
    },
    breakpoints: {
      values: {
        xxxs: 0,
        xxs: 350,
        xs: 500,
        sm: 700,
        md: 900,
        lg: 1200,
        xl: 1600,
      },
    },
  });
  const lightTheme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
        light: "#696969",
        dark_gray: "#f3f4f8",
        dark: "#ffffff",
        gray: "#D9D9D9",
      },
      secondary: {
        main: "#000000",
        dark: "#696969",
        gray: "#D9D9D9",
        dark_gray: "#494949",
      },
    },
    breakpoints: {
      values: {
        xxxs: 0,
        xxs: 350,
        xs: 500,
        sm: 700,
        md: 900,
        lg: 1200,
        xl: 1600,
      },
    },
  });
  const homeRef = useRef();

  useEffect(() => {
    homeRef.current.scrollTop = 0;
  }, []);
  return (
    <div
      ref={homeRef}
      style={{
        width: "100vw",
        maxWidth: "100vw",
        minHeight: "100vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `${mode === "dark" ? "black" : "#f3f4f8"}`,
        overflowX: "hidden",
      }}
      className="app-container"
    >
      <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Redirect>
                  <LoginFlow mode={mode} setMode={setMode} />
                </Redirect>
              }
            />
            <Route
              path="/choose"
              element={
                <Redirect>
                  <ChooseRedirect>
                    <Choose
                      mode={mode}
                      setMode={setMode}
                      setClickedSignUp={setClickedSignUp}
                    />
                  </ChooseRedirect>
                </Redirect>
              }
            />
            <Route
              path="/enteryourdetail"
              element={<EnterYourDetail mode={mode} setMode={setMode} />}
            />
            <Route
              path="/enteryourname"
              element={<EnterYourName mode={mode} setMode={setMode} />}
            />
            <Route
              path="/checkmail"
              element={<CheckMail mode={mode} setMode={setMode} />}
            />
            <Route
              path="/signupverification"
              element={
                <EnterVerificationCodeSignup mode={mode} setMode={setMode} />
              }
            />
            <Route
              path="/forgotpassword"
              element={<ForgotPassword mode={mode} setMode={setMode} />}
            />
            <Route
              path="/newpassword"
              element={<NewPassword mode={mode} setMode={setMode} />}
            />
            <Route
              path="/createpassword"
              element={<CreatePassword mode={mode} setMode={setMode} />}
            />
            <Route
              path="/createusername"
              element={<CreateUserName mode={mode} setMode={setMode} />}
            />
            <Route
              path="/selectusername"
              element={<SelectUserName mode={mode} setMode={setMode} />}
            />
            <Route
              path="/home"
              element={
                <Protected>
                  <Home
                    mode={mode}
                    setMode={setMode}
                    updateGetUserById={updateGetUserById}
                    updatingUserDetail={updatingUserDetail}
                  />
                </Protected>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
