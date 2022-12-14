import React from "react";
import { Box, Button, Typography } from "@mui/material";
import "./loadingSpinner.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
export default function NoProjection({ refresh }) {
  const fs = useSelector((state) => state.user.fs);
  const sportDataCommingFromApi = useSelector(
    (state) => state.user.sportDataCommingFromApi
  );
  const noProjection = useSelector((state) => state.user.noProjection);
  const [noDataImg, setNoDataImg] = useState(null);
  useEffect(() => {
    if (sportDataCommingFromApi && noProjection) {
      let currSportArray = sportDataCommingFromApi.filter((each) => {
        return each.code === noProjection;
      });
      if (currSportArray.length > 0) {
        setNoDataImg(currSportArray[0].noDataImage);
      }
    }
  }, [sportDataCommingFromApi, noProjection]);
  return (
    <div className="no-projection-container">
      {noDataImg && <img className="noDataImage" src={noDataImg} />}
      <Typography
        sx={{
          fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
          fontFamily: "poppins",
          width: { sm: "500px", xxxs: "80%" },
          textAlign: "center",
          color: "white",
        }}
      >
        No open projections of the moment for this game. New Projections will be
        up soon.
      </Typography>
      <Button
        sx={{
          fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
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
