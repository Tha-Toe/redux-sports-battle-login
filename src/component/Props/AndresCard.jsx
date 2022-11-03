import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./props.css";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector } from "react-redux";
export function AndresCard({
  removeCard,
  e,
  selectedCardList,
  setSelectedCardList,
  mode,
}) {
  const fs = useSelector((state) => state.user.fs);

  const handleChangeOverUnder = (action) => {
    let selectCardIdClone = selectedCardList.map((each) => {
      if (
        each.gameId === e.gameId &&
        each.sport === e.sport &&
        each.playerName === e.playerName &&
        each.gameName === e.gameName &&
        each.statKey === e.statKey
      ) {
        let dataToAddCard = each;
        dataToAddCard.action = action;
        return dataToAddCard;
      } else {
        return each;
      }
    });
    setSelectedCardList(selectCardIdClone);
  };
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

  const sportDataFromRedux = useSelector(
    (state) => state.user.sportDataCommingFromApi
  );
  const propsDataCommingFromApi = useSelector(
    (state) => state.user.propsDataCommingFromApi
  );
  const [sportImg, setSportImg] = useState(null);
  useEffect(() => {
    setSportImg(null);
    if (sportDataFromRedux.length > 0) {
      let currSport = sportDataFromRedux.filter((each) => {
        return each.code === e.sport;
      });
      // console.log(currSport);
      if (currSport.length > 0) {
        setSportImg(currSport[0].inactiveImage);
      }
    }
  }, [sportDataFromRedux, e]);
  const [historyTrue, setHistoryTrue] = useState(false);
  useEffect(() => {
    if (propsDataCommingFromApi) {
      let selectedSportPropsData = propsDataCommingFromApi.filter((each) => {
        return each.sportCode === e.sport;
      });
      let history = selectedSportPropsData[0].metadata.history[`${e.sport}`];
      // console.log(history);
      if (history) {
        setHistoryTrue(history);
      } else {
        setHistoryTrue(false);
      }
    }
  }, [propsDataCommingFromApi, e]);

  return (
    <Box
      id="Andress-container"
      component="div"
      sx={{
        width: "90%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        bgcolor: "primary.dark",
        borderRadius: "4px",
        mb: "8px",
        border: `${mode === "dark" ? "none" : "1px solid #EBEBEB"}`,
      }}
    >
      <Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "7px",
            mb: "7px",
          }}
        >
          <Typography
            sx={{
              fontSize: { xl: fs.small, sm: fs.xs, xxxs: fs.xxs },
              fontWeight: 600,
              fontFamily: "poppins",
              ml: "10px",
              color: "secondary.dark_gray",
            }}
          >
            {e.playerName}
          </Typography>
          <RemoveIcon
            sx={{
              color: "#EA1E63",
              fontSize: fs.x_large,
              borderRadius: "50%",
              border: "2px solid #EA1E63",
              mr: "10px",
              cursor: "pointer",
            }}
            onClick={() => removeCard(e)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            background: "#4831D4",
            borderRadius: "6px",
            padding: "3px 0px",
            width: "auto",
            mt: "7px",
            ml: "6px",
            width: { sm: "50%", xxxs: "50%" },
            mb: "7px",
            alignItems: "center",
          }}
        >
          <img
            src={sportImg}
            style={{ width: "16px", height: "16px", marginRight: "5px" }}
          />
          <Typography
            sx={{
              fontSize: { xl: fs.xs, md: fs.xxs, xxxs: fs.xxs },
              fontWeight: 400,
              fontFamily: "poppins",
              color: "white",
            }}
          >
            {e.sport.toUpperCase()} : {e.gameName.toUpperCase()}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "7px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              ml: { lg: "15px", xxxs: "10px" },
              justifyContent: "flex-start",
              width: "40%",
            }}
          >
            {historyTrue && (
              <Box sx={{ display: "flex", alignItems: "center", mb: "5px" }}>
                <Typography
                  sx={{
                    fontSize: { xl: fs.xs, md: fs.xxs, xxxs: fs.xxxs },
                    fontWeight: 400,
                    fontFamily: "poppins",
                    color: "secondary.dark_gray",
                  }}
                >
                  Avg
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xl: fs.xs, md: fs.xxs, xxxs: fs.xxxs },
                    fontWeight: 400,
                    fontFamily: "poppins",
                    color: " #459F48",
                    ml: "6px",
                  }}
                >
                  {avg}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img src="/clock.png" style={{ width: "14px", height: "14px" }} />
              <Typography
                sx={{
                  fontSize: { xl: fs.xs, md: fs.xxs, xxxs: fs.xxxs },
                  fontWeight: 600,
                  fontFamily: "poppins",
                  color: "secondary.dark_gray",
                  ml: "6px",
                }}
              >
                12h:11m
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: "primary.dark_gray",
              bgcolor: `${mode === "dark" ? "#161616" : "#f3f4f8"}`,
              display: "flex",
              alignItems: "center",
              width: "40%",
              p: "10px",
              borderRadius: "5px 0px 0px 5px",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontFamily: "poppins",
                fontSize: { xl: fs.xs, md: fs.xxs, xxxs: fs.xxxs },
                fontWeight: 400,
                color: "secondary.dark_gray",
              }}
            >
              {e.statDisplay}
            </Typography>
            <Typography
              sx={{
                fontFamily: "poppins",
                fontSize: fs.large,
                fontWeight: 600,
                color: "secondary.dark_gray",
                ml: "6px",
              }}
            >
              {e.projection}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "80%",
            display: "flex",
            margin: "0 auto",
            mb: "13px",
          }}
        >
          <Button
            sx={{
              background: `${e.action === "over" ? "#4831D4" : "transparent"}`,
              width: "50%",
              py: "6px",
              color: `${e.action === "over" ? "white" : "secondary.dark_gray"}`,
              fontSize: { xl: fs.xs, md: fs.xxs, xxxs: fs.xxxs },
              fontFamily: "poppins",
              fontWeight: 600,
              border: `${
                mode === "dark" ? "1px solid #525252" : "1px solid #EBEBEB"
              }`,
              borderRadius: "5px 0px 0px 5px",
              "&.MuiButtonBase-root:hover": {
                background: `${
                  e.action === "over" ? "#4831D4" : "transparent"
                }`,
              },
            }}
            onClick={() => handleChangeOverUnder("over")}
          >
            ABOVE
          </Button>
          <Button
            sx={{
              background: `${e.action === "under" ? "#4831D4" : "transparent"}`,
              width: "50%",
              py: "6px",
              color: `${
                e.action === "under" ? "white" : "secondary.dark_gray"
              }`,
              fontSize: { xl: fs.xs, md: fs.xxs, xxxs: fs.xxxs },
              fontFamily: "poppins",
              fontWeight: 600,
              border: `${
                mode === "dark" ? "1px solid #525252" : "1px solid #EBEBEB"
              }`,
              borderRadius: "0px 5px 5px 0px",
              "&.MuiButtonBase-root:hover": {
                background: `${
                  e.action === "under" ? "#4831D4" : "transparent"
                }`,
              },
            }}
            onClick={() => handleChangeOverUnder("under")}
          >
            BELOW
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
