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

export function EntireTitleContainer({ each, index }) {
  const [ouPoints, setOuPoints] = useState(null);
  useEffect(() => {
    if (each && each.events) {
      let array = each.events;
      array.map((e) => {
        if (e.ouPoints && e.ouPoints !== "+0") {
          setOuPoints(e.ouPoints);
        } else if (e.profiles) {
          let filterArr = e.profiles.filter((eachObj) => {
            return eachObj.ouPoints && eachObj.ouPoints !== "+0";
          });
          if (filterArr.length > 0) {
            setOuPoints(filterArr[0].ouPoints);
          } else {
            return;
          }
        } else {
          return;
        }
      });
    }
  }, [each, index, ouPoints]);
  if (ouPoints) {
    return (
      <Box key={index}>
        <Box
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
        {each.events.map((e, indexEvent) => (
          <EventTag index={index} e={e} each={each} indexEvent={indexEvent} />
        ))}
      </Box>
    );
  } else {
    return <></>;
  }
}

export function EventTag({ each, e, index, indexEvent }) {
  const [ouPoints, setOuPoints] = useState(null);
  useEffect(() => {
    if ((each && indexEvent && e, index)) {
      if (e.ouPoints && e.ouPoints !== "+0") {
        setOuPoints(e.ouPoints);
      } else if (e.profiles) {
        let filterArr = e.profiles.filter((eachObj) => {
          return eachObj.ouPoints && eachObj.ouPoints !== "+0";
        });
        if (filterArr.length > 0) {
          setOuPoints(filterArr[0].ouPoints);
        } else {
          setOuPoints(null);
        }
      } else {
        setOuPoints(null);
      }
    }
  }, [each, e, indexEvent, index]);
  if (ouPoints) {
    return (
      <Box
        key={indexEvent}
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
          {e.profiles ? (
            <>
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  mt: "5px",
                }}
              >
                {e.profiles.map((profile) => (
                  <Typography
                    sx={{
                      color: "secondary.dark_gray",
                      fontSize: "14px",
                      fontWeight: 600,
                      fontFamily: "poppins",
                    }}
                  >
                    {profile.name}
                    {e.profiles.length > 1 && ", "}
                  </Typography>
                ))}
              </Box>
            </>
          ) : (
            <Typography
              sx={{
                color: "secondary.dark_gray",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "poppins",
                mt: "5px",
              }}
            >
              All Profiles
            </Typography>
          )}
        </Box>
        <Typography
          sx={{
            color: "#52C03C",
            fontSize: "14px",
            fontWeight: 600,
            fontFamily: "poppins",
            mr: "25px",
            py: "10px",
            color: `${ouPoints.charAt() === "-" ? "red" : "#52C03C"}`,
          }}
        >
          {ouPoints}
        </Typography>
      </Box>
    );
  } else {
    return <></>;
  }
}

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
    sport: "Soccer",
    sportCode: "soccer",
    fps: [
      {
        title: "PLAYING TIME",
        events: [
          {
            text: "Played :value minutes or more",
            subText: "Calculated at end of the game",
            endOfGame: true,
            key: "playingTime",
            value: "55",
            points: "+2",
            custom: "true",
            ouPoints: "+0",
          },
          {
            text: "Played less than :value minutes",
            subText: "Calculated at end of the game",
            endOfGame: true,
            key: "playingTime",
            value: "55",
            points: "+1",
            custom: "true",
            ouPoints: "+0",
          },
        ],
      },
      {
        title: "ATTACK",
        events: [
          {
            text: "For every :value goal scored",
            key: "goals",
            value: "1",
            profiles: [
              {
                name: "Keeper",
                key: "keeper",
                points: "+10",
                custom: "false",
                ouPoints: "+4",
              },
              {
                name: "Defender",
                key: "defender",
                points: "+10",
                custom: "false",
                ouPoints: "+4",
              },
              {
                name: "Midfielder",
                key: "midFielder",
                points: "+9",
                custom: "false",
                ouPoints: "+4",
              },
              {
                name: "Forward",
                key: "forward",
                points: "+8",
                custom: "false",
                ouPoints: "+4",
              },
            ],
          },
          {
            text: "For every :value assist",
            value: "1",
            key: "assists",
            points: "+5",
            custom: "false",
            ouPoints: "+3",
          },
          {
            text: "For every :value accurate pass",
            value: "1",
            key: "passes",
            points: "+1",
            custom: "false",
            ouPoints: "+0.1",
          },
          {
            text: "For every :value pass attempted",
            value: "1",
            key: "passesAttempted",
            points: "+0",
            custom: "false",
            ouPoints: "+0",
          },
          {
            text: "For every :value pass attempted",
            value: "1",
            key: "crossesAttempted",
            points: "+0",
            custom: "false",
            ouPoints: "+0",
          },
          {
            text: "For every :value pass attempted",
            value: "1",
            key: "fouls",
            points: "+0",
            custom: "false",
            ouPoints: "+0",
          },
          {
            text: "For every :value pass attempted",
            value: "1",
            key: "corners",
            points: "+0",
            custom: "false",
            ouPoints: "+0",
          },
          {
            text: "For every :value shots on target",
            value: "1",
            key: "shotsOnTarget",
            points: "+0.5",
            custom: "false",
            ouPoints: "+1",
          },
          {
            text: "For every :value shots",
            value: "1",
            key: "shots",
            points: "+0.5",
            custom: "false",
            ouPoints: "+1",
          },
          {
            text: "For every :value goal + assist",
            value: "1",
            key: "goalAssists",
            points: "+0",
            custom: "false",
            ouPoints: "+0",
          },
        ],
      },
      {
        title: "DEFENSE",
        events: [
          {
            text: "Clean Sheet",
            subText: "Calculated at end of the game",
            endOfGame: true,
            key: "cleanSheet",
            profiles: [
              {
                name: "Midfielder",
                key: "midFielder",
                points: "+1",
                custom: "true",
              },
              {
                name: "Defender",
                key: "defender",
                points: "+5",
                custom: "true",
              },
              {
                name: "Keeper",
                key: "keeper",
                points: "+5",
                custom: "true",
                ouPoints: "+5",
              },
            ],
          },
          {
            text: "For every :value shots saved",
            value: "1",
            key: "shotsSaved",
            profiles: [
              {
                name: "Keeper",
                key: "keeper",
                points: "+2",
                custom: "false",
                ouPoints: "+2",
              },
            ],
          },
          {
            text: "For every :value penalty saved",
            value: "1",
            key: "penaltySaved",
            profiles: [
              {
                name: "Keeper",
                key: "keeper",
                points: "+9",
                custom: "false",
              },
            ],
          },
          {
            text: "For every :value tackles made",
            value: "3",
            key: "tackles",
            points: "+1",
            custom: "false",
            ouPoints: "+0",
          },
          {
            text: "For every :value tackles won",
            value: "1",
            key: "tacklesWon",
            points: "+0",
            custom: "false",
            ouPoints: "+0",
          },
        ],
      },
      {
        title: "PENALTIES",
        events: [
          {
            text: "For every :value yellow card",
            value: "1",
            key: "yellowCards",
            points: "-1",
            custom: "false",
            ouPoints: "-1.5",
          },
          {
            text: "Red Card",
            key: "redCards",
            value: "1",
            points: "-3",
            custom: "false",
            ouPoints: "-3",
          },
          {
            text: "For every :value own goal",
            value: "1",
            key: "ownGoals",
            points: "-2",
            custom: "false",
            ouPoints: "-2",
          },
          {
            text: "For every :value penalty missed",
            value: "1",
            key: "penaltyMissed",
            points: "-2",
            custom: "false",
          },
          {
            text: "For every :value goals conceded",
            value: "1",
            key: "goalsConceded",
            endOfGame: false,
            profiles: [
              {
                name: "Keeper",
                key: "keeper",
                points: "-1",
                custom: "false",
                ouPoints: "-3",
              },
              {
                name: "Defender",
                key: "defender",
                points: "-2",
                custom: "false",
                ouPoints: "-3",
              },
            ],
          },
        ],
      },
      {
        title: "OTHER",
        events: [
          {
            text: "Single Stat Note",
            subText:
              "Single Stats are actual values of the stat and has nothing to with Fantasy Score. You will see the actual value in the player points breakdown.",
            key: "singleStatNote",
            value: "0",
            points: "0",
            custom: "false",
            ouPoints: "0",
          },
          {
            text: "Captain",
            subText: "Gets 2x the points earned by the captain you choose",
            key: "captain",
            value: "1",
            points: "2",
            custom: "false",
          },
          {
            text: "Vice Captain",
            subText:
              "Gets 1.5x the points earned by the vice-captain you choose",
            key: "captain",
            value: "1",
            points: "1.5",
            custom: "false",
          },
          {
            text: "MVP",
            subText: "Gets 1.25x the points earned by the mvp you choose",
            key: "mvp",
            value: "1",
            points: "1.25",
            custom: "false",
          },
          {
            text: "Playing Bonus",
            subText: "Player should play the game",
            key: "playingBonus",
            value: "1",
            points: "+2",
            custom: "false",
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
            md: "601px",
            sm: "450px",
            xs: "400px",
            xxs: "320px",
            xxxs: "300px",
          },
          height: "85%",
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
              - Above/ Below Points{" "}
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
                <EntireTitleContainer each={each} index={index} />
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
