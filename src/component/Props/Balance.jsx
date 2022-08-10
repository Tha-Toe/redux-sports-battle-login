import { Box, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
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
            fontSize: "10px",
            fontWeight: 600,
            fontFamily: "poppins",
            color: "white",
          }}
        >
          To Win Amount:
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
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
          fontSize: "8px",
          fontWeight: 500,
          fontFamily: "poppins",
          color: "white",
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
            fontSize: "8px",
            fontWeight: 400,
            fontFamily: "poppins",
            color: "white",
          }}
        >
          Un-used
        </Typography>
        <Typography
          sx={{
            fontSize: "8px",
            fontWeight: 600,
            fontFamily: "poppins",
            color: "white",
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
            fontSize: "8px",
            fontWeight: 400,
            fontFamily: "poppins",
            color: "white",
          }}
        >
          Withdrawable
        </Typography>
        <Typography
          sx={{
            fontSize: "8px",
            fontWeight: 600,
            fontFamily: "poppins",
            color: "white",
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
            fontSize: "8px",
            fontWeight: 400,
            fontFamily: "poppins",
            color: "white",
          }}
        >
          Bonus
        </Typography>
        <Typography
          sx={{
            fontSize: "8px",
            fontWeight: 600,
            fontFamily: "poppins",
            color: "white",
          }}
        >
          $0
        </Typography>
      </Box>
    </>
  );
}