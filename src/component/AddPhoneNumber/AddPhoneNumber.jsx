import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Input } from "@mui/material";
import { useSelector } from "react-redux";
import { APIURLs } from "../../api/ApiUrls";
import { makeGETAPICall, makePOSTAPICall } from "../../api/methods";
import "./verifycationCode.css";
export default function AddPhoneNumber({
  setOpenTag,
  phoneNumber,
  setPhoneNumber,
  clickedRefral,
  setClickedRefral,
}) {
  const fs = useSelector((state) => state.user.fs);
  const [exists, setExists] = useState(null);
  const [startButtonAnimation, setStartButtonAnimation] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const goToVerifyCodePage = async () => {
    if (phoneNumber) {
      setStartButtonAnimation(true);
      getAddPhone(phoneNumber)
        .then((res) => {
          if (res.exists && res.exists) {
            console.log(res);
            setExists("Phone number already exists on another account.");
            setStartButtonAnimation(false);
          } else {
            console.log(res);
            postSendSms(user.uid, phoneNumber).then((response) => {
              if (response.status === "success") {
                setStartButtonAnimation(false);
                setOpenTag("verifycation-code");
              } else {
                setStartButtonAnimation(false);
                setExists(response.errorMsg);
              }
            });
          }
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    }
  };
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
          justifyContent: "flex-start",
          alignItems: "center",
          mt: "15px",
          cursor: "pointer",
        }}
        onClick={() => {
          setClickedRefral(false);
          setOpenTag("profile");
        }}
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
          Add Phone Number{" "}
        </Typography>
      </Box>
      {clickedRefral && (
        <Typography
          sx={{
            fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
            fontFamily: "poppins",
            fontWeight: 400,
            color: "#4831D4",
            mt: "13px",
            width: "100%",
          }}
        >
          Please verify phone number to redeem referral bonus cash. We require
          you to verify phone number to make sure every user maintains only one
          playing profile
        </Typography>
      )}
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
        Phone Number
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
        Please enter a valid 10 digit US phone number. This phone number should
        have capability of receiving text messages.{" "}
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
        placeholder="Phone Number"
        type="number"
        onChange={(e) => {
          setPhoneNumber(e.target.value);
          setExists(null);
        }}
      />
      {exists && (
        <Typography
          sx={{
            fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
            fontFamily: "poppins",
            fontWeight: 400,
            color: "#E4313C",
            mt: "13px",
            width: "100%",
          }}
        >
          {exists}
        </Typography>
      )}
      {phoneNumber && phoneNumber.length === 10 && (
        <Button
          sx={{
            padding: {
              xs: "17px 145px 10px 149px",
              xxxs: "15px 70px 10px 70px",
            },
            background: "#4831D4",
            color: "white",
            mt: "24px",
            textTransform: "none",
            borderRadius: "8px",
            "&.MuiButtonBase-root:hover": {
              background: "#4831D4",
            },
            fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
            fontWeight: 600,
            fontFamily: "poppins",
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
            "Submit"
          )}
        </Button>
      )}
    </Box>
  );
}

//add phone number

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

//send sms

export const postSendSms = async (userId, phoneNumber) => {
  var apiUrl = APIURLs.postSendSms;

  var reqBody = {
    phoneNumber: phoneNumber,
    userId: userId,
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
