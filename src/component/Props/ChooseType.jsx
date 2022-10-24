import { Box, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import "./props.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function ({ setPickPlayType, pickPlayType, mode }) {
  return (
    <>
      <Typography
        sx={{
          fontSize: { xl: "12px", md: "10px", xxxs: "8px" },
          fontFamily: "poppins",
          fontWeight: 600,
          color: "secondary.dark_gray",
          mb: "5px",
        }}
      >
        Next, Choose a play type
      </Typography>
      <Typography
        sx={{
          fontSize: { xl: "10px", md: "8px", xxxs: "6px" },
          fontFamily: "poppins",
          fontWeight: 400,
          color: `${mode === "dark" ? "#FFCED6" : "#EA1E63"}`,
          mb: "10px",
        }}
      >
        This entry can only be attack
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          mb: "8px",
        }}
      >
        <Box sx={{ width: "47%" }}>
          <img src="/DEFENCE PLAY.png" className="atkAndDef" />
          <Box
            sx={{
              display: "flex",
              bgcolor: "primary.gray",
              alignItems: "center",
              mt: "5px",
              p: "10px 4px",
              pl: "8px",
              border: `${
                pickPlayType === "defence"
                  ? "1px solid #4831D4"
                  : "1px solid transparent"
              }`,
              borderRadius: "3px",
              cursor: "pointer",
            }}
            onClick={() => setPickPlayType("defence")}
          >
            {pickPlayType === "defence" && (
              <CheckCircleIcon
                sx={{ color: "#52C03C", fontSize: "14px", mr: "6px" }}
              />
            )}
            <Box>
              <Typography
                sx={{
                  fontSize: "8px",
                  fontWeight: 400,
                  fontFamily: "poppins",
                  color: "secondary.dark_gray",
                }}
              >
                2 correct pays 2x
              </Typography>
              <Typography
                sx={{
                  fontSize: "8px",
                  fontWeight: 400,
                  fontFamily: "poppins",
                  color: "secondary.dark_gray",
                }}
              >
                1 correct pays 0.5x{" "}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "47%" }}>
          <img src="/ATTACK PLAY.png" className="atkAndDef" />
          <Box
            sx={{
              display: "flex",
              bgcolor: "primary.gray",
              alignItems: "center",
              mt: "5px",
              p: "10px 4px",
              pl: "8px",
              borderRadius: "3px",
              border: `${
                pickPlayType === "attack"
                  ? "1px solid #4831D4"
                  : "1px solid transparent"
              }`,
              cursor: "pointer",
            }}
            onClick={() => setPickPlayType("attack")}
          >
            {pickPlayType === "attack" && (
              <CheckCircleIcon
                sx={{ color: "#52C03C", fontSize: "14px", mr: "6px" }}
              />
            )}
            <Box>
              <Typography
                sx={{
                  fontSize: "8px",
                  fontWeight: 400,
                  fontFamily: "poppins",
                  color: "secondary.dark_gray",
                }}
              >
                2 correct pays{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: "8px",
                  fontWeight: 400,
                  fontFamily: "poppins",
                  color: "secondary.dark_gray",
                }}
              >
                2.6x{" "}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
