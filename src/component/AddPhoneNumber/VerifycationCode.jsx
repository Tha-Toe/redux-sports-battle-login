import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./verifycationCode.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Input } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector } from "react-redux";
import { APIURLs } from "../../api/ApiUrls";
import { makePOSTAPICall, makeGETAPICall } from "../../api/methods";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";
export default function VerifycationCode({
  setOpenTag,
  phoneNumber,
  setPhoneNumber,
  setVerify,
  callProfileApi,
  verify,
  updateGetUserById,
}) {
  const fs = useSelector((state) => state.user.fs);

  const [loading, setLoading] = useState(false);
  const [startButtonAnimation, setStartButtonAnimation] = useState(false);
  const [codeIncorrect, setCodeIncorrect] = useState(false);
  const resendCode = async () => {
    if (phoneNumber && count < 1) {
      setLoading(true);
      getAddPhone(phoneNumber)
        .then((res) => {
          if (res.exists && res.exists) {
            setOpenTag("add-phone-number");
            setLoading(false);
          } else {
            setLoading(false);
          }
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    }
  };
  let user = JSON.parse(localStorage.getItem("user"));
  const goToVerifyCodePage = () => {
    if (verifyCode && phoneNumber && user) {
      setStartButtonAnimation(true);
      postVerifySms(user.uid, phoneNumber, verifyCode)
        .then((res) => {
          if (res.status === "success") {
            updateGetUserById();
            setVerify(true);
            callProfileApi();
            setStartButtonAnimation(false);
            setOpenTag("profile");
          } else {
            setStartButtonAnimation(false);
            setCodeIncorrect(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const [verifyCode, setVerifyCode] = useState(null);
  const [count, setCount] = useState(30);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (count > 0) {
        let amount = count;
        setCount(amount - 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [count]);

  if (loading) {
    return (
      <Box
        sx={{
          width: {
            lg: "836px",
            md: "700px",
            sm: "560px",
            xs: "90%",
            xxxs: "90%",
          },
          minHeight: "100vh",
          margin: "auto",
          mb: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        component="div"
      >
        <LoadingSpinnerEachSection />
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          width: {
            lg: "836px",
            md: "700px",
            sm: "560px",
            xs: "90%",
            xxxs: "90%",
          },
          minHeight: "100vh",
          margin: "auto",
          mb: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        component="div"
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              mt: "15px",
              cursor: "pointer",
            }}
            onClick={() => setOpenTag("add-phone-number")}
          >
            <ArrowBackIosNewIcon sx={{ color: "secondary.dark_gray" }} />
            <Typography
              sx={{
                fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
                fontWeight: 600,
                fontFamily: "poppins",
                color: "secondary.dark_gray",
                ml: "15px",
              }}
            >
              Back to Phone number{" "}
            </Typography>
          </Box>
          <ClearIcon
            sx={{ color: "secondary.dark_gray", cursor: "pointer" }}
            onClick={() => setOpenTag("profile")}
          />
        </Box>
        <Typography
          sx={{
            fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
            fontFamily: "poppins",
            fontWeight: 600,
            color: "secondary.dark_gray",
            mt: "31px",
            width: "100%",
          }}
        >
          Verification Code{" "}
        </Typography>
        <Typography
          sx={{
            fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
            fontFamily: "poppins",
            fontWeight: 400,
            color: "secondary.dark_gray",
            mt: "13px",
            width: "100%",
          }}
        >
          Please enter verification code sent to your phone number -
          <span style={{ fontWeight: 700, marginLeft: "5px" }}>
            {phoneNumber}
          </span>
        </Typography>
        <Input
          sx={{
            width: "100%",
            borderBottom: "1px solid #494949",
            color: "secondary.dark_gray",
            fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
            fontWeight: 500,
            mt: "24px",
            pb: "16px",
          }}
          placeholder="Enter Verifycation Code"
          type="number"
          onChange={(e) => {
            setVerifyCode(e.target.value);
            setCodeIncorrect(false);
          }}
        />
        <Box
          sx={{
            width: "100%",
            mt: "24px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              py: "14px",
              background: "#000000",
              color: "white",
              textTransform: "none",
              borderRadius: "8px",
              "&.MuiButtonBase-root:hover": {
                background: "#000000",
              },
              fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
              fontWeight: 600,
              fontFamily: "poppins",
              border: "1px solid #fafafa",
              width: "45%",
            }}
            onClick={() => {
              resendCode();
            }}
          >
            Resend Code {count > 0 && `(${count}s)`}
          </Button>
          <Button
            sx={{
              py: "14px",
              background: "#4831D4",
              color: "white",
              textTransform: "none",
              borderRadius: "8px",
              "&.MuiButtonBase-root:hover": {
                background: "#4831D4",
              },
              fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
              fontWeight: 600,
              fontFamily: "poppins",
              width: "45%",
            }}
            onClick={goToVerifyCodePage}
          >
            {startButtonAnimation ? (
              <div className="circleSubmitContainer">
                <div className="circle-one"></div>
                <div className="circle-two"></div>
                <div className="circle-three"></div>
              </div>
            ) : (
              "Submit Code"
            )}
          </Button>
        </Box>
        {verify && (
          <Box
            sx={{
              width: "100%",
              mt: "30px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <CheckIcon sx={{ color: "#52C03C" }} />
            <Typography
              sx={{
                color: "#52C03C",
                fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
                ml: { xs: "21px", xxxs: "10px" },
                fontWeight: 400,
                fontFamily: "poppins",
              }}
            >
              Your mobile number has been verified successfully
            </Typography>
          </Box>
        )}
        {codeIncorrect && (
          <Box
            sx={{
              width: "100%",
              mt: "30px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <ClearIcon sx={{ color: "#E4313C" }} />
            <Typography
              sx={{
                color: "#E4313C",
                fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
                ml: { xs: "21px", xxxs: "10px" },
                fontWeight: 400,
                fontFamily: "poppins",
              }}
            >
              Verification code incorrect{" "}
            </Typography>
          </Box>
        )}
      </Box>
    );
  }
}

export const getAddPhone = async (phonenumber) => {
  var apiUrl = APIURLs.getAddPhone;
  apiUrl = apiUrl.replace("{phonenumber}", phonenumber);
  const apiResponse = await makeGETAPICall(apiUrl);
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return null;
  }
};

//verify sms otp code

export const postVerifySms = async (userId, phoneNumber, verfCode) => {
  var apiUrl = APIURLs.postVerifySms;

  var reqBody = {
    userId: userId,
    phoneNumber: phoneNumber,
    verfCode: verfCode,
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
