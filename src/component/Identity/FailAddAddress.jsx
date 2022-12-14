import { Box } from "@mui/system";
import React, { useState } from "react";
import { Typography, Button, Input } from "@mui/material";
import "./newAddCashForm.css";
import Clear from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";
export default function FailAddAddress({ mode, setFailAddAddress }) {
  const fs = useSelector((state) => state.user.fs);
  let supportChatOpen = false;
  const openSupportChat = () => {
    if (supportChatOpen) {
      window.Intercom("hide");
      supportChatOpen = false;
    } else {
      window.Intercom("show");
      supportChatOpen = true;
    }
  };
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
        <Clear
          sx={{
            bgcolor: "#E4313C",
            color: "black",
            borderRadius: "50%",
            fontSize: { xs: "40px", xxxs: "30px" },
            mt: "32px",
          }}
        />
        <Typography
          sx={{
            color: "#E4313C",
            fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
            fontWeight: 700,
            fontFamily: "poppins",
            mt: "8px",
          }}
        >
          Add Address Failed
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
            fontWeight: 400,
            fontFamily: "poppins",
            mt: "6px",
            width: { xs: "70%", xxxs: "90%" },
            textAlign: "center",
          }}
        >
          Error occurred try again later
        </Typography>
        <Box
          sx={{
            width: "90%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            mt: "24px",
            mb: "32px",
          }}
        >
          <Button
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
            onClick={() => openSupportChat()}
          >
            Support Chat
          </Button>
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
            onClick={() => setFailAddAddress(false)}
          >
            Okay
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
