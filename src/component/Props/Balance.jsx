import { Box, Typography } from "@mui/material";
import React from "react";
import "./props.css";
import { useSelector } from "react-redux";
export default function () {
  const fs = useSelector((state) => state.user.fs);
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
            fontSize: { xl: fs.small, md: fs.xs, xxxs: fs.xxs },
            fontWeight: 600,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
          }}
        >
          To Win Amount:
        </Typography>
        <Typography
          sx={{
            fontSize: { xl: fs.large, md: fs.normal, xxxs: fs.small },
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
          fontSize: { xl: fs.xs, md: fs.xxs, xxxs: fs.xxxs },
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
            fontSize: { xl: fs.xs, md: fs.xxs, xxxs: fs.xxxs },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
          }}
        >
          Un-used
        </Typography>
        <Typography
          sx={{
            fontSize: { xl: fs.xs, md: fs.xxs, xxxs: fs.xxxs },
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
            fontSize: { xl: fs.xs, md: fs.xxs, xxxs: fs.xxxs },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
          }}
        >
          Withdrawable
        </Typography>
        <Typography
          sx={{
            fontSize: { xl: fs.xs, md: fs.xxs, xxxs: fs.xxxs },
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
            fontSize: { xl: fs.xs, md: fs.xxs, xxxs: fs.xxxs },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
          }}
        >
          Bonus
        </Typography>
        <Typography
          sx={{
            fontSize: { xl: fs.xs, md: fs.xxs, xxxs: fs.xxxs },
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
