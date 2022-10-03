import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import "./props.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export default function NotEnoughBalance({ setNotEnoughBalance, mode }) {
  let navigate = useNavigate();
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
          width: { sm: "550px", xxxs: "90%" },
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
            onClick={() => setNotEnoughBalance(false)}
          />
        </Box>
        <img className="wallet" src="/wallet 1.png" />

        <Typography
          sx={{
            fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
            fontWeight: 700,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
            mt: "8px",
            textAlign: "center",
            width: "75%",
          }}
        >
          Insufficient balance, Add money to your wallet to complete the
          projection submission now
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              padding: "12px 57px",
              fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
              fontWeigh: 500,
              fontFamily: "poppins",
              color: "white",
              background: "#4831D4",
              mt: "24px",
              mb: "32px",
              mr: "5px",
              borderRadius: "8px",
              textTransform: "none",
              "&.MuiButtonBase-root:hover": {
                background: "#4831D4",
              },
            }}
            onClick={() => {
              setNotEnoughBalance(false);
              navigate("/home?deposit=old-user", { replace: true });
            }}
          >
            Add Cash{" "}
          </Button>
          <Button
            sx={{
              padding: "12px 57px",
              fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
              fontWeigh: 500,
              fontFamily: "poppins",
              color: "white",
              background: "#494949",
              mt: "24px",
              mb: "32px",
              borderRadius: "8px",
              textTransform: "none",
              ml: "5px",
              "&.MuiButtonBase-root:hover": {
                background: "#494949",
              },
            }}
            onClick={() => {
              setNotEnoughBalance(false);
            }}
          >
            Okay{" "}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
