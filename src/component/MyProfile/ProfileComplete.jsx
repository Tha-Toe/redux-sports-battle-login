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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { UserAuth } from "../../context/AuthContext";

export default function ProfileComplete({ mode, setOpenTag }) {
  const { user } = UserAuth();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: { sm: "16px", xs: "14px", xxxs: "12px" },
          fontWeight: 700,
          fontFamily: "poppins",
          color: "secondary.main",
          width: "100%",
          mt: "26px",
        }}
      >
        {user && user.userName}
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "rows",
          alignItems: "center",
          justifyContent: "space-between",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            width: "95%",
            background: `${
              mode === "dark"
                ? "rgba(217, 217, 217,0.2)"
                : "rgba(217, 217, 217,0.9)"
            }`,
            height: "5px",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Box
            sx={{ width: "55%", height: "100%", background: "#52C03C" }}
          ></Box>
        </Box>
        <CheckCircleIcon
          sx={{
            color: "#52c03c",
            fontSize: { sm: "25px", xs: "23px", xxxs: "21px" },
          }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "rows",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography
            sx={{
              fontSize: { sm: "14px", xs: "12px", xxxs: "10px" },
              fontWeight: 600,
              fontFamily: "poppins",
              color: "secondary.main",
            }}
          >
            55% complete{" "}
          </Typography>
          <Typography
            sx={{
              fontSize: { sm: "12px", xs: "10px", xxxs: "8px" },
              fontWeight: 400,
              fontFamily: "poppins",
              color: "secondary.main",
              mt: "4px",
            }}
          >
            Verify your phone number{" "}
          </Typography>
        </Box>
        <Button
          sx={{
            color: "primary.main",
            fontSize: "12px",
            fontWeight: 500,
            fontFamily: "poppins",
            background: "#52C03C",
            padding: { xs: "7px 24px", xxxs: "5px 10px" },
            "&.MuiButtonBase-root:hover": {
              background: "#52C03C",
            },
            cursor: "pointer",
            textTransform: "none",
          }}
          onClick={() => {
            setOpenTag("account-setup");
          }}
        >
          Complete Profile
        </Button>
      </Box>
    </Box>
  );
}
