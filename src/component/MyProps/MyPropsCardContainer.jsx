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
import WithdrawPopup from "./WithdrawPopup";
const UpcomingWithdraw = ({ propData, setOpenWithdrawPopup }) => {
  const fs = useSelector((state) => state.user.fs);
  const [time, setTime] = useState(null);
  useEffect(() => {
    if (propData.prop.withdrawAllowed) {
      const id = setInterval(() => updateTimesSecond(), 1000);
      return () => {
        clearInterval(id);
      };
    }
  }, [propData]);

  const updateTimesSecond = async () => {
    if (propData.prop.withdrawAllowed) {
      let currTime = new Date();
      let currTimeMili = currTime.getTime();
      let expireDate = new Date(propData.prop.withdrawExpiryTime);
      let expireDataMili = expireDate.getTime();
      let differentMili = expireDataMili - currTimeMili;
      if (differentMili > 0) {
        let differentSec = Math.floor(differentMili / 1000);
        let mins = Math.trunc(differentSec / 60);
        let seconds = Math.trunc(differentSec - mins * 60);
        if (seconds.toString().length === 1) {
          seconds = "0" + seconds;
        }
        if (mins.toString().length === 1) {
          mins = "0" + mins;
        }
        let format = mins + " : " + seconds;

        setTime(format);
      } else {
        setTime(null);
      }
    }
  };
  if (time) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          sx={{
            background: "#FFCCCB",
            color: "red",
            fontSize: { xs: fs.xs, xxs: fs.xxs, xxxs: fs.xxxs },
            fontWeight: 500,
            fontFamily: "poppins",
            padding: "2px 10px",
            textTransform: "none",
            mb: "3px",
            cursor: "pointer",
            "&.MuiButtonBase-root:hover": {
              background: "#FFCCCB",
            },
          }}
          onClick={() => {
            setOpenWithdrawPopup(propData);
          }}
        >
          withdraw
        </Button>
        <Typography
          sx={{
            fontSize: { xs: fs.xs, xxs: fs.xxs, xxxs: fs.xxxs },
            fontWeight: 500,
            fontFamily: "poppins",
            color: "#ffcccb",
          }}
        >
          {time}
        </Typography>
      </Box>
    );
  } else {
    return <></>;
  }
};
const Sports = ({ sports }) => {
  const fs = useSelector((state) => state.user.fs);

  const removeDuplicates = (arr) => {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  };
  const [sportsToShow, setSportsToShow] = useState([]);
  useEffect(() => {
    if (sports) {
      let mapData = sports.map((each) => {
        return each.sport;
      });
      let rmdsportsToShow = removeDuplicates(mapData);
      setSportsToShow(rmdsportsToShow);
    }
  }, [sports]);
  return (
    <>
      {sportsToShow.map((each, index) => (
        <Typography
          key={index}
          sx={{
            fontSize: { xs: fs.xs, xxs: fs.xxs, xxxs: fs.xxxs },
            fontWeight: 500,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
            ml: "4px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {each.toUpperCase()}
          {sportsToShow.length > 1 && sportsToShow.length - 1 !== index && ","}
        </Typography>
      ))}
    </>
  );
};

const ShowDate = ({ date, id }) => {
  const [showDate, setShowDate] = useState(null);
  const fs = useSelector((state) => state.user.fs);

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
        fontSize: { xs: fs.xs, xxxs: fs.xxs },
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

export default function MyPropsCardContainer({
  mode,
  mainDetail,
  openTag,
  getEachProp,
  callUpCommingMyPropsApi,
}) {
  const fs = useSelector((state) => state.user.fs);

  useEffect(() => {
    console.log(mainDetail);
  }, [mainDetail]);
  let userData = JSON.parse(localStorage.getItem("user"));
  const [detailData, setDetailData] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const handelOpenDetail = (e) => {
    // setClicked(index);
    console.log(e);
    setClickedId(e.id);
    setDetailLoading(true);
    let openTagCheck;
    if (openTag === "Upcoming") {
      openTagCheck = "upcoming";
    } else if (openTag === "Live") {
      openTagCheck = "live";
    } else {
      openTagCheck = "complete";
    }
    try {
      getEachProp(userData.uid, openTagCheck, e.id).then((result) => {
        console.log(result);
        setDetailData(result);
        setOpenDetail(openTag);
        setDetailLoading(false);
      });
    } catch (error) {
      if (error) {
        console.log("error", error);
      }
    }
    // console.log(index);
    // userId, status, propid
  };
  const refreshAndCallDetailApi = async (e) => {
    setDetailLoading(true);
    let userData = JSON.parse(localStorage.getItem("user"));
    try {
      let result = await getEachProp(userData.uid, "live", e.id);
      if (result) {
        console.log(result);
        setDetailData(result);
        setOpenDetail(openTag);
        setDetailLoading(false);
      }
    } catch (error) {
      if (error) {
        console.log("error", error);
      }
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
  const [clickedId, setClickedId] = useState(null);
  const completeDataCommingFromApi = useSelector(
    (state) => state.user.completeDataCommingFromApi
  );
  const liveDataCommingFromApi = useSelector(
    (state) => state.user.liveDataCommingFromApi
  );
  const upComingDataCommingFromApi = useSelector(
    (state) => state.user.upComingDataCommingFromApi
  );

  const [openWithdrawLoading, setOpenWithdrawLoading] = useState(false);

  const [openWithdrawPopup, setOpenWithdrawPopup] = useState(null);
  if (mainDetail && mainDetail.props.length === 0 && !openWithdrawLoading) {
    return <NoProps openTag={openTag} />;
  } else if (mainDetail && mainDetail.props.length > 0) {
    return (
      <>
        {openWithdrawLoading ? (
          <LoadingSpinnerEachSection />
        ) : (
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
                maxHeight: "1000px",
                overflow: "scroll",
                "&::-webkit-scrollbar": { display: "none" },
                marginBottom: "50px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
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
                    fontSize: { xs: fs.xs, xxs: fs.xxs, xxxs: fs.xxs },
                    fontWeight: 600,
                    fontFamily: "poppins",
                  }}
                >
                  {mainDetail.lhsText} - {mainDetail.lhsValue}
                </Typography>
                <Typography
                  sx={{
                    color: `${mainDetail.rhsColor}`,
                    fontSize: { xs: fs.xs, xxs: fs.xxs, xxxs: fs.xxs },
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
                        clickedId === e.id
                          ? "1px solid #4831D4"
                          : mode === "dark"
                          ? "1px solid #494949"
                          : "1px solid #494949"
                      }`,

                      cursor: "pointer",
                      position: "relative",
                    }}
                    onClick={() => handelOpenDetail(e)}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: fs.normal, xxs: fs.small, xxxs: fs.xs },
                        fontWeight: 700,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mt: "7px",
                        width: "95%",
                      }}
                    >
                      {e.playTypeEmoji} {e.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: fs.xs, xxs: fs.xxs, xxxs: fs.xxxs },
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
                        alignItems: "flex-start",
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
                        <ShowDate date={e.createDate} id={e.id} />
                      </Box>
                      {e.userWon ? (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            mr: "5px",
                          }}
                        >
                          {e.status === "x" && (
                            <Typography
                              sx={{
                                color: "#9dc6d2",
                                fontSize: {
                                  xs: fs.xs,
                                  xxs: fs.xxs,
                                  xxxs: fs.xxxs,
                                },

                                fontWeight: 400,
                                fontFamily: "poppins",
                              }}
                            >
                              Refunded
                            </Typography>
                          )}
                          <Typography
                            sx={{
                              fontSize: {
                                xs: fs.small,
                                xxs: fs.xs,
                                xxxs: fs.xxs,
                              },
                              fontWeight: 600,
                              fontFamily: "poppins",
                              color: `${e.userWon ? "#459F48" : "#D04643"}`,
                              width: "50px",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {e.userWon ? "+" : "-"}${e.toWin}
                          </Typography>
                          <Typography
                            sx={{
                              color: "#9dc6d2",
                              fontSize: {
                                xs: fs.xs,
                                xxs: fs.xxs,
                                xxxs: fs.xxxs,
                              },

                              fontWeight: 400,
                              fontFamily: "poppins",
                            }}
                          >
                            Entry: ${e.entryFee}
                          </Typography>
                          {e.joinWith === "bonus" && (
                            <Typography
                              sx={{
                                color: "#9dc6d2",
                                fontSize: {
                                  xs: fs.xs,
                                  xxs: fs.xxs,
                                  xxxs: fs.xxxs,
                                },

                                fontWeight: 400,
                                fontFamily: "poppins",
                              }}
                            >
                              bonus
                            </Typography>
                          )}
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            mr: "5px",
                          }}
                        >
                          {e.certifyStatus === "x" && (
                            <Typography
                              sx={{
                                color: "#9dc6d2",
                                fontSize: {
                                  xs: fs.xs,
                                  xxs: fs.xxs,
                                  xxxs: fs.xxxs,
                                },

                                fontWeight: 400,
                                fontFamily: "poppins",
                              }}
                            >
                              Refunded
                            </Typography>
                          )}
                          <Typography
                            sx={{
                              fontSize: {
                                xs: fs.small,
                                xxs: fs.xs,
                                xxxs: fs.xxs,
                              },
                              fontWeight: 600,
                              fontFamily: "poppins",
                              color: `${
                                openTag === "Upcoming"
                                  ? "#4831D4"
                                  : e.userWon
                                  ? "#459F48"
                                  : e.certifyStatus === "x"
                                  ? "#459f48"
                                  : "#D04643"
                              }`,
                              width: "50px",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {e.userWon
                              ? "+"
                              : e.certifyStatus === "x"
                              ? "+"
                              : "-"}
                            ${e.entryFee}
                          </Typography>
                          {e.joinWith === "bonus" && (
                            <Typography
                              sx={{
                                color: "#9dc6d2",
                                fontSize: {
                                  xs: fs.xs,
                                  xxs: fs.xxs,
                                  xxxs: fs.xxxs,
                                },

                                fontWeight: 400,
                                fontFamily: "poppins",
                              }}
                            >
                              bonus
                            </Typography>
                          )}
                        </Box>
                      )}
                    </Box>
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
                          justifyContent: "center",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          {e.sports.map((each, index) => (
                            <div
                              key={index}
                              style={{
                                width: "16px",
                                height: "16px",
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
                          <Sports sports={e.sports} />
                        </Box>
                      </Box>
                      {openTag === "Upcoming" && e.prop.withdrawAllowed && (
                        <UpcomingWithdraw
                          propData={e}
                          setOpenWithdrawPopup={setOpenWithdrawPopup}
                        />
                      )}
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {!openDetail && (
              <Detail
                emptyText={"Select a prop to know more information "}
                mode={mode}
                detailLoading={detailLoading}
              />
            )}
            {openDetail === "Upcoming" && (
              <Detail
                setOpenDetail={setOpenDetail}
                detailData={detailData}
                openDetail={openDetail}
                mainDetail={mainDetail}
                clickedId={clickedId}
                mode={mode}
                getEachProp={getEachProp}
                detailLoading={detailLoading}
              />
            )}
            {openDetail === "Live" && (
              <Detail
                setOpenDetail={setOpenDetail}
                detailData={detailData}
                openDetail={openDetail}
                mainDetail={mainDetail}
                clickedId={clickedId}
                mode={mode}
                getEachProp={getEachProp}
                detailLoading={detailLoading}
                refreshAndCallDetailApi={refreshAndCallDetailApi}
              />
            )}
            {openDetail === "Completed" && (
              <Detail
                setOpenDetail={setOpenDetail}
                detailData={detailData}
                openDetail={openDetail}
                mainDetail={mainDetail}
                clickedId={clickedId}
                mode={mode}
                getEachProp={getEachProp}
                detailLoading={detailLoading}
              />
            )}
            {openWithdrawPopup && (
              <WithdrawPopup
                mode={mode}
                setOpenWithdrawPopup={setOpenWithdrawPopup}
                openWithdrawPopup={openWithdrawPopup}
                setOpenWithdrawLoading={setOpenWithdrawLoading}
                callUpCommingMyPropsApi={callUpCommingMyPropsApi}
              />
            )}
          </Box>
        )}
      </>
    );
  } else {
    return <LoadingSpinnerEachSection />;
  }
}
