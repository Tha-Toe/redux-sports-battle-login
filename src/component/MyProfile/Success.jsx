import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import "./profile.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSelector } from "react-redux";

export default function Success({
  setConfirm,
  setSuccess,
  setWrong,
  mode,
  success,
  setOpenTag,
  updateGetUserById,
}) {
  const goBack = () => {
    updateGetUserById();
    setOpenTag("profile");
    setSuccess(null);
  };
  const fs = useSelector((state) => state.user.fs);
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
        <CheckCircleIcon
          sx={{
            mt: "36px",
            color: `${mode === "dark" ? "#C8E6CA" : "#439F48"}`,
            fontSize: { sm: "60px", xxs: "50px", xxxs: "40px" },
          }}
        />
        <Typography
          sx={{
            fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
            fontWeight: 400,
            fontFamily: "poppins",
            color: `${mode === "dark" ? "#C8E6CA" : "#439F48"}`,
            mt: "16px",
            width: "70%",
            textAlign: "center",
          }}
        >
          {success}
        </Typography>
        <Button
          sx={{
            fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
            fontWeight: 600,
            fontFamily: "poppins",
            color: "white",
            background: "#4831D4",
            py: "14px",
            mt: "25px",
            width: "60%",
            borderRadius: "8px",
            textTransform: "none",
            mb: "48px",

            "&.MuiButtonBase-root:hover": {
              background: "#4831D4",
            },
          }}
          onClick={goBack}
        >
          Back to my account
        </Button>
      </Box>
    </Box>
  );
}
