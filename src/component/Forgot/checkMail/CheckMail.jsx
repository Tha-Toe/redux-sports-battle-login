import React from "react";
import "./checkMail.css";
import Box from "@mui/material/Box";
import { FormControl, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  BackButtonComponent,
  ContinueButtonComponent,
} from "../../defaultComponent/DefaultComponent";
import { useSelector } from "react-redux";
const CheckMail = ({ mode, setMode }) => {
  const [verifyCode, setVerifyCode] = useState(null);
  let navigate = useNavigate();
  const handleBack = () => {
    navigate("/forgotpassword", { replace: true });
  };

  const handleContinue = () => {
    navigate("/", { replace: true });
  };

  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    if (verifyCode) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [verifyCode]);

  const [invalidCode, setInvalidCode] = useState(false);
  const switchMode = () => {
    if (mode === "dark") {
      setMode("light");
    } else {
      setMode("dark");
    }
  };
  const fs = useSelector((state) => state.user.fs);

  return (
    <div className="second-signup-flow-container">
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: { sm: "60%", xxxs: "100%" },
          position: "relative",
          bgcolor: "primary.dark_gray",
          height: "100%",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: {
              md: "408px",
              sm: "390px",
              xs: "408px",
              xxs: "300px",
              xxxs: "250px",
            },
            mr: { xxxs: "20px", sm: 0 },
          }}
        >
          <Box component={"div"} sx={{ width: 1, mb: "25px" }}>
            <img src="/sportsbattle.png" className="logo" />
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
                fontSize: { sm: fs.mega, xxxs: fs.x_large },
                fontWeight: "700",
                mb: "4px",
                fontFamily: "Poppins",
                color: "secondary.dark_gray",
              }}
            >
              Check Mail
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                mb: "11px",
                fontFamily: "Poppins",
                color: "secondary.dark_gray",
              }}
            >
              We have sent you password reset link to your mail, Check your mail
              for the link.
            </Typography>

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
                mt: "5px",
              }}
            >
              <BackButtonComponent text={"Back"} handleBack={handleBack} />
              <ContinueButtonComponent
                text={"Login Now"}
                disabled={false}
                handleContinue={handleContinue}
              />
            </Box>
          </FormControl>
        </Box>
      </Box>
      <div
        className={`${"rightImageContainer-rpp"} ${
          mode !== "dark" && "right-rpp-light-mode"
        }`}
      >
        {" "}
        <img src="Mail-sent-pana-1.png" className="right-image-msp" />
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
export default CheckMail;
