import React from "react";
import "./checkMail.css";
import Box from "@mui/material/Box";
import { FormControl, Input, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  BackButtonComponent,
  ContinueButtonComponent,
} from "../../defaultComponent/DefaultComponent";
const CheckMail = () => {
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
          <Box component={"div"} sx={{ width: 1, mb: "43px" }}>
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
                fontSize: { sm: "32px", xxxs: "20px" },
                fontWeight: "700",
                mb: "4px",
                fontFamily: "Poppins",
              }}
            >
              Check Mail
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "14px", xxs: "12px", xxxs: "10px" },
                mb: "11px",
                fontFamily: "Poppins",
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
      <div className="rightImageContainer-msp">
        <img src="Mail-sent-pana-1.png" className="right-image-msp" />
      </div>
    </div>
  );
};
export default CheckMail;
