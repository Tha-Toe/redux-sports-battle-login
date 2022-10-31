import { Box, Typography } from "@mui/material";
import React from "react";
import "./props.css";
import { useSelector } from "react-redux";

export default function Times({ selectedCardList, mode }) {
  const fs = useSelector((state) => state.user.fs);

  return (
    <Box
      sx={{
        borderBottom: `${
          mode === "dark" ? "1px solid #2c2c2c" : "1px solid #DBDBDB"
        }`,
        mb: "16px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "poppins",
          fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
          fontWeight: 400,
          color: "secondary.dark_gray",
          width: "90%",
          margin: "0 auto",
          mb: "7px",
        }}
      >
        Props Cart : : {selectedCardList.length} Player
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "90%",
          margin: "0 auto",
          mb: "3px",
        }}
      >
        <Box
          sx={{
            padding: "5px 12px",
            fontSize: fs.xs,
            bgcolor: "primary.gray",
            borderRadius: "4px",
            fontFamily: "poppins",
            fontWeight: 500,
            mr: "4px",
            color: `${
              selectedCardList.length === 1 ? "white" : "secondary.dark_gray"
            }`,
          }}
        >
          1
        </Box>
        <Box
          sx={{
            padding: "5px 12px",
            bgcolor: `${
              selectedCardList.length === 2 ? "#439F48" : "primary.gray"
            }`,
            borderRadius: "4px",
            fontFamily: "poppins",
            fontWeight: 500,
            fontSize: fs.xs,
            mr: "4px",
            color: `${
              selectedCardList.length === 2 ? "white" : "secondary.dark_gray"
            }`,
          }}
        >
          {selectedCardList.length === 2 ? "2.6x" : "2"}
        </Box>
        <Box
          sx={{
            padding: "5px 12px",
            bgcolor: `${
              selectedCardList.length === 3 ? "#439F48" : "primary.gray"
            }`,
            borderRadius: "4px",
            fontFamily: "poppins",
            fontWeight: 500,
            fontSize: fs.xs,
            mr: "4px",
            color: `${
              selectedCardList.length === 3 ? "white" : "secondary.dark_gray"
            }`,
          }}
        >
          {selectedCardList.length === 3 ? "3.6x" : "3"}
        </Box>
        <Box
          sx={{
            padding: "5px 12px",
            bgcolor: `${
              selectedCardList.length === 4 ? "#439F48" : "primary.gray"
            }`,
            borderRadius: "4px",
            fontFamily: "poppins",
            fontWeight: 500,
            fontSize: fs.xs,
            mr: "4px",
            color: `${
              selectedCardList.length === 4 ? "white" : "secondary.dark_gray"
            }`,
          }}
        >
          {selectedCardList.length === 4 ? "4.6x" : "4"}
        </Box>
        <Box
          sx={{
            padding: "5px 12px",
            bgcolor: `${
              selectedCardList.length > 4 ? "#439F48" : "primary.gray"
            }`,
            borderRadius: "4px",
            fontFamily: "poppins",
            fontWeight: 500,
            fontSize: fs.xs,
            mr: "4px",
            color: `${
              selectedCardList.length > 4 ? "white" : "secondary.dark_gray"
            }`,
          }}
        >
          {selectedCardList.length > 4 ? "5.6x" : "5"}
        </Box>
      </Box>
    </Box>
  );
}
