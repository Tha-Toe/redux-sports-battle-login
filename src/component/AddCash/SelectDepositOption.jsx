import React from "react";
import "./addCash.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";
export default function SelectDepositOption({
  setOpenSelectDepositOption,
  mode,
}) {
  const fs = useSelector((state) => state.user.fs);
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
          width: { sm: "566px", xxxs: "90%" },
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
            justifyContent: "space-between",
            mt: "12px",
          }}
        >
          <Typography
            sx={{
              color: "secondary.dark_gray",
              fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
              fontWeight: 700,
              fontFamily: "poppins",
            }}
          >
            Select deposit option
          </Typography>
          <ClearIcon
            sx={{ color: "secondary.dark_gray", cursor: "pointer" }}
            onClick={() => setOpenSelectDepositOption(false)}
          />
        </Box>

        <Box
          sx={{
            border: "1px solid #459F48",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "90%",
            py: "11px",
            mt: "16px",
          }}
        >
          <Typography
            sx={{
              fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
              fontWeight: 700,
              fontFamily: "poppins",
              color: "secondary.dark_gray",
              ml: "10px",
            }}
          >
            Credit Card
          </Typography>
          <Button
            sx={{
              color: "secondary.dark_gray",
              bgcolor: "primary.dark_gray",
              padding: "5px 12px",
              mr: "10px",
              "&.MuiButtonBase-root:hover": {
                bgcolor: "primary.light",
              },
              fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
              fontWeight: 500,
              fontFamily: "poppins",
              textTransform: "none",
            }}
          >
            Instant Deposit
          </Button>
        </Box>
        <Button
          sx={{
            py: "16px",
            width: "90%",
            fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
            fontWeigh: 600,
            fontFamily: "poppins",
            color: "white",
            background: "#439F48",
            mt: "16px",
            mb: "21px",
            borderRadius: "8px",
            textTransform: "none",
            "&.MuiButtonBase-root:hover": {
              background: "#439F48",
            },
          }}
          onClick={() => setOpenSelectDepositOption(false)}
        >
          Deposit{" "}
        </Button>
        <Typography
          sx={{
            fontSize: { sm: fs.xs, xxs: fs.xxs, xxxs: fs.xxxs },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
          }}
        >
          By continuing, you agree to SportsBattle’s
        </Typography>
        <Typography
          sx={{
            fontSize: { sm: fs.xs, xxs: fs.xxs, xxxs: fs.xxxs },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "#2582E3",
            mb: "17px",
          }}
        >
          terms, privacy policy & conditions
        </Typography>
      </Box>
    </Box>
  );
}
