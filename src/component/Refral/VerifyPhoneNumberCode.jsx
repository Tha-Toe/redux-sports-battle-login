import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Typography, Button, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect } from "react";
import "./refralBonus.css";

export default function VerifyPhoneNumberCode({ number, mode }) {
  const navigate = useNavigate();
  const goRefralBonusCashRandoom = () => {
    navigate("/home?deposit=go-refral-bonus-cash-randoom", { replace: true });
  };
  const theme = createTheme({
    palette: {
      action: {
        disabled: "rgba(255,255,255, 0.4)",
      },
    },
    breakpoints: {
      values: {
        xxxs: 0,
        xxs: 380,
        xs: 500,
        sm: 700,
        md: 900,
        lg: 1100,
        xl: 1550,
      },
    },
  });

  const [verifyCode, setVerifyCode] = useState(null);
  const [disableButton, setDisableButton] = useState(true);

  const goAddCashPage = () => {
    setTimeout(() => {
      navigate("/home?deposit=refral-bonus-cash-code", { replace: true });
    }, 2000);
  };
  useEffect(() => {
    if (verifyCode) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [verifyCode]);

  const [startAnimation, setStartAnimation] = useState(false);

  return (
    <Box
      sx={{
        width: { lg: "800px", md: "700px", sm: "500px", xxxs: "90%" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          mt: { sm: "13px", xxxs: "30px" },
          cursor: "pointer",
        }}
        onClick={goRefralBonusCashRandoom}
      >
        <ArrowBackIosIcon
          sx={{
            fontSize: { md: "23px", xxxs: "18px" },
            color: "secondary.dark_gray",
          }}
        />
        <Typography
          sx={{
            fontSize: { md: "16px", sm: "14px", xxxs: "12px" },
            fontWeight: 600,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
          }}
        >
          Referral Bonus Cash Radeem{" "}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: { md: "14px", sm: "12px", xxxs: "10px" },
          fontWeight: 400,
          fontFamily: "poppins",
          width: "100%",
          mt: "16px",
          color: "secondary.dark_gray",
        }}
      >
        Please verify phone number to redeem referral bonus cash. We require you
        to verify phone number to make sure every user maintains one playing
        profile
      </Typography>
      <Typography
        sx={{
          fontSize: { md: "16px", sm: "14px", xxxs: "12px" },
          fontWeight: 600,
          fontFamily: "poppins",
          width: "100%",
          mt: "28px",
          color: "secondary.dark_gray",
        }}
      >
        Verification Code{" "}
      </Typography>{" "}
      <Box
        sx={{
          width: "100%",
          fontWeight: 700,
          fontFamily: "poppins",
          mt: "13px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: { md: "14px", sm: "12px", xxxs: "10px" },
            fontFamily: "poppins",
            fontWeight: 500,
            color: "secondary.dark_gray",
          }}
        >
          Please enter verification code sent to your phone number -{number}
        </Typography>
      </Box>
      <ThemeProvider theme={theme}>
        <Input
          type="number"
          variant="outlined"
          placeholder="Enter Verification Code"
          sx={{
            color: `${mode === "dark" ? "white" : "black"}`,
            borderBottom: "1px solid #494949",
            width: "100%",
            py: "8px",
            fontSize: { md: "16px", sm: "14px", xxxs: "12px" },
            fontWeight: 500,
            fontFamily: "poppins",
            outline: "none",
            mt: "24px",
          }}
          onChange={(e) => {
            setVerifyCode(e.target.value);
          }}
        />
      </ThemeProvider>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "24px",
        }}
      >
        <Button
          sx={{
            background: "transparent",
            fontSize: { md: "14px", sm: "12px", xxxs: "10px" },
            width: { xs: "45%", xxxs: "48%" },
            fontWeight: 400,
            py: { xs: "14px", xxxs: "10px" },
            fontFamily: "poppins",
            color: "secondary.dark_gray",
            "&.MuiButtonBase-root:hover": {
              background: "transparent",
            },
            border: `${
              mode === "dark" ? "1px solid white" : "1px solid #494949"
            }`,
            textTransform: "none",
          }}
        >
          Resend Code(30s){" "}
        </Button>
        <ThemeProvider theme={theme}>
          <Button
            sx={{
              background: "#4831D4",
              fontSize: { md: "14px", sm: "12px", xxxs: "10px" },
              fontWeight: 400,
              fontFamily: "poppins",
              width: { xs: "45%", xxxs: "48%" },
              py: { xs: "14px", xxxs: "10px" },

              color: "white",
              "&.MuiButtonBase-root:hover": {
                background: "#4831D4",
              },
              textTransform: "none",
            }}
            disabled={disableButton}
            className="disableButton"
            onClick={() => {
              setStartAnimation(true);
              goAddCashPage();
            }}
          >
            {startAnimation ? (
              <div className="circleContainer">
                <div className="circle-one"></div>
                <div className="circle-two"></div>
                <div className="circle-three"></div>
              </div>
            ) : (
              "Submit Code"
            )}{" "}
          </Button>
        </ThemeProvider>
      </Box>
    </Box>
  );
}
