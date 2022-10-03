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
import ClearIcon from "@mui/icons-material/Clear";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
export default function OperatingState() {
  const [operatingState, setOperatingState] = useState([
    { name: "Alabama", status: false, age: "18", collegeSports: false },
    { name: "Alaska", status: true, age: "18", collegeSports: false },
    { name: "Arizona", status: false, age: "18", collegeSports: false },
    { name: "Arkansas", status: true, age: "18", collegeSports: false },
    { name: "California ", status: true, age: "18", collegeSports: true },
    { name: "Colorado", status: true, age: "18", collegeSports: true },
    { name: "Connecticut", status: false, age: "18", collegeSports: false },
    { name: "Delaware", status: false, age: "18", collegeSports: true },
    { name: "Florida", status: true, age: "18", collegeSports: true },
    { name: "Delaware", status: true, age: "18", collegeSports: true },
    { name: "California", status: true, age: "18", collegeSports: false },
    { name: "California", status: true, age: "18", collegeSports: false },
    { name: "California", status: true, age: "18", collegeSports: true },
    { name: "California", status: true, age: "18", collegeSports: false },
    { name: "California", status: true, age: "18", collegeSports: false },
    { name: "California", status: true, age: "18", collegeSports: true },
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
          fontSize: { lg: "16px", xs: "14px", xxxs: "12px" },
          fontWeight: 600,
          fontFamily: "poppins",
          color: "secondary.main",
          width: "90%",
          mt: "10px",
        }}
      >
        Sports Battle Operating States
      </Typography>
      <Typography
        sx={{
          fontSize: { lg: "12px", xs: "10px", xxxs: "8px" },
          fontWeight: 400,
          fontFamily: "poppins",
          color: "secondary.main",
          width: "90%",
          mt: "9px",
        }}
      >
        US States from where SportsBattle allows users to participate in cash
        contests. Users can however participate in free contests. We are working
        on introducing new States{" "}
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          background: "#494949",
          mb: "9px",
          mt: "14px",
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mx: "auto",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { lg: "14px", xs: "12px", xxxs: "10px" },
              fontWeight: 600,
              fontFamily: "poppins",
              py: "9px",
              width: "25%",
            }}
          >
            About
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontSize: { lg: "14px", xs: "12px", xxxs: "10px" },
              fontWeight: 600,
              fontFamily: "poppins",
              py: "9px",
              width: "25%",
              textAlign: "center",
            }}
          >
            Status
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontSize: { lg: "14px", xs: "12px", xxxs: "10px" },
              fontWeight: 600,
              fontFamily: "poppins",
              py: "9px",
              width: "25%",
              textAlign: "center",
            }}
          >
            Age
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontSize: { lg: "14px", xs: "12px", xxxs: "10px" },
              fontWeight: 600,
              fontFamily: "poppins",
              py: "9px",
              width: "25%",
              textAlign: "center",
            }}
          >
            College Sports
          </Typography>
        </Box>
      </Box>
      {operatingState.map((e, index) => (
        <Box
          key={index}
          sx={{
            width: "90%",
            borderBottom: "1px solid #494949",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "14px", xs: "12px", xxxs: "10px" },
              fontWeight: 500,
              fontFamily: "poppins",
              color: "secondary.main",
              width: "25%",
            }}
          >
            {e.name}
          </Typography>
          {e.status ? (
            <Box sx={{ width: "25%", textAlign: "center" }}>
              <CheckCircleIcon sx={{ color: "#52C03C" }} />
            </Box>
          ) : (
            <Box sx={{ width: "25%", textAlign: "center" }}>
              <ClearIcon
                sx={{
                  background: "#E4313C",
                  color: "black",
                  borderRadius: "50%",
                  fontSize: "22px",
                }}
              />
            </Box>
          )}
          <Typography
            sx={{
              fontSize: { lg: "14px", xs: "12px", xxxs: "10px" },
              fontWeight: 500,
              fontFamily: "poppins",
              color: "secondary.main",
              width: "25%",
              textAlign: "center",
            }}
          >
            {e.age}
          </Typography>
          {e.collegeSports ? (
            <Box sx={{ width: "25%", textAlign: "center" }}>
              <CheckCircleIcon sx={{ color: "#52C03C" }} />
            </Box>
          ) : (
            <Box sx={{ width: "25%", textAlign: "center" }}>
              <ClearIcon
                sx={{
                  background: "#E4313C",
                  color: "black",
                  borderRadius: "50%",
                  fontSize: "22px",
                }}
              />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
