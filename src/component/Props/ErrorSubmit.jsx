import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import "./props.css";
export default function ErrorSubmit({
  setErrorSubmit,
  setNotEnoughBalance,
  mode,
}) {
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
        zIndex: "20",
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
        <Box
          sx={{
            width: "90%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            mt: "12px",
          }}
        >
          <ClearIcon
            sx={{ color: "secondary.dark_gray", cursor: "pointer" }}
            onClick={() => setErrorSubmit(false)}
          />
        </Box>
        <ClearIcon
          sx={{
            color: "white",
            bgcolor: "#E4313C",
            borderRadius: "50%",
            fontSize: "40px",
          }}
        />
        <Typography
          sx={{
            fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
            mt: "8px",
            textAlign: "center",
            width: "75%",
          }}
        >
          Unfortunately, we do not allow users from your current location to
          participate in cash plays yet
        </Typography>
        <Button
          sx={{
            padding: "12px 87px",
            fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
            fontWeigh: 500,
            fontFamily: "poppins",
            color: "white",
            background: "#4831D4",
            mt: "24px",
            mb: "32px",
            borderRadius: "8px",
            textTransform: "none",
            "&.MuiButtonBase-root:hover": {
              background: "#4831D4",
            },
          }}
          onClick={() => {
            setNotEnoughBalance(true);
            setErrorSubmit(false);
          }}
        >
          Okay{" "}
        </Button>
      </Box>
    </Box>
  );
}
