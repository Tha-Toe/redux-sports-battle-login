import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./profile.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function AccountSetup({ setOpenTag }) {
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
        mt: "40px",
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
          Account Setup{" "}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
          fontWeight: 400,
          fontFamily: "poppins",
          color: "secondary.main",
          mt: "19px",
          width: "100%",
        }}
      >
        Complete below two steps below to be eligible for withdrawing your cash
        winnings
      </Typography>
      <Typography
        sx={{
          fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
          fontWeight: 400,
          fontFamily: "poppins",
          color: "#4831D4",
          width: "100%",
        }}
      >
        You only do this once
      </Typography>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          borderBottom: "1px solid #494949",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "26px",
          pb: "22px",
          cursor: "pointer",
        }}
        onClick={() => setOpenTag("add-phone-number")}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <CheckCircleIcon sx={{ color: "secondary.main" }} />
          <Typography
            sx={{
              ml: "17px",
              fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
              fontWeight: 600,
              fontFamily: "poppins",
              color: "secondary.main ",
            }}
          >
            Verify your phone
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
            fontWeight: 500,
            fontFamily: "poppins",
            color: "#459F48 ",
          }}
        >
          Verify Phone
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          borderBottom: "1px solid #494949",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "26px",
          pb: "22px",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <CheckCircleIcon sx={{ color: "#459F48" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography
              sx={{
                ml: "17px",
                fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
                fontWeight: 600,
                fontFamily: "poppins",
                color: "secondary.main ",
              }}
            >
              Verify your phone
            </Typography>
            <Typography
              sx={{
                ml: "17px",
                fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
                fontWeight: 400,
                fontFamily: "poppins",
                color: "secondary.main ",
              }}
            >
              You have made your deposit{" "}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          borderBottom: "1px solid #494949",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "26px",
          pb: "22px",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <CheckCircleIcon sx={{ color: "#459F48" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography
              sx={{
                ml: "17px",
                fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
                fontWeight: 600,
                fontFamily: "poppins",
                color: "secondary.main ",
              }}
            >
              Verify your account{" "}
            </Typography>
            <Typography
              sx={{
                ml: "17px",
                fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
                fontWeight: 400,
                fontFamily: "poppins",
                color: "secondary.main ",
              }}
            >
              Your account is verified{" "}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
