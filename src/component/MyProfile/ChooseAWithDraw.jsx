import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import "./profile.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Input } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ChooseAWithDraw({ setOpenTag }) {
  const openStandardECheck = () => {
    setOpenTag("standardECheck");
  };
  const openPaperECheck = () => {
    setOpenTag("paperECheck");
  };

  const [chooseType, setChooseType] = useState([
    {
      icon: "/mailbox1.png",
      name: "Paper Check",
      waitingTime: "Takes upto 7-10 business days",
      about:
        "A paper check on your name is mailed to your address that can be used to deposit at the bank in your preferred way. ",
      func: openPaperECheck,
    },
    {
      icon: "/bank1.png",
      name: "Direct Deposit ",
      waitingTime: "Takes upto 3-5 business days",
      about:
        "Funds are directly deposited into your M4' bank account Make sure to provide your own bank information, transactions will fail otherwise",
    },
    {
      icon: "/check1.png",
      name: "Standard eCheck",
      waitingTime: "Under 24 hours ",
      about:
        "An eCheck is emailed within 3-5 business P days to your email address. You can print this check and deposit at the bank in your preferred way.",
      func: openStandardECheck,
    },
  ]);

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
        onClick={() => setOpenTag("WidthDrawCash")}
      >
        <ArrowBackIosNewIcon sx={{ color: "secondary.dark_gray" }} />
        <Typography
          sx={{
            fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
            fontWeight: 600,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
            ml: "15px",
          }}
        >
          Choose a withdraw method{" "}
        </Typography>
      </Box>
      {chooseType.map((e, index) => (
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
          onClick={e.func}
        >
          <Box
            sx={{
              width: "90%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <img src={e.icon} className="chooseIcon" />
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
                  fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
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
                  fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
                  fontWeight: 400,
                  fontFamily: "poppins",
                  color: "secondary.dark_gray",
                  width: "100%",
                  mb: "4px",
                }}
              >
                {e.waitingTime}
              </Typography>
              <Typography
                sx={{
                  fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
                  fontWeight: 400,
                  fontFamily: "poppins",
                  color: "secondary.dark_gray",
                  width: "100%",
                  mb: "4px",
                }}
              >
                {e.about}
              </Typography>
            </Box>
          </Box>
          <ArrowForwardIosIcon
            sx={{ fontSize: { sm: "25px", xxxs: "20px" } }}
          />
        </Box>
      ))}{" "}
      <Typography
        sx={{
          fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
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
}
