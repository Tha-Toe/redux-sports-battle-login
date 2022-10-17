import React from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
export default function NoProps() {
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
          fontSize: { sm: "18px", xxs: "16px", xxxs: "14px" },
          fontWeight: 500,
          fontFamily: "poppins",
          color: "secondary.dark_gray",
          textAlign: "center",
        }}
      >
        You do not have any props
      </Typography>{" "}
    </Box>
  );
}
