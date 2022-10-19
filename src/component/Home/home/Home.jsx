import React, { useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./home.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Props from "../../Props/Props";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuIcon from "@mui/icons-material/Menu";
import AddCash from "../../AddCash/AddCash";
import NewAddCashVerify from "../../AddCash/NewAddCashVerify";
import NewAddCashForm from "../../AddCash/NewAddCashForm";
import Address from "../../AddCash/Address";
import RefralBonusCashRandoom from "../../Refral/RefralBonusCashRandoom";
import VerifyPhoneNumberCode from "../../Refral/VerifyPhoneNumberCode";
import RefralBonusCashCode from "../../Refral/RefralBonusCashCode";
import KnowMore from "../../KnowMore/KnowMore";
import BonusOffer from "../../BonusOffer/BonusOffer";
import MyProfile from "../../MyProfile/MyProfile";
import EmailPrefrence from "../../EmailPrefrence/EmailPrefrence";
import MyProps from "../../MyProps/MyProps";
import TransactionHistory from "../../TransactionHistory/TransactionHistory";
import AddAddress from "../../AddCash/AddAddress";
import LoadingSpinnerEachSection from "../../loadingSpinner/LoadingSpinnerEachSection";
import SupportChat from "../../SupportChat/SupportChat";

import { auth } from "../../../config/firebase";
import { signOut } from "firebase/auth";
import {
  addCompleteDataCommingFromApi,
  addUpComingDataCommingFromApi,
  addLiveDataCommingFromApi,
  removeUserInfo,
  addPropsDataCommingFromApi,
} from "../../../feature/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { APIURLs } from "../../../api/ApiUrls";
import { makeGETAPICall } from "../../../api/methods";
import { addSportDataCommingFromApi } from "../../../feature/userSlice";
import {
  doc,
  getDocs,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../config/firebase";

export const onSportsCounterUpdate = async ({
  dispatch,
  preventDoubleCall,
}) => {
  const q = query(collection(db, "sports_counter"));
  onSnapshot(q, (querySnapshot) => {
    dispatch(addSportDataCommingFromApi(null));
    var allsports = [];
    getAllSports()
      .then((result) => {
        if (result) {
          //console.log(result);
          if (result.length > 0) {
            result.forEach((x) => {
              if (x.code !== "home" && x.activeSw) {
                allsports.push(x);
              }
            });
          }
          console.log(allsports);
          dispatch(addSportDataCommingFromApi(allsports));
          localStorage.setItem("all_sports", JSON.stringify(result));
          preventDoubleCall = true;
        } else {
          console.log("null");
          preventDoubleCall = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
export const onPropsOUCounterUpdate = async ({ dispatch }) => {
  const q = query(collection(db, "props_ou_counter"));
  onSnapshot(q, (querySnapshot) => {
    var allprops;
    let allSports = localStorage.getItem("all_sports");
    if (allSports) {
      const allsports = JSON.parse(allSports);
      if (allsports && allsports.length > 0) {
        allsports.forEach((x) => {
          if (x.code != "home" && x.activeSw) {
            getPropsSport(x.code)
              .then((prop) => {
                console.log(prop);
                allprops = prop;
                dispatch(addPropsDataCommingFromApi(allprops));
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      }
    }
  });
};
//get sports
export const getAllSports = async () => {
  var apiUrl = APIURLs.getAllSports;
  //console.log(apiUrl);
  const apiResponse = await makeGETAPICall(apiUrl, [{ "app-version": 2 }]); //[{"Access-Control-Allow-Origin":"*"},{"Access-Control-Allow-Headers":"*"}]
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return null;
  }
};

//get props by sport
export const getPropsSport = async (code) => {
  var apiUrl = APIURLs.getPropsSport;
  //console.log(apiUrl);
  const apiResponse = await makeGETAPICall(apiUrl, [
    { "app-version": 2 },
    { "play-type": "over-under" },
    { "sport-code": code },
  ]);
  //[{"Access-Control-Allow-Origin":"*"},{"Access-Control-Allow-Headers":"*"}]
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return null;
  }
};

export const getMyProps = async (userId, status) => {
  var apiUrl = APIURLs.getMyProps;
  apiUrl = apiUrl.replace("{userId}", userId);
  apiUrl = apiUrl.replace("{status}", status);
  const apiResponse = await makeGETAPICall(apiUrl, [
    { "app-version": 2 },
    { "page-num": 1 },
  ]);
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return null;
  }
};
export function Home({ mode, setMode }) {
  let navigate = useNavigate();
  let location = useLocation();

  //getSportsdata
  const userDetail = useSelector((state) => state.user.userDetail);
  let preventDoubleCall = true;
  useEffect(() => {
    const getPropsData = () => {
      if (userDetail && preventDoubleCall) {
        preventDoubleCall = false;
        onSportsCounterUpdate({ dispatch, preventDoubleCall });
        onPropsOUCounterUpdate({ dispatch });
      }
    };
    getPropsData();
  }, [userDetail]);

  const callPropsApi = () => {
    onSportsCounterUpdate({ dispatch, preventDoubleCall });
    onPropsOUCounterUpdate({ dispatch });
  };

  //getMyPropsDataFromApi
  const user_from_localstorage = JSON.parse(localStorage.getItem("user"));
  //upcomming

  let calling = false;
  const callUpCommingMyPropsApi = () => {
    if (!calling) {
      calling = true;
      dispatch(addCompleteDataCommingFromApi(null));
      dispatch(addUpComingDataCommingFromApi(null));
      dispatch(addLiveDataCommingFromApi(null));

      if (user_from_localstorage) {
        getMyProps(user_from_localstorage.uid, "upcoming")
          .then((result) => {
            if (result) {
              console.log(result);
              dispatch(addUpComingDataCommingFromApi(result));
              calling = false;
            } else {
              console.log("null");
              calling = false;
            }
          })
          .catch((err) => {
            console.log(err);
            calling = false;
          });
      }
    } else {
      return;
    }
  };

  //live
  const callLiveMyPropsApi = () => {
    dispatch(addCompleteDataCommingFromApi(null));
    dispatch(addUpComingDataCommingFromApi(null));
    dispatch(addLiveDataCommingFromApi(null));

    if (user_from_localstorage) {
      getMyProps(user_from_localstorage.uid, "live")
        .then((result) => {
          if (result) {
            console.log(result);
            dispatch(addLiveDataCommingFromApi(result));
          } else {
            console.log("null");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //completed
  const completeDataCommingFromApi = useSelector(
    (state) => state.user.completeDataCommingFromApi
  );
  const callCompletedMyPropsApi = () => {
    dispatch(addCompleteDataCommingFromApi(null));
    dispatch(addUpComingDataCommingFromApi(null));
    dispatch(addLiveDataCommingFromApi(null));

    if (user_from_localstorage) {
      getMyProps(user_from_localstorage.uid, "completed")
        .then((result) => {
          if (result) {
            console.log(result);
            dispatch(addCompleteDataCommingFromApi(result));
          } else {
            console.log("null");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //getProfileDataFromApi
  const callProfileApi = () => {
    return;
  };

  //getTxHistoryFromApi
  const callTxHistoryApi = () => {
    return;
  };

  //getEnterReferalCodeDataFromApi
  const enterReferalCodeDataCommingFromApi = useSelector(
    (state) => state.user.enterReferalCodeDataCommingFromApi
  );
  const callEnterRefralCodeApi = () => {
    return;
  };

  //getKnowMoreDataFromApi
  const callKnowMoreApi = () => {
    return;
  };

  //getEmailPrefrenceDataFromApi
  const callEmailPrefrenceApi = () => {
    return;
  };

  //supportChatDataFromApi
  const callSupportChatApi = () => {
    return;
  };

  const propsOpen = () => {
    navigate("/home", { replace: true });
    setOpenSideNav(false);
    setOpenTag("props");
    callPropsApi();
  };
  const knowMoreOpen = () => {
    navigate("/home", { replace: true });
    setOpenSideNav(false);
    setOpenTag("know-more");
    callKnowMoreApi();
  };
  const emailPrefrenceOpen = () => {
    navigate("/home", { replace: true });
    setOpenSideNav(false);
    setOpenTag("email-prefrence");
    callEmailPrefrenceApi();
  };
  const supportChatOpen = () => {
    navigate("/home", { replace: true });
    setOpenSideNav(false);
    setOpenTag("support-chat");
    callSupportChatApi();
  };
  const myProfileOpen = () => {
    navigate("/home", { replace: true });
    setOpenSideNav(false);
    setOpenTag("my-profile");
    callProfileApi();
  };
  const transactionHistoryOpen = () => {
    navigate("/home", { replace: true });
    setOpenSideNav(false);
    setOpenTag("transaction-history");
    callTxHistoryApi();
  };
  const goDepositNewUser = () => {
    if (newUser) {
      navigate("/home?deposit=new&page=verify", { replace: true });
    } else {
      navigate("/home?deposit=old-user", { replace: true });
    }
  };
  const goAddCashBonus = () => {
    navigate("/home?deposit=old-user", { replace: true });
  };
  const goRefralBonusCashRadeem = () => {
    setOpenTag("enter-referral-code");
    navigate("/home?deposit=go-refral-bonus-cash-randoom", { replace: true });
    setOpenSideNav(false);
    callEnterRefralCodeApi();
  };
  const goVerifyPhoneNumberCode = () => {
    navigate("/home?deposit=verify-phone-number-code", { replace: true });
  };
  const goEmailPrefrencePage = () => {
    setOpenDropDown(false);
    navigate("/home", { replace: true });
    setOpenSideNav(false);
    setOpenTag("email-prefrence");
  };
  const myPropsOpen = () => {
    navigate("/home", { replace: true });
    setOpenSideNav(false);
    setOpenTag("my-props");
    callUpCommingMyPropsApi();
  };
  const [activeTag, setActiveTag] = useState("props");
  const [number, setNumber] = useState(null);
  const [newUser, setNewUser] = useState(true);
  const [sideBar, setSideBar] = useState([
    {
      name: "Props",
      activeSrc: "/props-active.png",
      unactiveSrc: "/props-unactive.png",
      activeName: "props",
      func: propsOpen,
    },
    {
      name: "My Props",
      activeSrc: "/my-props-active.png",
      unactiveSrc: "/my-prop-unactive.png",
      activeName: "my-props",
      func: myPropsOpen,
    },
    {
      name: "My Account",
      activeSrc: "/myAccount-active.png",
      unactiveSrc: "/myAccount.png",
      activeName: "my-profile",
      func: myProfileOpen,
    },
    {
      name: "Transaction History",
      activeSrc: "/transcationHistoryActive.png",
      unactiveSrc: "/transcationHistory.png",
      activeName: "transaction-history",
      func: transactionHistoryOpen,
    },
    {
      name: "Enter Referral Code",
      activeSrc: "/referalCodeActive.png",
      unactiveSrc: "/referalCode.png",
      activeName: "enter-referral-code",
      func: goRefralBonusCashRadeem,
    },
  ]);
  const [sideBarOther, setSideBarOther] = useState([
    {
      name: "Know More",
      activeSrc: "/nomore-active.png",
      unactiveSrc: "/nomore-unactive.png",
      activeName: "know-more",
      func: knowMoreOpen,
    },
    {
      name: "Email Preferences",
      activeSrc: "/email-prefrence-active.png",
      unactiveSrc: "/email-prefrence-unactive.png",
      activeName: "email-prefrence",
      func: emailPrefrenceOpen,
    },
    {
      name: "Support Chat",
      activeSrc: "/nomore-active.png",
      unactiveSrc: "/nomore-unactive.png",
      activeName: "support-chat",
      func: supportChatOpen,
    },
  ]);

  const [openSideNav, setOpenSideNav] = useState(false);
  const [openTag, setOpenTag] = useState("props");
  const [address, setAddress] = useState(null);

  const [openInviteFriend, setOpenInviteFriend] = useState(false);

  const switchMode = () => {
    if (mode === "dark") {
      setMode("light");
    } else {
      setMode("dark");
    }
  };

  const sporDataCommingFromApi = useSelector(
    (state) => state.user.sporDataCommingFromApi
  );

  useEffect(() => {
    if (sporDataCommingFromApi) {
      let firstSportName = sporDataCommingFromApi[0].sportName;
      let firstSportSrc = sporDataCommingFromApi[0].activeSrc;
      let firstSportColor = sporDataCommingFromApi[0].color;
      setSelectSports(firstSportName);
      setSelectSrc(firstSportSrc);
      setSelectColor(firstSportColor);
    }
  }, [sporDataCommingFromApi]);

  const [openDropDown, setOpenDropDown] = useState(false);

  const [selectSports, setSelectSports] = useState(null);
  const [selectSrc, setSelectSrc] = useState("/mlb.png");
  const [selectColor, setSelectColor] = useState("blue");

  const homeRef = useRef();
  const homeContainerRef = useRef();

  useEffect(() => {
    homeRef.current.scrollTop = 0;
    homeContainerRef.current.scrollTop = 0;
  }, [location]);
  const dispatch = useDispatch();
  const logOut = () => {
    if (auth) {
      signOut(auth);
    }
    dispatch(removeUserInfo());
    localStorage.removeItem("user");
  };
  const user = useSelector((state) => state.user.user);

  return (
    <div className="logged-container" ref={homeContainerRef}>
      <Box
        component="div"
        sx={{
          position: { sm: "relative", xxxs: "relative" },
          top: "0",
          width: "100%",
          zIndex: "6",
          height: { sm: "10%", xxxs: "12%" },
        }}
      >
        <AppBar
          component="nav"
          sx={{
            borderBottom: `${mode === "dark" ? "1px solid gray" : "none"}`,
            position: "relative",
            boxShadow: "none",
            zIndex: { sm: 4, xxxs: 3 },
            pb: { sm: 0, xxxs: "5px" },
            height: "100%",
          }}
        >
          <Toolbar
            sx={{
              display: { xxxs: "flex" },
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "center",
              height: "100%",
            }}
            bgcolor="primary.main"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { lg: "row", sm: "row", xxxs: "row" },
                alignItems: "center",
                justifyContent: "center",
                mt: "5px",
                background: "black",
                position: { sm: "absolute", xxxs: "static" },
                left: { lg: "18px", sm: "30px", xxxs: "35px" },
                mx: { sm: "auto", xxxs: "auto" },
              }}
            >
              <img src="/sportBattleMyPropsLogo.png" className="logos" />
              <Typography
                sx={{
                  color: "white",
                  fontSize: { sm: "15px", xxs: "14px", xxxs: "12px" },
                  fontWeight: 700,
                  fontFamily: "poppins",
                  position: "relative",
                  left: "-10px",
                }}
              >
                SportsBattle
              </Typography>
            </Box>
            <Box
              sx={{
                width: {
                  xl: "80%",
                  lg: "836px",
                  md: "700px",
                  sm: "500px",
                  xs: "450px",
                  xxs: "100%",
                  xxxs: "100%",
                },
                width: { xl: "1450px", lg: "100%", sm: "100%", xxxs: "100%" },

                margin: "0 auto",
                display: "flex",
                justifyContent: { sm: "flex-end", xxxs: "space-between" },
                alignItems: "center",
                mb: { xs: 0, xxxs: "10px" },
                mt: { sm: 0, xxxs: "10px" },
              }}
            >
              <Button
                sx={{
                  borderRadius: "4px",
                  textTransform: "none",
                  fontFamily: "poppins",
                  fontSize: {
                    sm: "10px",
                    xs: "10px",
                    xxs: "8px",
                    xxxs: "8px",
                  },
                  fontWeight: 500,
                  padding: { xs: "8px 12px", xxxs: "6px 6px" },
                  maxWidth: { sm: "auto", xxs: "22%", xxxs: "25%" },
                  minWidth: { sm: "auto", xxs: "22%", xxxs: "25%" },
                  mr: { sm: "12px", xs: "8px", xxxs: "4px" },
                  "&.MuiButtonBase-root:hover": {
                    bgcolor: "secondary.gray",
                  },
                  color: "black",
                  cursor: "pointer",
                  bgcolor: "secondary.gray",
                }}
                onClick={() => {
                  setOpenInviteFriend(true);
                }}
              >
                Invite Friends
              </Button>
              <Button
                sx={{
                  color: "#fff",
                  bgcolor: "primary.light",
                  borderRadius: "4px",
                  textTransform: "none",
                  fontFamily: "poppins",
                  fontSize: {
                    sm: "10px",
                    xs: "10px",
                    xxs: "8px",
                    xxxs: "8px",
                  },
                  fontWeight: 500,
                  maxWidth: { sm: "auto", xxs: "22%", xxxs: "25%" },
                  minWidth: { sm: "auto", xxs: "22%", xxxs: "25%" },
                  padding: { xs: "8px 12px", xxxs: "6px 6px" },
                  mr: { sm: "12px", xs: "8px", xxxs: "4px" },
                  "&.MuiButtonBase-root:hover": {
                    background: "rgba(36, 36, 35, 1)",
                  },
                }}
              >
                Bonus: $0.00
              </Button>
              <Button
                sx={{
                  color: "#fff",
                  bgcolor: "primary.light",
                  borderRadius: "4px",
                  textTransform: "none",
                  fontFamily: "poppins",
                  fontSize: {
                    sm: "10px",
                    xs: "10px",
                    xxs: "8px",
                    xxxs: "8px",
                  },
                  fontWeight: 500,
                  maxWidth: { sm: "auto", xxs: "22%", xxxs: "25%" },
                  minWidth: { sm: "auto", xxs: "22%", xxxs: "25%" },
                  padding: { xs: "8px 12px", xxxs: "6px 6px" },
                  mr: { sm: "12px", xs: "8px", xxxs: "4px" },
                  "&.MuiButtonBase-root:hover": {
                    background: "rgba(36, 36, 35, 1)",
                  },
                  cursor: "pointer",
                }}
                onClick={goAddCashBonus}
              >
                Cash: $0.00
              </Button>
              <Button
                sx={{
                  color: "#fff",
                  background: "#4831D4",
                  borderRadius: "4px",
                  textTransform: "none",
                  fontFamily: "poppins",
                  fontSize: {
                    sm: "10px",
                    xs: "10px",
                    xxs: "8px",
                    xxxs: "8px",
                  },
                  fontWeight: 500,
                  padding: { xs: "8px 12px", xxxs: "6px 6px" },
                  maxWidth: { sm: "auto", xxs: "22%", xxxs: "25%" },
                  minWidth: { sm: "auto", xxs: "22%", xxxs: "25%" },
                  mr: { sm: "12px", xs: "8px", xxxs: "4px" },
                  "&.MuiButtonBase-root:hover": {
                    background: "#4831D4",
                  },
                }}
                onClick={() => {
                  setOpenTag("addCash");
                  goDepositNewUser();
                }}
              >
                Deposit
              </Button>
              <Box
                component="div"
                sx={{
                  background: "transparent",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  position: { sm: "relative", xxxs: "absolute" },
                  top: { sm: "0px", xxxs: "10px" },
                  left: { sm: "1px", xxxs: "auto" },
                  right: "10px",
                }}
              >
                <Box
                  sx={{
                    background: "#439F48",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "white",
                    fontFamily: "poppins",
                    height: "31px",
                    width: "31px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {user && user.firstNameLetter}
                </Box>
                {openDropDown ? (
                  <KeyboardArrowUpIcon
                    sx={{
                      color: "#494949",
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                    onClick={() => setOpenDropDown(false)}
                  />
                ) : (
                  <KeyboardArrowDownIcon
                    sx={{
                      color: "#494949",
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                    onClick={() => setOpenDropDown(true)}
                  />
                )}

                {openDropDown && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "152%",
                      right: 0,
                      bgcolor: "secondary.main",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      borderBottomLeftRadius: "4px",
                      borderBottomRightRadius: "4px",
                    }}
                  >
                    <Box
                      sx={{
                        background: "transparent",
                        color: "primary.main",
                        width: { sm: "100px", xs: "80px", xxxs: "80px" },
                        py: { sm: "14px", xs: "10px", xxxs: "10px" },
                        fontSize: { sm: "14px", xxxs: "12px" },
                        fontWeight: 600,
                        fontFamily: "poppins",
                        textTransform: "none",
                        pr: { xs: "10px", xxxs: "5px" },
                        textAlign: "end",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        logOut();
                      }}
                    >
                      Log Out
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        component="div"
        sx={{
          position: "relative",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          height: { sm: "90%", xxxs: "88%" },
        }}
      >
        <AppBar
          component="nav"
          sx={{
            boxShadow: "none",
            outline: "none",
            position: { sm: "relative", xxxs: "fixed" },
            width: {
              xl: "180px",
              lg: "160px",
              md: "80px",
              sm: "80px",
              xxxs: "185px",
            },
            left: { sm: 0, xxxs: `${openSideNav ? 0 : "-195px"}` },
            transition: "all .3s ease-in",
            padding: 0,
            height: "100%",
            zIndex: "7",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              width: {
                xl: "190px",
                lg: "135px",
                md: "80px",
                sm: "80px",
                xxxs: "185px",
              },
              width: "100%",
              borderRight: `${mode === "dark" ? "1px solid gray" : "none"}`,
              height: "100%",
              position: "relative",
              bgcolor: "primary.main",
              padding: 0,
            }}
          >
            <MenuIcon
              sx={{
                position: "fixed",
                width: "30px",
                height: "30px",
                bgcolor: "primary.main",
                color: "secondary.main",
                left: `${openSideNav ? "195px" : "5px"}`,
                top: "10px",
                display: { sm: "none", xxxs: "block" },
                borderRadius: "0 4px 4px 0",
                zIndex: "11",
                transition: "all .3s ease-in",
              }}
              onClick={() => setOpenSideNav(!openSideNav)}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                width: {
                  xl: "190px",
                  lg: "165px",
                  md: "90px",
                  sm: "90px",
                  xxxs: "165px",
                },
                mt: "20px",
              }}
            >
              {sideBar.map((e, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: { lg: "row", sm: "column", xxxs: "row" },
                    alignItems: "center",
                    justifyContent: {
                      lg: "flex-start",
                      sm: "center",
                      xxxs: "flex-start",
                    },
                    cursor: "pointer",
                    width: "100%",
                    mb: "20px",
                  }}
                  onClick={() => {
                    setOpenTag(e.activeName);
                    e.func();
                  }}
                >
                  <Box sx={{ width: "auto" }}>
                    {openTag === e.activeName ? (
                      <img src={e.activeSrc} className="side-bar-icon" />
                    ) : (
                      <img src={e.unactiveSrc} className="side-bar-icon" />
                    )}
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "poppins",
                      fontSize: { xl: "15px", sm: "12px", xxxs: "10px" },
                      textAlign: "center",
                      fontWeight: `${openTag === e.activeName ? 600 : 400}`,
                      mt: { lg: "0px", sm: "5px", xxxs: "0px" },
                      ml: { lg: "12px", sm: "0px", xxxs: "8px" },
                      color: `${
                        openTag === e.activeName
                          ? "#4831D4"
                          : "secondary.dark_gray"
                      }`,
                    }}
                  >
                    {e.name}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",

                width: {
                  xl: "190px",
                  lg: "165px",
                  md: "90px",
                  sm: "90px",
                  xxxs: "165px",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "10px",
                  fontWeight: 700,
                  fontFamily: "poppins",
                  color: "#2582E3",
                  mb: "10px",
                }}
              >
                Other
              </Typography>
              {sideBarOther.map((e, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: { lg: "row", sm: "column", xxxs: "row" },
                    alignItems: "center",
                    justifyContent: {
                      lg: "flex-start",
                      sm: "center",
                      xxxs: "flex-start",
                    },
                    cursor: "pointer",
                    width: "100%",
                    mb: "20px",
                  }}
                  onClick={() => {
                    setOpenTag(e.activeName);
                    e.func();
                  }}
                >
                  {openTag === e.activeName ? (
                    <img src={e.activeSrc} className="other-logo" />
                  ) : (
                    <img src={e.unactiveSrc} className="other-logo" />
                  )}
                  <Typography
                    sx={{
                      fontFamily: "poppins",
                      fontSize: { xl: "15px", sm: "12px", xxxs: "10px" },
                      textAlign: "center",
                      fontWeight: `${openTag === e.activeName ? 600 : 400}`,
                      ml: { lg: "12px", sm: "0px", xxxs: "8px" },
                      color: `${
                        openTag === e.activeName
                          ? "#4831D4"
                          : "secondary.dark_gray"
                      }`,
                      mt: { lg: "0px", sm: "5px", xxxs: "0px" },
                    }}
                  >
                    {e.name}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: { lg: "row", sm: "column", xxxs: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                width: {
                  xl: "190px",
                  lg: "165px",
                  md: "90px",
                  sm: "90px",
                  xxxs: "165px",
                },
                mb: "15px",
              }}
              onClick={switchMode}
            >
              <Typography
                sx={{
                  fontSize: { xl: "15px", xxxs: "10px" },
                  fontWeight: 700,
                  fontFamily: "poppins",
                  color: "#2582E3",
                  textAlign: "center",
                  mb: { lg: "0px", sm: "5px", xxxs: "0px" },
                }}
              >
                Switch Theme
              </Typography>
              <Box
                sx={{
                  width: "34px",
                  height: "16px",
                  bgcolor: "primary.light",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: `${
                    mode === "dark" ? "flex-start" : "flex-end"
                  }`,
                  alignItems: "center",
                  padding: "2px",
                }}
              >
                <Box
                  component="div"
                  sx={{
                    width: "18px",
                    height: "18px",
                    bgcolor: "secondary.main",
                    borderRadius: "50%",
                  }}
                ></Box>
              </Box>
            </Box>
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                width: {
                  xl: "190px",
                  lg: "165px",
                  md: "90px",
                  sm: "90px",
                  xxxs: "165px",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xl: "15px", xxxs: "10px" },
                  fontWeight: 700,
                  fontFamily: "poppins",
                  color: "#2582E3",
                  width: "100%",
                  mb: "5px",
                }}
              >
                Our Socials
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: { lg: "row", sm: "column", xxxs: "row" },
                  alignItems: "center",
                  justifyContent: {
                    lg: "flex-start",
                    sm: "center",
                    xxxs: "flex-start",
                  },
                }}
              >
                <img
                  src="/discord.png"
                  className={`${"discord-logo"} ${
                    mode !== "dark" && "lightMode"
                  }`}
                />
                <Typography
                  sx={{
                    fontFamily: "poppins",
                    fontSize: { xl: "15px", xxxs: "12px" },
                    ml: { lg: "12px", sm: "0px", xxxs: "8px" },
                    textAlign: "center",
                    color: "secondary.dark_gray",
                  }}
                >
                  Join our Discord
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: { lg: "row", sm: "column", xxxs: "row" },
                  alignItems: "center",
                  justifyContent: {
                    lg: "flex-start",
                    sm: "center",
                    xxxs: "flex-start",
                  },
                  mt: "10px",
                }}
              >
                <img
                  src="/twitter.png"
                  className={`${"twitter-logo"} ${
                    mode !== "dark" && "lightMode"
                  }`}
                />
                <Typography
                  sx={{
                    fontFamily: "poppins",
                    fontSize: { xl: "15px", xxxs: "12px" },
                    ml: { lg: "12px", sm: "0px", xxxs: "8px" },
                    textAlign: "center",
                    color: "secondary.dark_gray",
                  }}
                >
                  Follow Twitter{" "}
                </Typography>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflow: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            bgcolor: "primary.dark_gray",
            height: "100%",
          }}
          ref={homeRef}
        >
          {!location.search && openTag === "props" && (
            <Props
              mode={mode}
              selectSports={selectSports}
              setSelectSports={setSelectSports}
              setSelectColor={setSelectColor}
              setSelectSrc={setSelectSrc}
              selectColor={selectColor}
              selectSrc={selectSrc}
            ></Props>
          )}
          {!location.search && openTag === "my-props" && (
            <MyProps
              mode={mode}
              callCompletedMyPropsApi={callCompletedMyPropsApi}
              callUpCommingMyPropsApi={callUpCommingMyPropsApi}
              callLiveMyPropsApi={callLiveMyPropsApi}
            />
          )}
          {!location.search && openTag === "my-profile" && (
            <MyProfile
              mode={mode}
              myProfileOpen={myProfileOpen}
              goRefralBonusCashRadeem={goRefralBonusCashRadeem}
              transactionHistoryOpen={transactionHistoryOpen}
              goDepositNewUser={goDepositNewUser}
              goAddCashBonus={goAddCashBonus}
              newUser={newUser}
              setOpenTag={setOpenTag}
            />
          )}
          {!location.search && openTag === "transaction-history" && (
            <TransactionHistory mode={mode} />
          )}
          {!location.search && openTag === "know-more" && (
            <KnowMore setOpenInviteFriend={setOpenInviteFriend} mode={mode} />
          )}
          {!location.search && openTag === "email-prefrence" && (
            <EmailPrefrence setOpenTag={setOpenTag} />
          )}

          {location.search === "?deposit=old-user" && <AddCash mode={mode} />}
          {location.search === "?deposit=new&page=verify" && (
            <NewAddCashVerify mode={mode} />
          )}
          {location.search === "?deposit=new&page=form" && (
            <NewAddCashForm
              address={address}
              mode={mode}
              setNewUser={setNewUser}
            />
          )}
          {location.search === "?deposit=new&page=address" && (
            <Address setAddress={setAddress} mode={mode} />
          )}
          {location.search === "?deposit=new&page=add-address" && (
            <AddAddress setAddress={setAddress} mode={mode} />
          )}
          {location.search === "?deposit=go-refral-bonus-cash-randoom" && (
            <>
              {enterReferalCodeDataCommingFromApi ? (
                <RefralBonusCashRandoom
                  setNumber={setNumber}
                  number={number}
                  setOpenTag={setOpenTag}
                />
              ) : (
                <LoadingSpinnerEachSection />
              )}
            </>
          )}
          {location.search === "?deposit=verify-phone-number-code" && (
            <VerifyPhoneNumberCode number={number} mode={mode} />
          )}
          {location.search === "?deposit=refral-bonus-cash-code" && (
            <RefralBonusCashCode />
          )}
          {!location.search && openTag === "support-chat" && (
            <SupportChat mode={mode} />
          )}
        </Box>
      </Box>
      {openInviteFriend && (
        <BonusOffer setOpenInviteFriend={setOpenInviteFriend} mode={mode} />
      )}
    </div>
  );
}
