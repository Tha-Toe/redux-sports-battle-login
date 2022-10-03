import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Clear from "@mui/icons-material/Clear";

const NotAllowSameEmail = ({ mode, setNotAllowSameEmail }) => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        background: `${
          mode === "dark" ? "rgba(0,0,0,0.9)" : "rgba(115, 115, 115, 0.7)"
        }`,
        zIndex: "100",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: { sm: "444px", xxxs: "90%" },
          bgcolor: "primary.dark",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Clear
          sx={{
            bgcolor: "#E4313C",
            color: "black",
            borderRadius: "50%",
            fontSize: { xs: "40px", xxxs: "30px" },
            mt: "32px",
          }}
        />
        <Typography
          sx={{
            color: "secondary.dark_gray",
            fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
            fontWeight: 700,
            fontFamily: "poppins",
            mt: "16px",
          }}
        >
          We are not allow.
        </Typography>
        <Button
          sx={{
            background: "#4831D4",
            fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
            fontWeight: 500,
            fontFamily: "poppins",
            padding: { xs: "12px 89px", xxxs: "10px 70px" },
            color: "white",
            "&.MuiButtonBase-root:hover": {
              background: "#4831D4",
            },
            mt: "24px",
            mb: "32px",
            textTransform: "none",
          }}
          onClick={() => {
            setNotAllowSameEmail(false);
          }}
        >
          Go Back
        </Button>
      </Box>
    </Box>
  );
};
export default NotAllowSameEmail;
