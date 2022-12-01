import React, { useState, useEffect } from "react";
import "./addCash.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";
import FailLocationPermission from "../Identity/FailLocationPermission";
import axios from "axios";
import { APIURLs } from "../../api/ApiUrls";
import { makePOSTAPICall } from "../../api/methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLandmark } from "@fortawesome/free-solid-svg-icons";

export default function SelectDepositOption({
  setOpenSelectDepositOption,
  mode,
  amount,
}) {
  const fs = useSelector((state) => state.user.fs);
  const depositData = useSelector((state) => state.user.depositData);
  const [selected, setSelected] = useState(null);
  const [startButtonAnimation, setStartButtonAnimation] = useState(false);
  const [locationBlock, setLocationBlock] = useState(false);
  const myAccountDataCommingFromApi = useSelector(
    (state) => state.user.myAccountDataCommingFromApi
  );
  useEffect(() => {
    if (depositData?.depositOptions.length > 0) {
      setSelected(depositData.depositOptions[0]);
    }
  }, [depositData]);

  //deposit
  let doubleClick = false;

  const handleDeposit = async () => {
    if (!doubleClick && amount && depositData && myAccountDataCommingFromApi) {
      setStartButtonAnimation(true);
      doubleClick = true;

      let submitObject = {};
      //userId
      submitObject.userId = myAccountDataCommingFromApi.uid;

      //benefitId
      submitObject.benefitId = undefined;

      //email
      submitObject.email = myAccountDataCommingFromApi.email;

      //firstName
      submitObject.firstName = myAccountDataCommingFromApi.firstName;

      //lastName
      submitObject.lastName = myAccountDataCommingFromApi.lastName;

      submitObject.payActionCode = "PAY";

      //payment amount
      submitObject.paymentAmount = amount.toString();

      //phone number
      submitObject.phoneNumber = myAccountDataCommingFromApi.phoneNumber || "";

      //req id
      submitObject.requestId = undefined;

      //service fee

      submitObject.serviceFee =
        depositData?.serviceFee?.feePerc + depositData.serviceFee?.feeAmount;

      //touchused

      submitObject.touchUsed = depositData.touchId;

      //deviceDateTime
      const currTime = new Date();
      let deviceTime =
        currTime.toLocaleDateString().toString() +
        " " +
        currTime.toTimeString().toString();
      submitObject.deviceDateTime = deviceTime;

      //ipAddress
      const res = await axios.get("https://geolocation-db.com/json/");
      if (!res.data) {
        return;
      }
      submitObject.ipAddress = res.data.IPv4;
      submitObject.ipAddressCountry = res.data.country_code;

      if (!navigator.geolocation) {
        // Geolocation is not supported by your browser
        return;
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            submitObject.latitude = position.coords.latitude;
            submitObject.longitude = position.coords.longitude;
            submitObject.altitude = 0;
            submitObject.speed = -1;
            console.log(submitObject);
            if (submitObject) {
              postDeposit(submitObject)
                .then((res) => {
                  console.log(res);
                  setStartButtonAnimation(false);
                  doubleClick = false;
                })
                .catch((err) => {
                  setStartButtonAnimation(false);
                  doubleClick = false;
                  console.log(err);
                });
            }
          },
          () => {
            setLocationBlock(true);
            doubleClick = false;
            setStartButtonAnimation(false);
            // setStatus('Unable to retrieve your location');
          }
        );
      }
    }

    // setOpenSelectDepositOption(false);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        background: `${
          mode === "dark" ? "rgba(0,0,0,0.9)" : "rgba(115, 115, 115, 0.7)"
        }`,
        zIndex: "101",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {startButtonAnimation ? (
        <Box
          sx={{
            width: { sm: "566px", xxxs: "90%" },
            bgcolor: "primary.dark",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "8px",
            height: { sm: "400px", xxxs: "50%" },
            justifyContent: "center",
          }}
        >
          <FontAwesomeIcon
            icon={faLandmark}
            style={{ fontSize: "40px", color: "rgba(0,0,0,0.6)" }}
          />
          <Typography
            sx={{
              color: "secondary.dark_gray",
              fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
              fontWeight: 700,
              fontFamily: "poppins",
              mt: "10px",
            }}
          >
            Initiating payment session...
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            width: { sm: "566px", xxxs: "90%" },
            bgcolor: "primary.dark",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "8px",
          }}
        >
          <Box
            sx={{
              width: "90%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              mt: "12px",
            }}
          >
            <Typography
              sx={{
                color: "secondary.dark_gray",
                fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
                fontWeight: 700,
                fontFamily: "poppins",
              }}
            >
              Select deposit option
            </Typography>
            <ClearIcon
              sx={{ color: "secondary.dark_gray", cursor: "pointer" }}
              onClick={() => setOpenSelectDepositOption(false)}
            />
          </Box>
          {depositData?.depositOptions.map((each, index) => (
            <Box
              key={index}
              sx={{
                border: `${
                  each.text === selected?.text
                    ? "1px solid #459F48"
                    : "1px solid #494949"
                }`,
                borderRadius: "4px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "90%",
                py: "11px",
                mt: "16px",
                cursor: "pointer",
              }}
              onClick={() => setSelected(each)}
            >
              <Typography
                sx={{
                  fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
                  fontWeight: 700,
                  fontFamily: "poppins",
                  color: "secondary.dark_gray",
                  ml: "10px",
                }}
              >
                {each.text}
              </Typography>
              <Button
                sx={{
                  color: "secondary.dark_gray",
                  bgcolor: "primary.dark_gray",
                  bgcolor: `${
                    each.text === selected?.text
                      ? "primary.dark_gray"
                      : "primary.light"
                  }`,
                  padding: "5px 12px",
                  mr: "10px",
                  "&.MuiButtonBase-root:hover": {
                    bgcolor: `${
                      each.text === selected?.text
                        ? "primary.dark_gray"
                        : "primary.light"
                    }`,
                  },
                  fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                  fontWeight: 500,
                  fontFamily: "poppins",
                  textTransform: "none",
                }}
              >
                {each.subText}
              </Button>
            </Box>
          ))}

          <Button
            sx={{
              py: "16px",
              width: "90%",
              fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
              fontWeigh: 600,
              fontFamily: "poppins",
              color: "white",
              background: "#439F48",
              mt: "16px",
              mb: "21px",
              borderRadius: "8px",
              textTransform: "none",
              "&.MuiButtonBase-root:hover": {
                background: "#439F48",
              },
            }}
            onClick={() => handleDeposit()}
          >
            {startButtonAnimation ? (
              <div className="circleSubmitContainer">
                <div className="circle-submit-one-address"></div>
                <div className="circle-submit-two-address"></div>
                <div className="circle-submit-three-address"></div>
              </div>
            ) : (
              "Deposit"
            )}
          </Button>
          <Typography
            sx={{
              fontSize: { sm: fs.xs, xxs: fs.xxs, xxxs: fs.xxxs },
              fontWeight: 400,
              fontFamily: "poppins",
              color: "secondary.dark_gray",
            }}
          >
            By continuing, you agree to SportsBattle’s
          </Typography>
          <Typography
            sx={{
              fontSize: { sm: fs.xs, xxs: fs.xxs, xxxs: fs.xxxs },
              fontWeight: 400,
              fontFamily: "poppins",
              color: "#2582E3",
              mb: "17px",
            }}
          >
            terms, privacy policy & conditions
          </Typography>
        </Box>
      )}

      {locationBlock && (
        <FailLocationPermission
          mode={mode}
          setLocationBlock={setLocationBlock}
        />
      )}
    </Box>
  );
}

export const postDeposit = async (submitObject) => {
  var apiUrl = APIURLs.postDeposit;
  var reqBody = submitObject;
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
