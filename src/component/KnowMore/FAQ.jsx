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
import "./knowMore.css";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import OverUnderPointSystem from "./OverUnderPointSystem";

export default function FAQ() {
  const [FAQnote, setFAQnote] = useState([
    {
      head: "What is SportsBattle?",
      paragraph:
        "ASportsBattle is a skill-based Daily Fantasy Sports destination for fans in United States of America to compete in single-day online contests across the largest variety of leagues.",
    },
    {
      head: "Is Fantasy Sports legal?",
      paragraph:
        "Ofcourse it is. Fantasy is a game of skill and not gambling which requires the players possess immense knowledge of the game, players and be upto date with the playing 11 and team squads. However, playing cash contests is not legal in certain states in United States of America. You can read about it below. ",
    },
    {
      head: "Is Playing on SportsBattle legal?",
      paragraph:
        "Legal residents physically located in any of the 50 states and Washington DC, excluding Alabama, Arizona, Hawaii, Idaho, Iowa, Louisiana, Montana, Nevada, and Washington are eligible to open an account and participate in both practice and contests offered by the SportsBattle app. Legal residents of Arizona, Hawaii, Iowa, Louisiana, Montana, Nevada, and Washington (the Excluded States) are ineligible for prizes offered by the app. Residents of the Excluded States are eligible to open and maintain accounts. You must be 18 years of age to play contests on SportsBattle & 21 if you are from Massachusetts ",
    },
  ]);
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        border: "1px solid #494949",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          width: "90%",
          color: "secondary.main",
          fontSize: { lg: "16px", xs: "14px", xxxs: "12px" },
          fontWeight: 600,
          fontFamily: "poppins",
          py: "13px",
        }}
      >
        FAQ
      </Typography>
      <Box sx={{ width: "100%", background: "#494949", mb: "9px" }}>
        <Typography
          sx={{
            width: "90%",
            color: "white",
            fontSize: { lg: "14px", xs: "12px", xxxs: "10px" },
            fontWeight: 600,
            fontFamily: "poppins",
            py: "9px",
            margin: "0 auto",
          }}
        >
          About
        </Typography>
      </Box>
      {FAQnote.map((e, index) => (
        <Box
          key={index}
          sx={{
            width: "90%",
            borderBottom: "1px solid #494949",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mt: "12px",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "14px", xs: "12px", xxxs: "10px" },
              fontWeight: 700,
              fontFamily: "poppins",
              color: "secondary.main",
              width: "100%",
              mb: "14px",
            }}
          >
            {e.head}
          </Typography>
          <Typography
            sx={{
              fontSize: { lg: "14px", xs: "12px", xxxs: "10px" },
              fontWeight: 500,
              fontFamily: "poppins",
              color: "secondary.main",
              width: "100%",
              mb: "10px",
            }}
          >
            {e.paragraph}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
