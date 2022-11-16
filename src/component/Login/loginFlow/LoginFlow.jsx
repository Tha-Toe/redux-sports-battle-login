import React from "react";
import "./loginFlow.css";
import Box from "@mui/material/Box";
import { Button, FormControl, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { useState } from "react";
import { useEffect } from "react";
import {
  ButtonComponent,
  InputComponentLogin,
  PasswordInputComponentLogin,
} from "../../defaultComponent/DefaultComponent";
import LoadingSpinner from "../../loadingSpinner/LoadingSpinner";
import NotAllowSameEmail from "../../NotAllowPopup/NotAllowSameEmail";
import {
  signInWithPopup,
  signOut,
  OAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../../../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import UserAccountNotExist from "../../NotAllowPopup/UserAccountNotExist";
import { startChecking, endChecking } from "../../../feature/userSlice";
const LoginFlow = ({ mode, setMode }) => {
  const fs = useSelector((state) => state.user.fs);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const checking = useSelector((state) => state.user.checking);

  // const [user, setUser] = useState(null);

  //apple signIn
  const appleSignIn = async () => {
    dispatch(startChecking());
    const appleProvider = new OAuthProvider("apple.com");
    await signInWithPopup(auth, appleProvider);
  };

  //google signIn

  const googleSignIn = async () => {
    dispatch(startChecking());
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider);
  };

  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    if (email && password) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [email, password]);
  let navigate = useNavigate();
  // const handleContinue = () => {
  //   navigate("/home", { replace: true });
  // };
  const switchMode = () => {
    if (mode === "dark") {
      setMode("light");
    } else {
      setMode("dark");
    }
  };

  const errorPopUp = useSelector((state) => state.user.errorPopUp);
  const handleGoogleLogin = async () => {
    try {
      dispatch(startChecking());
      await googleSignIn();
    } catch (error) {
      dispatch(endChecking());
    }
  };
  const handleAppleLogin = async () => {
    try {
      dispatch(startChecking());
      await appleSignIn();
    } catch (error) {
      dispatch(endChecking());
    }
  };

  const userAccountNotExist = useSelector(
    (state) => state.user.userAccountNotExist
  );

  //signin with email and password
  const [errorUserNotFound, setErrorUserNotFound] = useState(null);
  const [errorWrongPassword, setErrorWrongPassword] = useState(null);
  const [loadingLoginWithEmail, setLoadingLoginWithEmail] = useState(false);
  const handleSignInEmailAndPassword = () => {
    if (email && password) {
      setLoadingLoginWithEmail(true);
      setErrorUserNotFound(null);
      setErrorWrongPassword(null);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
          const errorCode = error.code;
          let errorMessage = error.message;
          if (errorMessage) {
            let userNotFound = errorMessage.search("user-not-found");
            if (userNotFound >= 0) {
              setErrorUserNotFound("User Not Found. Please check your email");
              setLoadingLoginWithEmail(false);
            } else {
              let invalidEmail = errorMessage.search("invalid-email");
              if (invalidEmail >= 0) {
                setErrorUserNotFound("Invalid Email");
                setLoadingLoginWithEmail(false);
              } else {
                let wrongPassword = errorMessage.search("wrong-password");
                if (wrongPassword >= 0) {
                  setErrorWrongPassword("Incorrect Password");
                  setLoadingLoginWithEmail(false);
                } else {
                  let tooManyRequest = errorMessage.search("too-many-requests");
                  if (tooManyRequest >= 0) {
                    setErrorUserNotFound("Too many requests. Try again later");
                  }
                }
              }
            }
          }
          console.log(errorMessage);
        });
    }
  };

  return (
    <div className="login-flow-container">
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: { md: "60%", sm: "60%", xxxs: "100%" },
          bgcolor: "primary.dark_gray",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: { lg: "50%", md: "74%", xxxs: "80%" },
          }}
        >
          <Box
            sx={{
              width: {
                md: "408px",
                sm: "390px",
                xs: "408px",
                xxs: "300px",
                xxxs: "250px",
              },
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Box component={"div"} sx={{ width: 1, mb: "25px" }}>
              <img src="/sportsbattle.png" className="logo" />
            </Box>
          </Box>
          <FormControl
            sx={{
              width: {
                md: "408px",
                sm: "390px",
                xs: "408px",
                xxs: "300px",
                xxxs: "250px",
              },
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              sx={{
                fontSize: { md: fs.mega, sm: fs.xxx_large, xxxs: fs.x_large },
                fontWeight: "700",
                mb: "11px",
                fontFamily: "Poppins",
                color: "secondary.dark_gray",
              }}
            >
              Login to Your Account
            </Typography>
            <Box
              sx={{
                width: {
                  md: "408px",
                  sm: "390px",
                  xs: "408px",
                  xxs: "300px",
                  xxxs: "250px",
                },
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                mb: "7px",
              }}
            >
              <Box
                sx={{
                  border: 2,
                  borderRadius: "5px",
                  borderColor: `${mode === "dark" ? "#272727" : "#e0e0e0"}`,
                  "&:hover": {
                    borderColor: `${mode === "dark" ? "white" : "black"}`,
                    background: "rgb(7, 177, 77, 0.42)",
                  },
                  position: "relative",
                  width: {
                    md: "196px",
                    sm: "190px",
                    xs: "196px",
                    xxs: "145px",
                    xxxs: "120px",
                  },
                  height: { xs: "64px", xxxs: "50px" },
                }}
              >
                <Button
                  startIcon={<GoogleIcon />}
                  sx={{
                    color: "secondary.dark_gray",
                    width: "100%",
                    height: "100%",
                    fontSize: { xs: fs.small, xxs: fs.xxs, xxxs: fs.xxxs },
                    "&.MuiButtonBase-root:hover": {
                      bgcolor: "primary.main",
                    },
                    textTransform: "none",
                    fontFamily: "Poppins",
                    bgcolor: "primary.main",
                    zIndex: "40",
                  }}
                  onClick={handleGoogleLogin}
                >
                  Login with Google
                </Button>
              </Box>
              <Box
                sx={{
                  border: 2,
                  borderRadius: "5px",
                  borderColor: `${mode === "dark" ? "#272727" : "#e0e0e0"}`,
                  "&:hover": {
                    borderColor: `${mode === "dark" ? "white" : "black"}`,
                    background: "rgb(7, 177, 77, 0.42)",
                  },
                  position: "relative",
                  width: {
                    md: "196px",
                    sm: "190px",
                    xs: "196px",
                    xxs: "145px",
                    xxxs: "120px",
                  },
                  height: { xs: "64px", xxxs: "50px" },
                }}
              >
                <Button
                  onClick={handleAppleLogin}
                  startIcon={<AppleIcon />}
                  sx={{
                    color: "secondary.dark_gray",
                    width: "100%",
                    height: "100%",
                    fontSize: { xs: fs.small, xxs: fs.xxs, xxxs: fs.xxxs },
                    "&.MuiButtonBase-root:hover": {
                      bgcolor: "primary.main",
                    },
                    textTransform: "none",
                    fontFamily: "Poppins",
                    bgcolor: "primary.main",
                    zIndex: "40",
                  }}
                >
                  Login with Apple
                </Button>
              </Box>
            </Box>
            {errorUserNotFound && (
              <Typography
                sx={{
                  fontSize: { xs: fs.small, xxxs: fs.xs },
                  mb: 1,
                  fontFamily: "Poppins",
                  fontWieght: 300,
                  color: "red",
                }}
              >
                {errorUserNotFound}
              </Typography>
            )}
            <InputComponentLogin
              placeholder={"Email Address"}
              setName={setEmail}
              mode={mode}
            />
            {errorWrongPassword && (
              <Typography
                sx={{
                  fontSize: { xs: fs.small, xxxs: fs.xs },
                  mb: 1,
                  fontFamily: "Poppins",
                  fontWieght: 300,
                  color: "red",
                }}
              >
                {errorWrongPassword}
              </Typography>
            )}
            <PasswordInputComponentLogin
              placeholder={"Password"}
              showPass={showPass}
              setPassword={setPassword}
              setShowPass={setShowPass}
              mode={mode}
            />
            <Typography
              sx={{
                width: {
                  md: "408px",
                  sm: "390px",
                  xs: "408px",
                  xxs: "300px",
                  xxxs: "250px",
                },
                display: "flex",
                justifyContent: "flex-end",
                fontSize: { xs: fs.small, xxxs: fs.xs },
                mb: 1,
                fontFamily: "Poppins",
                fontWieght: 300,
              }}
            >
              <Link
                to="/forgotpassword"
                style={{
                  textDecoration: "none",
                  color: `${mode === "dark" ? "#ffffff" : "#494949"}`,
                }}
              >
                Forgot Password?
              </Link>
            </Typography>
            <ButtonComponent
              name={"Login to Your Account"}
              disabled={disableButton}
              handleContinue={handleSignInEmailAndPassword}
            />
            <Box
              component="div"
              sx={{
                width: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "secondary.dark_gray",
                  fontSize: { xs: fs.large, xxxs: fs.small },
                  fontFamily: "Poppins",
                }}
              >
                Not a member?
              </Typography>
              <Link to="/choose">
                <Typography
                  sx={{
                    color: "secondary.dark_gray",
                    fontSize: { xs: fs.large, xxxs: fs.small },
                    fontWeight: 700,
                    ml: "5px",
                    cursor: "pointer",
                    fontFamily: "Poppins",
                    textDecoration: "underline",
                  }}
                >
                  Register Now
                </Typography>
              </Link>
            </Box>
          </FormControl>
        </Box>
      </Box>
      <div
        className={`${"rightImageContainer"} ${
          mode !== "dark" && "right-container-light-mode"
        }`}
      >
        <img src="RightPhoneFinal.png" className="right-image" />{" "}
        <img src="Vector.png" className="right-vector" />
      </div>
      <img
        src={
          mode === "dark"
            ? "/switchModeLoginPage.png"
            : "/switchModeLightLoginPage.png"
        }
        className="switchMode"
        onClick={switchMode}
      />
      {checking && <LoadingSpinner />}{" "}
      {errorPopUp && <NotAllowSameEmail mode={mode} errorPopUp={errorPopUp} />}
      {userAccountNotExist && <UserAccountNotExist mode={mode} />}
      {loadingLoginWithEmail && <LoadingSpinner />}
    </div>
  );
};
export default LoginFlow;
