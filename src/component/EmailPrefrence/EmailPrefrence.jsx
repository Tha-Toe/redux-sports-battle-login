import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./emailPrefrence.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";

import SettingsIcon from "@mui/icons-material/Settings";

export default function EmailPrefrence({ setOpenTag }) {
  const [emailSettingStore, setEmailSettingStore] = useState([
    { name: " When I join game plays ", open: true },
    { name: "When I withdraw from game plays", open: true },
    { name: " When I join game plays ", open: true },
    { name: "When I edit a team", open: true },
    { name: "When I add cash", open: true },
    { name: "When I withdraw cash ", open: true },
    { name: "When I win game plays", open: true },
  ]);

  const [selectSports, setSelectSports] = useState("MLB");

  const onOffFunction = (index) => {
    let emailSettingStoreToChange = emailSettingStore;
    emailSettingStoreToChange[index].open =
      !emailSettingStoreToChange[index].open;
    setEmailSettingStore([...emailSettingStoreToChange]);
  };
  let navigate = useNavigate();
  const propsOpen = () => {
    setOpenTag("props");
    navigate("/home", { replace: true });
  };
  return (
    <Box
      sx={{
        width: {
          xl: "1000px",
          lg: "836px",
          md: "700px",
          sm: "500px",
          xs: "450px",
          xxxs: "90%",
        },
        height: "100vh",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "10px",
      }}
      component="div"
    >
      <Typography
        sx={{
          fontSize: { xs: "16px", xxxs: "14px" },
          fontWeight: 700,
          fontFamily: "poppins",
          color: "secondary.main",
          width: "100%",
          mt: "26px",
        }}
      >
        Email & Sport Settings
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "14px", xxxs: "12px" },
          fontWeight: 600,
          fontFamily: "poppins",
          color: "#2072C4",
          width: "100%",
          mt: "20px",
        }}
      >
        Email Preferences{" "}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "12px", xxxs: "10px" },
          fontWeight: 400,
          fontFamily: "poppins",
          color: "secondary.main",
          width: "100%",
          mt: "6px",
          mb: "20px",
        }}
      >
        Send me an email{" "}
      </Typography>
      {emailSettingStore.map((e, index) => (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #494949",
            mb: "17px",
            pb: "21px",
          }}
          key={index}
        >
          <Typography
            sx={{
              fontSize: { xs: "14px", xxxs: "12px" },
              fontWeight: 400,
              fontFamily: "poppins",
              color: "secondary.main",
            }}
          >
            {e.name}
          </Typography>
          <Box
            sx={{
              width: { xs: "50px", xxxs: "40px" },
              height: { xs: "22px", xxxs: "18px" },
              display: "flex",
              alignItems: "center",
              bgcolor: `${e.open ? "#4831D4" : "primary.light"}`,
              borderRadius: "50px",
            }}
            onClick={() => {
              onOffFunction(index);
            }}
          >
            <Box
              sx={{
                width: { xs: "17px", xxxs: "15px" },
                height: { xs: "17px", xxxs: "15px" },
                background: "#439F48",
                borderRadius: "50%",
                position: "relative",
                left: {
                  xs: `${e.open ? "31px" : "2px"}`,
                  xxxs: `${e.open ? "23px" : "2px"}`,
                },
              }}
            ></Box>
          </Box>
        </Box>
      ))}

      <Box
        component="div"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          mb: "57px",
        }}
      ></Box>
      <Button
        sx={{
          fontSize: { xs: "14px", xxxs: "12px" },
          fontWeight: 600,
          fontFamily: "poppins",
          color: "white",
          background: "#4831D4",
          width: { xs: "375px", xxxs: "200px" },
          height: { xs: "48px", xxxs: "40px" },
          mb: "56px",
          borderRadius: "8px",
          "&.MuiButtonBase-root:hover": {
            background: "#4831D4",
          },
        }}
        onClick={propsOpen}
      >
        Save
      </Button>
    </Box>
  );
}
