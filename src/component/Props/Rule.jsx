import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import "./props.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSelector } from "react-redux";
export default function Rule({ setOpenRule, mode, rulesData }) {
  const fs = useSelector((state) => state.user.fs);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background: `${
          mode === "dark" ? "rgba(0,0,0,0.9)" : "rgba(115, 115, 115, 0.7)"
        }`,
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 15,
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
          height: "500px",
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
            fontSize: { md: fs.xxx_large, sm: fs.x_large, xxxs: fs.large },
            fontWeight: 700,
            fontFamily: "poppins",
            width: "90%",
            mt: "30px",
            mb: "15px",
          }}
        >
          Player Considerations{" "}
        </Typography>
        <div className="rulesDataContainer">
          {rulesData.map((each, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "rows",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
                mb: "10px",
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
                  fontSize: { xs: fs.normal, xxxs: fs.xs },
                  fontWeight: 400,
                  fontFamily: "poppins",
                  textAlign: "justify",
                }}
              >
                {each}
              </Typography>
            </Box>
          ))}
        </div>
        <Button
          sx={{
            color: "white",
            fontSize: fs.normal,
            fontWieght: 500,
            fontFamily: "poppins",
            background: "#4831D4",
            width: "90%",
            margin: "0 auto",
            py: { xs: "20px", xxxs: "10px" },
            mb: "25px",
            mt: "15px",
            "&.MuiButtonBase-root:hover": {
              background: "#4831D4",
            },
            textTransform: "none",
            borderRadius: "8px",
          }}
          onClick={() => {
            setOpenRule(false);
          }}
        >
          Okay
        </Button>
      </Box>
    </Box>
  );
}
