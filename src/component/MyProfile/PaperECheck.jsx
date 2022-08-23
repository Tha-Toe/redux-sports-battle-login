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
import HomeIcon from "@mui/icons-material/Home";

export default function PaperECheck({
  setOpenTag,
  setAlreadyChooseWidthDraw,
  address,
}) {
  const goSelectAddressPaperCheck = () => {
    setOpenTag("select-address-paper-check");
  };

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
          justifyContent: "space-between",
          alignItems: "center",
          mt: "15px",
          cursor: "pointer",
          mb: "31px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => setOpenTag("chooseAWithdrawMethod")}
        >
          <ArrowBackIosNewIcon />
          <Typography
            sx={{
              fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
              fontWeight: 600,
              fontFamily: "poppins",
              color: "secondary.main",
              ml: "15px",
            }}
          >
            Choose a withdraw method{" "}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
            fontWeight: 500,
            fontFamily: "poppins",
            color: "secondary.main",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Show all options
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-between",
          borderBottom: "1px solid #494949",
          mb: "11px",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img src="/mailbox1.png" className="chooseIcon" />
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
                color: "secondary.main",
                width: "100%",
                mb: "4px",
              }}
            >
              Paper Check{" "}
            </Typography>
            <Typography
              sx={{
                fontSize: { sm: "12px", xxs: "10px", xxxs: "8px" },
                fontWeight: 400,
                fontFamily: "poppins",
                color: "secondary.main",
                width: "100%",
                mb: "4px",
              }}
            >
              Takes upto 7-10 business days{" "}
            </Typography>
            <Typography
              sx={{
                fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
                fontWeight: 400,
                fontFamily: "poppins",
                color: "secondary.main",
                width: "100%",
                mb: "4px",
              }}
            >
              A paper check on your name is mailed to your address that can be
              used to deposit at the bank in your preferred way.
            </Typography>
          </Box>
        </Box>
        <ArrowForwardIosIcon />
      </Box>
      <Typography
        sx={{
          color: "secondary.main",
          fontFamily: "poppins",
          fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
          fontWeight: 600,
          mt: "16px",
          width: "90%",
        }}
      >
        Destination
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "90%",
          justifyContent: "flex-start",
          mt: "16px",
        }}
      >
        <Typography
          sx={{
            color: "secondary.main",
            fontFamily: "poppins",
            fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
            fontWeight: 600,
          }}
        >
          Name:
        </Typography>
        <Typography
          sx={{
            color: "secondary.main",
            fontFamily: "poppins",
            fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
            fontWeight: 400,
            ml: "8px",
          }}
        >
          PHANI GUNDAMRAJ{" "}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "primary.light",
          width: "90%",
          cursor: "pointer",
          mt: "12px",
        }}
        onClick={goSelectAddressPaperCheck}
      >
        <HomeIcon sx={{ width: "10%", color: "#4831D4" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "80%",
            py: "13px",
          }}
        >
          {!address && (
            <Typography
              sx={{
                fontSize: { sm: "14px", xxxs: "12px" },
                fontWeight: 600,
                fontFamily: "poppins",
                color: "white",
              }}
            >
              Address
            </Typography>
          )}
          <Typography
            sx={{
              fontSize: { sm: "12px", xxxs: "10px" },
              fontWeight: 300,
              fontFamily: "poppins",
              color: "white",
              mb: "12px",
              width: { md: "25%", xs: "40%", xxxs: "60%" },
            }}
          >
            {address ? address : "Select your address"}
          </Typography>
        </Box>
        <ArrowForwardIosIcon sx={{ width: "10%", color: "white" }} />
      </Box>

      <Button
        sx={{
          fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
          fontWeight: 600,
          fontFamily: "poppins",
          color: "white",
          background: "#4831D4",
          padding: { xs: "14px 77px", xxxs: "10px 60px" },
          mt: "32px",
          borderRadius: "8px",
          "&.MuiButtonBase-root:hover": {
            background: "#4831D4",
          },
          textTransform: "none",
        }}
        onClick={() => {
          setAlreadyChooseWidthDraw("paper-eCheck");
          setOpenTag("WidthDrawCash");
        }}
      >
        Choose Paper eCheck{" "}
      </Button>
      <Typography
        sx={{
          fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
          fontWeight: 400,
          fontFamily: "poppins",
          color: "secondary.main",
          width: "100%",
          mt: "32px",
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