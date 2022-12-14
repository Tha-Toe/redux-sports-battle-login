import { Box, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import "./knowMore.css";
import OverUnderPointSystem from "./OverUnderPointSystem";
import FAQ from "./FAQ";
import OperatingState from "./OperatingState";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";
import { useSelector } from "react-redux";
const useHorizontalScroll = ({ selectSports, overUnderNav, openTag }) => {
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
  }, [selectSports, overUnderNav, openTag]);
  return elRef;
};
export default function KnowMore({ mode }) {
  const fs = useSelector((state) => state.user.fs);
  const [general, setGeneral] = useState([
    {
      name: "Above-Below Points System",
      src: "/howto.png",
      darkSrc: "/howto-dark.png",
    },
    {
      name: "Frequently Asked Questions",
      src: "/fps.png",
      darkSrc: "/rules-dark.png",
    },
    {
      name: "Operating States",
      src: "/fps.png",
      darkSrc: "/fps-dark.png",
    },
  ]);
  const [legal, setLegal] = useState([
    {
      name: "Terms of Service",
      src: "/howto.png",
      darkSrc: "/howto-dark.png",
      link: "https://sportsbattleapp.com/termsofuse.html",
    },
    {
      name: "Privacy Policy",
      src: "/rules.png",
      darkSrc: "/rules-dark.png",
      link: "https://sportsbattleapp.com/PrivacyPolicy.html",
    },
    {
      name: "Responsible Play",
      src: "/fps.png",
      darkSrc: "/fps-dark.png",
      link: "https://sportsbattleapp.com/responsibleplay.html",
    },
  ]);

  const [openTag, setOpenTag] = useState("Above-Below Points System");

  const overUnderNav = useSelector(
    (state) => state.user.sportDataCommingFromApi
  );

  const [selectSports, setSelectSports] = useState(null);

  const [propsWidth, setPropsWidth] = useState();
  const propsChildRef = useRef();

  const sportsRef = useHorizontalScroll({
    selectSports,
    overUnderNav,
    openTag,
  });

  const knowMoreDataCommingFromApi = true;
  const [apiData, setApiData] = useState(null);
  useEffect(() => {
    if (overUnderNav && !selectSports) {
      let firstSport = overUnderNav[0];
      setSelectSports(firstSport.code);
    }
  }, [overUnderNav, selectSports]);
  if (selectSports) {
    return (
      <Box sx={{ minHeight: "100vh", width: "100%" }}>
        {openTag === "Above-Below Points System" && (
          <Box
            component="div"
            sx={{
              width: {
                xl: "1000px",
                lg: "836px",
                md: "700px",
                sm: "550px",
                xs: "90%",
                xxxs: "95%",
              },
              width: { xl: "1300px", lg: "80%", sm: "87%", xxxs: "95%" },
              margin: "0 auto",
              overflow: "hidden",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {" "}
            <div className="propsContainer" ref={sportsRef}>
              <div
                className="statsChild"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {overUnderNav.map((e, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: { xxxs: "5px" },
                    }}
                    onClick={() => {
                      setApiData(null);
                      setSelectSports(e.code);
                    }}
                  >
                    <Box
                      sx={{
                        height: { xs: "34px", xxxs: "30px" },
                        width: { xs: "34px", xxxs: "30px" },
                        border: `${
                          e.code === selectSports
                            ? `1px solid ${e.color}`
                            : "1px solid white"
                        }`,
                        borderRadius: "50%",
                        mt: "13px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: `${
                          e.code === selectSports ? e.color : "transparent"
                        }`,
                        cursor: "pointer",
                      }}
                    >
                      <img
                        className="propsNavImg"
                        style={{
                          color: e.color,
                        }}
                        src={e.activeImage}
                      />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: fs.xs,
                        fontWeight: 400,
                        fontFamily: "poppins",
                        mt: "5px",
                        color: `${
                          e.code === selectSports ? e.color : "secondary.main"
                        }`,
                        color: `${
                          e.code === selectSports ? `${e.color}` : "white"
                        }`,
                        width: "50px",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      {e.sportName}
                    </Typography>
                  </Box>
                ))}
              </div>
            </div>
          </Box>
        )}
        <Box
          sx={{
            width: {
              xl: "1000px",
              lg: "836px",
              md: "700px",
              sm: "550px",
              xs: "90%",
              xxxs: "95%",
            },
            width: { xl: "1300px", lg: "80%", sm: "87%", xxxs: "95%" },

            height: "100vh",
            margin: "auto",
            mt: "30px",
            display: "flex",
            flexDirection: "row",
          }}
          component="div"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "35%", xxxs: "25%" },
            }}
          >
            <Typography
              sx={{
                fontSize: { lg: fs.normal, xs: fs.small, xxxs: fs.xs },
                fontWeight: 700,
                fontFamily: "poppins",
                width: "100%",
                color: "secondary.dark_gray",
                mb: "12px",
                ml: { xs: 0, xxxs: "5px" },
              }}
            >
              GENERAL
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "2px",
                background: "#D9D9D9",
                mb: "12px",
              }}
            ></Box>
            {general.map((e, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "100%",
                  mb: "20px",
                  cursor: "pointer",
                  borderBottom: { xs: "none", xxxs: "1px solid #494949" },
                }}
                onClick={() => {
                  setOpenTag(e.name);
                }}
              >
                {mode === "dark" ? (
                  <img src={e.src} className="know-icon" />
                ) : (
                  <img src={e.darkSrc} className="know-icon" />
                )}
                <Box sx={{ width: "100%", ml: { sm: "8px", xxxs: "2px" } }}>
                  <Typography
                    sx={{
                      fontSize: { lg: fs.small, xs: fs.xs, xxxs: fs.xxs },
                      fontWeight: 700,
                      color: `${
                        openTag === e.name ? "#4831D4" : "secondary.dark_gray"
                      }`,
                      fontFamily: "poppins",
                    }}
                  >
                    {e.name}
                  </Typography>
                  {e.extra && (
                    <Typography
                      sx={{
                        fontSize: { lg: fs.xs, xs: fs.xxs, xxxs: fs.xxxs },
                        fontWeight: 400,
                        color: "secondary.dark_gray",
                        fontFamily: "poppins",
                      }}
                    >
                      {e.extra}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
            <Typography
              sx={{
                fontSize: { lg: fs.normal, xs: fs.small, xxxs: fs.xs },
                fontWeight: 700,
                fontFamily: "poppins",
                width: "100%",
                color: "secondary.dark_gray",
                mb: "12px",
                mt: "24px",
                ml: { xs: 0, xxxs: "5px" },
              }}
            >
              LEGAL
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "2px",
                background: "#D9D9D9",
                mb: "12px",
              }}
            ></Box>
            {legal.map((e, index) => (
              <a
                href={e.link}
                style={{ width: "100%" }}
                target="_blank"
                key={index}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                    mb: "20px",
                    borderBottom: { xs: "none", xxxs: "1px solid #494949" },
                  }}
                >
                  {mode === "dark" ? (
                    <img src={e.src} className="know-icon" />
                  ) : (
                    <img src={e.darkSrc} className="know-icon" />
                  )}
                  <Box sx={{ width: "100%", ml: { sm: "8px", xxxs: "2px" } }}>
                    <Typography
                      sx={{
                        fontSize: { lg: fs.small, xs: fs.xs, xxxs: fs.xxs },
                        fontWeight: 700,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                      }}
                    >
                      {e.name}
                    </Typography>
                    {e.extra && (
                      <Typography
                        sx={{
                          fontSize: { lg: fs.xs, xs: fs.xxs, xxxs: fs.xxxs },
                          fontWeight: 400,
                          fontFamily: "poppins",
                          color: "secondary.dark_gray",
                        }}
                      >
                        {e.extra}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </a>
            ))}
          </Box>
          <Box sx={{ width: { xs: "65%", xxxs: "75%" } }}>
            {openTag === "Above-Below Points System" && (
              <OverUnderPointSystem
                selectSports={selectSports}
                mode={mode}
                setApiData={setApiData}
                apiData={apiData}
              />
            )}
            {openTag === "Frequently Asked Questions" && (
              <FAQ openTag={openTag} />
            )}
            {openTag === "Operating States" && (
              <OperatingState openTag={openTag} />
            )}
          </Box>
        </Box>
      </Box>
    );
  } else {
    return <LoadingSpinnerEachSection />;
  }
}
