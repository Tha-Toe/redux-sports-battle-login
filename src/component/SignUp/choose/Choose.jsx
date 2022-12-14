import React, { useState } from "react";
import "./choose.css";
import Box from "@mui/material/Box";
import { Button, FormControl, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  signInWithPopup,
  OAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "../../../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { startChecking } from "../../../feature/userSlice";
import LoadingSpinner from "../../loadingSpinner/LoadingSpinner";
import UserAccountExist from "../../NotAllowPopup/UserAccountExist";
const Choose = ({ mode, setMode, setClickedSignUp }) => {
  const fs = useSelector((state) => state.user.fs);
  let navigate = useNavigate();

  const handleGoSignUp = () => {
    navigate("/enteryourdetail", { replace: true });
  };
  const switchMode = () => {
    if (mode === "dark") {
      setMode("light");
    } else {
      setMode("dark");
    }
  };
  const dispatch = useDispatch();
  const checking = useSelector((state) => state.user.checking);
  const handleGoogleLogin = async () => {
    try {
      dispatch(startChecking());
      setClickedSignUp(true);
      await googleSignIn();
    } catch (error) {
      setClickedSignUp(false);
    }
  };
  const handleAppleLogin = async () => {
    try {
      dispatch(startChecking());
      setClickedSignUp(true);
      await appleSignIn();
    } catch (error) {
      setClickedSignUp(false);
    }
  };
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
  const userAccountExist = useSelector((state) => state.user.userAccountExist);
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
          height: "100%",
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
              Choose your method
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
                mb: "13px",
              }}
            >
              <Button
                startIcon={<GoogleIcon />}
                sx={{
                  color: "secondary.dark_gray",
                  width: {
                    md: "196px",
                    sm: "190px",
                    xs: "196px",
                    xxs: "145px",
                    xxxs: "120px",
                  },
                  height: { xs: "64px", xxxs: "50px" },
                  fontSize: { xs: fs.small, xxs: fs.xxs, xxxs: fs.xxxs },
                  border: 2,
                  borderRadius: "5px",
                  borderColor: `${mode === "dark" ? "#272727" : "#e0e0e0"}`,
                  "&.MuiButtonBase-root:hover": {
                    borderColor: `${mode === "dark" ? "white" : "black"}`,
                    bgcolor: "primary.main",
                  },
                  textTransform: "none",
                  fontFamily: "Poppins",
                  bgcolor: "primary.main",
                }}
                onClick={handleGoogleLogin}
              >
                Signup with Google
              </Button>
              <Button
                startIcon={<AppleIcon />}
                sx={{
                  color: "secondary.dark_gray",
                  width: {
                    md: "196px",
                    sm: "190px",
                    xs: "196px",
                    xxs: "145px",
                    xxxs: "120px",
                  },
                  height: { xs: "64px", xxxs: "50px" },
                  fontSize: { xs: fs.small, xxs: fs.xxs, xxxs: fs.xxxs },
                  border: 2,
                  borderRadius: "5px",
                  borderColor: `${mode === "dark" ? "#272727" : "#e0e0e0"}`,
                  "&.MuiButtonBase-root:hover": {
                    borderColor: `${mode === "dark" ? "white" : "black"}`,
                    bgcolor: "primary.main",
                  },
                  textTransform: "none",
                  fontFamily: "Poppins",
                  bgcolor: "primary.main",
                }}
                onClick={handleAppleLogin}
              >
                Signup with Apple
              </Button>
            </Box>

            <Button
              startIcon={<MailOutlineIcon />}
              sx={{
                color: "secondary.dark_gray",
                width: {
                  md: "408px",
                  sm: "390px",
                  xs: "408px",
                  xxs: "300px",
                  xxxs: "250px",
                },
                height: "64px",
                fontSize: { xs: fs.normal, xxxs: fs.small },
                mb: 3,
                border: 2,
                borderRadius: "5px",
                borderColor: `${mode === "dark" ? "#272727" : "#e0e0e0"}`,
                "&.MuiButtonBase-root:hover": {
                  borderColor: `${mode === "dark" ? "white" : "black"}`,
                  bgcolor: "primary.main",
                },
                textTransform: "none",
                fontFamily: "Poppins",
                fontWeight: "500",
                bgcolor: "primary.main",
              }}
              onClick={handleGoSignUp}
            >
              Sign up with email
            </Button>
            <Box
              component="div"
              sx={{
                width: {
                  md: "408px",
                  sm: "390px",
                  xs: "408px",
                  xxs: "300px",
                  xxxs: "250px",
                },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "secondary.dark_gray",
                  fontSize: { xs: fs.normal, xxxs: fs.small },
                  fontFamily: "Poppins",
                }}
              >
                Already a member?
              </Typography>
              <Link to="/">
                <Typography
                  sx={{
                    color: "secondary.dark_gray",
                    fontSize: { xs: fs.normal, xxxs: fs.small },
                    fontWeight: "700",
                    ml: { xs: "5px", xxxs: "5px" },
                    cursor: "pointer",
                    fontFamily: "Poppins",
                    textDecoration: "underline",
                  }}
                >
                  Login Now
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
      {userAccountExist && <UserAccountExist />}
      {checking && <LoadingSpinner />}
    </div>
  );
};
export default Choose;
