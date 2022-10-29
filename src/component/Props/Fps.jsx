import {
  Box,
  Card,
  getBottomNavigationUtilityClass,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import "./props.css";
import { APIURLs } from "../../api/ApiUrls";
import { makeGETAPICall } from "../../api/methods";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";

export default function Fps({ setOpenFps, mode, currentSportsData }) {
  const [point, setPoint] = useState([
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
  ]);

  const sportDataCommingFromApi = useSelector(
    (state) => state.user.sportDataCommingFromApi
  );
  const [sportName, setSportName] = useState(null);
  const [apiData, setApiData] = useState({
    sport: "BaseBall",
    sportCode: "baseball",
    fps: [
      {
        title: "BATTING",
        events: [
          {
            text: "Single",
            value: "1",
            key: "single",
            profiles: [
              {
                name: "Batter",
                key: "batter",
                points: "+3",
                custom: "false",
                ouPoints: "+3",
              },
            ],
          },
          {
            text: "Double",
            value: "1",
            key: "doubles",
            profiles: [
              {
                name: "Batter",
                key: "batter",
                points: "+5",
                custom: "false",
                ouPoints: "+5",
              },
            ],
          },
          {
            text: "Triple",
            value: "1",
            key: "triples",
            profiles: [
              {
                name: "Batter",
                key: "batter",
                points: "+8",
                custom: "false",
                ouPoints: "+8",
              },
            ],
          },
          {
            text: "Home Run",
            value: "1",
            key: "homeRuns",
            profiles: [
              {
                name: "Batter",
                key: "batter",
                points: "+10",
                custom: "false",
                ouPoints: "+10",
              },
            ],
          },
          {
            text: "Run",
            value: "1",
            key: "battingRuns",
            profiles: [
              {
                name: "Batter",
                key: "batter",
                points: "+2",
                custom: "false",
                ouPoints: "+2",
              },
            ],
          },
          {
            text: "Runs Batted In",
            value: "1",
            key: "rbi",
            profiles: [
              {
                name: "Batter",
                key: "batter",
                points: "+2",
                custom: "false",
                ouPoints: "+2",
              },
            ],
          },
          {
            text: "Base on Balls",
            value: "1",
            key: "baseOnBalls",
            profiles: [
              {
                name: "Batter",
                key: "batter",
                points: "+2",
                custom: "false",
                ouPoints: "+2",
              },
            ],
          },
          {
            text: "Hit by Pitch",
            value: "1",
            key: "hitByPitch",
            profiles: [
              {
                name: "Batter",
                key: "batter",
                points: "+2",
                custom: "false",
                ouPoints: "+2",
              },
            ],
          },
          {
            text: "Stolen Base",
            value: "1",
            key: "stolenBases",
            profiles: [
              {
                name: "Batter",
                key: "batter",
                points: "+5",
                custom: "false",
                ouPoints: "+5",
              },
            ],
          },
          {
            text: "Plate Apprarances",
            value: "1",
            key: "plateAppearances",
            profiles: [
              {
                name: "Batter",
                key: "batter",
                points: "+0",
                custom: "false",
                ouPoints: "+0",
              },
            ],
          },
          {
            text: "Bat.Runs + RBIs",
            value: "1",
            key: "rrbi",
            profiles: [
              {
                name: "Batter",
                key: "batter",
                points: "+0",
                custom: "false",
                ouPoints: "+0",
              },
            ],
          },
          {
            text: "Walk + Hits",
            value: "1",
            key: "whip",
            profiles: [
              {
                name: "Batter",
                key: "batter",
                points: "+0",
                custom: "false",
                ouPoints: "+0",
              },
            ],
          },
          {
            text: "Total Bases",
            value: "1",
            key: "totalBases",
            profiles: [
              {
                name: "Batter",
                key: "batter",
                points: "+0",
                custom: "false",
                ouPoints: "+0",
              },
            ],
          },
        ],
      },
      {
        title: "PITCHING",
        events: [
          {
            text: "Win",
            value: "1",
            key: "wins",
            profiles: [
              {
                name: "Pitcher",
                key: "pitcher",
                points: "+6",
                custom: "false",
                ouPoints: "+6",
              },
            ],
          },
          {
            text: "Quality Start",
            value: "1",
            key: "qualityStart",
            profiles: [
              {
                name: "Pitcher",
                key: "pitcher",
                points: "+4",
                custom: "false",
                ouPoints: "+4",
              },
            ],
          },
          {
            text: "Earned Run",
            value: "1",
            key: "earnedRuns",
            profiles: [
              {
                name: "Pitcher",
                key: "pitcher",
                points: "-3",
                custom: "false",
                ouPoints: "-3",
              },
            ],
          },
          {
            text: "Strike Out (K)",
            value: "1",
            key: "strikeOuts",
            profiles: [
              {
                name: "Pitcher",
                key: "pitcher",
                points: "+3",
                custom: "false",
                ouPoints: "+3",
              },
            ],
          },
          {
            text: "Out",
            value: "1",
            key: "outs",
            profiles: [
              {
                name: "Pitcher",
                key: "pitcher",
                points: "+1",
                custom: "false",
                ouPoints: "+1",
              },
            ],
          },
          {
            text: "Innings Pitched",
            value: "1",
            key: "inningsPitched",
            profiles: [
              {
                name: "Pitcher",
                key: "pitcher",
                points: "+0",
                custom: "false",
                ouPoints: "+0",
              },
            ],
          },
          {
            text: "Num. of Pitches",
            value: "1",
            key: "numberOfPitches",
            profiles: [
              {
                name: "Pitcher",
                key: "pitcher",
                points: "+0",
                custom: "false",
                ouPoints: "+0",
              },
            ],
          },
          {
            text: "Games Started",
            value: "1",
            key: "gamesStarted",
            profiles: [
              {
                name: "Pitcher",
                key: "pitcher",
                points: "+0",
                custom: "false",
                ouPoints: "+0",
              },
            ],
          },
          {
            text: "Hits Allowed",
            value: "1",
            key: "pitchingHits",
            profiles: [
              {
                name: "Pitcher",
                key: "pitcher",
                points: "+0",
                custom: "false",
                ouPoints: "+0",
              },
            ],
          },
          {
            text: "Batters Faced",
            value: "1",
            key: "battersFaced",
            profiles: [
              {
                name: "Pitcher",
                key: "pitcher",
                points: "+0",
                custom: "false",
                ouPoints: "+0",
              },
            ],
          },
          {
            text: "Walks Allowed",
            value: "1",
            key: "pitchingWalks",
            profiles: [
              {
                name: "Pitcher",
                key: "pitcher",
                points: "+0",
                custom: "false",
                ouPoints: "+0",
              },
            ],
          },
          {
            text: "Pitch. Base on Balls",
            value: "1",
            key: "pitchingBaseOnBalls",
            profiles: [
              {
                name: "Pitcher",
                key: "pitcher",
                points: "+0",
                custom: "false",
                ouPoints: "+0",
              },
            ],
          },
          {
            text: "Pitch. Intentional Walks",
            value: "1",
            key: "pitchingIntentionalWalks",
            profiles: [
              {
                name: "Pitcher",
                key: "pitcher",
                points: "+0",
                custom: "false",
                ouPoints: "+0",
              },
            ],
          },
        ],
      },
      {
        title: "OTHER",
        events: [
          {
            text: "Batter Note",
            subText:
              "Batters must be in the starting lineup and record one plate appearance to be eligible. Otherwise they will not be considered. Your entry will be downgraded accordingly",
            key: "note3PM",
            value: "0",
            profiles: [
              {
                name: "Batter",
                key: "batter",
                points: "-",
                custom: "false",
                ouPoints: "0",
              },
            ],
          },
          {
            text: "Batting Stats",
            subText:
              "Batting Scores will only be determined by their batting statistics",
            key: "batStats",
            value: "0",
            profiles: [
              {
                name: "Batter",
                key: "batter",
                points: "-",
                custom: "false",
                ouPoints: "0",
              },
            ],
          },
          {
            text: "Pitcher Note",
            subText: "Pitchers must record one pitch at any point in the game",
            key: "pitchers",
            value: "0",
            profiles: [
              {
                name: "Pitcher",
                key: "pitcher",
                points: "-",
                custom: "false",
                ouPoints: "0",
              },
            ],
          },
          {
            text: "Pitcher Stats",
            subText:
              "Pitcher Scores will only be determined by their pitching statistics",
            key: "pitcherStats",
            value: "0",
            profiles: [
              {
                name: "Pitcher",
                key: "pitcher",
                points: "-",
                custom: "false",
                ouPoints: "0",
              },
            ],
          },
          {
            text: "Single Stat Note",
            subText:
              "Single Stats (Total Bases, Strike Outs, etc.) are actual values of the stat and has nothing to with Fantasy Score. You will see the actual value in the player points breakdown.",
            key: "singleStatNote",
            value: "0",
            points: "0",
            custom: "false",
            ouPoints: "0",
          },
        ],
      },
    ],
  });
  useEffect(() => {
    if (sportDataCommingFromApi && currentSportsData) {
      let currSportDataNameArray = sportDataCommingFromApi.filter((each) => {
        return each.code === currentSportsData.sportCode;
      });
      if (currSportDataNameArray.length > 0) {
        setSportName(currSportDataNameArray[0].sportName);
      }
    }
  }, [sportDataCommingFromApi, currentSportsData]);

  useEffect(() => {
    if (apiData) {
      apiData.fps.map((each) => {
        console.log(each);
      });
    }
  }, [apiData]);
  // useEffect(() => {
  //   if (currentSportsData && currentSportsData.sportCode) {
  //     setApiData(null);
  //     getFpsSport(currentSportsData.sportCode)
  //       .then((res) => {
  //         console.log("t20", res);
  //         setApiData(res);
  //       })
  //       .catch((error) => {
  //         if (error) {
  //           console.log(error);
  //         }
  //       });
  //   }
  // }, [currentSportsData]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background: `${
          mode === "dark" ? "rgba(0,0,0,0.9)" : "rgba(115, 115, 115, 0.7)"
        }`,
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: {
            md: "501px",
            sm: "400px",
            xs: "400px",
            xxs: "320px",
            xxxs: "300px",
          },
          height: "512px",
          bgcolor: "primary.main",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          boxShadow: "1px 1px 100px -60px rgba(255,255,255,0.5)",
          border: "1px solid #2C2C2C",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "90%",
            margin: "0 auto",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "11px",
            mb: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography
              sx={{
                color: "secondary.dark_gray",
                fontSize: { sm: "20px", xxxs: "16px" },
                fontWeight: 700,
                fontFamily: "poppins",
                borderBottom: "3px solid white",
              }}
            >
              {sportName}{" "}
            </Typography>{" "}
            <Typography
              sx={{
                color: "secondary.dark_gray",
                fontSize: { sm: "20px", xxxs: "16px" },
                fontWeight: 700,
                fontFamily: "poppins",
              }}
            >
              - Over/ Under Points{" "}
            </Typography>{" "}
          </Box>
          <ClearIcon
            sx={{
              fontSize: "35px",
              color: "secondary.dark_gray",
              cursor: "pointer",
            }}
            onClick={() => {
              setOpenFps(false);
            }}
          />
        </Box>
        {apiData ? (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItem: "center",
                justifyContent: "flex-start",
                width: "100%",
                margin: "0 auto",
                height: "90%",
                overflow: "scroll",
                maxHeight: "90%",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {apiData.fps.map((each, index) => (
                <>
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      width: "100%",
                      margin: "0 auto",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "#494949",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "14px",
                        fontWeight: 600,
                        fontFamily: "poppins",
                        ml: "25px",
                        py: "10px",
                      }}
                    >
                      {each.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "14px",
                        fontWeight: 600,
                        fontFamily: "poppins",
                        mr: "25px",
                        py: "10px",
                      }}
                    >
                      POINTS
                    </Typography>
                  </Box>
                  {each.events.map((e, index) => (
                    <>
                      {e.value !== "+0" && (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            width: "90%",
                            margin: "0 auto",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderBottom: "1px solid #494949",
                          }}
                        >
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "flex-start",
                              ml: "25px",
                              py: "10px",
                              maxWidth: "80%",
                            }}
                          >
                            <Typography
                              sx={{
                                color: "secondary.dark_gray",
                                fontSize: "14px",
                                fontWeight: 600,
                                fontFamily: "poppins",
                              }}
                            >
                              {e.text}
                            </Typography>
                            <Typography
                              sx={{
                                color: "secondary.dark_gray",
                                fontSize: "14px",
                                fontWeight: 600,
                                fontFamily: "poppins",
                                mt: "5px",
                              }}
                            >
                              {e.subText}
                            </Typography>
                            <Typography
                              sx={{
                                color: "secondary.dark_gray",
                                fontSize: "14px",
                                fontWeight: 600,
                                fontFamily: "poppins",
                                mt: "5px",
                              }}
                            >
                              {e.profiles[0].name}
                            </Typography>
                          </Box>
                          <Typography
                            sx={{
                              color: "#52C03C",
                              fontSize: "14px",
                              fontWeight: 600,
                              fontFamily: "poppins",
                              mr: "25px",
                              py: "10px",
                              color: `${
                                e.profiles[0].ouPoints.charAt() === "-"
                                  ? "red"
                                  : "#52C03C"
                              }`,
                            }}
                          >
                            {e.profiles[0].ouPoints}
                          </Typography>
                        </Box>
                      )}
                    </>
                  ))}
                </>
              ))}
            </Box>
          </>
        ) : (
          <LoadingSpinnerEachSection />
        )}
      </Box>
    </Box>
  );
}

export const getFpsSport = async (sportcode) => {
  var apiUrl = APIURLs.getFpsSport;
  apiUrl = apiUrl.replace("{sportcode}", sportcode);
  const apiResponse = await makeGETAPICall(apiUrl, [{ "fps-game-type": "ou" }]);
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return null;
  }
};
