import { Box } from "@mui/system";
import "./newAddCashVerify.css";
import React from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function NewAddCashVerify() {
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
          fontSize: { sm: "20px", xs: "18px", xxs: "14px", xxxs: "12px" },
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
          fontSize: { sm: "20px", xs: "18px", xxs: "14px", xxxs: "12px" },
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
          fontSize: { sm: "20px", xs: "18px", xxs: "14px", xxxs: "12px" },
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
          fontSize: { sm: "16px", xs: "14px", xxs: "10px", xxxs: "8px" },
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
          fontSize: { sm: "16px", xs: "14px", xxs: "10px", xxxs: "8px" },
          fontWeight: 600,
          fontFamily: "poppins",
          padding: { xs: "16px 89px", xxxs: "12px 70px" },
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
