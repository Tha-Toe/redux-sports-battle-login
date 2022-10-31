import React from "react";
import "./enterVerificationCodeSignup.css";
import Box from "@mui/material/Box";
import { FormControl, Input, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  BackButtonComponent,
  ContinueButtonComponent,
} from "../../defaultComponent/DefaultComponent";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";

const EnterVerificationCodeSignup = ({ mode, setMode }) => {
  const fs = useSelector((state) => state.user.fs);

  const [verifyCode, setVerifyCode] = useState(null);
  let navigate = useNavigate();
  const handleBack = () => {
    navigate("/enteryourdetail", { replace: true });
  };

  const handleContinue = () => {
    navigate("/createusername", { replace: true });
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
            width: {
              md: "408px",
              sm: "390px",
              xs: "408px",
              xxs: "300px",
              xxxs: "250px",
            },
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
                fontSize: { xs: fs.small, xxxs: fs.xs },
                mb: "11px",
                fontFamily: "Poppins",
                color: "secondary.dark_gray",
              }}
            >
              STEP 1 OF 3
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
              Enter verification code
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: fs.xs, xxs: fs.xxs, xxxs: fs.xxxs },
                mb: "21px",
                fontFamily: "Poppins",
                color: "secondary.dark_gray",
              }}
            >
              You would receive a verificaton code to your mail, Kindly enter
              the code, If you are unsure about it, Click here to{" "}
              <span
                style={{
                  fontWeight: 700,
                  textDecoration: "underline",
                  display: "inline-block",
                }}
              >
                update
              </span>
            </Typography>
            <Box
              component={"div"}
              sx={{
                mb: "16px",
                width: {
                  md: "408px",
                  sm: "390px",
                  xs: "408px",
                  xxs: "300px",
                  xxxs: "250px",
                },
                height: { xs: "64px", xxxs: "50px" },
                background: "#272727",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Input
                placeholder="Verification code"
                type="text"
                variant="outlined"
                disableUnderline
                sx={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                  background: `${mode === "dark" ? "#272727" : "white"}`,
                  color: `${mode === "dark" ? "white" : "#494949"}`,
                  pl: 2,
                  fontSize: fs.normal,
                  "&.Mui-focused": {
                    background: `${mode === "dark" ? "black" : "white"}`,
                    border: "1px solid #2C2C2C",
                    outline: 1,
                  },
                  fontFamily: "Poppins",
                  borderRadius: "5px",
                }}
                onChange={(e) => {
                  setVerifyCode && setVerifyCode(e.target.value);
                }}
              />
              {invalidCode && (
                <Box
                  component={"div"}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    right: "10px",
                  }}
                >
                  <Typography
                    sx={{ color: "#E4313C", fontSize: fs.small, mr: "5px" }}
                  >
                    Invalid Code
                  </Typography>
                  <ClearIcon
                    sx={{ color: "#E4313C", fontSize: fs.xxx_large }}
                  />
                </Box>
              )}
            </Box>
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
                text={disableButton ? "Continue" : "Verify"}
                handleContinue={handleContinue}
                rightArrow={true}
                disabled={disableButton}
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
          <Box
            sx={{
              width: { md: "30px", xxxs: "20px" },
              height: { md: "30px", xxxs: "20px" },
              position: "relative",
              right: "-50%",
              borderRadius: "50%",
              border: `${
                mode === "dark" ? "2px solid white" : "2px solid #494949"
              }`,
              bgcolor: "primary.main",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Box>
          <Box
            sx={{
              width: { md: "30px", xxxs: "20px" },
              height: { md: "30px", xxxs: "20px" },
              position: "relative",
              right: "-50%",
              border: `${
                mode === "dark" ? "2px solid white" : "2px solid #494949"
              }`,
              borderRadius: "50%",
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
                bgcolor: "secondary.main",
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
export default EnterVerificationCodeSignup;
