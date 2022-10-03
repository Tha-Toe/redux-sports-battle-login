import React from "react";
import "./enterYourDetail.css";
import Box from "@mui/material/Box";
import { FormControl, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ContinueButtonComponent,
  InputComponent,
  BackButtonComponent,
} from "../../defaultComponent/DefaultComponent";

const EnterYourDetail = ({ mode, setMode }) => {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  let navigate = useNavigate();

  const handleBack = () => {
    navigate("/choose", { replace: true });
  };

  const handleContinue = () => {
    navigate("/signupverification", { replace: true });
  };

  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    if (email && name) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [email, name]);
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
            width: {
              md: "408px",
              sm: "390px",
              xs: "408px",
              xxs: "300px",
              xxxs: "250px",
            },
            mr: { xs: "20px", sm: 0 },
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
                fontSize: { xs: "14px", xxxs: "12px" },
                mb: "11px",
                fontFamily: "Poppins",
                color: "secondary.dark_gray",
              }}
            >
              STEP 1 OF 3
            </Typography>
            <Typography
              sx={{
                fontSize: { sm: "32px", xxxs: "20px" },
                fontWeight: "700",
                mb: "4px",
                fontFamily: "Poppins",
                color: "secondary.dark_gray",
              }}
            >
              Enter your details
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "14px", xxs: "11px", xxxs: "8px" },
                mb: "25px",
                fontFamily: "Poppins",
                color: "secondary.dark_gray",
              }}
            >
              You'll receive code for your email verification.
            </Typography>
            <InputComponent
              placeholder={"Full Name"}
              setName={setName}
              mode={mode}
            />
            <Typography
              sx={{
                fontSize: { xs: "14px", xxs: "11px", xxxs: "8px" },
                mb: "22px",
                mt: "-8px",
                fontFamily: "Poppins",
                color: "secondary.dark_gray",
              }}
            >
              Enter your name as per your passport/ National ID's
            </Typography>
            <InputComponent
              placeholder={"Email Address"}
              setEmail={setEmail}
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
                text={"Continue"}
                handleContinue={handleContinue}
                disabled={disableButton}
                rightArrow={true}
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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "primary.main",
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
              border: 2,
              borderRadius: "50%",
              borderColor: `${mode === "dark" ? "white" : "#494949"}`,
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
export default EnterYourDetail;
