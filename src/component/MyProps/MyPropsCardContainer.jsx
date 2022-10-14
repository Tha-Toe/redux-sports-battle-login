import React from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Grid, Card } from "@mui/material";
import Detail from "./Detail";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";

export default function MyPropsCardContainer({ mode, mainDetail, openTag }) {
  const handelOpenDetail = (index) => {
    setClicked(index);
    if (openTag === "Upcoming") {
      setOpenDetail("Upcoming");
    } else if (openTag === "Live") {
      setOpenDetail("Live");
    } else {
      setOpenDetail("Completed");
    }
  };
  const [upCommingDetailData, setUpComminngDetailData] = useState([
    {
      player: { name: "Mohamed Salah", forward: "LIV - Forward " },
      game: {
        playType: { type: "soccer", src: "/soccer.png" },
        vs: " LIV vs CRY",
      },
      status: "Not Started",
      goal: { amount: "0.5", name: "Goal" },
      actual: "0",
    },
    {
      player: { name: "Sadio Mane", forward: "LIV - Forward " },
      game: {
        playType: { type: "soccer", src: "/soccer.png" },
        vs: " LIV vs CRY",
      },
      status: "Not Started",
      goal: { amount: "0.5", name: "Goal" },
      actual: "0",
    },
    {
      player: { name: "Gabriel Jesus", forward: "LIV - Forward " },
      game: {
        playType: { type: "soccer", src: "/soccer.png" },
        vs: " LIV vs CRY",
      },
      status: "Not Started",
      goal: { amount: "0.5", name: "Goal" },
      actual: "0",
    },
  ]);
  const [LiveDetailData, setLiveDetailData] = useState([
    {
      player: { name: "Mohamed Salah", forward: "LIV - Forward " },
      game: {
        playType: { type: "soccer", src: "/soccer.png" },
        vs: " LIV vs CRY",
      },
      status: "Not Started",
      goal: { amount: "0.5", name: "Goal" },
      actual: "0",
    },
    {
      player: { name: "Sadio Mane", forward: "LIV - Forward " },
      game: {
        playType: { type: "soccer", src: "/soccer.png" },
        vs: " LIV vs CRY",
      },
      status: "In-reivew",
      goal: { amount: "0.5", name: "Goal" },
      actual: "1",
      color: "#459F48",
      bar: "full",
    },
    {
      player: { name: "Gabriel Jesus", forward: "LIV - Forward " },
      game: {
        playType: { type: "soccer", src: "/soccer.png" },
        vs: " LIV vs CRY",
      },
      status: "Not Started",
      goal: { amount: "0.5", name: "Goal" },
      actual: "0",
      bar: "half",
    },
  ]);
  const [CompletedDetailData, setCompletedDetailData] = useState([
    {
      player: { name: "Mohamed Salah", forward: "LIV - Forward " },
      game: {
        playType: { type: "soccer", src: "/soccer.png" },
        vs: " LIV vs CRY",
      },
      status: "won",
      goal: { amount: "0.5", name: "Goal" },
      actual: "0",
    },
    {
      player: { name: "Sadio Mane", forward: "LIV - Forward " },
      game: {
        playType: { type: "soccer", src: "/soccer.png" },
        vs: " LIV vs CRY",
      },
      status: "won",
      goal: { amount: "0.5", name: "Goal" },
      actual: "1",
      color: "#459F48",
      bar: "full",
    },
    {
      player: { name: "Gabriel Jesus", forward: "LIV - Forward " },
      game: {
        playType: { type: "soccer", src: "/soccer.png" },
        vs: " LIV vs CRY",
      },
      status: "lost",
      goal: { amount: "0.5", name: "Goal" },
      actual: "0",
      actualBar: "50%",
      bar: "half",
    },
  ]);
  const [openDetail, setOpenDetail] = useState(null);
  const [clicked, setClicked] = useState(null);

  const [myPropsDataCommingFromApi, setMyPropsDataCommingFromApi] = useState(
    "myPropsDataCommingFromApi"
  );
  if (myPropsDataCommingFromApi) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { md: "row", xxxs: "column" },
          alignItems: "flex-start",
        }}
      >
        <Grid
          container
          sx={{
            width: { md: "50%", xxxs: "100%" },
            border: `${mode === "dark" ? "1px solid #494949" : "none"}`,
          }}
        >
          {mainDetail.map((e, index) => (
            <Grid
              key={index}
              item
              xxxs={12}
              md={12}
              sx={{
                padding: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                mb: "6px",
                mt: "6px",
              }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "95%",
                  bgcolor: "primary.main",
                  borderRadius: "4px",
                  border: `${
                    clicked === index
                      ? "1px solid #4831D4"
                      : mode === "dark"
                      ? "1px solid #494949"
                      : "1px solid #494949"
                  }`,

                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={() => handelOpenDetail(index)}
              >
                {e.condition && (
                  <Typography
                    sx={{
                      fontSize: { xs: "10px", xxs: "8px", xxxs: "6px" },
                      fontWeight: 500,
                      fontFamily: "poppins",
                      color: "white",
                      background: "#494949",
                      padding: "4px 8px",
                      borderRadius: "5px",
                      position: "absolute",
                      right: "11px",
                      top: "8px",
                    }}
                  >
                    {e.condition}
                  </Typography>
                )}
                <Typography
                  sx={{
                    fontSize: { xs: "16px", xxs: "14px", xxxs: "12px" },
                    fontWeight: 700,
                    fontFamily: "poppins",
                    color: "secondary.dark_gray",
                    mt: "7px",
                    width: "95%",
                  }}
                >
                  {e.header}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "12px", xxs: "10px", xxxs: "8px" },
                    fontWeight: 500,
                    fontFamily: "poppins",
                    color: "secondary.dark_gray",
                    mt: "5px",
                    width: "95%",
                  }}
                >
                  {e.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "95%",
                    mt: "8px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <img src={e.src} style={{ width: "116px" }} />
                    <Typography
                      sx={{
                        fontSize: { xs: "12px", xxxs: "10px" },
                        fontWeight: 500,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mt: "5px",
                      }}
                    >
                      {e.date}
                    </Typography>
                  </Box>
                  <Button
                    sx={{
                      fontSize: { xs: "14px", xxs: "12px", xxxs: "10px" },
                      fontWeight: 600,
                      fontFamily: "poppins",
                      color: "#4831D4",
                      padding: { xs: "8px 9.5px", xxxs: "5px 7px" },
                    }}
                  >
                    {e.amount}
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "95%",
                    mt: "8px",
                  }}
                >
                  {e.start.map((each, index) => (
                    <img
                      src={each}
                      key={index}
                      style={{ marginRight: "6px" }}
                    />
                  ))}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "95%",
                    mt: "12px",
                    mb: "14px",
                  }}
                >
                  <img
                    src={e.sportType.src}
                    style={{
                      background: "black",
                      borderRadius: "50%",
                      height: "20px",
                      width: "20px",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: { xs: "12px", xxs: "10px", xxxs: "8px" },
                      fontWeight: 500,
                      fontFamily: "poppins",
                      color: "secondary.dark_gray",
                      ml: "5px",
                    }}
                  >
                    {e.sportType.type}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        {!openDetail && (
          <Detail
            emptyText={"Select a prop to know more information "}
            mode={mode}
          />
        )}
        {openDetail === "Upcoming" && (
          <Detail
            setOpenDetail={setOpenDetail}
            detailData={upCommingDetailData}
            openDetail={openDetail}
            mainDetail={mainDetail}
            clicked={clicked}
            mode={mode}
          />
        )}
        {openDetail === "Live" && (
          <Detail
            setOpenDetail={setOpenDetail}
            detailData={LiveDetailData}
            openDetail={openDetail}
            mainDetail={mainDetail}
            clicked={clicked}
            mode={mode}
          />
        )}
        {openDetail === "Completed" && (
          <Detail
            setOpenDetail={setOpenDetail}
            detailData={CompletedDetailData}
            openDetail={openDetail}
            mainDetail={mainDetail}
            clicked={clicked}
            mode={mode}
          />
        )}
      </Box>
    );
  } else {
    return <LoadingSpinnerEachSection />;
  }
}
