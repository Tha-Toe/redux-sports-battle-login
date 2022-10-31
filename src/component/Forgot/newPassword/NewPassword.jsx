import React from "react";
import "./newPassword.css";
import Box from "@mui/material/Box";
import { FormControl, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ContinueButtonComponent,
  InputComponent,
  BackButtonComponent,
  PasswordInputComponent,
} from "../../defaultComponent/DefaultComponent";
import { useSelector } from "react-redux";

const NewPassword = () => {
  const fs = useSelector((state) => state.user.fs);
  const [enterPassword, setEnterPassword] = useState(null);
  const [reEnterPassword, setReEnterPassword] = useState(null);
  const [showPass, setShowPass] = useState(false);

  let navigate = useNavigate();

  const handleBack = () => {
    navigate("/checkmail", { replace: true });
  };

  const handleContinue = () => {
    return;
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
          <Box component={"div"} sx={{ width: 1 }}>
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
                fontSize: { xs: "28px", xxxs: fs.large },
                fontWeight: "700",
                mb: "4px",
                fontFamily: "Poppins",
              }}
            >
              Create your new password
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                mb: "25px",
                fontFamily: "Poppins",
              }}
            >
              You'll use this log into your account.
            </Typography>
            <PasswordInputComponent
              placeholder={"Enter your new password"}
              showPass={showPass}
              setEnterPassword={setEnterPassword}
              setShowPass={setShowPass}
            />
            <PasswordInputComponent
              placeholder={"Re-enter your new password"}
              showPass={showPass}
              setReEnterPassword={setReEnterPassword}
              setShowPass={setShowPass}
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
                text={"Change Password"}
                handleContinue={handleContinue}
                disabled={disableButton}
                rightArrow={false}
              />
            </Box>
          </FormControl>
        </Box>
      </Box>
      <div className="rightImageContainer-sp">
        <img src="Security-pana-1.png" className="right-image-sp" />
      </div>
    </div>
  );
};
export default NewPassword;
