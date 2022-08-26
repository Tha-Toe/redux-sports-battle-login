import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import "./props.css";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { AndresCard } from "./AndresCard";
import Times from "./TImes";
import Amount from "./Amount";
import ChooseType from "./ChooseType";
import Balance from "./Balance";
import SubmitProjection from "./SubmitProjection";
import GridItemComponent from "./GridItemComponent";

export default function HowTo({ setOpenHowTo }) {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background: "rgba(0,0,0,0.9)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: {
            md: "672px",
            sm: "500px",
            xs: "400px",
            xxs: "350px",
            xxxs: "280px",
          },
          height: "385px",
          bgcolor: "primary.dark",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "#4831D4",
            fontSize: { md: "24px", sm: "20px", xxxs: "18px" },
            fontWeight: 700,
            fontFamily: "poppins",
            width: "90%",
            mt: "20px",
          }}
        >
          Over-Under Basics
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "rows",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "90%",
          }}
        >
          <CheckCircleIcon
            sx={{
              color: "#52C03C",
              fontSize: { xs: "35px", xxxs: "30px" },
              mr: "12px",
            }}
          />
          <Typography
            sx={{
              color: "secondary.dark_gray",
              fontSize: { xs: "16px", xxxs: "12px" },
              fontWeight: 400,
              fontFamily: "poppins",
            }}
          >
            Choose 2 or more players from both the teams for this game board
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "rows",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "90%",
          }}
        >
          <CheckCircleIcon
            sx={{
              color: "#52C03C",
              fontSize: { xs: "35px", xxxs: "30px" },
              mr: "12px",
            }}
          />
          <Typography
            sx={{
              color: "secondary.dark_gray",
              fontSize: { xs: "16px", xxxs: "12px" },
              fontWeight: 400,
              fontFamily: "poppins",
            }}
          >
            Choose OVER or UNDER the displayed projected stat. If you think
            player will perform well in this game, choose OVER, else UNDER In
            the next screen, choose 61 ATTACK play or DEFENSE play{" "}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "rows",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "90%",
          }}
        >
          <CheckCircleIcon
            sx={{
              color: "#52C03C",
              fontSize: { xs: "35px", xxxs: "30px" },
              mr: "12px",
            }}
          />
          <Typography
            sx={{
              color: "secondary.dark_gray",
              fontSize: { xs: "16px", xxxs: "12px" },
              fontWeight: 400,
              fontFamily: "poppins",
            }}
          >
            With ATTACK play, you must get all picks right. Attack pays 0 out
            more and a 5 pick play
          </Typography>
        </Box>
        <Button
          sx={{
            color: "white",
            fontSize: "16px",
            fontWieght: 500,
            fontFamily: "poppins",
            background: "#4831D4",
            width: "90%",
            margin: "0 auto",
            py: { xs: "20px", xxxs: "10px" },
            mb: "10px",
            "&.MuiButtonBase-root:hover": {
              background: "#4831D4",
            },
            borderRadius: "8px",
            textTransform: "none",
          }}
          onClick={() => {
            setOpenHowTo(false);
          }}
        >
          Okay
        </Button>
      </Box>
    </Box>
  );
}
