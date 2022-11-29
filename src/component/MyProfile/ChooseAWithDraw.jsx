import React from "react";
import { useState, useEffect } from "react";
import "./profile.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useSelector } from "react-redux";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { APIURLs } from "../../api/ApiUrls";
import { makeGETAPICall } from "../../api/methods";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";

export default function ChooseAWithDraw({
  setOpenTag,
  setAlreadyChooseWithDraw,
  enterDollarAmount,
  withdrawMethod,
  setWithdrawMethod,
  setAddress,
}) {
  const fs = useSelector((state) => state.user.fs);
  const openStandardECheck = () => {
    setOpenTag("standardECheck");
  };
  const openPaperECheck = () => {
    setOpenTag("paperECheck");
  };
  const openDirectDeposit = () => {
    setAlreadyChooseWithDraw("direct-deposit");
    setOpenTag("WithDrawCash");
  };
  const [chooseType, setChooseType] = useState([
    {
      icon: "/mailbox1.svg",
      name: "Paper Check",
      waitingTime: "Takes upto 7-10 business days",
      about:
        "A paper check on your name is mailed to your address that can be used to deposit at the bank in your preferred way. ",
      func: openPaperECheck,
    },
    {
      icon: "/bank1.svg",
      name: "Direct Deposit ",
      waitingTime: "Takes upto 3-5 business days",
      about:
        "Funds are directly deposited into your M4' bank account Make sure to provide your own bank information, transactions will fail otherwise",
      func: openDirectDeposit,
    },

    {
      icon: "/check1.svg",
      name: "Standard eCheck",
      waitingTime: "Under 24 hours ",
      about:
        "An eCheck is emailed within 3-5 business P days to your email address. You can print this check and deposit at the bank in your preferred way.",
      func: openStandardECheck,
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      if (enterDollarAmount) {
        setWithdrawMethod([]);
        await getWithdrawMethod(enterDollarAmount)
          .then((res) => {
            console.log(res);
            setWithdrawMethod(res);
          })
          .catch((err) => {
            if (err) {
              console.log(err);
            }
          });
      }
    };
    getData();
  }, [enterDollarAmount]);

  const choose = (e) => {
    if (e === "mailbox") {
      openPaperECheck();
    } else if (e === "bank-plus") {
      setAddress(null);
      openDirectDeposit();
    } else {
      setAddress(null);
      openStandardECheck();
    }
  };

  if (withdrawMethod.length > 0) {
    return (
      <Box
        sx={{
          width: {
            lg: "836px",
            md: "700px",
            sm: "560px",
            xs: "450px",
            xxxs: "90%",
          },
          minHeight: "100vh",
          margin: "auto",
          mt: "10px",
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
            mb: "31px",
          }}
          onClick={() => setOpenTag("WithDrawCash")}
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
            Choose a withdraw method{" "}
          </Typography>
        </Box>
        {withdrawMethod.map((e, index) => (
          <Box
            key={index}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #494949",
              mb: "11px",
              cursor: "pointer",
              pb: "13px",
            }}
            onClick={() => choose(e.type)}
          >
            <Box
              sx={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img
                src={`${
                  e.type === "mailbox"
                    ? "/mailbox1.svg"
                    : e.type === "bank-plus"
                    ? "bank1.svg"
                    : "/check1.svg"
                }`}
                className="chooseIcon svg-blue"
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  width: "90%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
                    fontWeight: 600,
                    fontFamily: "poppins",
                    color: "secondary.dark_gray",
                    width: "100%",
                    mb: "4px",
                  }}
                >
                  {e.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                    fontWeight: 400,
                    fontFamily: "poppins",
                    color: "secondary.dark_gray",
                    width: "100%",
                    mb: "4px",
                  }}
                >
                  {e.subtext}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                    fontWeight: 400,
                    fontFamily: "poppins",
                    color: "secondary.dark_gray",
                    width: "100%",
                    mb: "4px",
                  }}
                >
                  {e.description}
                </Typography>
              </Box>
            </Box>
            <ArrowForwardIosIcon
              sx={{ fontSize: { sm: fs.xxx_large, xxxs: fs.x_large } }}
            />
          </Box>
        ))}{" "}
        <Typography
          sx={{
            fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
            width: "100%",

            mt: "5px",
          }}
        >
          Declaration and payment of all income taxes associated with contest
          winnings are sole responsibility of the contest winner. Failure to
          comply with tax regulations and failure to pay tax liabilities may
          result in civil penalities or criminal liability.
        </Typography>
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
            xs: "450px",
            xxxs: "90%",
          },
          height: "100vh",
          margin: "auto",
          mt: "10px",
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
  }
}

//get withdraw cash
export const getWithdrawMethod = async (enterDollarAmount) => {
  var apiUrl = APIURLs.getWithdrawMethod;
  apiUrl = apiUrl.replace("{amount}", enterDollarAmount);
  const apiResponse = await makeGETAPICall(apiUrl);
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return null;
  }
};
