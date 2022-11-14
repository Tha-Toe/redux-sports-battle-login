import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./knowMore.css";
import { useSelector } from "react-redux";
import { APIURLs } from "../../api/ApiUrls";
import { makeGETAPICall } from "../../api/methods";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";

export function EntireTitleContainer({ each, index }) {
  const fs = useSelector((state) => state.user.fs);

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
  }, [each, ouPoints]);

  const [lastElement, setLastElement] = useState(null);
  if (ouPoints) {
    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            margin: "0 auto",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            background: "#494949",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              margin: "0 auto",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: fs.small,
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
                fontSize: fs.small,
                fontWeight: 600,
                fontFamily: "poppins",
                mr: "25px",
                py: "10px",
              }}
            >
              POINTS
            </Typography>
          </Box>
        </Box>
        {each.events.map((e, indexEvent) => (
          <EventTag
            key={indexEvent}
            index={index}
            e={e}
            each={each}
            indexEvent={indexEvent}
            setLastElement={setLastElement}
            lastElement={lastElement}
          />
        ))}
      </Box>
    );
  } else {
    return <></>;
  }
}

export function EventTag({
  each,
  e,
  index,
  indexEvent,
  lastElement,
  setLastElement,
}) {
  const [ouPoints, setOuPoints] = useState(null);
  useEffect(() => {
    if (each && e) {
      if (e.ouPoints && e.ouPoints !== "+0") {
        setOuPoints(e.ouPoints);
        setLastElement(e);
      } else if (e.profiles) {
        let filterArr = e.profiles.filter((eachObj) => {
          return eachObj.ouPoints && eachObj.ouPoints !== "+0";
        });
        if (filterArr.length > 0) {
          setOuPoints(filterArr[0].ouPoints);
          setLastElement(e);
        } else {
          setOuPoints(null);
        }
      } else {
        setOuPoints(null);
      }
    }
  }, [each, e]);
  const fs = useSelector((state) => state.user.fs);

  if (ouPoints) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          margin: "0 auto",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `${lastElement !== e && "1px solid #494949"}`,
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
              fontSize: fs.small,
              fontWeight: 600,
              fontFamily: "poppins",
            }}
          >
            {e.text.includes(":value")
              ? e.text.replace(":value", `${e.value}`)
              : e.text}
          </Typography>
          <Typography
            sx={{
              color: "secondary.dark_gray",
              fontSize: fs.small,
              fontWeight: 600,
              fontFamily: "poppins",
              mt: "5px",
            }}
          >
            {e.subText}
          </Typography>
          {e.profiles ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  mt: "5px",
                }}
              >
                {e.profiles.map((profile, i) => (
                  <Typography
                    key={i}
                    sx={{
                      color: "secondary.dark_gray",
                      fontSize: fs.small,
                      fontWeight: 600,
                      fontFamily: "poppins",
                      mr: "5px",
                    }}
                  >
                    {profile.name}
                    {e.profiles.length > 1 &&
                      e.profiles.length - 1 !== i &&
                      ",  "}
                  </Typography>
                ))}
              </Box>
            </>
          ) : (
            <Typography
              sx={{
                color: "secondary.dark_gray",
                fontSize: fs.small,
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
            fontSize: fs.small,
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
  }
}

export default function OverUnderPointSystem({
  selectSports,
  mode,
  apiData,
  setApiData,
}) {
  const fs = useSelector((state) => state.user.fs);
  const [header, setHeader] = useState([
    { name: "T20/T10" },
    { name: "ODI" },
    { name: "TEST" },
  ]);
  const [openTag, setOpenTag] = useState("T20/T10");

  const [T20T10, setT20T10] = useState([
    {
      name: "Each run scored ",
      applicable: "Applicable for all profiles.",
      points: "+3",
    },
    {
      name: "Greater than/equal to 30 runs and less than 50 runs ",
      applicable: "Applicable for all profiles.",
      points: "+3",
    },
    {
      name: "Greater than/equal to 30 runs and less than 50 runs ",
      applicable: "Applicable for all profiles.",
      points: "+3",
    },
    {
      name: "Greater than/equal to 30 runs and less than 50 runs ",
      applicable: "Applicable for all profiles.",
      points: "+3",
    },
    {
      name: "Greater than/equal to 30 runs and less than 50 runs ",
      applicable: "Applicable for all profiles.",
      points: "+3",
    },
    {
      name: "Greater than/equal to 30 runs and less than 50 runs ",
      applicable: "Applicable for all profiles.",
      points: "+3",
    },
    {
      name: "Greater than/equal to 30 runs and less than 50 runs ",
      applicable: "Applicable for all profiles.",
      points: "+3",
    },
    {
      name: "Greater than/equal to 30 runs and less than 50 runs ",
      applicable: "Applicable for all profiles.",
      points: "+3",
    },
    {
      name: "Greater than/equal to 30 runs and less than 50 runs ",
      applicable: "Applicable for all profiles.",
      points: "+3",
    },
    {
      name: "Greater than/equal to 30 runs and less than 50 runs ",
      applicable: "Applicable for all profiles.",
      points: "+3",
    },
  ]);
  const [Penalties, setPenalties] = useState([
    {
      name: "For every turnover",
      applicable: "Applicable for all profiles.",
      points: "-1",
    },
  ]);
  const [Other, setOther] = useState([
    {
      name: "Note: A three point field goal is awared as 1 FGM and 1 3PM ",
      applicable: "Applicable for all profiles.",
      points: "-1",
    },
  ]);
  const [Points, setPoints] = useState([
    {
      name: "For every 1 point",
      applicable: "Applicable for all profiles.",
      points: "+3",
    },
    {
      name: "For every 1 rebound",
      applicable: "Applicable for all profiles.",
      points: "+3",
    },
    {
      name: "For every 1 assist ",
      applicable: "Applicable for all profiles.",
      points: "+3",
    },
    {
      name: "For every 1 steal",
      applicable: "Applicable for all profiles.",
      points: "+3",
    },
    {
      name: "For every 1 block",
      applicable: "Applicable for all profiles.",
      points: "+3",
    },
  ]);

  useEffect(() => {
    if (selectSports === "cricket") {
      if (openTag && openTag === "T20/T10") {
        setApiData(null);
        getFpsSport("t20")
          .then((res) => {
            setApiData(res);
          })
          .catch((error) => {
            if (error) {
              console.log(error);
            }
          });
      } else if (openTag && openTag === "ODI") {
        setApiData(null);
        getFpsSport("odi")
          .then((res) => {
            setApiData(res);
          })
          .catch((error) => {
            if (error) {
              console.log(error);
            }
          });
      } else {
        setApiData(null);
        getFpsSport("test")
          .then((res) => {
            setApiData(res);
          })
          .catch((error) => {
            if (error) {
              console.log(error);
            }
          });
      }
    } else if (selectSports && selectSports !== "cricket") {
      setApiData(null);
      getFpsSport(selectSports)
        .then((res) => {
          setApiData(res);
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    }
  }, [openTag, selectSports]);

  if (selectSports === "cricket") {
    return (
      <Box
        sx={{
          width: "100%",
          height: "90vh",
          maxHeight: "90vh",
          border: "1px solid #494949",
          borderRadius: "4px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {header.map((e, index) => (
            <Button
              key={index}
              sx={{
                color: `${openTag === e.name ? "#4831D4" : "secondary.main"}`,
                borderBottom: `${
                  openTag === e.name ? "3px solid #4831D4" : "none"
                }`,
                width: "33%",
                display: "flex",
                fontSize: { lg: fs.small, xs: fs.xs, xxxs: fs.xxs },
                fontWeight: 600,
                fontFamily: "poppins",
                py: "10px",
                borderRadius: 0,
              }}
              onClick={() => setOpenTag(e.name)}
            >
              {e.name}
            </Button>
          ))}
        </Box>
        {apiData ? (
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
            {apiData.Batting && apiData.Batting.length > 0 && (
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
                      fontSize: fs.small,
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
                      fontSize: fs.small,
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
                  <Box sx={{ width: "100%" }} key={index}>
                    {e.Points !== "+0" && (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          width: "95%",
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
                              fontSize: fs.small,
                              fontWeight: 600,
                              fontFamily: "poppins",
                            }}
                          >
                            {e.Item}
                          </Typography>
                          <Typography
                            sx={{
                              color: "secondary.dark_gray",
                              fontSize: fs.small,
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
                            fontSize: fs.small,
                            fontWeight: 600,
                            fontFamily: "poppins",
                            mr: "25px",
                            py: "10px",
                            color: `${
                              e.Points.charAt() === "-" ? "red" : "#52C03C"
                            }`,
                          }}
                        >
                          {e.Points.charAt() !== "-" && "+"} {e.Points}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ))}
              </>
            )}
            {apiData.Bowling && apiData.Bowling.length > 0 && (
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
                      fontSize: fs.small,
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
                      fontSize: fs.small,
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
                  <Box sx={{ width: "100%" }} key={index}>
                    {e.Points !== "+0" && (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          width: "95%",
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
                              fontSize: fs.small,
                              fontWeight: 600,
                              fontFamily: "poppins",
                            }}
                          >
                            {e.Item}
                          </Typography>
                          <Typography
                            sx={{
                              color: "secondary.dark_gray",
                              fontSize: fs.small,
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
                            fontSize: fs.small,
                            fontWeight: 600,
                            fontFamily: "poppins",
                            mr: "25px",
                            py: "10px",
                            color: `${
                              e.Points.charAt() === "-" ? "red" : "#52C03C"
                            }`,
                          }}
                        >
                          {e.Points.charAt() !== "-" && "+"} {e.Points}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ))}
              </>
            )}
            {apiData.Fielding && apiData.Fielding.length > 0 && (
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
                      fontSize: fs.small,
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
                      fontSize: fs.small,
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
                      width: "100%",
                      margin: "0 auto",
                    }}
                  >
                    {e.Points !== "+0" && (
                      <Box
                        sx={{
                          display: "flex",
                          width: "95%",
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
                              fontSize: fs.small,
                              fontWeight: 600,
                              fontFamily: "poppins",
                            }}
                          >
                            {e.Item}
                          </Typography>
                          <Typography
                            sx={{
                              color: "secondary.dark_gray",
                              fontSize: fs.small,
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
                            fontSize: fs.small,
                            fontWeight: 600,
                            fontFamily: "poppins",
                            mr: "25px",
                            py: "10px",
                            color: `${
                              e.Points.charAt() === "-" ? "red" : "#52C03C"
                            }`,
                          }}
                        >
                          {e.Points.charAt() !== "-" && "+"} {e.Points}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ))}
              </>
            )}
            {apiData.StrikeRate && apiData.StrikeRate.length > 0 && (
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
                      fontSize: fs.small,
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
                      fontSize: fs.small,
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
                      width: "100%",
                      margin: "0 auto",
                    }}
                  >
                    {" "}
                    {e.Points !== "+0" && (
                      <Box
                        sx={{
                          display: "flex",
                          width: "95%",
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
                              fontSize: fs.small,
                              fontWeight: 600,
                              fontFamily: "poppins",
                            }}
                          >
                            {e.Item}
                          </Typography>
                          <Typography
                            sx={{
                              color: "secondary.dark_gray",
                              fontSize: fs.small,
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
                            fontSize: fs.small,
                            fontWeight: 600,
                            fontFamily: "poppins",
                            mr: "25px",
                            py: "10px",
                            color: `${
                              e.Points.charAt() === "-" ? "red" : "#52C03C"
                            }`,
                          }}
                        >
                          {e.Points.charAt() !== "-" && "+"} {e.Points}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ))}
              </>
            )}
            {apiData.EconomyRate && apiData.EconomyRate.length > 0 && (
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
                      fontSize: fs.small,
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
                      fontSize: fs.small,
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
                      width: "100%",
                      margin: "0 auto",
                    }}
                  >
                    {" "}
                    {e.Points !== "+0" && (
                      <Box
                        sx={{
                          display: "flex",
                          width: "95%",
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
                              fontSize: fs.small,
                              fontWeight: 600,
                              fontFamily: "poppins",
                            }}
                          >
                            {e.Item}
                          </Typography>
                          <Typography
                            sx={{
                              color: "secondary.dark_gray",
                              fontSize: fs.small,
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
                            fontSize: fs.small,
                            fontWeight: 600,
                            fontFamily: "poppins",
                            mr: "25px",
                            py: "10px",
                            color: `${
                              e.Points.charAt() === "-" ? "red" : "#52C03C"
                            }`,
                          }}
                        >
                          {e.Points.charAt() !== "-" && "+"} {e.Points}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ))}
              </>
            )}
            {apiData.Other && apiData.Other.length > 0 && (
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
                      fontSize: fs.small,
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
                      fontSize: fs.small,
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
                      width: "100%",
                      margin: "0 auto",
                    }}
                  >
                    {" "}
                    {e.Points !== "+0" && (
                      <Box
                        sx={{
                          display: "flex",
                          width: "95%",
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
                              fontSize: fs.small,
                              fontWeight: 600,
                              fontFamily: "poppins",
                            }}
                          >
                            {e.Item}
                          </Typography>
                          <Typography
                            sx={{
                              color: "secondary.dark_gray",
                              fontSize: fs.small,
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
                            fontSize: fs.small,
                            fontWeight: 600,
                            fontFamily: "poppins",
                            mr: "25px",
                            py: "10px",
                            color: `${
                              e.Points.charAt() === "-" ? "red" : "#52C03C"
                            }`,
                          }}
                        >
                          {e.Points.charAt() !== "-" && "+"} {e.Points}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ))}
              </>
            )}
            {apiData.Notes && apiData.Notes.length > 0 && (
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
                      fontSize: fs.small,
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
                      fontSize: fs.small,
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
                      width: "95%",
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
                          fontSize: fs.small,
                          fontWeight: 600,
                          fontFamily: "poppins",
                        }}
                      >
                        {e.Item}
                      </Typography>
                      <Typography
                        sx={{
                          color: "secondary.dark_gray",
                          fontSize: fs.small,
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
                        fontSize: fs.small,
                        fontWeight: 600,
                        fontFamily: "poppins",
                        mr: "25px",
                        py: "10px",
                        color: `${
                          e.Points.charAt() === "-" ? "red" : "#52C03C"
                        }`,
                      }}
                    >
                      {e.Points.charAt() !== "-" && "+"} {e.Points}
                    </Typography>
                  </Box>
                ))}
              </>
            )}
            {apiData.OtherNotes && apiData.OtherNotes.length > 0 && (
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
                      fontSize: fs.small,
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
                      fontSize: fs.small,
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
                      width: "100%",
                      margin: "0 auto",
                    }}
                  >
                    {" "}
                    {e.Points !== "+0" && (
                      <Box
                        sx={{
                          display: "flex",
                          width: "95%",
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
                              fontSize: fs.small,
                              fontWeight: 600,
                              fontFamily: "poppins",
                            }}
                          >
                            {e.Item}
                          </Typography>
                          <Typography
                            sx={{
                              color: "secondary.dark_gray",
                              fontSize: fs.small,
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
                            fontSize: fs.small,
                            fontWeight: 600,
                            fontFamily: "poppins",
                            mr: "25px",
                            py: "10px",
                            color: `${
                              e.Points.charAt() === "-" ? "red" : "#52C03C"
                            }`,
                          }}
                        >
                          {e.Points.charAt() !== "-" && "+"} {e.Points}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ))}
              </>
            )}
          </Box>
        ) : (
          <LoadingSpinnerEachSection />
        )}
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          width: "100%",
          border: "1px solid #494949",
          borderRadius: "4px",
          height: "90vh",
          maxHeight: "90vh",
          borderRadius: "4px",
        }}
      >
        {apiData && apiData.fps ? (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItem: "center",
                justifyContent: "flex-start",
                width: "100%",
                margin: "0 auto",
                height: "97%",
                overflow: "scroll",
                maxHeight: "97%",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {apiData.fps.map((each, index) => (
                <EntireTitleContainer each={each} index={index} key={index} />
              ))}
            </Box>
          </>
        ) : (
          <LoadingSpinnerEachSection />
        )}
      </Box>
    );
  }
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
