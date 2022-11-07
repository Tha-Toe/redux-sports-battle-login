import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import "./props.css";
import { useSelector } from "react-redux";

export default function ErrorSubmit({
  setErrorSubmit,
  errorSubmit,
  setNotEnoughBalance,
  mode,
  setSelectedCardList,
}) {
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
          width: { sm: "444px", xxxs: "90%" },
          bgcolor: "primary.dark",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "8px",
        }}
      >
        <ClearIcon
          sx={{
            color: "black",
            bgcolor: "#E4313C",
            borderRadius: "50%",
            fontSize: "40px",
            mt: "20px",
          }}
        />
        <Typography
          sx={{
            fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
            mt: "8px",
            textAlign: "center",
            width: "75%",
          }}
        >
          {errorSubmit}
        </Typography>
        <Button
          sx={{
            padding: "12px 87px",
            fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
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
            setSelectedCardList([]);
            setErrorSubmit(null);
          }}
        >
          Okay{" "}
        </Button>
      </Box>
    </Box>
  );
}
