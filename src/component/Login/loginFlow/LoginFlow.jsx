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
import { UserAuth } from "../../../context/AuthContext";
import { GoogleLogin } from "@leecheuk/react-google-login";
import LoadingSpinner from "../../loadingSpinner/LoadingSpinner";
import NotAllowSameEmail from "../../NotAllowPopup/NotAllowSameEmail";
const clientId =
  "555618407648-lkittruvsnt5jr327s088990pgv3bi9t.apps.googleusercontent.com";

const LoginFlow = ({ mode, setMode }) => {
  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    if (name && password) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [name, password]);
  let navigate = useNavigate();
  const handleContinue = () => {
    navigate("/home", { replace: true });
  };
  const switchMode = () => {
    if (mode === "dark") {
      setMode("light");
    } else {
      setMode("dark");
    }
  };

  const {
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
  } = UserAuth();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await googleSignIn();
    } catch (error) {
      setLoading(false);
    }
  };
  const handleAppleLogin = async () => {
    try {
      setLoading(true);
      await appleSignIn();
    } catch (error) {
      setLoading(false);
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
                fontSize: { md: "32px", sm: "25px", xxxs: "20px" },
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
                // onClick={()=>{setLoading(true)}}
              >
                <Button
                  startIcon={<GoogleIcon />}
                  sx={{
                    color: "secondary.dark_gray",
                    width: "100%",
                    height: "100%",
                    fontSize: { xs: "14px", xxs: "10px", xxxs: "8px" },
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
                {/* <div
                  style={{
                    opacity: "0",
                    cursor: "pointer",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    zIndex: "50",
                    background: "blue",
                    width: "100%",
                    height: "100%",
                  }}
                  onClick={() => {
                    setLoading(true);
                  }}
                >
                  <GoogleLogin
                    clientId={clientId}
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        style={{ width: "100%", height: "100%" }}
                      >
                        This is my custom Google button
                      </button>
                    )}
                    buttonText="Sign in with Google"
                    onSuccess={success}
                    onFailure={fail}
                    cookiePolicy={"single_host_origin"}
                    isSignedIn={false}
                  />
                </div> */}
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
                // onClick={()=>{setLoading(true)}}
              >
                <Button
                  onClick={handleAppleLogin}
                  startIcon={<AppleIcon />}
                  sx={{
                    color: "secondary.dark_gray",
                    width: "100%",
                    height: "100%",
                    fontSize: { xs: "14px", xxs: "10px", xxxs: "8px" },
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
            <InputComponentLogin
              placeholder={"User Name"}
              setName={setName}
              mode={mode}
            />

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
                fontSize: { xs: "14px", xxxs: "12px" },
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
              handleContinue={handleContinue}
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
                  fontSize: { xs: "18px", xxxs: "14px" },
                  fontFamily: "Poppins",
                }}
              >
                Not a member?
              </Typography>
              <Link to="/choose">
                <Typography
                  sx={{
                    color: "secondary.dark_gray",
                    fontSize: { xs: "18px", xxxs: "14px" },
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
      {loading && <LoadingSpinner />}{" "}
      {notAllowSameEmail && (
        <NotAllowSameEmail
          mode={mode}
          setNotAllowSameEmail={setNotAllowSameEmail}
        />
      )}
    </div>
  );
};
export default LoginFlow;
