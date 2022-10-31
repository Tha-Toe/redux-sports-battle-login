import React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
export default function NotFound() {
  const fs = useSelector((state) => state.user.fs);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { md: "row", xxxs: "column" },
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          fontSize: { sm: fs.large, xxs: fs.normal, xxxs: fs.small },
          fontWeight: 500,
          fontFamily: "poppins",
          color: "secondary.dark_gray",
          textAlign: "center",
        }}
      >
        No Transaction History found
      </Typography>{" "}
    </Box>
  );
}
