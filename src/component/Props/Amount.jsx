import { Box, Typography } from "@mui/material";
import React from "react";
import "./props.css";
export default function ({ setSelectAmount, selectAmount }) {
  return (
    <Box sx={{ mb: "7px" }}>
      <Typography
        sx={{
          fontFamily: "poppins",
          fontSize: { xl: "12px", md: "10px", xxxs: "8px" },
          fontWeight: 400,
          color: "secondary.dark_gray",
          width: "90%",
          margin: "0 auto",
          mb: "7px",
        }}
      >
        Please choose an entry amount{" "}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "90%",
          margin: "0 auto",
          mb: "4px",
        }}
      >
        <Box
          sx={{
            padding: "8.5px 8px",
            bgcolor: `${selectAmount === 5 ? "#4831D4" : "primary.gray"}`,
            cursor: "pointer",
            borderRadius: "4px",
            fontFamily: "poppins",
            fontWeight: 500,
            fontSize: "10px",
            mr: { xl: "7px", xxxs: "7px" },
            color: `${selectAmount === 5 ? "white" : "secondary.dark_gray"}`,
          }}
          onClick={() => setSelectAmount(5)}
        >
          $5
        </Box>
        <Box
          sx={{
            padding: "8.5px 8px",
            bgcolor: `${selectAmount === 10 ? "#4831D4" : "primary.gray"}`,
            cursor: "pointer",
            borderRadius: "4px",
            fontFamily: "poppins",
            fontWeight: 500,
            fontSize: "10px",
            mr: { xl: "7px", xxxs: "7px" },
            color: `${selectAmount === 10 ? "white" : "secondary.dark_gray"}`,
          }}
          onClick={() => setSelectAmount(10)}
        >
          $10
        </Box>
        <Box
          sx={{
            padding: "8.5px 8px",
            bgcolor: `${selectAmount === 25 ? "#4831D4" : "primary.gray"}`,
            cursor: "pointer",
            borderRadius: "4px",
            fontFamily: "poppins",
            fontWeight: 500,
            fontSize: "10px",
            mr: { xl: "7px", xxxs: "7px" },
            color: `${selectAmount === 25 ? "white" : "secondary.dark_gray"}`,
          }}
          onClick={() => setSelectAmount(25)}
        >
          $25
        </Box>
        <Box
          sx={{
            padding: "8.5px 8px",
            bgcolor: `${selectAmount === 50 ? "#4831D4" : "primary.gray"}`,
            cursor: "pointer",
            borderRadius: "4px",
            fontFamily: "poppins",
            fontWeight: 500,
            fontSize: "10px",
            mr: { xl: "7px", xxxs: "7px" },
            color: `${selectAmount === 50 ? "white" : "secondary.dark_gray"}`,
          }}
          onClick={() => setSelectAmount(50)}
        >
          $50
        </Box>
        <Box
          sx={{
            padding: "8.5px 8px",
            bgcolor: `${selectAmount === "other" ? "#4831D4" : "primary.gray"}`,
            cursor: "pointer",
            borderRadius: "4px",
            fontFamily: "poppins",
            fontWeight: 500,
            fontSize: "10px",
            color: `${
              selectAmount === "other" ? "white" : "secondary.dark_gray"
            }`,
          }}
          onClick={() => setSelectAmount("other")}
        >
          Other
        </Box>
      </Box>
    </Box>
  );
}
