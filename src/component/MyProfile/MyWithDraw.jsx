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
import "./profile.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Input, Grid, Card } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function MyWithDraw({ mode }) {
  const [detail, setDetail] = useState([
    {
      name: "Standard eCheck",
      condition: "In-Review",
      gmail: "Electronic check to dattaganeshan@gmail.com",
      date: "08/06/2022, 11:28 PM",
      code: "Conf# c68270",
      amount: "$25",
    },
    {
      name: "Direct Deposit",
      condition: "In-Review",
      gmail: "Electronic check to dattaganeshan@gmail.com",
      date: "08/06/2022, 11:28 PM",
      code: "Conf# c68270",
      amount: "$25",
    },
    {
      name: "Standard eCheck",
      condition: "Completed",
      gmail: "Electronic check to dattaganeshan@gmail.com",
      date: "08/06/2022, 11:28 PM",
      code: "Conf# c68270",
      amount: "$65",
    },
    {
      name: "Standard eCheck",
      condition: "Completed",
      gmail: "Electronic check to dattaganeshan@gmail.com",
      date: "08/06/2022, 11:28 PM",
      code: "Conf# c68270",
      amount: "$65",
    },
    {
      name: "Paper Check",
      condition: "Completed",
      gmail: "Electronic check to dattaganeshan@gmail.com",
      date: "08/06/2022, 11:28 PM",
      code: "Conf# c68270",
      amount: "$65",
    },
    {
      name: "Paper Check",
      condition: "Completed",
      gmail: "Electronic check to dattaganeshan@gmail.com",
      date: "08/06/2022, 11:28 PM",
      code: "Conf# c68270",
      amount: "$65",
    },
  ]);
  return (
    <Box
      sx={{
        width: {
          lg: "836px",
          md: "700px",
          sm: "560px",
          xs: "450px",
          xxxs: "90%",
        },
        margin: "auto",
        mt: "10px",
        mb: "30px",
      }}
      component="div"
    >
      <Typography
        sx={{
          fontSize: { xs: "16px", xxs: "14px", xxxs: "12px" },
          fontWeight: 700,
          fontFamily: "poppins",
          color: "secondary.dark_gray",
          mt: "23px",
        }}
      >
        My Withdrawals
      </Typography>
      <Box
        sx={{
          width: { xs: "232px", xxxs: "150px" },
          height: "2px",
          bgcolor: "secondary.dark_gray",
          mt: "9px",
          mb: "21px",
        }}
      ></Box>
      <Grid container sx={{ width: "100%" }}>
        {detail.map((e, index) => (
          <Grid item md={6} xxxs={12} sx={{ mb: "12px" }} key={index}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "95%",
                borderRadius: "4px",
                border: `${
                  mode === "dark" ? "1px solid #494949" : "1px solid #494949"
                }`,
                bgcolor: "primary.main",
                bgcolor: "transparent",
                boxShadow: "none",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  ml: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "14px", xxs: "12px", xxxs: "10px" },
                    fontWeight: 400,
                    fontFamily: "poppins",
                    color: "secondary.dark_gray",
                    mt: "9px",
                  }}
                >
                  {e.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "12px", xxs: "10px", xxxs: "8px" },
                    fontWeight: 500,
                    fontFamily: "poppins",
                    color: "secondary.dark_gray",
                    mt: "6px",
                  }}
                >
                  {e.condition}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "12px", xxs: "10px", xxxs: "8px" },
                    fontWeight: 500,
                    fontFamily: "poppins",
                    color: "secondary.dark_gray",
                    mt: "6px",
                  }}
                >
                  {e.gmail}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "12px", xxs: "10px", xxxs: "8px" },
                    fontWeight: 400,
                    fontFamily: "poppins",
                    color: "secondary.dark_gray",
                    mt: "6px",
                  }}
                >
                  {e.date}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "12px", xxs: "10px", xxxs: "8px" },
                    fontWeight: 400,
                    fontFamily: "poppins",
                    color: "secondary.dark_gray",
                    mt: "6px",
                    mb: "8px",
                  }}
                >
                  {e.code}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  cursor: "pointer",
                  mr: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "20px", xxs: "14px", xxxs: "12px" },
                    fontWeight: 500,
                    fontFamily: "poppins",
                    color: `${mode === "dark" ? "#FFCED6" : "#E4313C"}`,
                    color: `${mode === "dark" ? "#ffffff" : "#494949"}`,
                  }}
                >
                  {e.amount}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
