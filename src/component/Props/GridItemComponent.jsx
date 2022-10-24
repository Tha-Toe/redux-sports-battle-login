import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import "./props.css";

const GridItemComponent = ({
  e,
  setSelectCardId,
  selectCardId,
  index,
  addCardIndex,
  selectSports,
  selectColor,
  selectSrc,
  mode,
  scrollDownFunc,
  historyTrue,
}) => {
  useEffect(() => {
    let conditionArray = selectCardId.filter((each) => {
      return each.index === index;
    });
    if (conditionArray.length > 0) {
      setType(conditionArray[0].type);
    }
    if (conditionArray.length === 0) {
      setType(null);
      setAlreadyPicked(false);
    }
  }, [selectCardId]);
  const [alreadyPicked, setAlreadyPicked] = useState(false);
  const [type, setType] = useState(null);
  const addCard = (type) => {
    if (!alreadyPicked) {
      let data = {
        index: index,
        type: type,
        selectSports: selectSports,
        selectColor: selectColor,
        selectSrc: selectSrc,
      };
      addCardIndex(data);
    } else {
      let filterToCheckType = selectCardId.filter((each) => {
        return each.index === index;
      });
      if (filterToCheckType && filterToCheckType[0].type !== type) {
        let selectCardIdClone = selectCardId.map((each) => {
          if (each.index === index) {
            return {
              index: each.index,
              type: type,
              selectSports: each.selectSports,
              selectColor: each.selectColor,
              selectSrc: each.selectSrc,
            };
          } else {
            return each;
          }
        });
        setSelectCardId(selectCardIdClone);
      } else {
        let selectCardIdClone = selectCardId.filter((each) => {
          return each.index !== index;
        });
        setSelectCardId(selectCardIdClone);
      }
    }
    setAlreadyPicked(true);
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
    if (e) {
      let total = 0;
      for (let index = 0; index < e.history.length; index++) {
        total += Number(e.history[index].battingPoints);
      }
      let totalAvg = Math.floor(total / e.history.length);
      setAvg(totalAvg);
    }
  }, [e]);
  return (
    <Grid
      item
      xxxs={12}
      lg={6}
      sx={{ padding: 0, height: { xs: "130px", xxxs: "130px" } }}
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
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            ml: "8px",
            height: "80%",
            width: "45%",
          }}
        >
          <Typography
            sx={{
              color: "secondary.dark_gray",
              fontSize: { lg: "12px", md: "10px", sm: "8px", xxxs: "10px" },
              fontWeight: 600,
              fontFamily: "poppins",
            }}
          >
            {e.playerName}
          </Typography>
          <Typography
            sx={{
              color: "secondary.dark_gray",
              fontSize: "8px",
              fontSize: {
                md: "10px",
                sm: "8px",
                xxxs: "10px",
              },
              fontWeight: 400,
              fontFamily: "poppins",
            }}
          >
            {e.myTeamLongName}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                color: "secondary.dark_gray",
                fontSize: {
                  md: "10px",
                  sm: "8px",
                  xxxs: "10px",
                },
                fontWeight: 400,
                fontFamily: "poppins",
              }}
            >
              "vs {e.otherTeamLongName}"
            </Typography>
            <Typography
              sx={{
                color: "secondary.dark_gray",
                fontSize: {
                  md: "10px",
                  sm: "8px",
                  xxxs: "10px",
                },
                fontWeight: 400,
                fontFamily: "poppins",
                ml: "2px",
              }}
            >
              09:08
            </Typography>
          </Box>
          {historyTrue && e.history && (
            <>
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={{
                    color: "secondary.dark_gray",
                    fontSize: {
                      md: "10px",
                      sm: "8px",
                      xxxs: "10px",
                    },
                    fontWeight: 400,
                    fontFamily: "poppins",
                    mr: "5px",
                  }}
                >
                  Last {e.history.length}
                </Typography>
                <Typography
                  sx={{
                    color: "#3A6DBE",
                    fontSize: {
                      md: "10px",
                      sm: "8px",
                      xxxs: "10px",
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
                    e.history.map((each) => (
                      <Typography
                        sx={{
                          color: "#3A6DBE",
                          fontSize: {
                            md: "10px",
                            sm: "8px",
                            xxxs: "10px",
                          },
                          fontWeight: 400,
                          fontFamily: "poppins",
                        }}
                      >
                        {each.battingPoints},
                      </Typography>
                    ))}
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: "secondary.dark_gray",
                  fontSize: {
                    md: "10px",
                    sm: "8px",
                    xxxs: "10px",
                  },
                  fontWeight: 400,
                  fontFamily: "poppins",
                }}
              >
                Avg :: {avg}
              </Typography>
            </>
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
                lg: "10px",
                md: "12px",
                sm: "8px",
                xxxs: "10px",
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
              fontSize: "22px",
              fontWeight: 600,
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
            width: "25%",
          }}
        >
          <Button
            sx={{
              width: { sm: "48px", xxxs: "24px" },
              py: "4px",
              color: "secondary.dark_gray",
              fontSize: { sm: "9px", xs: "7px", xxxs: "9px" },
              fontWeight: 400,
              fontFamily: "poppins",
              border: `${type === "over" ? "none" : "1px solid white"}`,
              borderColor: `${mode === "dark" ? "white" : "#494949"}`,
              borderRadius: "3px",
              mb: "8px",
              background: `${type === "over" ? "#4831D4" : "transparent"}`,
              "&.MuiButtonBase-root:hover": {
                background: `${type === "over" ? "#4831D4" : "transparent"}`,
              },
            }}
            onClick={() => {
              setType("over");
              addCard("over");
              if (innerWidth < 700) {
                scrollDownFunc();
              }
            }}
          >
            ABOVE
          </Button>
          <Button
            sx={{
              width: { sm: "48px", xxxs: "24px" },
              color: "secondary.dark_gray",
              py: "4px",
              fontSize: { sm: "9px", xs: "7px", xxxs: "9px" },
              fontWeight: 400,
              fontFamily: "poppins",
              border: `${type === "under" ? "none" : "1px solid white"}`,
              borderColor: `${mode === "dark" ? "white" : "#494949"}`,
              borderRadius: "3px",
              background: `${type === "under" ? "#4831D4" : "transparent"}`,
              "&.MuiButtonBase-root:hover": {
                background: `${type === "under" ? "#4831D4" : "transparent"}`,
              },
            }}
            onClick={() => {
              setType("under");
              addCard("under");
              if (innerWidth < 700) {
                scrollDownFunc();
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
