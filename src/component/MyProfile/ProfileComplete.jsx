import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSelector } from "react-redux";

export default function ProfileComplete({
  mode,
  setOpenTag,
  myAccountDataCommingFromApi,
  completePercent,
}) {
  const user = useSelector((state) => state.user.user);
  const fs = useSelector((state) => state.user.fs);
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
          fontSize: { sm: fs.normal, xs: fs.small, xxxs: fs.xs },
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
            sx={{
              width: `${completePercent}%`,
              height: "100%",
              background: "#52C03C",
            }}
          ></Box>
        </Box>
        <CheckCircleIcon
          sx={{
            color: "#52c03c",
            fontSize: { sm: fs.xxx_large, xs: fs.xx_large, xxxs: fs.x_large },
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
              fontSize: { sm: fs.small, xs: fs.xs, xxxs: fs.xxs },
              fontWeight: 600,
              fontFamily: "poppins",
              color: "secondary.main",
            }}
          >
            {completePercent}% complete{" "}
          </Typography>
          <Typography
            sx={{
              fontSize: { sm: fs.xs, xs: fs.xxs, xxxs: fs.xxxs },
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
            fontSize: fs.xs,
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
