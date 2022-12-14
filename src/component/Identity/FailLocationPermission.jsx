import { Box } from "@mui/system";
import React, { useState } from "react";
import { Typography, Button, Input } from "@mui/material";
import "./newAddCashForm.css";
import WarningIcon from "@mui/icons-material/Warning";
import { useSelector } from "react-redux";
export default function FailLocationPermission({ mode, setLocationBlock }) {
  const fs = useSelector((state) => state.user.fs);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        background: `${
          mode === "dark" ? "rgba(0,0,0,0.9)" : "rgba(115, 115, 115, 0.7)"
        }`,
        zIndex: "20",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: { sm: "574px", xxxs: "90%" },
          background: "#2A2A2A",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "8px",
        }}
      >
        <WarningIcon
          sx={{
            color: "#E4313C",
            fontSize: { xs: "50px", xxxs: "35px" },
            mt: "32px",
          }}
        />
        <Typography
          sx={{
            color: "#E4313C",
            fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
            fontWeight: 700,
            fontFamily: "poppins",
            mt: "8px",
          }}
        >
          Location Permission Need
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
            fontWeight: 400,
            fontFamily: "poppins",
            mt: "6px",
            width: { xs: "80%", xxxs: "90%" },
            textAlign: "center",
          }}
        >
          You need to allow location permission to use this feature. You can
          follow these - Browser Settings >> Privacy and Security >> Site
          Settings >> localhost:3000 >> Location >> Allow.
        </Typography>
        <Box
          sx={{
            width: "90%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            mt: "24px",
            mb: "32px",
          }}
        >
          {/* <Button
            sx={{
              background: "transparent",
              fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
              fontWeight: 500,
              fontFamily: "poppins",
              py: { xs: "12px", xxxs: "10px" },
              color: "#439F48",
              border: "1px solid #439F48",
              borderRadius: "8px",
              width: "47%",
              "&.MuiButtonBase-root:hover": {
                background: "#4831D4",
              },

              textTransform: "none",
            }}
          >
            Support Chat
          </Button> */}
          <Button
            sx={{
              background: "#4831D4",
              fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
              fontWeight: 500,
              fontFamily: "poppins",
              py: { xs: "12px", xxxs: "10px" },
              width: "47%",
              color: "white",
              borderRadius: "8px",

              "&.MuiButtonBase-root:hover": {
                background: "#4831D4",
              },

              textTransform: "none",
            }}
            onClick={() => setLocationBlock(false)}
          >
            Okay
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
