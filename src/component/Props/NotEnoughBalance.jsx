import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./props.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";

export default function NotEnoughBalance({
  setNotEnoughBalance,
  mode,
  setSelectedCardList,
}) {
  const fs = useSelector((state) => state.user.fs);
  const idpverified = useSelector((state) => state.user.idpverified);
  let navigate = useNavigate();
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
          width: { sm: "550px", xxxs: "90%" },
          bgcolor: "primary.dark",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "8px",
        }}
      >
        <img className="wallet" src="/wallet 1.png" />

        <Typography
          sx={{
            fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
            fontWeight: 700,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
            mt: "8px",
            textAlign: "center",
            width: "75%",
          }}
        >
          Insufficient balance, Add money to your wallet to complete the
          projection submission now
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              padding: "12px 57px",
              fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
              fontWeigh: 500,
              fontFamily: "poppins",
              color: "white",
              background: "#4831D4",
              mt: "24px",
              mb: "32px",
              mr: "5px",
              borderRadius: "8px",
              textTransform: "none",
              "&.MuiButtonBase-root:hover": {
                background: "#4831D4",
              },
            }}
            onClick={() => {
              setNotEnoughBalance(false);
              if (idpverified) {
                navigate("/home?deposit=old-user", { replace: true });
              } else {
                navigate("/home?deposit=new&page=verify", { replace: true });
              }
            }}
          >
            Add Cash{" "}
          </Button>
          <Button
            sx={{
              padding: "12px 57px",
              fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
              fontWeigh: 500,
              fontFamily: "poppins",
              color: "white",
              background: "#494949",
              mt: "24px",
              mb: "32px",
              borderRadius: "8px",
              textTransform: "none",
              ml: "5px",
              "&.MuiButtonBase-root:hover": {
                background: "#494949",
              },
            }}
            onClick={() => {
              setNotEnoughBalance(false);
            }}
          >
            Okay{" "}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
