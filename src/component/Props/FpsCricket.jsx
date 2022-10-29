import { Box, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import "./props.css";
import { Button } from "@mui/material";
import { APIURLs } from "../../api/ApiUrls";
import { makeGETAPICall } from "../../api/methods";
import ClearIcon from "@mui/icons-material/Clear";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";
import { useEffect } from "react";

export default function FpsCricket({ setOpenFps, mode }) {
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
    { name: "Single Batter", point: "+3" },
  ]);
  const [openTag, setOpenTag] = useState("T20/T10");
  const [apiData, setApiData] = useState({
    Batting: [
      {
        Item: "Each run scored",
        Points: "1",
        Notes: "Applicable for all profiles.",
      },
      {
        Item: "Greater than/equal to 30 runs and less than 50 runs",
        Points: "5",
        Notes: "Applicable for all profiles.",
      },
      {
        Item: "Greater than/equal to 50 runs and less than 75 runs",
        Points: "10",
        Notes: "Applicable for all profiles.",
      },
      {
        Item: "Greater than/equal to 75 runs and less than 100 runs",
        Points: "15",
        Notes: "Applicable for all profiles.",
      },
      {
        Item: "Greater than/equal to 100 runs",
        Points: "20",
        Notes: "Applicable for all profiles.",
      },
      {
        Item: "Each four scored",
        Points: "1",
        Notes: "Applicable for all profiles.",
      },
      {
        Item: "Each six scored",
        Points: "2",
        Notes: "Applicable for all profiles.",
      },
      {
        Item: "Duck Out",
        Points: "-2",
        Notes: "Not applicable for bowler.",
      },
    ],
    Bowling: [
      {
        Item: "Each wicket taken",
        Points: "20",
        Notes: "Applicable for all profiles. Does not include runout.",
      },
      {
        Item: "Each maiden over",
        Points: "10",
        Notes: "Applicable for all profiles.",
      },
      {
        Item: "Greater than/equal to 2 wkts and less than 3 wkts",
        Points: "5",
        Notes: "Applicable for all profiles.",
      },
      {
        Item: "Greater than/equal to 3 wkts and less than 4 wkts",
        Points: "10",
        Notes: "Applicable for all profiles.",
      },
      {
        Item: "Greater than/equal to 4 wkts and less than 5 wkts",
        Points: "15",
        Notes: "Applicable for all profiles.",
      },
      {
        Item: "Greater than/equal to 5 wkts",
        Points: "20",
        Notes: "Applicable for all profiles.",
      },
    ],
    Fielding: [
      {
        Item: "Each catch",
        Points: "10",
        Notes:
          "Applicable for all profiles. Substitude fielders dont get points.",
      },
      {
        Item: "Each runout",
        Points: "15",
        Notes:
          "Applicable for all profiles. Only the primary fielder who throws get points. Mankading is treated as runout. Substitude fielders dont get points.",
      },
      {
        Item: "Each stumping",
        Points: "10",
        Notes:
          "Applicable for all profiles. Substitude fielders dont get points.",
      },
    ],
    StrikeRate: [
      {
        Item: "Less than 50",
        Points: "-15",
        Notes:
          "Not applicable for bowler. A minimum of 5 balls should be played.",
      },
      {
        Item: "Greater than/equal to 50 and less than 60",
        Points: "-10",
        Notes:
          "Not applicable for bowler. A minimum of 5 balls should be played.",
      },
      {
        Item: "Greater than/equal to 60 and less than 70",
        Points: "-5",
        Notes:
          "Not applicable for bowler. A minimum of 5 balls should be played.",
      },
      {
        Item: "Greater than 120 and less than/equal to 140",
        Points: "5",
        Notes:
          "Applicable for all profiles. A minimum of 5 balls should be played.",
      },
      {
        Item: "Greater than 140 and less than/equal 160",
        Points: "10",
        Notes:
          "Applicable for all profiles. A minimum of 5 balls should be played.",
      },
      {
        Item: "Greater than 160",
        Points: "15",
        Notes:
          "Applicable for all profiles. A minimum of 5 balls should be played.",
      },
    ],
    EconomyRate: [
      {
        Item: "Greater than 11",
        Points: "-15",
        Notes: "Applicable for all profiles. Should bowl at least one over.",
      },
      {
        Item: "Greater than 10 and less than/equal to 11",
        Points: "-10",
        Notes: "Applicable for all profiles. Should bowl at least one over.",
      },
      {
        Item: "Greater than 9 and less than/equal to 10",
        Points: "-5",
        Notes: "Applicable for all profiles. Should bowl at least one over.",
      },
      {
        Item: "Greater than/equal to 5 and less than 6",
        Points: "5",
        Notes: "Applicable for all profiles. Should bowl at least one over.",
      },
      {
        Item: "Greater than/equal to 4 and less than 5",
        Points: "10",
        Notes: "Applicable for all profiles. Should bowl at least one over.",
      },
      {
        Item: "Less than 4",
        Points: "15",
        Notes: "Applicable for all profiles. Should bowl at least one over.",
      },
    ],
    Other: [
      {
        Item: "Captain",
        Points: "2x",
        Notes:
          "Applicable for all profiles. The player you choose as captain will get 2 times the points earned by them.",
      },
      {
        Item: "Vice Captain",
        Points: "1.5x",
        Notes:
          "Applicable for all profiles. The player you choose as vice captain will get 1.5 times the points earned by them.",
      },
      {
        Item: "MVP",
        code: "MVP",
        Points: "1.25x",
        Notes:
          "Applicable for all profiles. The player you choose as mvp will get 1.25 times the points earned by them.",
      },
      {
        Item: "For being in playing 11",
        Points: "2",
        Notes:
          "This player should be in the playing-11. Applicable for concussion substitutes too.",
      },
    ],
    Notes: [],
    OtherNotes: [
      {
        Item: "Concussion Substitute",
        code: "CSUB",
        Points: "-",
        Notes:
          "Concussion & Covid-19 substitutes will get playing-11 and regular points. However, fielding subs will not receive any points.",
      },
      {
        Item: "Super Over",
        code: "SUPOV",
        Points: "-",
        Notes:
          "Action during super over is not considered and player will not receive points.",
      },
      {
        Item: "Player Transfers",
        code: "PTSFR",
        Points: "-",
        Notes:
          "If a player is transferred during season, (s)he might appear in both the team selections until updated. We try to move the players asap but there might be unknown delays.",
      },
      {
        Item: "Delcared Playing Team",
        code: "DPT",
        Points: "-",
        Notes:
          "We get declared playing-11 from publicly available sources. If a player in starting-11 is changed later, no points will be awarded to the player changed and new incoming player will be considered for all points. Also, we try to update the starting-11 asap but there might be unknown delays.",
      },
      {
        Item: "Single Stat Note",
        code: "SSN",
        Points: "-",
        Notes:
          "Single Stats (Fours, Wickets, Runs, etc.) are actual values of the stat and has nothing to with Fantasy Score. You will see the actual value in the player points breakdown.",
      },
    ],
  });
  const clickTagAndCallApi = (name) => {
    setOpenTag(name);
  };

  // useEffect(() => {
  //   if (openTag && openTag === "T20/T10") {
  //     setApiData(null);
  //     getFpsSport("t20")
  //       .then((res) => {
  //         console.log("t20", res);
  //         setApiData(res);
  //       })
  //       .catch((error) => {
  //         if (error) {
  //           console.log(error);
  //         }
  //       });
  //   } else if (openTag && openTag === "ODI") {
  //     setApiData(null);
  //     getFpsSport("odi")
  //       .then((res) => {
  //         console.log("odi", res);
  //         setApiData(res);
  //       })
  //       .catch((error) => {
  //         if (error) {
  //           console.log(error);
  //         }
  //       });
  //   } else {
  //     setApiData(null);
  //     getFpsSport("test")
  //       .then((res) => {
  //         console.log("test", res);
  //         setApiData(res);
  //       })
  //       .catch((error) => {
  //         if (error) {
  //           console.log(error);
  //         }
  //       });
  //   }
  // }, [openTag]);

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
            mb: "20px",
            mt: "11px",
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
              Cricket
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
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              color: `${openTag === "T20/T10" ? "#4831D4" : "secondary.main"}`,
              borderBottom: `${
                openTag === "T20/T10" ? "3px solid #4831D4" : "none"
              }`,
              width: "33%",
              display: "flex",
              fontSize: { lg: "14px", xs: "12px", xxxs: "10px" },
              fontWeight: 600,
              fontFamily: "poppins",
              py: "10px",
              borderRadius: 0,
            }}
            onClick={() => {
              clickTagAndCallApi("T20/T10");
            }}
          >
            T20/T10
          </Button>
          <Button
            sx={{
              color: `${openTag === "ODI" ? "#4831D4" : "secondary.main"}`,
              borderBottom: `${
                openTag === "ODI" ? "3px solid #4831D4" : "none"
              }`,
              width: "33%",
              display: "flex",
              fontSize: { lg: "14px", xs: "12px", xxxs: "10px" },
              fontWeight: 600,
              fontFamily: "poppins",
              py: "10px",
              borderRadius: 0,
            }}
            onClick={() => {
              clickTagAndCallApi("ODI");
            }}
          >
            ODI
          </Button>
          <Button
            sx={{
              color: `${openTag === "TEST" ? "#4831D4" : "secondary.main"}`,
              borderBottom: `${
                openTag === "TEST" ? "3px solid #4831D4" : "none"
              }`,
              width: "33%",
              display: "flex",
              fontSize: { lg: "14px", xs: "12px", xxxs: "10px" },
              fontWeight: 600,
              fontFamily: "poppins",
              py: "10px",
              borderRadius: 0,
            }}
            onClick={() => {
              clickTagAndCallApi("TEST");
            }}
          >
            TEST
          </Button>
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
              {apiData.Batting.length > 0 && (
                <>
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
                      Batting
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
                  {apiData.Batting.map((e, index) => (
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
                          {e.Item}
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
                          {e.Notes}
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
                            e.Points.charAt() === "-" ? "red" : "#52C03C"
                          }`,
                        }}
                      >
                        {e.Points}
                      </Typography>
                    </Box>
                  ))}
                </>
              )}
              {apiData.Bowling.length > 0 && (
                <>
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
                      Bowling
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
                  {apiData.Bowling.map((e, index) => (
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
                          {e.Item}
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
                          {e.Notes}
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
                            e.Points.charAt() === "-" ? "red" : "#52C03C"
                          }`,
                        }}
                      >
                        {e.Points}
                      </Typography>
                    </Box>
                  ))}
                </>
              )}
              {apiData.Fielding.length > 0 && (
                <>
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
                      Fielding
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
                  {apiData.Fielding.map((e, index) => (
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
                          {e.Item}
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
                          {e.Notes}
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
                            e.Points.charAt() === "-" ? "red" : "#52C03C"
                          }`,
                        }}
                      >
                        {e.Points}
                      </Typography>
                    </Box>
                  ))}
                </>
              )}
              {apiData.StrikeRate.length > 0 && <></>}
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
                  StrikeRate
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
              {apiData.StrikeRate.map((e, index) => (
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
                      {e.Item}
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
                      {e.Notes}
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
                      color: `${e.Points.charAt() === "-" ? "red" : "#52C03C"}`,
                    }}
                  >
                    {e.Points}
                  </Typography>
                </Box>
              ))}
              {apiData.EconomyRate.length > 0 && (
                <>
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
                      EconomyRate
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
                  {apiData.EconomyRate.map((e, index) => (
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
                          {e.Item}
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
                          {e.Notes}
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
                            e.Points.charAt() === "-" ? "red" : "#52C03C"
                          }`,
                        }}
                      >
                        {e.Points}
                      </Typography>
                    </Box>
                  ))}
                </>
              )}
              {apiData.Other.length > 0 && (
                <>
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
                      Other
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
                  {apiData.Other.map((e, index) => (
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
                          {e.Item}
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
                          {e.Notes}
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
                            e.Points.charAt() === "-" ? "red" : "#52C03C"
                          }`,
                        }}
                      >
                        {e.Points}
                      </Typography>
                    </Box>
                  ))}
                </>
              )}
              {apiData.Notes.length > 0 && (
                <>
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
                      Notes
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
                  {apiData.Notes.map((e, index) => (
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
                          {e.Item}
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
                          {e.Notes}
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
                            e.Points.charAt() === "-" ? "red" : "#52C03C"
                          }`,
                        }}
                      >
                        {e.Points}
                      </Typography>
                    </Box>
                  ))}
                </>
              )}
              {apiData.OtherNotes.length > 0 && (
                <>
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
                      OtherNotes
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
                  {apiData.OtherNotes.map((e, index) => (
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
                          {e.Item}
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
                          {e.Notes}
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
                            e.Points.charAt() === "-" ? "red" : "#52C03C"
                          }`,
                        }}
                      >
                        {e.Points}
                      </Typography>
                    </Box>
                  ))}
                </>
              )}
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
