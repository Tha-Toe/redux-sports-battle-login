import { Box, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import "./props.css";
import { Button } from "@mui/material";
import { APIURLs } from "../../api/ApiUrls";
import { makeGETAPICall } from "../../api/methods";
import ClearIcon from "@mui/icons-material/Clear";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export default function FpsCricket({ setOpenFps, mode }) {
  const fs = useSelector((state) => state.user.fs);

  const [openTag, setOpenTag] = useState("T20/T10");
  const [t20ApiData, setT20ApiData] = useState(null);
  const [odiApiData, setOdiApiData] = useState(null);
  const [testApiData, setTestApiData] = useState(null);
  const [apiData, setApiData] = useState(null);

  const clickTagAndCallApi = (name) => {
    setOpenTag(name);
  };

  useEffect(() => {
    if (openTag && openTag === "T20/T10") {
      setApiData(null);
      getFpsSport("t20")
        .then((res) => {
          console.log("t20", res);
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
          console.log("odi", res);
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
          console.log("test", res);
          setApiData(res);
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    }
  }, [openTag]);

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
            mb: "10px",
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
                fontSize: { sm: fs.x_large, xxxs: fs.normal },
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
                fontSize: { sm: fs.x_large, xxxs: fs.normal },
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
              fontSize: { lg: fs.small, xs: fs.xs, xxxs: fs.xxs },
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
              fontSize: { lg: fs.small, xs: fs.xs, xxxs: fs.xxs },
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
              fontSize: { lg: fs.small, xs: fs.xs, xxxs: fs.xxs },
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
                    <Box sx={{ width: "100%" }}>
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
                    <Box sx={{ width: "100%" }}>
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
                    <>
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
                    </>
                  ))}
                </>
              )}
              {apiData.StrikeRate.length > 0 && (
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
                    <>
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
                    </>
                  ))}
                </>
              )}
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
                    <>
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
                    </>
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
                    <>
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
                    </>
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
                    <>
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
                    </>
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
