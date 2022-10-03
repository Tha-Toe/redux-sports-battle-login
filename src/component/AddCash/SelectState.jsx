import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import "./addCash.css";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SelectDepositOption from "./SelectDepositOption";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcon from "@mui/icons-material/Add";
import Clear from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
export default function SelectState({ setOpenStatePicker, mode }) {
  const [stateList, setStateList] = useState([
    { name: "Alabama", select: false },
    { name: "Alaska", select: false },
    { name: "Arizona", select: false },
    { name: "Arkansas", select: false },
    { name: "California", select: false },
    { name: "Colorado", select: false },
    { name: "Connecticut", select: false },
    { name: "Delaware", select: false },
    { name: "Florida", select: false },
    { name: "Georgia", select: false },
    { name: "Hawaii", select: false },
  ]);
  const [selectName, setSelectName] = useState(null);
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
          width: { sm: "500px", xxxs: "90%" },
          bgcolor: "primary.main",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          border: `${mode === "dark" ? "1px solid #2C2C2C" : "none"}`,
          borderRadius: "4px",
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mx: "auto",
            mt: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: { sm: "20px", xxs: "18px", xxxs: "16px" },
              fontWeight: 700,
              fontFamily: "poppins",
              color: "secondary.dark_gray",
            }}
          >
            Select a State
          </Typography>
          <Clear
            onClick={() => setOpenStatePicker(false)}
            sx={{ cursor: "pointer" }}
          />
        </Box>
        <Box
          sx={{
            height: "4px",
            width: "80px",
            bgcolor: "secondary.dark_gray",
            borderRadius: "4px",
            ml: "20px",
            mt: "5px",
            mb: "17px",
          }}
        ></Box>
        <Box
          sx={{
            width: "90%",
            mx: "auto",
            maxHeight: "483px",
            display: "flex",
            flexDirection: "row",
            alignItems: "spcae-between",
            overflow: "scroll",
            border: "1px solid #2C2C2C",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Box sx={{ width: "97%" }}>
            <Box
              sx={{
                width: "100%",
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {stateList.map((e, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #494949",
                    width: "100%",
                    py: "6px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectName(e.name);
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LocationOnIcon
                      sx={{
                        ml: "15px",
                        color: `${
                          e.name === selectName ? "#4831D4" : "#494949"
                        }`,
                      }}
                    />
                    <Typography
                      sx={{
                        color: "secondary.dark_gray",

                        fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
                        fontWeight: 400,
                        ml: "18px",
                        fontFamily: "poppins",
                      }}
                    >
                      {e.name}
                    </Typography>
                  </Box>
                  {e.name === selectName && (
                    <CheckIcon sx={{ color: "#52C03F" }} />
                  )}
                </Box>
              ))}
            </Box>
          </Box>
          <Box
            sx={{ width: "3%", height: "100%", border: "1px solid #494949" }}
          >
            <Box
              sx={{
                width: "70%",
                height: "24px",
                mx: "auto",
                background: "#494949",
                borderRadius: "16px",
                mt: "5px",
              }}
            ></Box>
          </Box>
        </Box>
        <Button
          sx={{
            width: "70%",
            mx: "auto",
            background: "#4831D4",
            color: "white",
            py: "14px",
            mt: "10px",
            textTransform: "none",
            "&.MuiButtonBase-root:hover": {
              background: "#4831D4",
            },
            mb: "12px",
            fontFamily: "poppins",
          }}
          onClick={() => setOpenStatePicker(false)}
        >
          Confirm State
        </Button>
      </Box>
    </Box>
  );
}
