import "./profile.css";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Input } from "@mui/material";

export default function AddPhoneNumber({
  setOpenTag,
  phoneNumber,
  setPhoneNumber,
}) {
  const goToVerifyCodePage = () => {
    if (phoneNumber) {
      setOpenTag("verifycation-code");
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
        onClick={() => setOpenTag("profile")}
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
          Add Phone Number{" "}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
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
          fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
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
          fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
          fontWeight: 500,
          mt: "24px",
          pb: "16px",
        }}
        placeholder="Phone Number"
        type="number"
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <Button
        sx={{
          padding: { xs: "17px 145px 10px 149px", xxxs: "15px 70px 10px 70px" },
          background: "#4831D4",
          color: "white",
          mt: "24px",
          textTransform: "none",
          borderRadius: "8px",
          "&.MuiButtonBase-root:hover": {
            background: "#4831D4",
          },
          fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
          fontWeight: 600,
          fontFamily: "poppins",
        }}
        onClick={goToVerifyCodePage}
      >
        Submit
      </Button>
    </Box>
  );
}
