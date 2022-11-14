import { Box } from "@mui/system";
import "./newAddCashVerify.css";
import React from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function NewAddCashVerify() {
  const fs = useSelector((state) => state.user.fs);
  let navigate = useNavigate();
  const goDepositForm = () => {
    navigate("/home?deposit=new&page=form", { replace: true });
  };
  return (
    <Box
      sx={{
        width: { xs: "100%", xxxs: "90%" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
      }}
    >
      <img
        src="check.png"
        style={{
          height: "35px",
          width: "35px",
          marginTop: "51px",
          marginBottom: "12px",
        }}
      />
      <Typography
        sx={{
          fontSize: {
            xl: fs.large,
            sm: fs.normal,
            xs: fs.normal,
            xxs: fs.small,
            xxxs: fs.xs,
          },
          fontWeight: 600,
          fontFamily: "poppins",
          color: "secondary.dark_gray",
          mb: "2px",
        }}
      >
        Lets get you ready to play and win
      </Typography>
      <Typography
        sx={{
          fontSize: {
            xl: fs.large,
            sm: fs.normal,
            xs: fs.normal,
            xxs: fs.small,
            xxxs: fs.xs,
          },
          fontWeight: 600,
          fontFamily: "poppins",
          color: "secondary.dark_gray",
          mb: "2px",
        }}
      >
        Please take a moment to verify your age
      </Typography>
      <Typography
        sx={{
          fontSize: {
            xl: fs.large,
            sm: fs.normal,
            xs: fs.normal,
            xxs: fs.small,
            xxxs: fs.xs,
          },
          fontWeight: 600,
          fontFamily: "poppins",
          color: "secondary.dark_gray",
          mb: "2px",
        }}
      >
        You only do this one time{" "}
      </Typography>
      <Typography
        sx={{
          fontSize: {
            xs: fs.small,
            sm: fs.xs,
            xs: fs.xs,
            xxs: fs.xxs,
            xxxs: fs.xxxs,
          },
          fontWeight: 400,
          fontFamily: "poppins",
          color: "secondary.dark_gray",
          mt: "12px",
          mb: "24px",
        }}
      >
        We promise this wont take long, but we need to verify your age{" "}
      </Typography>
      <Button
        sx={{
          background: "#4831D4",
          fontSize: {
            xl: fs.normal,
            sm: fs.small,
            xs: fs.small,
            xxs: fs.xxs,
            xxxs: fs.xxxs,
          },
          fontWeight: 600,
          fontFamily: "poppins",
          padding: { xs: "9.5px 89px", xxxs: "8px 70px" },
          color: "white",
          "&.MuiButtonBase-root:hover": {
            background: "#4831D4",
          },
          textTransform: "none",
        }}
        onClick={() => {
          goDepositForm();
        }}
      >
        Verify
      </Button>
    </Box>
  );
}
