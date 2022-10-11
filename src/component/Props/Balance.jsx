import { Box, Typography } from "@mui/material";
import React from "react";
import "./props.css";

export default function () {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            fontSize: { xl: "14px", md: "12px", xxxs: "10px" },
            fontWeight: 600,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
          }}
        >
          To Win Amount:
        </Typography>
        <Typography
          sx={{
            fontSize: { xl: "18px", md: "16px", xxxs: "14px" },
            fontWeight: 600,
            fontFamily: "poppins",
            color: "#52C03C",
          }}
        >
          $20
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: { xl: "12px", md: "10px", xxxs: "8px" },
          fontWeight: 500,
          fontFamily: "poppins",
          color: "secondary.dark_gray",
        }}
      >
        Your Wallet Balance
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          mb: "2px",
        }}
      >
        <Typography
          sx={{
            fontSize: { xl: "12px", md: "10px", xxxs: "8px" },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
          }}
        >
          Un-used
        </Typography>
        <Typography
          sx={{
            fontSize: { xl: "12px", md: "10px", xxxs: "8px" },
            fontWeight: 600,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
          }}
        >
          $0
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          mb: "2px",
        }}
      >
        <Typography
          sx={{
            fontSize: { xl: "12px", md: "10px", xxxs: "8px" },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
          }}
        >
          Withdrawable
        </Typography>
        <Typography
          sx={{
            fontSize: { xl: "12px", md: "10px", xxxs: "8px" },
            fontWeight: 600,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
          }}
        >
          $0
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          mb: "8px",
        }}
      >
        <Typography
          sx={{
            fontSize: { xl: "12px", md: "10px", xxxs: "8px" },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
          }}
        >
          Bonus
        </Typography>
        <Typography
          sx={{
            fontSize: { xl: "12px", md: "10px", xxxs: "8px" },
            fontWeight: 600,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
          }}
        >
          $0
        </Typography>
      </Box>
    </>
  );
}
