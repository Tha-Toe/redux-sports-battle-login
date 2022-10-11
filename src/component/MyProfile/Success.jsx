import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import "./profile.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Success({ setConfirm, setSuccess, setWrong, mode }) {
  const goWrongPage = () => {
    setWrong(true);
    setSuccess(false);
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
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            mt: "26px",
            mb: "18px",
          }}
        >
          <ClearIcon
            onClick={() => setSuccess(false)}
            sx={{ cursor: "pointer", color: "secondary.dark_gray" }}
          />
        </Box>
        <CheckCircleIcon
          sx={{
            color: `${mode === "dark" ? "#C8E6CA" : "#439F48"}`,
            fontSize: { sm: "60px", xxs: "50px", xxxs: "40px" },
          }}
        />
        <Typography
          sx={{
            fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
            fontWeight: 400,
            fontFamily: "poppins",
            color: `${mode === "dark" ? "#C8E6CA" : "#439F48"}`,
            mt: "16px",
            width: "70%",
            textAlign: "center",
          }}
        >
          Request received. Please allow 1-2 business days for our Compliance
          Team to review and approve the request.{" "}
        </Typography>
        <Button
          sx={{
            fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
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
          onClick={goWrongPage}
        >
          Back to my account
        </Button>
      </Box>
    </Box>
  );
}
