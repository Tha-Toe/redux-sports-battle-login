import React from "react";
import { Box, Button, Typography } from "@mui/material";
import "./loadingSpinner.css";

export default function NoProjection({ refresh }) {
  return (
    <div className="no-projection-container">
      <Typography
        sx={{
          fontSize: "16px",
          fontFamily: "poppins",
          width: "500px",
          textAlign: "center",
          color: "white",
        }}
      >
        No open projections of the moment for this game. New Projections will be
        up soon.
      </Typography>
      <Button
        sx={{
          fontSize: "16px",
          fontFamily: "poppins",
          color: "white",
          padding: "5px 20px",
          border: "2px solid white",
          borderRadius: "8px",
          mt: "20px",
          textTransform: "none",
        }}
        onClick={refresh}
      >
        Refresh
      </Button>
    </div>
  );
}
