import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./profile.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ProfileComplete from "./ProfileComplete";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import WithDrawCash from "./WithDrawCash";
import ChooseAWithDraw from "./ChooseAWithDraw";
import StandardECheck from "./StandardECheck";
import MyWithDraw from "./MyWithDraw";
import ReferalHistory from "./ReferalHistory";
import PaperECheck from "./PaperECheck";
import SelectAddressPaperCheck from "./SelectAddressPaperCheck";
import AddPhoneNumber from "../AddPhoneNumber/AddPhoneNumber";
import VerifycationCode from "../AddPhoneNumber/VerifycationCode";
import AccountSetup from "./AccountSetup";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";
import { useSelector } from "react-redux";
import { addPropsDataCommingFromApi } from "../../feature/userSlice";
import AddAddress from "../Identity/AddAddress";
import { APIURLs } from "../../api/ApiUrls";
import { makeGETAPICall } from "../../api/methods";

export default function MyProfile({
  mode,
  myProfileOpen,
  goRefralBonusCashRadeem,
  transactionHistoryOpen,
  newUser,
  goDepositNewUser,
  goAddCashBonus,
  callProfileApi,
  updateGetUserById,
  scrollTop,
}) {
  const fs = useSelector((state) => state.user.fs);
  const [openTag, setOpenTag] = useState("profile");
  const [enterDollarAmount, setEnterDollarAmount] = useState("");

  const [wallet, setWallet] = useState([
    {
      name: "Total Won Cash",
      amount: "$0",
      paragraph:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vulputate amet aliquet ",
    },
    {
      name: "Total Unused Cash",
      amount: "$0",
      paragraph:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vulputate amet aliquet ",
    },
    {
      name: "Contest Bonus Cash",
      amount: "$0",
      paragraph:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vulputate amet aliquet ",
    },
    {
      name: "O/U & P/B Bonus",
      amount: "$0",
      paragraph:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vulputate amet aliquet ",
    },
  ]);
  const [withdrawCashData, setWithdrawCashData] = useState(null);
  const [alreadyChooseWithDraw, setAlreadyChooseWithDraw] = useState(null);
  const openWithDrawCash = async () => {
    setWithdrawCashData(null);
    setAlreadyChooseWithDraw(null);
    setOpenTag("WithDrawCash");
    setEnterDollarAmount("");
    setAddress(null);
    await getWithdrawCashFunc()
      .then((res) => {
        if (res) {
          // console.log(res);
          setWithdrawCashData(res);
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };
  const openMyWithDraw = () => {
    setOpenTag("myWithDraw");
  };

  const goDeposit = () => {
    if (newUser) {
      goDepositNewUser();
    } else {
      goAddCashBonus();
    }
  };
  useEffect(() => {
    if (openTag) {
      scrollTop();
    }
  }, [openTag]);
  const [info, setInfo] = useState([
    {
      name: "Deposit",
      note: "Credit Card (Visa, Master, Discover)",
      icon: "/upload1.svg",
      func: goDeposit,
    },
    {
      name: "Withdraw Cash",
      note: "Credit Card (Visa, Master, Discover)",
      func: openWithDrawCash,
      icon: "/deposit1.svg",
    },
    {
      name: "My Withdrawals",
      note: "Credit Card (Visa, Master, Discover)",
      func: openMyWithDraw,
      icon: "/withdrawal1.svg",
    },
    {
      name: "Transaction History",
      note: "",
      icon: "/transcationHistoryActive.svg",
      func: transactionHistoryOpen,
    },
  ]);
  const [history, setHistory] = useState([
    {
      firstAmount: "0",
      firstCondition: "Over-Under",
      firstWin: "Wins",
      secondAmount: "$50",
      secondCondition: "Over-Under",
      secondWin: "Wins",
    },
    {
      firstAmount: "0",
      firstCondition: "Over-Under",
      firstWin: "Wins",
      secondAmount: "$50",
      secondCondition: "Over-Under",
      secondWin: "Wins",
    },
  ]);

  const [openReferalHistory, setOpenReferalHistory] = useState(false);

  const [address, setAddress] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [phoneNumberFromRedux, setPhoneNumberFromRedux] = useState(null);
  const [phoneNumberVerified, setPhoneNumberVerified] = useState(false);
  const [verify, setVerify] = useState(false);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);
  const myAccountDataCommingFromApi = useSelector(
    (state) => state.user.myAccountDataCommingFromApi
  );
  const [completePercent, setCompletePercent] = useState(0);

  useEffect(() => {
    if (myAccountDataCommingFromApi) {
      console.log(myAccountDataCommingFromApi);
      setPhoneNumberFromRedux(null);
      setPhoneNumberVerified(myAccountDataCommingFromApi.phoneNumberVerified);
      let deposit = myAccountDataCommingFromApi.firstDeposit;
      let phone = myAccountDataCommingFromApi.phoneNumberVerified;
      let account =
        myAccountDataCommingFromApi.dobQuestion &&
        myAccountDataCommingFromApi.idpVerified;
      setVerify(false);
      if (phone) {
        setPhoneNumberFromRedux(myAccountDataCommingFromApi.phoneNumber);
      }
      if (deposit && phone && account) {
        setCompletePercent(100);
        setVerify(true);
      } else if (deposit && phone) {
        setCompletePercent(80);
      } else if (deposit && account) {
        setCompletePercent(80);
      } else if (phone && account) {
        setCompletePercent(80);
      } else if (deposit) {
        setCompletePercent(40);
      } else if (phone) {
        setCompletePercent(40);
      } else if (account) {
        setCompletePercent(40);
      } else {
        setCompletePercent(0);
      }
    }
  }, [myAccountDataCommingFromApi]);
  const [clickedRefral, setClickedRefral] = useState(false);
  const checkRefralBonusCashRedeem = () => {
    if (phoneNumberVerified) {
      setClickedRefral(false);
      goRefralBonusCashRadeem();
    } else {
      setClickedRefral(true);
      setOpenTag("add-phone-number");
    }
  };

  // withdrawcash
  const [withdrawMethod, setWithdrawMethod] = useState([]);

  const [paperCheckData, setPaperCheckData] = useState(null);
  const [standardECheckData, setStandardCheckData] = useState(null);
  const [directDepositData, setDirectDepositData] = useState(null);
  useEffect(() => {
    if (withdrawMethod.length > 0) {
      let paperArray = withdrawMethod.map((each) => {
        if (each.type === "mailbox") {
          setPaperCheckData(each);
        } else if (each.type === "bank-plus") {
          setDirectDepositData(each);
        } else {
          setStandardCheckData(each);
        }
      });
    }
  }, [withdrawMethod]);

  if (openTag === "WithDrawCash") {
    return (
      <WithDrawCash
        setOpenTag={setOpenTag}
        alreadyChooseWithDraw={alreadyChooseWithDraw}
        mode={mode}
        enterDollarAmount={enterDollarAmount}
        setEnterDollarAmount={setEnterDollarAmount}
        address={address}
        withdrawCashData={withdrawCashData}
        paperCheckData={paperCheckData}
        standardECheckData={standardECheckData}
        directDepositData={directDepositData}
        withdrawMethod={withdrawMethod}
        updateGetUserById={updateGetUserById}
      />
    );
  } else if (openTag === "chooseAWithdrawMethod") {
    return (
      <ChooseAWithDraw
        setOpenTag={setOpenTag}
        enterDollarAmount={enterDollarAmount}
        setAlreadyChooseWithDraw={setAlreadyChooseWithDraw}
        withdrawMethod={withdrawMethod}
        setWithdrawMethod={setWithdrawMethod}
        setAddress={setAddress}
      />
    );
  } else if (openTag === "standardECheck") {
    return (
      <StandardECheck
        setOpenTag={setOpenTag}
        setAlreadyChooseWithDraw={setAlreadyChooseWithDraw}
        withdrawMethod={withdrawMethod}
        standardECheckData={standardECheckData}
      />
    );
  } else if (openTag === "paperECheck") {
    return (
      <PaperECheck
        setOpenTag={setOpenTag}
        setAlreadyChooseWithDraw={setAlreadyChooseWithDraw}
        address={address}
        setAddress={setAddress}
        withdrawMethod={withdrawMethod}
        paperCheckData={paperCheckData}
      />
    );
  } else if (openTag === "select-address-paper-check") {
    return (
      <SelectAddressPaperCheck
        setOpenTag={setOpenTag}
        setAddress={setAddress}
      />
    );
  } else if (openTag === "addAddress") {
    return (
      <AddAddress mode={mode} openInMyAccount={true} setOpenTag={setOpenTag} />
    );
  } else if (openTag === "myWithDraw") {
    return <MyWithDraw mode={mode} setOpenTag={setOpenTag} />;
  } else if (openTag === "add-phone-number") {
    return (
      <AddPhoneNumber
        setOpenTag={setOpenTag}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        clickedRefral={clickedRefral}
        setClickedRefral={setClickedRefral}
      />
    );
  } else if (openTag === "verifycation-code") {
    return (
      <VerifycationCode
        phoneNumber={phoneNumber}
        setVerify={setVerify}
        setOpenTag={setOpenTag}
        callProfileApi={callProfileApi}
        updateGetUserById={updateGetUserById}
        setPhoneNumber={setPhoneNumber}
      />
    );
  } else if (openTag === "account-setup") {
    return (
      <AccountSetup
        setOpenTag={setOpenTag}
        myAccountDataCommingFromApi={myAccountDataCommingFromApi}
        setClickedRefral={setClickedRefral}
      />
    );
  } else {
    return (
      <>
        {myAccountDataCommingFromApi && user ? (
          <Box
            sx={{
              width: {
                xl: "1000px",
                lg: "836px",
                md: "700px",
                sm: "560px",
                xs: "450px",
                xxxs: "90%",
              },
              height: "100vh",
              margin: "auto",
              mb: "30px",
            }}
            component="div"
          >
            {!verify && (
              <ProfileComplete
                setOpenTag={setOpenTag}
                myAccountDataCommingFromApi={myAccountDataCommingFromApi}
                completePercent={completePercent}
              />
            )}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                background: `${
                  mode === "dark" ? "rgba(217, 217, 217,0.2)" : "white"
                }`,
                py: "11px",
                mt: "21px",
                borderRadius: "4px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  ml: { xs: "21px", xxxs: "10px" },
                }}
              >
                <Typography
                  sx={{
                    width: { xs: "64px", xxxs: "35px" },
                    height: { xs: "64px", xxxs: "35px" },
                    background: "#439F48",
                    borderRadius: "50%",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {myAccountDataCommingFromApi &&
                    myAccountDataCommingFromApi.name.slice(0, 2).toUpperCase()}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    ml: { xs: "21px", xxxs: "10px" },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { sm: fs.small, xs: fs.xs, xxxs: fs.xxs },
                      fontWeight: 700,
                      fontFamily: "poppins",
                      color: "secondary.main",
                    }}
                  >
                    {myAccountDataCommingFromApi &&
                      myAccountDataCommingFromApi.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { sm: fs.small, xs: fs.xs, xxxs: fs.xxs },
                      fontWeight: 500,
                      fontFamily: "poppins",
                      color: "secondary.main",
                      mt: "2px",
                    }}
                  >
                    {myAccountDataCommingFromApi &&
                      myAccountDataCommingFromApi.name &&
                      myAccountDataCommingFromApi.username
                        .split(" ")
                        .join("")
                        .toLowerCase()}
                  </Typography>
                </Box>
              </Box>
              <Button
                sx={{
                  color: "white",
                  fontSize: { sm: fs.xs, xs: fs.xxs, xxxs: fs.xxxs },
                  fontWeight: 500,
                  fontFamily: "poppins",
                  padding: "7px 24px",
                  background: "#4831D4",
                  mr: { xs: "35px", xxxs: "10px" },
                  "&.MuiButtonBase-root:hover": {
                    background: "#4831D4",
                  },
                  textTransform: "none",
                }}
                onClick={goDepositNewUser}
              >
                Add Cash
              </Button>
            </Box>
            <Box
              sx={{
                width: "95%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                py: "11px",
                margin: "0 auto",
                mb: "16px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { sm: fs.small, xs: fs.xs, xxxs: fs.xxs },
                    fontWeight: 500,
                    fontFamily: "poppins",
                    color: "secondary.dark_gray",
                  }}
                >
                  Email{" "}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { sm: fs.small, xs: fs.xs, xxxs: fs.xxs },
                    fontWeight: 500,
                    fontFamily: "poppins",
                    color: "secondary.dark_gray",
                    mt: "11px",
                  }}
                >
                  {user && user.email}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  ml: "21px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { sm: fs.small, xs: fs.xs, xxxs: fs.xxs },
                    fontWeight: 500,
                    fontFamily: "poppins",
                    color: "secondary.dark_gray",
                    mb: "5px",
                  }}
                >
                  Phone Number{" "}
                </Typography>
                {phoneNumberVerified ? (
                  <Typography
                    sx={{
                      fontSize: { sm: fs.small, xs: fs.xs, xxxs: fs.xxs },
                      fontWeight: 500,
                      fontFamily: "poppins",
                      color: "secondary.dark_gray",
                      mt: "11px",
                    }}
                  >
                    {phoneNumberFromRedux}
                  </Typography>
                ) : (
                  <Button
                    sx={{
                      color: "white",
                      fontSize: { sm: fs.xs, xs: fs.xxs, xxxs: fs.xxxs },
                      fontWeight: 500,
                      fontFamily: "poppins",
                      background: "#4831D4",
                      padding: { xs: "7px 24px", xxxs: "5px 10px" },
                      "&.MuiButtonBase-root:hover": {
                        background: "#4831D4",
                      },
                      textTransform: "none",
                    }}
                    onClick={() => {
                      setClickedRefral(false);
                      setOpenTag("add-phone-number");
                    }}
                  >
                    Add Phone Number{" "}
                  </Button>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                background: `${
                  mode === "dark" ? "rgba(217, 217, 217,0.2)" : "#d9d9d9"
                }`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "4px",
              }}
            >
              <Typography
                sx={{
                  fontSize: { sm: fs.normal, xs: fs.small, xxxs: fs.xs },
                  fontWeight: 700,
                  fontFamily: "poppins",
                  color: "secondary.dark_gray",
                  width: "100%",
                  mt: "9px",
                  mb: "12px",
                  width: "95%",
                }}
              >
                Wallet{" "}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  bgcolor: "primary.main",
                  width: "95%",
                  py: "19px",
                  borderRadius: "4px",
                  mb: "8px",
                  position: "relative",
                }}
              >
                <img src="/winning.png" className="winningImage" />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { sm: fs.small, xs: fs.xs, xxxs: fs.xxs },
                      fontWeight: 700,
                      fontFamily: "poppins",
                      color: "secondary.dark_gray",
                    }}
                  >
                    Your Winnings{" "}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { sm: fs.xxs, xs: fs.xxxs, xxxs: "6px" },
                      fontWeight: 400,
                      fontFamily: "poppins",
                      color: "secondary.dark_gray",
                      mt: "4px",
                      maxWidth: "60%",
                    }}
                  >
                    Withdraw eligible cash. If unused cash is not available,
                    cash from here is used to join game plays
                  </Typography>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    right: { sm: "50px", xxxs: "20px" },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { sm: fs.large, xs: fs.normal, xxxs: fs.small },
                      fontWeight: 700,
                      fontFamily: "poppins",
                      color: "#459F48",
                    }}
                  >
                    ${myAccountDataCommingFromApi.numCash}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  bgcolor: "transparent",
                  width: "95%",
                  py: "10px",
                  borderRadius: "4px",
                  mb: "8px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    borderRadius: "4px",
                    fontSize: { sm: fs.normal, xs: fs.small, xxxs: fs.xs },
                    fontWeight: 700,
                    fontFamily: "poppins",
                  }}
                >
                  Total Available Cash
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    borderRadius: "4px",
                    fontSize: { sm: fs.normal, xs: fs.small, xxxs: fs.xs },
                    fontWeight: 700,
                    fontFamily: "poppins",
                  }}
                >
                  $
                  {(
                    Number(myAccountDataCommingFromApi.numCash) +
                    Number(
                      myAccountDataCommingFromApi.unutilizedCash
                        ? myAccountDataCommingFromApi.unutilizedCash
                        : 0
                    ) +
                    Number(myAccountDataCommingFromApi.numOUBonusCash)
                  ).toFixed(2)}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "95%",
                  mb: "19px",
                  flexWrap: "wrap",
                }}
              >
                <Box
                  sx={{
                    width: { xs: "28%", xxxs: "65%" },
                    height: "195px",
                    bgcolor: "primary.main",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: "4px",
                    mt: { xs: 0, xxxs: "5px" },
                    ml: "10px",
                    mr: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { sm: fs.xs, xs: fs.xxs, xxxs: fs.xxxs },
                      fontWeight: 600,
                      fontFamily: "poppins",
                      color: "secondary.dark_gray",
                      mt: "27px",
                      mb: "16px",
                    }}
                  >
                    Total Unused Cash
                  </Typography>
                  {myAccountDataCommingFromApi.unutilizedCash ? (
                    <Typography
                      sx={{
                        fontSize: { sm: "30px", xs: "28px", xxxs: "26px" },
                        fontWeight: 700,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mb: "16px",
                      }}
                    >
                      ${myAccountDataCommingFromApi.unutilizedCash.toFixed(2)}
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: { sm: "30px", xs: "28px", xxxs: "26px" },
                        fontWeight: 700,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mb: "16px",
                      }}
                    >
                      $0
                    </Typography>
                  )}

                  <Typography
                    sx={{
                      fontSize: { sm: fs.xxs, xs: fs.xxxs, xxxs: "6px" },
                      fontWeight: 400,
                      fontFamily: "poppins",
                      color: "secondary.dark_gray",
                      mb: "26px",
                      maxWidth: "90%",

                      textAlign: "center",
                    }}
                  >
                    Cash deposited that is yet to be used to play.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: { xs: "28%", xxxs: "65%" },
                    height: "195px",
                    bgcolor: "primary.main",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: "4px",
                    mt: { xs: 0, xxxs: "5px" },
                    ml: "10px",
                    mr: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { sm: fs.xs, xs: fs.xxs, xxxs: fs.xxxs },
                      fontWeight: 600,
                      fontFamily: "poppins",
                      color: "secondary.dark_gray",
                      mt: "27px",
                      mb: "16px",
                    }}
                  >
                    Bonus Cash
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { sm: "30px", xs: "28px", xxxs: "26px" },
                      fontWeight: 700,
                      fontFamily: "poppins",
                      color: "secondary.dark_gray",
                      mb: "16px",
                    }}
                  >
                    ${myAccountDataCommingFromApi.numOUBonusCash}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { sm: fs.xxs, xs: fs.xxxs, xxxs: "6px" },
                      fontWeight: 400,
                      fontFamily: "poppins",
                      color: "secondary.dark_gray",
                      mb: "26px",
                      maxWidth: "90%",

                      textAlign: "center",
                    }}
                  >
                    Cash that can be used 100% for above-below & player-battle.
                    Cannot be withdrawn.
                  </Typography>
                </Box>
              </Box>
            </Box>
            {info.map((e, index) => (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "0 auto",
                  borderBottom: "1px solid #494949",
                  cursor: "pointer",
                  py: "4px",
                }}
                onClick={e.func}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    ml: "10px",
                  }}
                >
                  <img src={e.icon} className="depositIcon svg-blue" />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      ml: "24px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { sm: fs.small, xs: fs.xs, xxxs: fs.xxs },
                        fontWeight: 400,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mt: "12px",
                        mb: "4px",
                      }}
                    >
                      {e.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { sm: fs.xs, xs: fs.xxs, xxxs: fs.xxxs },
                        fontWeight: 400,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mb: "9px",
                      }}
                    >
                      {e.note}
                    </Typography>
                  </Box>
                </Box>
                <ArrowForwardIosIcon
                  sx={{
                    color: "secondary.dark_gray",
                    fontSize: { sm: fs.large, xs: fs.normal, xxxs: fs.small },
                    mr: "10px",
                  }}
                />
              </Box>
            ))}
            <Box
              sx={{
                width: "100%",
                background: `${
                  mode === "dark"
                    ? "rgba(217, 217, 217,0.2)"
                    : "rgba(217, 217, 217,0.9)"
                }`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: "10px",
                borderRadius: "4px",
              }}
            >
              <Typography
                sx={{
                  fontSize: { sm: fs.normal, xs: fs.small, xxxs: fs.xs },
                  fontWeight: 700,
                  fontFamily: "poppins",
                  color: "secondary.dark_gray",
                  width: "100%",
                  mt: "26px",
                  mb: "12px",
                  width: "95%",
                }}
              >
                Props History{" "}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", xxxs: "column" },
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "95%",
                  mb: "26px",
                  flexWrap: "wrap",
                }}
              >
                {/* {history.map((e, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: { xs: "48%", xxxs: "90%" },
                      bgcolor: "primary.main",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      borderRadius: "4px",
                      py: "5px",
                      mt: { xs: 0, xxxs: "5px" },
                    }}
                  >
                    <Box
                      sx={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { sm: "20px", xs: "18px", xxxs: "16px" },
                          fontWeight: 700,
                          fontFamily: "poppins",
                          color: "secondary.dark_gray",
                          mt: "14px",
                        }}
                      >
                        {myAccountDataCommingFromApi.numOUWin}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { sm: "10px", xs: "8px", xxxs: "6px" },
                          fontWeight: 400,
                          fontFamily: "poppins",
                          color: "secondary.dark_gray",
                          mb: "4px",
                          maxWidth: "90%",
                          mt: "4px",
                          color: "secondary.dark_gray",

                          textAlign: "center",
                        }}
                      >
                        Over-Under
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { sm: "12px", xs: "10px", xxxs: "8px" },
                          fontWeight: 600,
                          fontFamily: "poppins",
                          color: "secondary.dark_gray",
                          mb: "13px",
                        }}
                      >
                        Wins
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        borderLeft: `${
                          mode === "dark"
                            ? "1px solid #494949"
                            : "1px solid #dbdbdb"
                        }`,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { sm: "20px", xs: "18px", xxxs: "16px" },
                          fontWeight: 700,
                          fontFamily: "poppins",
                          color: "#459F48",
                          mt: "14px",
                        }}
                      >
                        ${myAccountDataCommingFromApi.ouWonAmount}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { sm: "10px", xs: "8px", xxxs: "6px" },
                          fontWeight: 400,
                          fontFamily: "poppins",
                          color: "secondary.dark_gray",
                          mb: "4px",
                          maxWidth: "90%",
                          mt: "4px",

                          textAlign: "center",
                        }}
                      >
                        Over-Under
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { sm: "12px", xs: "10px", xxxs: "8px" },
                          fontWeight: 600,
                          fontFamily: "poppins",
                          color: "secondary.dark_gray",
                          mb: "13px",
                        }}
                      >
                        Wins
                      </Typography>
                    </Box>
                  </Box>
                ))} */}
                <Box
                  sx={{
                    width: { xs: "48%", xxxs: "90%" },
                    bgcolor: "primary.main",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: "4px",
                    py: "5px",
                    mt: { xs: 0, xxxs: "5px" },
                  }}
                >
                  <Box
                    sx={{
                      width: "50%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          sm: fs.x_large,
                          xs: fs.large,
                          xxxs: fs.normal,
                        },
                        fontWeight: 700,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mt: "14px",
                      }}
                    >
                      {myAccountDataCommingFromApi.numOUWin}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { sm: fs.xxs, xs: fs.xxxs, xxxs: "6px" },
                        fontWeight: 400,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mb: "4px",
                        maxWidth: "90%",
                        mt: "4px",
                        color: "secondary.dark_gray",

                        textAlign: "center",
                      }}
                    >
                      Over-Under
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { sm: fs.xs, xs: fs.xxs, xxxs: fs.xxxs },
                        fontWeight: 600,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mb: "13px",
                      }}
                    >
                      Wins
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "50%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      borderLeft: `${
                        mode === "dark"
                          ? "1px solid #494949"
                          : "1px solid #dbdbdb"
                      }`,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          sm: fs.x_large,
                          xs: fs.large,
                          xxxs: fs.normal,
                        },
                        fontWeight: 700,
                        fontFamily: "poppins",
                        color: "#459F48",
                        mt: "14px",
                      }}
                    >
                      ${myAccountDataCommingFromApi.ouWonAmount}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { sm: fs.xxs, xs: fs.xxxs, xxxs: "6px" },
                        fontWeight: 400,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mb: "4px",
                        maxWidth: "90%",
                        mt: "4px",

                        textAlign: "center",
                      }}
                    >
                      Over-Under
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { sm: fs.xs, xs: fs.xxs, xxxs: fs.xxxs },
                        fontWeight: 600,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mb: "13px",
                      }}
                    >
                      Wins
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: { xs: "48%", xxxs: "90%" },
                    bgcolor: "primary.main",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: "4px",
                    py: "5px",
                    mt: { xs: 0, xxxs: "5px" },
                  }}
                >
                  <Box
                    sx={{
                      width: "50%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          sm: fs.x_large,
                          xs: fs.large,
                          xxxs: fs.normal,
                        },
                        fontWeight: 700,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mt: "14px",
                      }}
                    >
                      {myAccountDataCommingFromApi.numWins}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { sm: fs.xxs, xs: fs.xxxs, xxxs: "6px" },
                        fontWeight: 400,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mb: "4px",
                        maxWidth: "90%",
                        mt: "4px",
                        color: "secondary.dark_gray",

                        textAlign: "center",
                      }}
                    >
                      Player-Battle
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { sm: fs.xs, xs: fs.xxs, xxxs: fs.xxxs },
                        fontWeight: 600,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mb: "13px",
                      }}
                    >
                      Wins
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "50%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      borderLeft: `${
                        mode === "dark"
                          ? "1px solid #494949"
                          : "1px solid #dbdbdb"
                      }`,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          sm: fs.x_large,
                          xs: fs.large,
                          xxxs: fs.normal,
                        },
                        fontWeight: 700,
                        fontFamily: "poppins",
                        color: "#459F48",
                        mt: "14px",
                      }}
                    >
                      ${myAccountDataCommingFromApi.pbWonAmount}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { sm: fs.xxs, xs: fs.xxxs, xxxs: "6px" },
                        fontWeight: 400,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mb: "4px",
                        maxWidth: "90%",
                        mt: "4px",

                        textAlign: "center",
                      }}
                    >
                      Player-Battle
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { sm: fs.xs, xs: fs.xxs, xxxs: fs.xxxs },
                        fontWeight: 600,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mb: "13px",
                      }}
                    >
                      Wins
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography
                sx={{
                  fontSize: { sm: fs.normal, xs: fs.small, xxxs: fs.xs },
                  fontWeight: 700,
                  fontFamily: "poppins",
                  color: "secondary.dark_gray",
                  width: "100%",
                  mb: "10px",
                  width: "95%",
                }}
              >
                Invite{" "}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "0 auto",
                borderBottom: "1px solid #494949",
                mt: "26px",
                pb: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <img src="/dollar.png" className="dollarImg" />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    ml: { xs: "15px", xxxs: "15px" },
                    maxWidth: "80%",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { sm: fs.small, xs: fs.xs, xxxs: fs.xxs },
                      fontWeight: 400,
                      fontFamily: "poppins",
                      color: "secondary.dark_gray",
                      mt: "12px",
                      mb: "4px",
                    }}
                  >
                    Invite your friends and earn $5 cash when they join, Share
                    the below referral code with your friends{" "}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        sm: fs.xxx_large,
                        xs: fs.xx_large,
                        xxxs: fs.x_large,
                      },
                      fontWeight: 700,
                      fontFamily: "poppins",
                      color: "secondary.dark_gray",
                    }}
                  >
                    {myAccountDataCommingFromApi.referralCode}
                  </Typography>
                </Box>
              </Box>

              <ArrowForwardIosIcon
                sx={{
                  color: "secondary.dark_gray",
                  fontSize: { sm: fs.large, xs: fs.normal, xxxs: fs.small },
                  mr: "10px",
                }}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #494949",
                margin: "0 auto",
                mt: "13px",
                pb: "9px",
                cursor: "pointer",
              }}
              onClick={() => setOpenReferalHistory(true)}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <img src="/group.png" className="groupImage" />
                <Typography
                  sx={{
                    fontSize: { sm: fs.small, xs: fs.xs, xxxs: fs.xxs },
                    fontWeight: 400,
                    fontFamily: "poppins",
                    color: "secondary.dark_gray",
                    ml: { xs: "26px", xxxs: "10px" },
                  }}
                >
                  Referral History
                </Typography>
              </Box>
              <ArrowForwardIosIcon
                sx={{
                  color: "secondary.dark_gray",
                  fontSize: { sm: fs.large, xs: fs.normal, xxxs: fs.small },
                  mr: "10px",
                }}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #494949",
                margin: "0 auto",
                mt: "13px",
                pb: "9px",
                cursor: "pointer",
              }}
              onClick={checkRefralBonusCashRedeem}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <img src="/gift.png" className="groupImage" />
                <Typography
                  sx={{
                    fontSize: { sm: fs.small, xs: fs.xs, xxxs: fs.xxs },
                    fontWeight: 400,
                    fontFamily: "poppins",
                    color: "secondary.dark_gray",
                    ml: { xs: "26px", xxxs: "10px" },
                  }}
                >
                  Redeem Referral Code{" "}
                </Typography>
              </Box>
              <ArrowForwardIosIcon
                sx={{
                  color: "secondary.dark_gray",
                  fontSize: { sm: fs.large, xs: fs.normal, xxxs: fs.small },
                  mr: "10px",
                }}
              />
            </Box>
            <Box sx={{ mt: "50px", width: "100%", height: "1px" }}></Box>
            {openReferalHistory && (
              <ReferalHistory
                setOpenReferalHistory={setOpenReferalHistory}
                mode={mode}
              />
            )}
          </Box>
        ) : (
          <LoadingSpinnerEachSection />
        )}
      </>
    );
  }
}

//get withdraw cash
export const getWithdrawCashFunc = async () => {
  var apiUrl = APIURLs.getWithdrawCash;
  // apiUrl = apiUrl.replace("{propId}", propId);
  const apiResponse = await makeGETAPICall(apiUrl);
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return null;
  }
};
