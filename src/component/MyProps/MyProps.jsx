import React, { useEffect } from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";

import MyPropsCardContainer from "./MyPropsCardContainer";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";
import { useSelector } from "react-redux";

export default function MyProps({
  mode,
  callCompletedMyPropsApi,
  callUpCommingMyPropsApi,
  callLiveMyPropsApi,
  getEachProp,
  getMyProps,
}) {
  const [openTag, setOpenTag] = useState("Upcoming");

  const openUpComming = () => {
    setOpenTag("Upcoming");
    callUpCommingMyPropsApi();
  };
  const openLive = () => {
    setOpenTag("Live");
    callLiveMyPropsApi();
  };
  const openCompleted = () => {
    setOpenTag("Completed");
    callCompletedMyPropsApi();
  };
  const [myPropsAppBar, setMyPropsAppBar] = useState([
    { name: "Upcoming", func: openUpComming },
    { name: "Live", func: openLive },
    { name: "Completed", func: openCompleted },
  ]);

  const completeDataCommingFromApi = useSelector(
    (state) => state.user.completeDataCommingFromApi
  );
  const liveDataCommingFromApi = useSelector(
    (state) => state.user.liveDataCommingFromApi
  );
  const upComingDataCommingFromApi = useSelector(
    (state) => state.user.upComingDataCommingFromApi
  );
  const fs = useSelector((state) => state.user.fs);
  return (
    <Box
      sx={{
        width: {
          xl: "1000px",
          lg: "836px",
          md: "700px",
          sm: "500px",
          xxxs: "90%",
        },
        height: "100vh",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
      component="div"
    >
      <Typography
        sx={{
          fontSize: { xs: fs.normal, xxs: fs.small, xxxs: fs.xs },
          fontWeight: 700,
          fontFamily: "poppins",
          color: "secondary.dark_gray",
          mt: "23px",
          width: "100%",
        }}
      >
        My Props
      </Typography>
      <Box sx={{ width: "100%", mt: "9px" }}>
        <Box
          sx={{
            width: { xs: "232px", xxs: "170px", xxxs: "130px" },
            height: "2px",
            bgcolor: "secondary.dark",
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "flex-start",
          mt: "11px",
          mb: "12px",
        }}
      >
        {myPropsAppBar.map((e, index) => (
          <Button
            key={index}
            sx={{
              fontSize: { xs: fs.xs, xxs: fs.xxs, xxxs: fs.xxs },
              fontWeight: 600,
              fontFamily: "poppins",
              color: `${e.name === openTag ? "black" : "white"}`,
              bgcolor: `${e.name === openTag ? "#439F48" : "#4831D4"}`,
              textAlign: "center",
              padding: "6px 17px",
              "&.MuiButtonBase-root:hover": {
                bgcolor: `${e.name === openTag ? "#439F48" : "#4831D4"}`,
              },
              textTransform: "none",
              cursor: "pointer",
              mr: "8px",
            }}
            onClick={e.func}
          >
            {e.name}
          </Button>
        ))}
      </Box>
      {openTag === "Upcoming" && (
        <MyPropsCardContainer
          mode={mode}
          mainDetail={upComingDataCommingFromApi}
          openTag={openTag}
          getEachProp={getEachProp}
          callUpCommingMyPropsApi={callUpCommingMyPropsApi}
          getMyProps={getMyProps}
        />
      )}
      {openTag === "Live" && (
        <MyPropsCardContainer
          mode={mode}
          mainDetail={liveDataCommingFromApi}
          openTag={openTag}
          getEachProp={getEachProp}
          getMyProps={getMyProps}
        />
      )}
      {openTag === "Completed" && (
        <MyPropsCardContainer
          mode={mode}
          mainDetail={completeDataCommingFromApi}
          openTag={openTag}
          getEachProp={getEachProp}
          getMyProps={getMyProps}
        />
      )}
    </Box>
  );
}
