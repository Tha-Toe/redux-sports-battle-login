import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Typography, Button, Input } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import "./refralBonus.css";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";

export default function RefralBonusCashRandoom({
  number,
  setNumber,
  setOpenTag,
  getUserById,
}) {
  const fs = useSelector((state) => state.user.fs);

  let navigate = useNavigate();
  const backPropsPage = () => {
    navigate("/home", { replace: true });
    setOpenTag("props");
  };
  const goVerifyPhoneNumberCode = () => {
    navigate("/home?deposit=verify-phone-number-code", { replace: true });
  };
  const [disableVerify, setDisableVerify] = useState(true);
  useEffect(() => {
    if (number) {
      setDisableVerify(false);
    } else {
      setDisableVerify(true);
    }
  }, [number]);

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

  const enterReferalCodeDataCommingFromApi = useSelector(
    (state) => state.user.enterReferalCodeDataCommingFromApi
  );
  let location = useLocation();
  let userData = JSON.parse(localStorage.getItem("user"));
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [loadingSpinner, setLoadingSpinner] = useState(true);
  useEffect(() => {
    try {
      setLoadingSpinner(true);
      getUserById(userData.uid).then((res) => {
        setPhoneNumber(res.phoneNumber);
        if (res.phoneNumber && res.idpVerified) {
          navigate("/home?deposit=refral-bonus-cash-code", { replace: true });
        }
        setLoadingSpinner(false);
      });
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }, []);

  if (loadingSpinner) {
    return <LoadingSpinnerEachSection />;
  } else {
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
          onClick={backPropsPage}
        >
          <ArrowBackIosIcon
            sx={{
              fontSize: { md: fs.xxx_large, xxxs: fs.large },
              color: "secondary.dark_gray",
            }}
          />
          <Typography
            sx={{
              fontSize: { md: fs.normal, sm: fs.small, xxxs: fs.xs },
              fontWeight: 600,
              fontFamily: "poppins",
              color: "secondary.dark_gray",
            }}
          >
            Referral Bonus Cash Redeem{" "}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: { md: fs.small, sm: fs.xs, xxxs: fs.xxs },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
            width: "100%",
            mt: "21px",
          }}
        >
          Please verify phone number to redeem referral bonus cash. We require
          you to verify phone number to make sure every user maintains one
          playing profile{" "}
        </Typography>
        <Typography
          sx={{
            fontSize: { md: fs.normal, sm: fs.small, xxxs: fs.xs },
            fontWeight: 600,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
            width: "100%",
            mt: "23px",
          }}
        >
          Phone Number
        </Typography>{" "}
        <Typography
          sx={{
            fontSize: { md: fs.normal, sm: fs.small, xxxs: fs.xs },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
            width: "100%",
            mt: "13px",
          }}
        >
          Please enter a valid 10 digit US phone number. This phone number
          should have capability of receiving text messages.{" "}
        </Typography>
        <Input
          type="number"
          variant="outlined"
          placeholder="Phone Number"
          sx={{
            color: "secondary.dark_gray",
            borderBottom: "1px solid #494949",
            width: "100%",
            py: "8px",
            fontSize: { md: fs.normal, sm: fs.small, xxxs: fs.xs },
            fontWeight: 500,
            fontFamily: "poppins",
            outline: "none",
            mt: "24px",
          }}
          onChange={(e) => setNumber(e.target.value)}
        />
        <ThemeProvider theme={theme}>
          <Button
            sx={{
              background: "#4831D4",
              fontSize: { md: fs.normal, sm: fs.small, xxxs: fs.xs },
              fontWeight: 600,
              fontFamily: "poppins",
              padding: { xs: "17px 145px 9px 145px", xxxs: "10px 70px" },
              color: "white",
              "&.MuiButtonBase-root:hover": {
                background: "#4831D4",
              },
              mt: "24px",
              textTransform: "none",
            }}
            disabled={disableVerify}
            className="disableButton"
            onClick={goVerifyPhoneNumberCode}
          >
            Verify
          </Button>
        </ThemeProvider>
      </Box>
    );
  }
}
