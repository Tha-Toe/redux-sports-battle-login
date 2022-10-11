import React from "react";

import "./props.css";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export default function SuccessSubmit({
  setSuccessSubmit,
  setErrorSubmit,
  mode,
}) {
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
          width: { sm: "444px", xxxs: "90%" },
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
            mt: "12px",
          }}
        >
          <ClearIcon
            sx={{ color: "secondary.dark_gray", cursor: "pointer" }}
            onClick={() => setSuccessSubmit(false)}
          />
        </Box>
        <CheckCircleIcon sx={{ color: "#52C03C", fontSize: "40px" }} />
        <Typography
          sx={{
            fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
            mt: "8px",
            textAlign: "center",
            width: "75%",
          }}
        >
          Successfully submitted your props. You can withdraw until 2 minutes
          from now.
        </Typography>
        <Button
          sx={{
            padding: "12px 87px",
            fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
            fontWeigh: 500,
            fontFamily: "poppins",
            color: "white",
            background: "#4831D4",
            mt: "24px",
            mb: "32px",
            borderRadius: "8px",
            textTransform: "none",
            "&.MuiButtonBase-root:hover": {
              background: "#4831D4",
            },
          }}
          onClick={() => {
            setErrorSubmit(true);
            setSuccessSubmit(false);
          }}
        >
          Okay{" "}
        </Button>
      </Box>
    </Box>
  );
}
