import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import "./props.css";
import { useSelector } from "react-redux";

const GridItemComponent = ({
  e,
  setSelectedCardList,
  selectedCardList,
  index,
  addCard,
  selectSports,
  selectColor,
  selectSrc,
  mode,
  scrollDownFunc,
  historyTrue,
  selectMatches,
  selectStatTitle,
  statsAndData,
}) => {
  const fs = useSelector((state) => state.user.fs);
  const [disableButton, setDisableButton] = useState(false);
  useEffect(() => {
    let conditionArray = selectedCardList.filter((each) => {
      return (
        each.gameId === e.gameId &&
        each.sport === e.sport &&
        each.playerName === e.playerName &&
        each.gameName === e.gameName &&
        each.statKey === e.statKey
      );
    });
    if (conditionArray.length > 0) {
      console.log(conditionArray);
      setType(conditionArray[0].action);
    } else {
      setType(null);
    }

    let toDisableButton = selectedCardList.filter((each) => {
      return (
        each.gameId === e.gameId &&
        each.sport === e.sport &&
        each.playerName === e.playerName &&
        each.gameName === e.gameName &&
        each.statKey !== e.statKey
      );
    });
    if (toDisableButton.length > 0) {
      console.log(toDisableButton);
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [
    selectedCardList,
    selectStatTitle,
    selectMatches,
    selectSports,
    statsAndData,
    e,
  ]);
  let currentSportDataRedux = useSelector(
    (state) => state.user.currentSportDataRedux
  );
  const [type, setType] = useState(null);
  const addCardFunc = (overUnder) => {
    console.log("add card fun run");
    let dataToAddCard = { ...e, action: overUnder };
    // console.log(dataToAddCard);
    addCard(dataToAddCard);
  };

  const { innerWidth } = window;

  // name: "Frank Schwindel",
  // cubs: "Chicago Cubs - Batter",
  // vs: "vs Miami Marlins",
  // time: "09:08",
  // last: "0,0,1,0,0",
  // avg: "0.20",
  // bat: "0.5",

  const [avg, setAvg] = useState(null);
  useEffect(() => {
    if (e.history) {
      let total = 0;
      for (let index = 0; index < e.history.length; index++) {
        total += Number(e.history[index].battingPoints);
      }
      let totalAvg = Math.floor(total / e.history.length);
      setAvg(totalAvg);
    }
  }, [e]);

  const [time, setTime] = useState(null);

  useEffect(() => {
    let currTime = new Date();
    let currTimeMili = currTime.getTime();
    let startTime = new Date(e.propStartTime);
    let startTimeMili = startTime.getTime();
    let differentMili = startTimeMili - currTimeMili;
    let differentSec = Math.floor(differentMili / 1000);
    const getMinutes = Math.floor(differentSec / 60);
    if (differentSec) {
      const id = setInterval(() => updateTimesSecond(getMinutes), 1000);
      return () => {
        clearInterval(id);
      };
    }
  }, [e]);
  const updateTimesSecond = async (getMinutes) => {
    if (getMinutes > 120) {
      let hours = Math.floor(getMinutes / 60);
      let hoursToMinutes = hours * 60;
      let minutes = getMinutes - hoursToMinutes;
      let timeToAdd = hours.toString() + "h" + " " + minutes.toString() + "m";
      setTime(timeToAdd);
    } else {
      let currTime = new Date();
      let currTimeMili = currTime.getTime();
      let startTime = new Date(e.propStartTime);
      let startTimeMili = startTime.getTime();
      let differentMili = startTimeMili - currTimeMili;
      let differentSec = Math.floor(differentMili / 1000);
      const getMinutesInInterval = Math.floor(differentSec / 60);
      if (differentSec >= 1) {
        let hours = Math.floor(getMinutesInInterval / 60);
        let hoursToMinutes = hours * 60;
        let minutes = getMinutesInInterval - hoursToMinutes;
        let seconds = 0;
        if (hours !== 0) {
          let hoursToCalculate = 60 * hours;
          let hourPlusMin = minutes + hoursToCalculate;
          let minToSec = hourPlusMin * 60;
          seconds = differentSec - minToSec;
        } else {
          seconds = differentSec - minutes * 60;
        }
        if (seconds.toString().length === 1) {
          seconds = "0" + seconds;
        }
        if (minutes.toString().length === 1) {
          minutes = "0" + minutes;
        }
        if (hours.toString().length === 1) {
          hours = "0" + hours;
        }
        let timeToAdd =
          hours.toString() +
          " : " +
          minutes.toString() +
          " : " +
          seconds.toString();
        setTime(timeToAdd);
      } else {
        let timeToAdd = "00" + " : " + "00" + " : " + "00";
        setTime(timeToAdd);
      }
    }
  };

  return (
    <Grid
      item
      xxxs={12}
      lg={6}
      sx={{
        padding: 0,
        height: { xxxs: historyTrue && e.history ? "130px" : "100px" },
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "100%",
          bgcolor: "primary.main",
          border: `${mode === "dark" ? "1px solid #494949" : "none"}`,
          borderRadius: "2px",
          boxShadow: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            ml: "8px",
            height: "80%",
            width: "45%",
          }}
        >
          <Typography
            sx={{
              color: `${disableButton ? "#FFCCCB" : "secondary.dark_gray"}`,
              fontSize: { xxxs: fs.xs },
              fontWeight: 600,
              fontFamily: "poppins",
              textDecoration: `${disableButton ? "line-through" : "none"}`,
              mb: "3px",
            }}
          >
            {e.playerName}
          </Typography>
          <Typography
            sx={{
              color: "secondary.dark_gray",
              fontSize: {
                md: fs.xxs,
                sm: fs.xxxs,
                xxxs: fs.xxs,
              },
              fontWeight: 400,
              fontFamily: "poppins",
              mb: "3px",
            }}
          >
            {e.myTeamLongName} - {e.profile}
          </Typography>
          <Box sx={{ display: "flex", mb: "3px" }}>
            <Typography
              sx={{
                color: "secondary.dark_gray",
                fontSize: {
                  md: e.otherTeamLongName.length > 20 ? fs.xxxs : fs.xxs,
                  sm: fs.xxxs,
                  xxxs: fs.xxs,
                },
                fontWeight: 400,
                fontFamily: "poppins",
              }}
            >
              vs {e.otherTeamLongName}
            </Typography>
            <Typography
              sx={{
                color: "secondary.dark_gray",
                fontSize: {
                  md: e.otherTeamLongName.length > 20 ? fs.xxxs : fs.xxs,
                  sm: fs.xxxs,
                  xxxs: fs.xxs,
                },
                fontWeight: 400,
                fontFamily: "poppins",
                ml: "2px",
                color: "#FFCCCB",
              }}
            >
              {time}
            </Typography>
          </Box>
          {historyTrue && e.history && (
            <>
              <Box sx={{ display: "flex", mb: "3px" }}>
                <Typography
                  sx={{
                    color: "secondary.dark_gray",
                    fontSize: {
                      md: fs.xxs,
                      sm: fs.xxxs,
                      xxxs: fs.xxs,
                    },
                    fontWeight: 400,
                    fontFamily: "poppins",
                    mr: "5px",
                  }}
                >
                  Last {e.history.length}
                </Typography>
                <Box
                  sx={{
                    color: "#3A6DBE",
                    fontSize: {
                      md: fs.xxs,
                      sm: fs.xxxs,
                      xxxs: fs.xxs,
                    },
                    fontWeight: 400,
                    fontFamily: "poppins",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {e.history &&
                    e.history.map((each, i) => (
                      <Typography
                        key={i}
                        sx={{
                          color: "#3A6DBE",
                          fontSize: {
                            md: fs.xxs,
                            sm: fs.xxxs,
                            xxxs: fs.xxs,
                          },
                          fontWeight: 400,
                          fontFamily: "poppins",
                          mr: "2px",
                        }}
                      >
                        {each.battingPoints.replace(".0", "")}
                        {e.history.length - 1 !== i && ","}
                      </Typography>
                    ))}
                </Box>
              </Box>
              <Typography
                sx={{
                  color: "secondary.dark_gray",
                  fontSize: {
                    md: fs.xxs,
                    sm: fs.xxxs,
                    xxxs: fs.xxs,
                  },
                  fontWeight: 400,
                  fontFamily: "poppins",
                  mb: "3px",
                }}
              >
                Avg :: {avg}
              </Typography>
            </>
          )}
          {disableButton && (
            <Typography
              sx={{
                color: "#FFCCCB",
                fontSize: {
                  md: fs.xxs,
                  sm: fs.xxxs,
                  xxxs: fs.xxs,
                },
                fontWeight: 400,
                fontFamily: "poppins",
              }}
            >
              Already picked in cart
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              color: "secondary.dark_gray",
              fontSize: {
                lg: e.statDisplay.length > 13 ? fs.xxs : fs.xs,
                md: fs.xs,
                sm: fs.xxxs,
                xxxs: fs.xxs,
              },
              fontWeight: 500,
              fontFamily: "poppins",
            }}
          >
            {e.statDisplay}
          </Typography>
          <Typography
            sx={{
              color: "secondary.dark_gray",
              fontSize: "28px",
              fontWeight: 900,
              fontFamily: "poppins",
            }}
          >
            {e.projection}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
            mr: "8px",
            width: "20%",
          }}
        >
          <Button
            sx={{
              width: { sm: "48px", xxxs: "24px" },
              py: "4px",
              color: `${disableButton ? "gray" : "secondary.dark_gray"}`,
              fontSize: { sm: fs.xxs, xs: fs.xxxs, xxxs: fs.xxs },
              fontWeight: 400,
              fontFamily: "poppins",
              border: `${type === "over" ? "none" : "1px solid white"}`,
              borderColor: `${
                mode === "dark" ? (disableButton ? "gray" : "white") : "#494949"
              }`,
              borderRadius: "3px",
              mb: "8px",
              background: `${type === "over" ? "#4831D4" : "transparent"}`,
              "&.MuiButtonBase-root:hover": {
                background: `${type === "over" ? "#4831D4" : "transparent"}`,
              },
            }}
            onClick={() => {
              if (!disableButton) {
                addCardFunc("over");
                if (innerWidth < 700) {
                  scrollDownFunc();
                }
              }
            }}
          >
            ABOVE
          </Button>
          <Button
            sx={{
              width: { sm: "48px", xxxs: "24px" },
              color: `${disableButton ? "gray" : "secondary.dark_gray"}`,
              py: "4px",
              fontSize: { sm: fs.xxs, xs: fs.xxxs, xxxs: fs.xxs },
              fontWeight: 400,
              fontFamily: "poppins",
              border: `${type === "under" ? "none" : "1px solid white"}`,
              borderColor: `${
                mode === "dark" ? (disableButton ? "gray" : "white") : "#494949"
              }`,
              borderRadius: "3px",
              background: `${type === "under" ? "#4831D4" : "transparent"}`,
              "&.MuiButtonBase-root:hover": {
                background: `${type === "under" ? "#4831D4" : "transparent"}`,
              },
            }}
            onClick={() => {
              if (!disableButton) {
                addCardFunc("under");
                if (innerWidth < 700) {
                  scrollDownFunc();
                }
              }
            }}
          >
            BELOW
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};
export default GridItemComponent;
