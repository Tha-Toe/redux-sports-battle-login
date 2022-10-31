import React from "react";
import "./createPassword.css";
import Box from "@mui/material/Box";
import { FormControl, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ContinueButtonComponent,
  BackButtonComponent,
  PasswordInputComponent,
} from "../../defaultComponent/DefaultComponent";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector } from "react-redux";

const CreatePassword = ({ mode, setMode }) => {
  const fs = useSelector((state) => state.user.fs);

  const [enterPassword, setEnterPassword] = useState(null);
  const [reEnterPassword, setReEnterPassword] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  let navigate = useNavigate();

  const handleBack = () => {
    navigate("/createusername", { replace: true });
  };

  const handleContinue = () => {
    navigate("/", { replace: true });
  };

  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    if (enterPassword && reEnterPassword) {
      if (enterPassword === reEnterPassword) {
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
    } else {
      setDisableButton(true);
    }
  }, [enterPassword, reEnterPassword]);
  const switchMode = () => {
    if (mode === "dark") {
      setMode("light");
    } else {
      setMode("dark");
    }
  };
  return (
    <div className="first-signup-flow-container">
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: { sm: "60%", xxxs: "100%" },
          position: "relative",
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
            width: { md: "408px", xxxs: "80%" },
          }}
        >
          <Box component={"div"} sx={{ width: 1, mb: "25px" }}>
            <img src="/sportsbattle.png" className="logo" />
          </Box>
          <FormControl
            sx={{
              width: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: fs.small, xxxs: fs.xs },
                mb: "11px",
                fontFamily: "Poppins",
                color: "secondary.dark_gray",
              }}
            >
              STEP 3 OF 3
            </Typography>
            <Typography
              sx={{
                fontSize: { sm: fs.mega, xxxs: fs.x_large },
                fontWeight: "700",
                mb: "4px",
                fontFamily: "Poppins",
                color: "secondary.dark_gray",
              }}
            >
              Create your password
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                mb: "25px",
                fontFamily: "Poppins",
                color: "secondary.dark_gray",
              }}
            >
              You'll use this log into your account.
            </Typography>
            <PasswordInputComponent
              placeholder={"Enter your new password"}
              showPass={showPass}
              setEnterPassword={setEnterPassword}
              setShowPass={setShowPass}
              mode={mode}
            />
            <PasswordInputComponent
              placeholder={"Re-enter your new password"}
              showPass={showPass2}
              setReEnterPassword={setReEnterPassword}
              setShowPass={setShowPass2}
              mode={mode}
            />
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
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <BackButtonComponent text={"Back"} handleBack={handleBack} />
              <ContinueButtonComponent
                text={"Complete Sign Up"}
                handleContinue={handleContinue}
                disabled={disableButton}
                checkIcon={true}
              />
            </Box>
          </FormControl>
        </Box>
        <Box
          component="div"
          sx={{
            position: "absolute",
            right: {
              lg: "50px",
              md: "35px",
              sm: "-10px",
              xs: "50px",
              xxs: "15px",
              xxxs: "15px",
            },
            height: "242px",
            borderRightColor: "white",
            borderRight: 2,
            borderRight: `${
              mode === "dark" ? "2px solid white" : "2px solid #494949"
            }`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            top: "45%",
          }}
        >
          <Box
            sx={{
              width: { md: "30px", xs: "20px" },
              height: { md: "30px", xs: "20px" },
              position: "relative",
              right: "-50%",
              border: 2,
              borderRadius: "50%",
              borderColor: "#4831D4",
              background: "#4831D4",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CheckIcon
              sx={{
                fontSize: { sm: fs.x_large },
                color: "white",
              }}
            />
          </Box>
          <Box
            sx={{
              width: { md: "30px", xs: fs.x_large },
              height: { md: "30px", xs: fs.x_large },
              position: "relative",
              right: "-50%",
              border: 2,
              borderRadius: "50%",
              borderColor: "#4831D4",
              background: "#4831D4",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CheckIcon
              sx={{
                fontSize: { md: fs.x_large, sm: fs.x_large },
                color: "white",
              }}
            />
          </Box>
          <Box
            sx={{
              width: { md: "30px", xxxs: "20px" },
              height: { md: "30px", xxxs: "20px" },
              position: "relative",
              right: "-50%",
              border: 2,
              borderRadius: "50%",
              borderColor: "#4831D4",
              bgcolor: "primary.main",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="div"
              sx={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#4831D4",
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
      <div
        className={`${"rightImageContainer"} ${
          mode !== "dark" && "right-container-light-mode"
        }`}
      >
        {" "}
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
    </div>
  );
};
export default CreatePassword;
