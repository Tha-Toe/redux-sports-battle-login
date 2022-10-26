import React from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Grid, Card } from "@mui/material";
import Detail from "./Detail";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";
import NoProps from "./NoProps";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { connectStorageEmulator } from "firebase/storage";

const ShowDate = ({ date, id }) => {
  const [showDate, setShowDate] = useState(null);
  useEffect(() => {
    let createDate = new Date(date);
    let toDateString = createDate.toDateString();
    let toLocaleTimeString = createDate.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    setShowDate(toDateString + ", " + toLocaleTimeString);
  }, [date]);
  return (
    <Typography
      sx={{
        fontSize: { xs: "12px", xxxs: "10px" },
        fontWeight: 500,
        fontFamily: "poppins",
        color: "secondary.dark_gray",
        mt: "5px",
      }}
    >
      Conf#::{id.slice(-6)},{showDate}
    </Typography>
  );
};

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
  const completeDataCommingFromApi = useSelector(
    (state) => state.user.completeDataCommingFromApi
  );
  const liveDataCommingFromApi = useSelector(
    (state) => state.user.liveDataCommingFromApi
  );
  const upComingDataCommingFromApi = useSelector(
    (state) => state.user.upComingDataCommingFromApi
  );

  useEffect(() => {
    console.log(mainDetail);
  }, [mainDetail]);

  if (mainDetail && mainDetail.props.length === 0) {
    return <NoProps />;
  } else if (mainDetail && mainDetail.props.length > 0) {
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
          <Box
            sx={{
              width: "95%",
              margin: "0 auto",
              mt: "10px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: `${mainDetail.lhsColor}`,
                fontSize: { xs: "12px", xxs: "10px", xxxs: "10px" },
                fontWeight: 600,
                fontFamily: "poppins",
              }}
            >
              {mainDetail.lhsText} - {mainDetail.lhsValue}
            </Typography>
            <Typography
              sx={{
                color: `${mainDetail.rhsColor}`,
                fontSize: { xs: "12px", xxs: "10px", xxxs: "10px" },
                fontWeight: 600,
                fontFamily: "poppins",
              }}
            >
              {mainDetail.rhsText} - {mainDetail.rhsValue}
            </Typography>
          </Box>
          {mainDetail.props.map((e, index) => (
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
                {e.entryFee && (
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
                    Entry: ${e.entryFee}{" "}
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
                  {e.title}
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
                  {e.playerNames}
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
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#9dc6d2",
                        color: `${
                          e.playType === "DEFENSE PLAY" ? "#9dc6d2" : "#D04643"
                        }`,
                      }}
                    >
                      {e.playTypeEmoji} {e.playType}
                    </Typography>
                    <ShowDate date={e.createDate} id={e.id} />
                  </Box>
                  <Button
                    sx={{
                      fontSize: { xs: "14px", xxs: "12px", xxxs: "10px" },
                      fontWeight: 600,
                      fontFamily: "poppins",
                      color: `${e.modeColor}`,
                      padding: { xs: "8px 9.5px", xxxs: "5px 7px" },
                    }}
                  >
                    +$15.0
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
                  {e.sports.map((each, index) => (
                    <div
                      key={index}
                      style={{
                        width: "18px",
                        height: "18px",
                        background: `${each.color}`,
                        borderRadius: "50%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "6px",
                      }}
                    >
                      <img
                        src="/dollar_my_prop.png"
                        key={index}
                        style={{
                          height: "10px",
                          width: "10px",
                          objectFit: "contain",
                          background: `${each.color}`,
                        }}
                      />
                    </div>
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
                  {e.sports.map((each, index) => (
                    <Typography
                      key={index}
                      sx={{
                        fontSize: { xs: "12px", xxs: "10px", xxxs: "8px" },
                        fontWeight: 500,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        ml: "2px",
                      }}
                    >
                      {each.sport.toUpperCase()},
                    </Typography>
                  ))}
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
            detailData={upComingDataCommingFromApi}
            openDetail={openDetail}
            mainDetail={mainDetail}
            clicked={clicked}
            mode={mode}
          />
        )}
        {openDetail === "Live" && (
          <Detail
            setOpenDetail={setOpenDetail}
            detailData={liveDataCommingFromApi}
            openDetail={openDetail}
            mainDetail={mainDetail}
            clicked={clicked}
            mode={mode}
          />
        )}
        {openDetail === "Completed" && (
          <Detail
            setOpenDetail={setOpenDetail}
            detailData={completeDataCommingFromApi}
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
