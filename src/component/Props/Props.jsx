import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Input,
  modalClasses,
  Typography,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import "./props.css";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { AndresCard } from "./AndresCard";
import Times from "./TImes";
import Amount from "./Amount";
import ChooseType from "./ChooseType";
import Balance from "./Balance";
import SubmitProjection from "./SubmitProjection";
import GridItemComponent from "./GridItemComponent";
import HowTo from "./HowTo";
import Rule from "./Rule";
import BaseBallPoint from "./BaseBallPoint";
import SuccessSubmit from "./SuccessSubmit";
import ErrorSubmit from "./ErrorSubmit";
import NotEnoughBalance from "./NotEnoughBalance";

const useHorizontalScroll = () => {
  const elRef = useRef();
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "smooth",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
};
export default function Props({
  mode,
  selectSports,
  setSelectSports,
  selectColor,
  setSelectColor,
  selectSrc,
  setSelectSrc,
}) {
  const [openHowTo, setOpenHowTo] = useState(false);
  const [openRule, setOpenRule] = useState(false);
  const [openBaseBallPoint, setOpenBaseBallPoint] = useState(false);

  const howToOpen = () => {
    setOpenHowTo(true);
  };
  const rulesOpen = () => {
    setOpenRule(true);
  };

  const baseBallPointOpen = () => {
    setOpenBaseBallPoint(true);
  };
  const [propsNav, setPropsNav] = useState([
    {
      name: "MLB",
      src: "/mlb.png",
      light_src: "/mlb_light.png",
      color: "blue",
    },
    {
      name: "PGA",
      src: "/pga.png",
      light_src: "/pga_light.png",
      color: "blue",
    },
    {
      name: "GOLF",
      src: "/golf.png",
      light_src: "/golf_light.png",
      color: "#E431F4",
    },
    {
      name: "NFL",
      src: "/nfl.png",
      light_src: "/nfl_light.png",
      color: "#F5A922",
    },
    {
      name: "WNBA",
      src: "/wnba.png",
      light_src: "/wnba_light.png",
      color: "#F5A922",
    },
    {
      name: "Cricket",
      src: "/cricket.png",
      light_src: "/cricket_light.png",
      color: "#D04643",
    },
    {
      name: "CSGO",
      src: "/csgo.png",
      light_src: "/csgo_light.png",
      color: "#00ffff",
    },
    {
      name: "MMA",
      src: "/mma.png",
      light_src: "/mma_light.png",
      color: "orange",
    },
    { name: "F1", src: "/f1.png", light_src: "/f1_light.png", color: "red" },
    {
      name: "CFL",
      src: "/cfl.png",
      light_src: "/cfl_light.svg",
      color: "#F5A922",
    },
    {
      name: "DOTA2",
      src: "/dota2.png",
      light_src: "/dota2_light.png",
      color: "#00ffff",
    },
    {
      name: "VAL",
      src: "/val.png",
      light_src: "/val_light.png",
      color: "blue",
    },
    {
      name: "Soccer",
      src: "/soccer.png",
      light_src: "/soccer_light.png",
      color: "#52C03C",
    },
    {
      name: "NBA",
      src: "/nba.png",
      light_src: "/nba_light.png",
      color: "#F5A922",
    },
    {
      name: "CoD",
      src: "/val.png",
      light_src: "/val_light.png",
      color: "blue",
    },
    {
      name: "Nascor",
      src: "/f1.png",
      light_src: "/f1_light.png",
      color: "red",
    },
    {
      name: "WTA",
      src: "/wta-light.png",
      light_src: "/wta.png",
      color: "#F5A922",
    },
    {
      name: "Can-FL",
      src: "/cfl.png",
      light_src: "/cfl_light.svg",
      color: "#F5A922",
    },
    {
      name: "HR-Dby",
      src: "/mlb.png",
      light_src: "/mlb_light.png",
      color: "blue",
    },
    {
      name: "NHL",
      src: "/nhl.png",
      light_src: "/nhl-light.png",
      color: "#F5A922",
    },
    {
      name: "CBB",
      src: "/wnba.png",
      light_src: "/wnba_light.png",
      color: "#F5A922",
    },
    {
      name: "LoL",
      src: "/val.png",
      light_src: "/val_light.png",
      color: "blue",
    },
    {
      name: "ATP",
      src: "/wta-light.png",
      light_src: "/wta.png",
      color: "#F5A922",
    },
    {
      name: "CFB",
      src: "/cfl.png",
      light_src: "/cfl_light.svg",
      color: "#F5A922",
    },
  ]);

  const [propsGuide, setPropsGuide] = useState([
    {
      name: "How to",
      src: "/howto.png",
      darkSrc: "/howto-dark.png",
      func: howToOpen,
    },
    {
      name: "Rules",
      src: "/rules.png",
      darkSrc: "/rules-dark.png",
      func: rulesOpen,
    },
    {
      name: "FPS",
      src: "/fps.png",
      darkSrc: "/fps-dark.png",
      func: baseBallPointOpen,
    },
    { name: "Refresh", src: "/refresh.png", darkSrc: "/refresh-dark.png" },
  ]);

  const [stats, setStats] = useState([
    {
      name: "Bat.Runs + RBIs",
      bg: "#4831D4",
      color: "white",
      light_color: "#4831D4",
      light_bg: "#DAD5F6",
    },
    {
      name: "Fantasy Score (77)",
      bg: " #459F48",
      color: "black",
      light_color: "white",
      light_bg: " #459F48",
    },
    {
      name: "Hits Allowed",
      bg: "#4831D4",
      color: "white",
      light_color: "#4831D4",
      light_bg: "#DAD5F6",
    },
    {
      name: "Num. of Pitches",
      bg: "#4831D4",
      color: "white",
      light_color: "#4831D4",
      light_bg: "#DAD5F6",
    },
    {
      name: "Pitch Outs",
      bg: "#4831D4",
      color: "white",
      light_color: "#4831D4",
      light_bg: "#DAD5F6",
    },
    {
      name: "Strike Outs",
      bg: "#4831D4",
      color: "white",
      light_color: "#4831D4",
      light_bg: "#DAD5F6",
    },
    {
      name: "Bat.Runs + RBIs",
      bg: "#4831D4",
      color: "white",
      light_color: "#4831D4",
      light_bg: "#DAD5F6",
    },
    {
      name: "Hits Allowed",
      bg: "#4831D4",
      color: "white",
      light_color: "#4831D4",
      light_bg: "#DAD5F6",
    },
    {
      name: "Num. of Pitches",
      bg: "#4831D4",
      color: "white",
      light_color: "#4831D4",
      light_bg: "#DAD5F6",
    },
  ]);
  const [matches, setMatches] = useState([
    { name: "PHI vs WSH", time: "13h 48m" },
    { name: "PHI vs WSH", time: "13h 48m" },
    { name: "PHI vs WSH", time: "13h 48m" },
    { name: "PHI vs WSH", time: "13h 48m" },
    { name: "PHI vs WSH", time: "13h 48m" },
    { name: "PHI vs WSH", time: "13h 48m" },
    { name: "PHI vs WSH", time: "13h 48m" },
    { name: "PHI vs WSH", time: "13h 48m" },
    { name: "PHI vs WSH", time: "13h 48m" },
    { name: "PHI vs WSH", time: "13h 48m" },
    { name: "PHI vs WSH", time: "13h 48m" },
    { name: "PHI vs WSH", time: "13h 48m" },
    { name: "PHI vs WSH", time: "13h 48m" },
    { name: "PHI vs WSH", time: "13h 48m" },
    { name: "PHI vs WSH", time: "13h 48m" },
    { name: "PHI vs WSH", time: "13h 48m" },
  ]);
  const [width, setWidth] = useState();
  const [matchesWidth, setMatchesWidth] = useState();
  const [propsWidth, setPropsWidth] = useState();
  const parentRef = useRef();
  // const statsRef = useRef();
  const matchesRef = useRef();
  // const propsContainerRef = useRef();
  const propsChildRef = useRef();
  const [statsLeftValue, setStatsLeftValue] = useState(0);
  useEffect(() => {
    // const total =
    //   parentRef.current.scrollWidth - parentRef.current.offsetWidth + 50;
    // const matchesTotal =
    //   matchesRef.current.scrollWidth - matchesRef.current.offsetWidth + 50;
    //  const propsTotal =
    //    propsContainerRef.current.scrollWidth -
    //   propsContainerRef.current.offsetWidth +
    //    50;
    // setWidth(total);
    // setMatchesWidth(matchesTotal);
    //  setPropsWidth(propsTotal);
  }, []);
  const goForwardStats = () => {
    statsRef.current.scrollLeft = statsRef.current.scrollLeft + 100;
  };
  const goForwardMatches = () => {
    matchsRef.current.scrollLeft = matchsRef.current.scrollLeft + 100;
  };

  //card
  const [cardInfo, setCardInfo] = useState([
    {
      name: "Frank Schwindel",
      cubs: "Chicago Cubs - Batter",
      vs: "vs Miami Marlins",
      time: "09:08",
      last: "0,0,1,0,0",
      avg: "0.20",
      bat: "0.5",
    },
    {
      name: "Frank Schwindel",
      cubs: "Chicago Cubs - Batter",
      vs: "vs Miami Marlins",
      time: "09:08",
      last: "0,0,1,0,0",
      avg: "0.20",
      bat: "0.5",
    },
    {
      name: "Frank Schwindel",
      cubs: "Chicago Cubs - Batter",
      vs: "vs Miami Marlins",
      time: "09:08",
      last: "0,0,1,0,0",
      avg: "0.20",
      bat: "0.5",
    },
    {
      name: "Frank Schwindel",
      cubs: "Chicago Cubs - Batter",
      vs: "vs Miami Marlins",
      time: "09:08",
      last: "0,0,1,0,0",
      avg: "0.20",
      bat: "0.5",
    },
    {
      name: "Frank Schwindel",
      cubs: "Chicago Cubs - Batter",
      vs: "vs Miami Marlins",
      time: "09:08",
      last: "0,0,1,0,0",
      avg: "0.20",
      bat: "0.5",
    },
    {
      name: "Frank Schwindel",
      cubs: "Chicago Cubs - Batter",
      vs: "vs Miami Marlins",
      time: "09:08",
      last: "0,0,1,0,0",
      avg: "0.20",
      bat: "0.5",
    },
    {
      name: "Frank Schwindel",
      cubs: "Chicago Cubs - Batter",
      vs: "vs Miami Marlins",
      time: "09:08",
      last: "0,0,1,0,0",
      avg: "0.20",
      bat: "0.5",
    },
    {
      name: "Frank Schwindel",
      cubs: "Chicago Cubs - Batter",
      vs: "vs Miami Marlins",
      time: "09:08",
      last: "0,0,1,0,0",
      avg: "0.20",
      bat: "0.5",
    },
    {
      name: "Frank Schwindel",
      cubs: "Chicago Cubs - Batter",
      vs: "vs Miami Marlins",
      time: "09:08",
      last: "0,0,1,0,0",
      avg: "0.20",
      bat: "0.5",
    },
    {
      name: "Frank Schwindel",
      cubs: "Chicago Cubs - Batter",
      vs: "vs Miami Marlins",
      time: "09:08",
      last: "0,0,1,0,0",
      avg: "0.20",
      bat: "0.5",
    },
    {
      name: "Frank Schwindel",
      cubs: "Chicago Cubs - Batter",
      vs: "vs Miami Marlins",
      time: "09:08",
      last: "0,0,1,0,0",
      avg: "0.20",
      bat: "0.5",
    },
    {
      name: "Frank Schwindel",
      cubs: "Chicago Cubs - Batter",
      vs: "vs Miami Marlins",
      time: "09:08",
      last: "0,0,1,0,0",
      avg: "0.20",
      bat: "0.5",
    },
  ]);

  const [selectCardId, setSelectCardId] = useState([]);
  const addCardIndex = (index) => {
    setSelectCardId((prev) => [...prev, index]);
  };
  const removeCardIndex = (index) => {
    let filterArray = selectCardId.filter((e) => {
      return e !== index;
    });
    setSelectCardId(filterArray);
  };

  const [successSubmit, setSuccessSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [notEnoughBalance, setNotEnoughBalance] = useState(false);
  const messagesEndRef = useRef(null);
  const scrollDownFunc = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const sportsRef = useHorizontalScroll();
  const statsRef = useHorizontalScroll();
  const matchsRef = useHorizontalScroll();

  return (
    <main className="props-container">
      <Box
        sx={{
          width: { xl: "1300px", lg: "85%", sm: "80%", xxxs: "90%" },
          height: "100vh",
          margin: "auto",
        }}
        component="div"
      >
        <div
          className={`${"propsContainer"} ${
            mode === "dark" ? "" : "props-light"
          }`}
          ref={sportsRef}
        >
          <div className="statsChild" ref={propsChildRef}>
            {propsNav.map((e, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: { xxxs: "5px" },
                }}
              >
                <Box
                  sx={{
                    height: { xs: "34px", xxxs: "30px" },
                    width: { xs: "34px", xxxs: "30px" },
                    border: `${
                      mode === "dark" ? "2px solid white" : "1px solid #494949"
                    }`,
                    borderRadius: "50%",
                    mt: "13px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: `${
                      e.name === selectSports ? e.color : "transparent"
                    }`,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectSports(e.name);
                    setSelectColor(e.color);
                    setSelectSrc(e.src);
                  }}
                >
                  {mode === "dark" ? (
                    <img className="propsNavImg" src={e.src} />
                  ) : (
                    <>
                      {e.name === selectSports ? (
                        <img className="propsNavImg" src={e.src} />
                      ) : (
                        <img className="propsNavImg" src={e.light_src} />
                      )}
                    </>
                  )}
                </Box>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 400,
                    fontFamily: "poppins",
                    mt: "5px",
                    color: `${
                      e.name === selectSports ? e.color : "secondary.main"
                    }`,
                    width: "50px",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  {e.name}
                </Typography>
              </Box>
            ))}
          </div>
        </div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "rows",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            mt: "16px",
            borderBottom: "2px solid #494949",
            pb: "10px",
            mb: "12px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "rows",
              alignItems: "center",
              justifyContent: { xl: "flex-start", xxxs: "flex-start" },
              width: { xs: "50%", xxxs: "55%" },
            }}
          >
            {propsGuide.map((e, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: { sm: "row", xxxs: "column" },
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexWrap: "wrap",
                  mr: { md: "20px", xxxs: "10px" },
                }}
                onClick={e.func}
              >
                {mode === "dark" ? (
                  <img
                    src={e.src}
                    style={{
                      marginRight: "3px",
                      height: "20px",
                    }}
                  />
                ) : (
                  <img
                    src={e.darkSrc}
                    style={{
                      marginRight: "3px",
                      height: "20px",
                    }}
                  />
                )}

                <Typography
                  sx={{
                    fontSize: { md: "14px", sm: "10px", xxxs: "8px" },
                    fontFamily: "poppins",
                    fontWeight: 500,
                    color: "secondary.main",
                    ml: { sm: "5px", xxxs: "0px" },
                  }}
                >
                  {e.name}
                </Typography>
              </Box>
            ))}
          </Box>
          <Input
            startAdornment={
              <InputAdornment position="end">
                <SearchIcon
                  sx={{
                    color: "secondary.gray",
                    fontSize: "25px",
                    mr: "7px",
                  }}
                />
              </InputAdornment>
            }
            placeholder="Search"
            disableUnderline
            sx={{
              bgcolor: `${mode === "dark" ? "#242423" : "white"}`,
              border: `${mode === "dark" ? "1px solid #2c2c2c" : "none"}`,
              width: {
                md: "324px",
                sm: "250px",
                xs: "200px",
                xxs: "180px",
                xxxs: "120px",
              },
              color: "secondary.main",
              fontSize: "12px",
              fontWeight: 400,
              fontFamily: "poppins",
              height: "32px",
              borderRadius: "4px",
              pt: "3px",
            }}
          />
        </Box>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "30px",
            position: "relative",
            mb: "16px",
          }}
        >
          <Typography
            sx={{
              fontSize: { sm: "16px", xxxs: "12px" },
              fontWeight: "400",
              fontFamily: "poppins",
              width: { md: "10%", xs: "14%", xxxs: "22%" },
              color: "secondary.main",
            }}
          >
            9 Stats
          </Typography>
          <div className="statsContainer" ref={statsRef}>
            <div className="statsChild">
              {stats.map((e, index) => (
                <button
                  key={index}
                  style={{
                    color: `${mode === "dark" ? e.color : e.light_color}`,
                    background: `${mode === "dark" ? e.bg : e.light_bg}`,
                  }}
                  className="statsButton"
                >
                  {e.name}
                </button>
              ))}
            </div>
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "30px",
              position: "absolute",
              right: 0,
            }}
          >
            <Box
              component="div"
              sx={{
                height: "100%",
                width: "80px",
                background:
                  "linear-gradient(to right, transparent, rgba(0,0,0,0.6))",
                position: "absolute",
                right: 0,
              }}
            ></Box>
            <Box
              sx={{
                bgcolor: "secondary.dark_gray",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "30px",
                width: "30px",
                borderRadius: "50%",
                position: "absolute",
                right: 0,
              }}
              onClick={goForwardStats}
            >
              <ArrowForwardIosIcon
                sx={{
                  fontSize: "18px",
                  color: "primary.main",
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "48px",
            position: "relative",
            mb: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: { sm: "16px", xxxs: "12px" },
              fontWeight: "400",
              fontFamily: "poppins",
              width: { md: "13%", xs: "17%", xxxs: "25%" },
              color: "secondary.main",
            }}
          >
            5 Matches
          </Typography>
          <div className="matchesContainer" ref={matchsRef}>
            <div className="matchesChild">
              {matches.map((e, index) => (
                <div
                  key={index}
                  className="matchesButton"
                  style={{
                    background: `${mode === "dark" ? "#4831D4" : "#DAD5F6"}`,
                  }}
                >
                  <div
                    className="matchesName"
                    style={{
                      color: `${mode === "dark" ? "white" : "#4831D4"}`,
                    }}
                  >
                    {e.name}
                  </div>
                  <div
                    className="matchesTime"
                    style={{
                      color: `${mode === "dark" ? "white" : "#4831D4"}`,
                    }}
                  >
                    {e.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "48px",
              position: "absolute",
              right: 0,
            }}
          >
            <Box
              component="div"
              sx={{
                height: "100%",
                width: "100px",
                background:
                  "linear-gradient(to right, transparent, rgba(0,0,0,0.6))",
                position: "absolute",
                right: 0,
              }}
            ></Box>
            <Box
              sx={{
                bgcolor: "secondary.dark_gray",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "30px",
                width: "30px",
                borderRadius: "50%",
                position: "absolute",
                right: 0,
              }}
              onClick={goForwardMatches}
            >
              <ArrowForwardIosIcon
                sx={{
                  fontSize: "18px",
                  color: "primary.main",
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          id="grid-container"
          component="div"
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { sm: "row", xxxs: "column" },
            justifyContent: "center",
            alignItems: { xs: "flex-start", xxxs: "center" },
          }}
        >
          <Box
            sx={{
              width: { lg: "75%", md: "60%", sm: "50%", xxxs: "100%" },
              height: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid
              container
              sx={{
                width: "100%",
              }}
              spacing={"6px"}
            >
              {cardInfo.map((e, index) => (
                <GridItemComponent
                  e={e}
                  key={index}
                  index={index}
                  selectCardId={selectCardId}
                  setSelectCardId={setSelectCardId}
                  addCardIndex={addCardIndex}
                  mode={mode}
                  selectSports={selectSports}
                  setSelectSports={setSelectSports}
                  selectColor={selectColor}
                  selectSrc={selectSrc}
                  scrollDownFunc={scrollDownFunc}
                />
              ))}
            </Grid>
          </Box>
          <SubmitProjection
            selectCardId={selectCardId}
            mode={mode}
            setSelectCardId={setSelectCardId}
            removeCardIndex={removeCardIndex}
            setSuccessSubmit={setSuccessSubmit}
            setErrorSubmit={setErrorSubmit}
          />
          <div ref={messagesEndRef} />
        </Box>
      </Box>
      {openHowTo && <HowTo setOpenHowTo={setOpenHowTo} mode={mode} />}
      {openRule && <Rule setOpenRule={setOpenRule} mode={mode} />}
      {openBaseBallPoint && (
        <BaseBallPoint
          setOpenBaseBallPoint={setOpenBaseBallPoint}
          mode={mode}
        />
      )}
      {successSubmit && (
        <SuccessSubmit
          setSuccessSubmit={setSuccessSubmit}
          setErrorSubmit={setErrorSubmit}
          mode={mode}
        />
      )}
      {errorSubmit && (
        <ErrorSubmit
          setErrorSubmit={setErrorSubmit}
          setNotEnoughBalance={setNotEnoughBalance}
          mode={mode}
        />
      )}
      {notEnoughBalance && (
        <NotEnoughBalance
          setNotEnoughBalance={setNotEnoughBalance}
          mode={mode}
        />
      )}
    </main>
  );
}
