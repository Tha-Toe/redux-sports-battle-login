import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Typography, Button, Input } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./refralBonus.css";
import { APIURLs } from "../../api/ApiUrls";
import { makePOSTAPICall } from "../../api/methods";
import ClearIcon from "@mui/icons-material/Clear";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";
import { useSelector } from "react-redux";
export default function RefralBonusCashCode({
  getUserById,
  setOpenTag,
  callProfileApi,
}) {
  const fs = useSelector((state) => state.user.fs);

  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [disableVerify, setDisableVerify] = useState(true);
  const [referCode, setReferCode] = useState(null);
  useEffect(() => {
    if (referCode) {
      setDisableVerify(false);
    } else {
      setDisableVerify(true);
    }
  }, [referCode]);

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
  const goVerifyPhoneNumberCode = () => {
    setOpenTag("my-profile");
    navigate("/home", { replace: true });
    callProfileApi();
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const [success, setSuccess] = useState(false);
  const [startButtonAnimation, setStartButtonAnimation] = useState(false);
  const handleClick = () => {
    if (user && referCode) {
      setStartButtonAnimation(true);
      setError(null);
      postRedeemCode(user.uid, referCode)
        .then((res) => {
          if (res && res.status === "success") {
            console.log(res);
            setSuccess(true);
            setStartButtonAnimation(false);
          } else {
            console.log(res);
            setError(res);
            setStartButtonAnimation(false);
          }
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    }
  };
  const [loadingSpinner, setLoadingSpinner] = useState(true);
  let userData = JSON.parse(localStorage.getItem("user"));
  let location = useLocation();
  useEffect(() => {
    try {
      setLoadingSpinner(true);
      getUserById(userData.uid).then((res) => {
        if (!res.phoneNumberVerified || !res.idpVerified) {
          navigate("/home", {
            replace: true,
          });
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
          onClick={goVerifyPhoneNumberCode}
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
          Please enter the referral code from a friend to get bonus cash. If
          redeemed successfully, you and your friend will receive $25 bonus
          cash.
        </Typography>
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
          If you have other referral code, respective amount will be added to
          your bonus cash
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
          Referral Code{" "}
        </Typography>{" "}
        <Typography
          sx={{
            fontSize: { md: fs.xs, sm: fs.xxs, xxxs: fs.xxxs },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
            width: "100%",
            mt: "13px",
          }}
        >
          Referral codes are case sensitive
        </Typography>
        <Input
          type="text"
          variant="outlined"
          placeholder="Enter Referral Code"
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
          onChange={(e) => setReferCode(e.target.value)}
        />
        {error && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mt: "13px",
            }}
          >
            <ClearIcon sx={{ color: "#E4313C", mr: "12px" }} />
            <Typography
              sx={{
                fontSize: { md: fs.small, sm: fs.xs, xxxs: fs.xxs },
                fontWeight: 300,
                fontFamily: "poppins",
                color: "#E4313C",
              }}
            >
              {error.errorMsg}
            </Typography>
          </Box>
        )}
        {success ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: "32px",
            }}
          >
            <CheckCircleIcon
              sx={{
                color: "#52C03C",
                fontSize: { sm: "50px", xs: "40px", xxxs: "35px" },
              }}
            />
            <Typography
              sx={{
                fontSize: { md: fs.small, sm: fs.xs, xxxs: fs.xxs },
                fontWeight: 600,
                fontFamily: "poppins",
                color: "secondary.dark_gray",
                width: "80%",
                mt: "16px",
                textAlign: "center",
              }}
            >
              You have successfully used the referral code from JOHN DOE. Bonus
              cash of $25 is added. Please check/refresh your account screen and
              transaction history.{" "}
            </Typography>
          </Box>
        ) : (
          <ThemeProvider theme={theme}>
            <Button
              sx={{
                background: "#4831D4",
                fontSize: { md: fs.small, sm: fs.xs, xxxs: fs.xxs },
                fontWeight: 600,
                fontFamily: "poppins",
                padding: { xs: "17px 119px 17px 123px", xxxs: "10px 70px" },
                color: "white",
                "&.MuiButtonBase-root:hover": {
                  background: "#4831D4",
                },
                mt: "24px",
                textTransform: "none",
              }}
              disabled={disableVerify}
              className="disableButton"
              onClick={() => {
                handleClick();
              }}
            >
              {startButtonAnimation ? (
                <div className="circleSubmitContainer">
                  <div className="circle-one"></div>
                  <div className="circle-two"></div>
                  <div className="circle-three"></div>
                </div>
              ) : (
                "Apply Code"
              )}{" "}
            </Button>
          </ThemeProvider>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", xxxs: "column" },
            alignItems: "center",
            justifyContent: "center",
            mt: "27px",
          }}
        >
          <Typography
            sx={{
              fontSize: { md: fs.xs, sm: fs.xxs, xxxs: fs.xxxs },
              fontWeight: 400,
              fontFamily: "poppins",
              color: "secondary.main",
            }}
          >
            By continuing, you agree to SportsBattle's
          </Typography>
          <Typography
            sx={{
              fontSize: { md: fs.xs, sm: fs.xxs, xxxs: fs.xxxs },
              fontWeight: 400,
              fontFamily: "poppins",
              color: "#2072C4",
              ml: { sm: "4px", xxxs: 0 },
            }}
          >
            terms, privacy policy & payment terms{" "}
          </Typography>
        </Box>
      </Box>
    );
  }
}

//redeem referal code api

export const postRedeemCode = async (userId, referralCode) => {
  var apiUrl = APIURLs.postRedeemCode;
  var reqBody = {
    userId: userId,
    referralCode: referralCode,
  };
  //console.log(apiUrl);
  const apiResponse = await makePOSTAPICall(apiUrl, reqBody);
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return {
      status: "failed",
      errorMsg: "Error occurred, Please try later.",
    };
  }
};
