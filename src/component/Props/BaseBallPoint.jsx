import { Box, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import "./props.css";

import ClearIcon from "@mui/icons-material/Clear";

export default function BaseBallPoint({ setOpenBaseBallPoint, mode }) {
  const [point, setPoint] = useState([
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
  ]);
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
            md: "501px",
            sm: "400px",
            xs: "400px",
            xxs: "320px",
            xxxs: "300px",
          },
          height: "512px",
          bgcolor: "primary.main",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          boxShadow: "1px 1px 100px -60px rgba(255,255,255,0.5)",
          border: "1px solid #2C2C2C",
          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "90%",
            margin: "0 auto",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "20px",
            mt: "11px",
          }}
        >
          <Typography
            sx={{
              display: "flex",
            }}
          >
            <Typography
              sx={{
                color: "secondary.dark_gray",
                fontSize: { sm: "20px", xxxs: "16px" },
                fontWeight: 700,
                fontFamily: "poppins",
                borderBottom: "3px solid white",
              }}
            >
              Baseball
            </Typography>{" "}
            <Typography
              sx={{
                color: "secondary.dark_gray",
                fontSize: { sm: "20px", xxxs: "16px" },
                fontWeight: 700,
                fontFamily: "poppins",
              }}
            >
              - Over/ Under Points{" "}
            </Typography>{" "}
          </Typography>
          <ClearIcon
            sx={{
              fontSize: "35px",
              color: "secondary.dark_gray",
              cursor: "pointer",
            }}
            onClick={() => {
              setOpenBaseBallPoint(false);
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            margin: "0 auto",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#494949",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily: "poppins",
              ml: "25px",
              py: "10px",
            }}
          >
            BATTING
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily: "poppins",
              mr: "25px",
              py: "10px",
            }}
          >
            POINTS
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItem: "center",
            justifyContent: "center",
            width: "90%",
            margin: "0 auto",
            height: "90%",
          }}
        >
          {point.map((e) => (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                margin: "0 auto",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #494949",
              }}
            >
              <Typography
                sx={{
                  color: "secondary.dark_gray",
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "poppins",
                  ml: "25px",
                  py: "10px",
                }}
              >
                {e.name}
              </Typography>
              <Typography
                sx={{
                  color: "#52C03C",
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "poppins",
                  mr: "25px",
                  py: "10px",
                }}
              >
                {e.point}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
