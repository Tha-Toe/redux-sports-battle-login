import React, { useContext, useState } from "react";
import "./profile.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";
export default function Wrong({ setWrong, setOpenTag, mode, wrong }) {
  const fs = useSelector((state) => state.user.fs);

  const [supportChatOpen, setSupportChatOpen] = useState(false);
  const openSupportChat = () => {
    if (supportChatOpen) {
      window.Intercom("hide");
      setSupportChatOpen(false);
    } else {
      window.Intercom("show");
      setSupportChatOpen(true);
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
        background: "rgba(0,0,0,0.9)",
        zIndex: "20",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: { sm: "673px", xxxs: "90%" },
          bgcolor: "primary.dark",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "8px",
        }}
      >
        <ClearIcon
          sx={{
            mt: "36px",
            color: "primary.main",
            fontSize: { sm: "60px", xxs: "50px", xxxs: "40px" },
            background: "#E4313C",
            borderRadius: "50%",
          }}
        />
        <Typography
          sx={{
            fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
            fontWeight: 400,
            fontFamily: "poppins",
            color: `${mode === "dark" ? "#F4C7CC" : "#E4313C"}`,
            mt: "16px",
            width: "70%",
            textAlign: "center",
          }}
        >
          {wrong || "Something went wrong, Please try again"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "90%",
            mb: "48px",
          }}
        >
          <Button
            sx={{
              fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
              fontWeight: 600,
              fontFamily: "poppins",
              color: "white",
              background: "#4831D4",
              py: "14px",
              mt: "25px",
              width: "45%",
              borderRadius: "8px",
              textTransform: "none",

              "&.MuiButtonBase-root:hover": {
                background: "#4831D4",
              },
              mr: "24px",
            }}
            onClick={() => {
              setWrong(null);
            }}
          >
            Back to My Account
          </Button>
          <Button
            sx={{
              fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
              fontWeight: 600,
              fontFamily: "poppins",
              color: "#439F48",
              background: "transparent",
              py: "14px",
              mt: "25px",
              width: "45%",
              borderRadius: "8px",
              border: "1px solid #439F48",
              textTransform: "none",
              "&.MuiButtonBase-root:hover": {
                background: "transparent",
              },
            }}
            onClick={() => openSupportChat()}
          >
            Support Chat{" "}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
