import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
export default function WithdrawPopup({
  mode,
  setOpenWithdrawPopup,
  openWithdrawPopup,
  setOpenWithdrawLoading,
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
        zIndex: "200",
      }}
    >
      <Box
        sx={{
          width: { sm: "466px", xxxs: "90%" },
          bgcolor: "primary.dark",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "600",
            fontFamily: "poppins",
            color: "white",
            width: "90%",
            mt: "10px",
          }}
        >
          Action
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "400",
            fontFamily: "poppins",
            color: "white",
            mt: "20px",
          }}
        >
          Are you sure you want to withdraw?
        </Typography>
        <Box
          sx={{
            bgcolor: "primary.dark",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            mt: "10px",
            mb: "50px",
          }}
        >
          <Button
            sx={{
              width: "130px",
              height: "40px",
              fontSize: "16px",
              fontWeight: "400",
              fontFamily: "poppins",
              color: "white",
              background: "red",
              borderRadius: "4px",
              "&.MuiButtonBase-root:hover": {
                background: "red",
              },
              textTransform: "none",
              mr: "10px",
            }}
            onClick={() => setOpenWithdrawLoading(true)}
          >
            Yes
          </Button>
          <Button
            sx={{
              width: "130px",
              height: "40px",
              fontSize: "16px",
              fontWeight: "400",
              fontFamily: "poppins",
              color: "white",
              background: "transparent",
              borderRadius: "4px",
              "&.MuiButtonBase-root:hover": {
                background: "transparent",
              },
              border: "1px solid gray",
              textTransform: "none",
            }}
            onClick={() => setOpenWithdrawPopup(null)}
          >
            No, Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
