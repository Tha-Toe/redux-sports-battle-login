import { Box, Grid, Typography, Input, Button } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import "./props.css";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import SubmitProjection from "./SubmitProjection";
import GridItemComponent from "./GridItemComponent";
import HowTo from "./HowTo";
import Rule from "./Rule";
import Fps from "./Fps";
import SuccessSubmit from "./SuccessSubmit";
import ErrorSubmit from "./ErrorSubmit";
import NotEnoughBalance from "./NotEnoughBalance";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";
import { useSelector, useDispatch } from "react-redux";
import Games from "./Games";
import {
  addPropsDataCommingFromApi,
  setPropsApiCallComplete,
  setCallClickSportApiFinish,
  setNoProjection,
  addCurrentSportDataRedux,
} from "../../feature/userSlice";
import NoProjection from "../loadingSpinner/NoProjection";
import ErrorIcon from "@mui/icons-material/Error";
import FpsCricket from "./FpsCricket";
const useHorizontalScrollPropsNav = () => {
  const propsScrollRef = useRef();

  useEffect(() => {
    const el = propsScrollRef.current;
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
  return propsScrollRef;
};
const useHorizontalScrollStats = (
  propsDataCommingFromApi,
  setStatsArriveEnd,
  callClickSportApiFinish
) => {
  const statsScrollRef = useRef();

  useEffect(() => {
    const statsRefl = statsScrollRef.current;
    if (statsRefl) {
      const onWheel = (e) => {
        let checkStats = false;
        if (statsRefl.scrollLeft !== 0) {
          checkStats = true;
        } else {
          checkStats = false;
        }
        setStatsArriveEnd(checkStats);
        if (e.deltaY == 0) return;
        e.preventDefault();
        statsRefl.scrollLeft = statsRefl.scrollLeft + e.deltaY;
      };
      statsRefl.addEventListener("wheel", onWheel);
      return () => statsRefl.removeEventListener("wheel", onWheel);
    }
  }, [propsDataCommingFromApi, callClickSportApiFinish]);
  return statsScrollRef;
};
const useHorizontalScrollMatches = ({
  propsDataCommingFromApi,
  setGameArriveEnd,
  callClickSportApiFinish,
}) => {
  const matchesScrollRef = useRef();

  useEffect(() => {
    const matchesRefl = matchesScrollRef.current;
    if (matchesRefl) {
      const onWheel = (e) => {
        let check = false;
        if (matchesRefl.scrollLeft !== 0) {
          check = true;
        } else {
          check = false;
        }
        setGameArriveEnd(check);
        if (e.deltaY == 0) return;
        e.preventDefault();
        matchesRefl.scrollLeft = matchesRefl.scrollLeft + e.deltaY;
      };
      matchesRefl.addEventListener("wheel", onWheel);
      return () => matchesRefl.removeEventListener("wheel", onWheel);
    }
  }, [propsDataCommingFromApi, callClickSportApiFinish]);
  return matchesScrollRef;
};
export default function Props({
  mode,
  selectSports,
  setSelectSports,
  selectColor,
  setSelectColor,
  selectSrc,
  setSelectSrc,
  getPropsSport,
  updateGetUserById,
}) {
  const fs = useSelector((state) => state.user.fs);
  const [selectAmount, setSelectAmount] = useState(null);
  const [pickPlayType, setPickPlayType] = useState(false);
  const callClickSportApiFinish = useSelector(
    (state) => state.user.callClickSportApiFinish
  );
  const dispatch = useDispatch();
  const sportDataCommingFromApi = useSelector(
    (state) => state.user.sportDataCommingFromApi
  );
  const propsDataCommingFromApi = useSelector(
    (state) => state.user.propsDataCommingFromApi
  );
  const propsApiCallComplete = useSelector(
    (state) => state.user.propsApiCallComplete
  );
  let currentSportDataRedux = useSelector(
    (state) => state.user.currentSportDataRedux
  );

  const [openHowTo, setOpenHowTo] = useState(false);
  const [openRule, setOpenRule] = useState(false);
  const [openFps, setOpenFps] = useState(false);

  const howToOpen = () => {
    setOpenHowTo(true);
  };
  const rulesOpen = () => {
    setOpenRule(true);
  };

  const baseBallPointOpen = () => {
    setOpenFps(true);
  };
  const propsNav = useSelector((state) => state.user.sportDataCommingFromApi);

  const [howToPlayData, setHowToPlayData] = useState([]);
  const [howToPlayTitles, setHowToPlayTitle] = useState([]);
  const [rulesData, setRulesData] = useState([]);
  const [historyTrue, setHistoryTrue] = useState(false);
  const [statsAndData, setStatsAndData] = useState(null);
  const [selectStatTitle, setSelectStatTitle] = useState(null);
  const [selectMatches, setSelectMatches] = useState(null);
  const [currentSportsData, setCurrentSportsData] = useState(null);
  const [activeSports, setActiveSports] = useState([]);
  const [noDataSports, setNoDataSports] = useState([]);
  const [notes, setNotes] = useState(null);

  //sports changes
  useEffect(() => {
    if (selectSports) {
      let selectedSportPropsData = propsDataCommingFromApi.filter((each) => {
        return each.sportCode === selectSports;
      });
      let statsArray = [];
      let howToPlayArray = [];
      let rulesArray = [];
      let gamesArray = [];
      if (selectedSportPropsData.length > 0) {
        setCurrentSportsData(selectedSportPropsData[0]);
        dispatch(addCurrentSportDataRedux(selectedSportPropsData[0]));
        //console.log(selectedSportPropsData);
        //get notes
        if (selectedSportPropsData[0].metadata.notes) {
          let noteFromApi = selectedSportPropsData[0].metadata.notes;
          if (noteFromApi[`${selectSports}`]) {
            setNotes(noteFromApi[`${selectSports}`]);
          } else {
            setNotes(null);
          }
        }

        //get projection stats data
        let statsData = selectedSportPropsData[0].projections[0];

        if (!selectMatches && statsData && !selectStatTitle) {
          setStatsAndData(statsData);
          setSelectStatTitle(statsData.title);
        }

        //get statOUKeys
        let statOUKeys = selectedSportPropsData[0].statOUKeys;
        statOUKeys.map((each) => {
          statsArray.push(each);
        });
        setStats([...statsArray]);

        //get howToPlayData
        let howToPlayTitleFromRedux =
          selectedSportPropsData[0].metadata.howToPlay.title;
        setHowToPlayTitle(howToPlayTitleFromRedux);
        let howToPlayDataFromRedux =
          selectedSportPropsData[0].metadata.howToPlay.data;
        howToPlayDataFromRedux.map((each) => {
          howToPlayArray.push(each);
        });
        setHowToPlayData([...howToPlayArray]);

        //get rulesData

        let rulesDataFromRedux =
          selectedSportPropsData[0].metadata.considerations[`${selectSports}`];
        if (rulesDataFromRedux) {
          rulesDataFromRedux.map((each) => {
            rulesArray.push(each);
          });
          setRulesData([...rulesArray]);
        }

        //get gamesData matches data
        let games = selectedSportPropsData[0].games;
        games.map((each) => {
          gamesArray.push(each);
        });
        setMatches([...gamesArray]);

        //get history
        let history =
          selectedSportPropsData[0].metadata.history[`${selectSports}`];
        if (history) {
          setHistoryTrue(history);
        } else {
          setHistoryTrue(false);
        }

        //get active sports
        let obj = [];
        let activeData = propsDataCommingFromApi.filter((each) => {
          return each.projections.length > 0;
        });
        if (activeData.length > 0) {
          activeData.map((each) => {
            obj.push(each.sportCode);
          });
          setActiveSports(obj);
        }

        //get nodata sports
        let noDataObj = [];
        let noData = propsDataCommingFromApi.filter((each) => {
          return each.projections.length < 1;
        });
        if (noData.length > 0) {
          noData.map((each) => {
            noDataObj.push(each.sportCode);
          });
          setNoDataSports(noDataObj);
        }
        dispatch(setCallClickSportApiFinish(true));
      } else {
        dispatch(setCallClickSportApiFinish(false));
        setStats([]);
        setMatches([]);
        setSelectStatTitle(null);
        setSelectMatches(null);
        setStatsAndData(null);
      }
    }
  }, [
    selectSports,
    propsDataCommingFromApi,
    selectMatches,
    selectStatTitle,
    sportDataCommingFromApi,
  ]);

  const noProjection = useSelector((state) => state.user.noProjection);

  const refresh = async () => {
    dispatch(setNoProjection(null));
    dispatch(setCallClickSportApiFinish(false));
    setSelectMatches(null);
    setNotes(null);
    let statsArray = [];
    let result = await getPropsSport(selectSports);
    console.log(result);
    if (result.projections.length < 1) {
      dispatch(setNoProjection(result.sportCode));
    }
    if (result.projections.length > 0) {
      setSelectStatTitle(result.projections[0].title);
    }
    let statOUKeys = result.statOUKeys;
    statOUKeys.map((each) => {
      statsArray.push(each);
    });

    setStats([...statsArray]);
    setStatsAndData(result.projections[0]);
    if (result.metadata.notes) {
      let noteFromApi = result.metadata.notes;
      if (noteFromApi[`${selectSports}`]) {
        setNotes(noteFromApi[`${selectSports}`]);
      }
    }
    dispatch(addPropsDataCommingFromApi(result));
  };
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
  ]);
  const [stats, setStats] = useState([]);
  const [matches, setMatches] = useState([]);
  const [statsOverFlow, setStatsOverFlow] = useState(false);
  const [statsArriveEnd, setStatsArriveEnd] = useState(false);
  const statsChildRef = useRef();
  const matchesChildRef = useRef();
  const [gameOverFlow, setGameOverFlow] = useState(false);
  const [gameArriveEnd, setGameArriveEnd] = useState(false);
  useEffect(() => {
    if (statsRef.current) {
      let hasOverflow =
        statsRef.current.scrollWidth > statsRef.current.clientWidth;
      if (hasOverflow) {
        setStatsOverFlow(true);
      } else {
        setStatsOverFlow(false);
      }
    }
    if (matchsRef.current) {
      let matchesHasOverFlow =
        matchsRef.current.scrollWidth > matchsRef.current.clientWidth;
      if (matchesHasOverFlow) {
        setGameOverFlow(true);
      } else {
        setGameOverFlow(false);
      }
    }
  });

  const propsChildRef = useRef();

  const goForwardStats = () => {
    statsRef.current.scrollLeft = statsRef.current.scrollLeft + 100;
    if (statsRef.current.scrollLeft > 0) {
      setStatsArriveEnd(true);
    }
  };
  const goForwardMatches = () => {
    matchsRef.current.scrollLeft = matchsRef.current.scrollLeft + 100;
    if (matchsRef.current.scrollLeft > 0) {
      setGameArriveEnd(true);
    }
  };
  const goBackWardMatches = () => {
    matchsRef.current.scrollLeft = matchsRef.current.scrollLeft - 100;
    if (matchsRef.current.scrollLeft === 0) {
      setGameArriveEnd(false);
    }
  };
  const goBackWardStats = () => {
    statsRef.current.scrollLeft = statsRef.current.scrollLeft - 100;
    if (statsRef.current.scrollLeft === 0) {
      setStatsArriveEnd(false);
    }
  };

  const [currSports, setCurrSports] = useState(null);

  useEffect(() => {
    if (sportDataCommingFromApi && selectSports) {
      let currSportArray = sportDataCommingFromApi.filter((each) => {
        return each.code === selectSports;
      });
      if (currSportArray.length > 0) {
        setCurrSports(currSportArray[0]);
      }
    }
  }, [sportDataCommingFromApi, selectSports]);

  //card

  const [selectedCardList, setSelectedCardList] = useState([]);
  const addCard = async (prop) => {
    // console.log(prop);
    let check = selectedCardList.filter((each) => {
      return (
        each.gameId === prop.gameId &&
        each.sport === prop.sport &&
        each.playerName === prop.playerName &&
        each.gameName === prop.gameName &&
        each.statKey === prop.statKey
      );
    });
    // console.log(check);
    if (check.length > 0) {
      if (check[0].action !== prop.action) {
        setPickPlayType(false);
        setSelectAmount(null);
        let selectCardIdClone = selectedCardList.map((each) => {
          if (
            each.gameId === prop.gameId &&
            each.sport === prop.sport &&
            each.playerName === prop.playerName &&
            each.gameName === prop.gameName &&
            each.statKey === prop.statKey
          ) {
            let dataToAddCard = each;
            dataToAddCard.action = prop.action;
            return dataToAddCard;
          } else {
            return each;
          }
        });
        setSelectedCardList(selectCardIdClone);
      } else {
        let selectCardIdClone = selectedCardList.filter((each) => {
          return (
            each.gameId !== prop.gameId ||
            each.sport !== prop.sport ||
            each.playerName !== prop.playerName ||
            each.gameName !== prop.gameName ||
            each.statKey !== prop.statKey
          );
        });
        setPickPlayType(false);
        setSelectAmount(null);
        setSelectedCardList(selectCardIdClone);
      }
    } else {
      if (currentSportDataRedux && selectedCardList) {
        if (
          selectedCardList.length >= currentSportDataRedux.metadata.maxAllowed
        ) {
          return;
        } else {
          setPickPlayType(false);
          setSelectAmount(null);
          setSelectedCardList((prev) => [...prev, prop]);
        }
      }
    }
    console.log(selectedCardList);
    // console.log(selectedCardList);
  };
  const removeCard = (prop) => {
    let selectCardIdClone = selectedCardList.filter((each) => {
      return (
        each.gameId !== prop.gameId ||
        each.sport !== prop.sport ||
        each.playerName !== prop.playerName ||
        each.gameName !== prop.gameName ||
        each.statKey !== prop.statKey
      );
    });
    setPickPlayType(false);
    setSelectAmount(null);
    setSelectedCardList(selectCardIdClone);
  };

  const [successSubmit, setSuccessSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(null);
  const [notEnoughBalance, setNotEnoughBalance] = useState(false);
  const messagesEndRef = useRef(null);
  const scrollDownFunc = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const sportsRef = useHorizontalScrollPropsNav();
  const statsRef = useHorizontalScrollStats(
    propsDataCommingFromApi,
    setStatsArriveEnd,
    callClickSportApiFinish
  );
  const matchsRef = useHorizontalScrollMatches({
    propsDataCommingFromApi,
    setGameArriveEnd,
    callClickSportApiFinish,
  });
  const handleCallPropSports = async (e) => {
    if (e.code === selectSports) return;
    dispatch(setCallClickSportApiFinish(false));
    setNotes(null);
    dispatch(setNoProjection(null));
    setSelectMatches(null);
    setSelectSports(e.code);
    setSelectColor(e.color);
    setSelectSrc(e.activeImage);

    setStats([]);
    setMatches([]);
    setStatsAndData(null);

    let currSelectSportProp = await propsDataCommingFromApi.filter(
      (eachProp) => {
        return eachProp.sportCode === e.code;
      }
    );
    if (currSelectSportProp.length > 0) {
      if (currSelectSportProp[0].projections.length < 1) {
        dispatch(setNoProjection(currSelectSportProp[0].sportCode));
      }
      if (currSelectSportProp[0].projections.length > 0) {
        setSelectStatTitle(currSelectSportProp[0].projections[0].title);
      }
      setStatsAndData(currSelectSportProp[0].projections[0]);
      if (currSelectSportProp[0].metadata.notes) {
        let noteFromApi = currSelectSportProp[0].metadata.notes;
        if (noteFromApi[`${e.code}`]) {
          setNotes(noteFromApi[`${e.code}`]);
        }
      }
      console.log(currSelectSportProp);
      dispatch(setCallClickSportApiFinish(true));
    } else {
      let result = await getPropsSport(e.code);
      if (result.projections.length < 1) {
        dispatch(setNoProjection(result.sportCode));
      }
      if (result.projections.length > 0) {
        setSelectStatTitle(result.projections[0].title);
      }
      setStatsAndData(result.projections[0]);
      if (result.metadata.notes) {
        let noteFromApi = result.metadata.notes;
        if (noteFromApi[`${e.code}`]) {
          setNotes(noteFromApi[`${e.code}`]);
        }
      }
      console.log(result);
      dispatch(addPropsDataCommingFromApi(result));
      console.log(result.projections[0]);
      dispatch(setCallClickSportApiFinish(true));
    }
  };

  //select stats func
  const handleSelectStats = (e) => {
    setSelectMatches(null);
    setSelectStatTitle(e);
    let statsDataFromRedux = currentSportsData.projections;
    if (statsDataFromRedux.length > 0) {
      let statFilterData = statsDataFromRedux.filter((each) => {
        return each.title === e;
      });
      if (statFilterData.length > 0) {
        setStatsAndData(statFilterData[0]);
      }
    }
  };

  //select games func
  const handleSelectGame = (e) => {
    if (selectMatches && selectMatches.gameId === e.gameId) {
      setSelectMatches(null);
      let statsDataFromRedux = currentSportsData.projections;
      if (statsDataFromRedux.length > 0) {
        let statFilterData = statsDataFromRedux.filter((each) => {
          return each.title === selectStatTitle;
        });
        if (statFilterData.length > 0) {
          setStatsAndData(statFilterData[0]);
        }
      }
    } else {
      setSelectMatches(e);
      let statsDataFromRedux = currentSportsData.projections;
      if (statsDataFromRedux.length > 0) {
        let statFilterData = statsDataFromRedux.filter((each) => {
          return each.title === selectStatTitle;
        });
        if (statFilterData.length > 0) {
          let statsDataClone = statFilterData[0];
          let statsTitle = statsDataClone.title;
          let filterMatchesData = statsDataClone.data.filter((each) => {
            return each.gameId === e.gameId;
          });
          let filterMatches = { title: statsTitle, data: filterMatchesData };
          setStatsAndData(filterMatches);
        }
      }
    }
  };

  //searchFunc
  const handleSearch = (searchText) => {
    let statsDataFromRedux = currentSportsData.projections;
    if (searchText) {
      let sportStatAllData = [];
      if (statsDataFromRedux.length > 0) {
        statsDataFromRedux.map((e) => {
          if (e.data.length > 0) {
            e.data.map((each) => {
              sportStatAllData.push(each);
            });
          }
        });
        if (sportStatAllData.length > 0) {
          let filterStatData = sportStatAllData.filter((each) => {
            return (
              each.playerName
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
              each.teamName.toLowerCase().includes(searchText.toLowerCase()) ||
              (each.myTeamLongName &&
                each.myTeamLongName
                  .toLowerCase()
                  .includes(searchText.toLowerCase())) ||
              each.statDisplay.toLowerCase().includes(searchText.toLowerCase())
            );
          });
          let title = statsAndData.title;
          let statsAndDataToAdd = { data: filterStatData, title: title };
          setStatsAndData(statsAndDataToAdd);
          console.log(filterStatData);
          console.log(statsAndDataToAdd);
        }
      }
    } else {
      let emptyValueStat = statsDataFromRedux.filter((each) => {
        return each.title === selectStatTitle;
      });
      setStatsAndData(emptyValueStat[0]);
    }
  };

  if (sportDataCommingFromApi && propsApiCallComplete) {
    return (
      <main className="props-container">
        <Box
          sx={{
            width: { xl: "1300px", lg: "90%", sm: "87%", xxxs: "90%" },
            height: "100vh",
            margin: "auto",
            mr: { xl: "auto", lg: "30px", sm: "30px", xxxs: "auto" },
          }}
          component="div"
        >
          <div
            className={`${"propsContainer"} ${
              mode === "dark" ? "" : "props-light"
            }`}
            ref={sportsRef}
          >
            <div className="propsChild" ref={propsChildRef}>
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
                  onClick={() => {
                    handleCallPropSports(e);
                  }}
                >
                  <Box
                    sx={{
                      height: { xs: "34px", xxxs: "30px" },
                      width: { xs: "34px", xxxs: "30px" },
                      border: `${
                        e.code === selectSports
                          ? `1px solid ${e.color}`
                          : noDataSports.indexOf(e.code) > -1
                          ? "1px solid gray"
                          : activeSports.indexOf(e.code) > -1
                          ? "1px solid white"
                          : "1px solid gray"
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
                    <>
                      {noDataSports.indexOf(e.code) > -1 ? (
                        <img
                          className="propsNavImg"
                          style={{
                            color: e.color,
                          }}
                          src={e.inactiveImage}
                        />
                      ) : (
                        <>
                          {activeSports.indexOf(e.code) > -1 ? (
                            <img
                              className="propsNavImg"
                              style={{
                                color: e.color,
                              }}
                              src={`${
                                e.code === selectSports
                                  ? e.activeImage
                                  : e.inactiveImage
                              }`}
                            />
                          ) : (
                            <img
                              className="propsNavImg"
                              style={{
                                color: e.color,
                              }}
                              src={e.inactiveImage}
                            />
                          )}
                        </>
                      )}
                    </>
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
                        e.code === selectSports
                          ? `${e.color}`
                          : noDataSports.indexOf(e.code) > -1
                          ? "gray"
                          : activeSports.indexOf(e.code) > -1
                          ? "white"
                          : "gray"
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
          {callClickSportApiFinish ? (
            <>
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
                          fontSize: { md: fs.small, sm: fs.xxs, xxxs: fs.xxxs },
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
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { sm: "row", xxxs: "column" },
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      flexWrap: "wrap",
                      mr: { md: "20px", xxxs: "10px" },
                    }}
                    onClick={() => refresh(selectSports)}
                  >
                    {mode === "dark" ? (
                      <img
                        src="/refresh.png"
                        style={{
                          marginRight: "3px",
                          height: "20px",
                        }}
                      />
                    ) : (
                      <img
                        src="/refresh-dark.png"
                        style={{
                          marginRight: "3px",
                          height: "20px",
                        }}
                      />
                    )}

                    <Typography
                      sx={{
                        fontSize: { md: fs.small, sm: fs.xxs, xxxs: fs.xxxs },
                        fontFamily: "poppins",
                        fontWeight: 500,
                        color: "secondary.main",
                        ml: { sm: "5px", xxxs: "0px" },
                      }}
                    >
                      Refresh
                    </Typography>
                  </Box>
                </Box>
                <Input
                  startAdornment={
                    <InputAdornment position="end">
                      <SearchIcon
                        sx={{
                          color: "secondary.gray",
                          fontSize: fs.xxx_large,
                          mr: "7px",
                        }}
                      />
                    </InputAdornment>
                  }
                  placeholder="Search"
                  onChange={(e) => handleSearch(e.target.value)}
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
                    fontSize: fs.xs,
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
                    fontSize: { sm: fs.normal, xxxs: fs.xs },
                    fontWeight: "400",
                    fontFamily: "poppins",
                    width: { md: "10%", xs: "14%", xxxs: "22%" },
                    color: "secondary.main",
                  }}
                >
                  {stats.length} Stats
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "100%",
                    width: { md: "90%", xs: "86%", xxxs: "78%" },
                    position: "relative",
                  }}
                >
                  {statsArriveEnd && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "48px",
                        position: "absolute",
                        left: 0,
                        zIndex: 10,
                      }}
                    >
                      <Box
                        component="div"
                        sx={{
                          height: "100%",
                          width: "100px",
                          background:
                            "linear-gradient(to left, transparent, rgba(0,0,0,0.6))",
                          position: "absolute",
                          left: 0,
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
                          left: 0,
                        }}
                        onClick={goBackWardStats}
                      >
                        <ArrowBackIosNew
                          sx={{
                            fontSize: fs.large,
                            color: "primary.main",
                          }}
                        />
                      </Box>
                    </Box>
                  )}
                  <div className="statsContainer" ref={statsRef}>
                    <div className="statsChild" ref={statsChildRef}>
                      {stats.map((e, index) => (
                        <button
                          key={index}
                          style={{
                            color: `${
                              mode === "dark"
                                ? statsAndData && selectStatTitle === e
                                  ? "black"
                                  : "white"
                                : "#4831D4"
                            }`,
                            fontWeight: `${
                              statsAndData && selectStatTitle === e && "600"
                            }`,
                            background: `${
                              mode === "dark"
                                ? selectStatTitle === e
                                  ? "#459F48"
                                  : "#4831D4"
                                : "#DAD5F6"
                            }`,
                            minWidth: `${
                              e.length < 5
                                ? e.length * 25
                                : e.length < 10
                                ? e.length * 21
                                : e.length * 10
                            }px`,
                            cursor: "pointer",
                          }}
                          className="statsButton"
                          onClick={() => handleSelectStats(e)}
                        >
                          {e}{" "}
                          {statsAndData && selectStatTitle === e
                            ? `(${statsAndData.data.length})`
                            : ""}
                        </button>
                      ))}
                    </div>
                  </div>
                  {statsOverFlow && (
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
                            fontSize: fs.large,
                            color: "primary.main",
                          }}
                        />
                      </Box>
                    </Box>
                  )}
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
                    fontSize: { sm: fs.normal, xxxs: fs.xs },
                    fontWeight: "400",
                    fontFamily: "poppins",
                    width: { md: "10%", xs: "14%", xxxs: "22%" },
                    color: "secondary.main",
                  }}
                >
                  {matches.length} Matches
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "100%",
                    width: { md: "90%", xs: "86%", xxxs: "78%" },
                    position: "relative",
                  }}
                >
                  {gameArriveEnd && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "48px",
                        position: "absolute",
                        left: 0,
                        zIndex: 10,
                      }}
                    >
                      <Box
                        component="div"
                        sx={{
                          height: "100%",
                          width: "100px",
                          background:
                            "linear-gradient(to left, transparent, rgba(0,0,0,0.6))",
                          position: "absolute",
                          left: 0,
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
                          left: 0,
                        }}
                        onClick={goBackWardMatches}
                      >
                        <ArrowBackIosNew
                          sx={{
                            fontSize: fs.large,
                            color: "primary.main",
                          }}
                        />
                      </Box>
                    </Box>
                  )}
                  <div className="matchesContainer" ref={matchsRef}>
                    <div className="matchesChild" ref={matchesChildRef}>
                      {matches.map((e, index) => (
                        <Games
                          gameData={e}
                          mode={mode}
                          key={index}
                          handleSelectGame={handleSelectGame}
                          selectMatches={selectMatches}
                        />
                      ))}
                    </div>
                  </div>
                  {gameOverFlow && (
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
                            fontSize: fs.large,
                            color: "primary.main",
                          }}
                        />
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
              {notes && (
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "left",
                    width: "100%",
                    position: "relative",
                    mb: "20px",
                    fontSize: { md: fs.small, sm: fs.xxs, xxxs: fs.xxxs },
                    fontFamily: "poppins",
                    fontWeight: 500,
                    color: "#89CBF5",
                  }}
                >
                  <ErrorIcon
                    sx={{ fontSize: fs.normal, mr: "5px", mb: "2px" }}
                  />
                  {notes}
                </Typography>
              )}
              {noProjection === selectSports ? (
                <>
                  <NoProjection refresh={refresh} />
                </>
              ) : (
                <>
                  <Box
                    id="grid-container"
                    component="div"
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: { sm: "row", xxxs: "column" },
                      justifyContent: "center",
                      alignItems: { xs: "flex-start", xxxs: "center" },
                      height: "100%",
                      pb: "30px",
                    }}
                  >
                    <Box
                      sx={{
                        width: {
                          lg: "75%",
                          md: "60%",
                          sm: "50%",
                          xxxs: "100%",
                        },
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        overflow: "scroll",
                        maxHeight: "100%",
                        "&::-webkit-scrollbar": {
                          display: "none",
                        },
                        borderBottom: "1px solid #494949",
                      }}
                    >
                      {statsAndData && statsAndData.data.length > 0 ? (
                        <Grid
                          container
                          sx={{
                            width: "100%",
                          }}
                          spacing={"6px"}
                        >
                          {statsAndData &&
                            statsAndData.data.map((e, index) => (
                              <GridItemComponent
                                e={e}
                                key={index}
                                index={index}
                                selectedCardList={selectedCardList}
                                setSelectedCardList={setSelectedCardList}
                                addCard={addCard}
                                mode={mode}
                                selectSports={selectSports}
                                selectColor={selectColor}
                                selectSrc={selectSrc}
                                scrollDownFunc={scrollDownFunc}
                                historyTrue={historyTrue}
                                selectMatches={selectMatches}
                                selectStatTitle={selectStatTitle}
                                statsAndData={statsAndData}
                              />
                            ))}
                        </Grid>
                      ) : (
                        <>
                          {statsAndData &&
                            statsAndData.data.length < 1 &&
                            currSports && (
                              <Box
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "flex-start",
                                }}
                              >
                                <img
                                  src={currSports.noDataImage}
                                  style={{ width: "150px", marginTop: "40px" }}
                                />
                                <Typography
                                  sx={{
                                    fontSize: fs.normal,
                                    color: "white",
                                    width: "80%",
                                    mt: "20px",
                                    textAlign: "center",
                                  }}
                                >
                                  No open projections at the moment for this
                                  game. New projections will be up soon.
                                </Typography>
                                <Button
                                  sx={{
                                    fontSize: fs.normal,
                                    fontFamily: "poppins",
                                    color: "white",
                                    padding: "5px 20px",
                                    border: "2px solid white",
                                    borderRadius: "8px",
                                    mt: "20px",
                                    textTransform: "none",
                                  }}
                                  onClick={() => refresh(selectSports)}
                                >
                                  Refresh
                                </Button>
                              </Box>
                            )}
                        </>
                      )}
                    </Box>
                    <SubmitProjection
                      selectedCardList={selectedCardList}
                      mode={mode}
                      setSelectedCardList={setSelectedCardList}
                      removeCard={removeCard}
                      setSuccessSubmit={setSuccessSubmit}
                      setErrorSubmit={setErrorSubmit}
                      selectSports={selectSports}
                      selectAmount={selectAmount}
                      setSelectAmount={setSelectAmount}
                      pickPlayType={pickPlayType}
                      setPickPlayType={setPickPlayType}
                      setNotEnoughBalance={setNotEnoughBalance}
                    />
                    <div ref={messagesEndRef} />
                  </Box>
                </>
              )}
            </>
          ) : (
            <LoadingSpinnerEachSection />
          )}
        </Box>
        {openHowTo && (
          <HowTo
            setOpenHowTo={setOpenHowTo}
            mode={mode}
            howToPlayTitles={howToPlayTitles}
            howToPlayData={howToPlayData}
          />
        )}
        {openRule && (
          <Rule setOpenRule={setOpenRule} mode={mode} rulesData={rulesData} />
        )}
        {openFps && selectSports === "cricket" ? (
          <FpsCricket
            setOpenFps={setOpenFps}
            mode={mode}
            currentSportsData={currentSportsData}
          />
        ) : (
          openFps && (
            <Fps
              setOpenFps={setOpenFps}
              mode={mode}
              currentSportsData={currentSportsData}
            />
          )
        )}
        {successSubmit && (
          <SuccessSubmit
            setSuccessSubmit={setSuccessSubmit}
            setErrorSubmit={setErrorSubmit}
            mode={mode}
            refresh={refresh}
            updateGetUserById={updateGetUserById}
            setSelectedCardList={setSelectedCardList}
          />
        )}
        {errorSubmit && (
          <ErrorSubmit
            setErrorSubmit={setErrorSubmit}
            errorSubmit={errorSubmit}
            setNotEnoughBalance={setNotEnoughBalance}
            mode={mode}
            refresh={refresh}
            setSelectedCardList={setSelectedCardList}
          />
        )}
        {notEnoughBalance && (
          <NotEnoughBalance
            setNotEnoughBalance={setNotEnoughBalance}
            mode={mode}
            setSelectedCardList={setSelectedCardList}
          />
        )}
      </main>
    );
  } else {
    return <LoadingSpinnerEachSection />;
  }
}
