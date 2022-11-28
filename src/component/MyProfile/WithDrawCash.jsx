import React, { useContext } from "react";
import "./profile.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Input } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Success from "./Success";
import Wrong from "./Wrong";
import { useSelector } from "react-redux";
export default function WithDrawCash({
  setOpenTag,
  alreadyChooseWithDraw,
  mode,
  setEnterDollarAmount,
  enterDollarAmount,
  address,
}) {
  const fs = useSelector((state) => state.user.fs);
  const user = useSelector((state) => state.user.user);
  const myAccountDataCommingFromApi = useSelector(
    (state) => state.user.myAccountDataCommingFromApi
  );
  const [note, setNote] = useState([
    {
      note: "Once you request a withdrawal, it takes our Compliance Team around 1-2 business days to review it. ",
    },
    {
      note: "Once approved, you will be notified to complete your withdrawal. ",
    },
    {
      note: "When possible, we first refund all the deposits back to the card used. Any remaining balance after the deposits have been refunded will be delivered to your requested withdraw method. ",
    },
    {
      note: "One time playthrough of deposit & bonus cash is required before requesting a withdrawal. ",
    },
    { note: "Minimum withdrawal is $20 " },
  ]);

  const [exceed, setExceed] = useState(null);
  const exceedCheck = (e) => {
    console.log(e.target.value);
    if (e.target.value > myAccountDataCommingFromApi.numCash) {
      setExceed(
        `Maximum withdraw amount is $${myAccountDataCommingFromApi.numCash}`
      );
    } else if (e.target.value < 20) {
      setExceed(`Minium withdraw amount is $20`);
    } else {
      setExceed(null);
    }
  };

  const goChooseWidthDrawPage = () => {
    setOpenTag("chooseAWithdrawMethod");
  };

  const [confirm, setConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [wrong, setWrong] = useState(false);

  const openConfirm = () => {
    setConfirm(true);
  };

  const [startAnimation, setStartAnimation] = useState(false);
  const goSuccess = () => {
    setTimeout(() => {
      setStartAnimation(false);
      setConfirm(false);
      setSuccess(true);
    }, 2000);
  };
  return (
    <Box
      sx={{
        width: {
          lg: "836px",
          md: "700px",
          sm: "560px",
          xs: "90%",
          xxxs: "90%",
        },
        margin: "auto",
        mt: "10px",
        mb: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      component="div"
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          mt: "15px",
          cursor: "pointer",
        }}
        onClick={() => setOpenTag("profile")}
      >
        <ArrowBackIosNewIcon sx={{ color: "secondary.dark_gray" }} />
        <Typography
          sx={{
            fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
            fontWeight: 600,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
            ml: "15px",
          }}
        >
          Withdraw Cash
        </Typography>
      </Box>

      <Typography
        sx={{
          fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
          fontWeight: 400,
          fontFamily: "poppins",
          color: "secondary.dark_gray",
          width: "100%",
          mt: "16px",
        }}
      >
        How much would you like to withdraw?{" "}
      </Typography>
      <Typography
        sx={{
          fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
          fontWeight: 600,
          fontFamily: "poppins",
          color: "secondary.dark_gray",
          width: "100%",
          mt: "10px",
        }}
      >
        Enter Amount{" "}
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          mt: "5px",
        }}
      >
        <Typography
          sx={{
            fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
          }}
        >
          Available cash to withdraw -{" "}
        </Typography>{" "}
        {myAccountDataCommingFromApi && (
          <Typography
            sx={{
              fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
              fontWeight: 600,
              fontFamily: "poppins",
              color: "#459F48",
              ml: "4px",
            }}
          >
            $
            {myAccountDataCommingFromApi && myAccountDataCommingFromApi.numCash}
          </Typography>
        )}
      </Box>
      {alreadyChooseWithDraw ? (
        <>
          {alreadyChooseWithDraw === "standard-eCheck" && (
            <>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  mt: "13px",
                }}
              >
                <Input
                  type="number"
                  placeholder="25000"
                  sx={{
                    width: "100%",
                    borderBottom: "1px solid #494949",
                    color: "secondary.dark_gray",
                    fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
                    fontWeight: 500,
                  }}
                  value={enterDollarAmount}
                  onChange={(e) => {
                    exceedCheck(e);
                    setEnterDollarAmount(e.target.value);
                  }}
                />
              </Box>
              {exceed && (
                <Box
                  sx={{
                    width: "100%",
                    height: "49px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {exceed && <ClearIcon sx={{ color: "#E4313C" }} />}
                  {exceed && (
                    <Typography
                      sx={{
                        fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                        fontWeight: 300,
                        fontFamily: "poppins",
                        color: "#E4313C",
                        ml: "12px",
                      }}
                    >
                      {exceed}
                    </Typography>
                  )}
                </Box>
              )}
              {enterDollarAmount && !exceed && (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-between",
                    mt: "24px",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenTag("chooseAWithdrawMethod")}
                >
                  <Box
                    sx={{
                      width: "95%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/credit-card1.svg"
                      className="chooseIcon svg-blue"
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        width: "90%",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: {
                            sm: fs.normal,
                            xxs: fs.small,
                            xxxs: fs.xs,
                          },
                          fontWeight: 600,
                          fontFamily: "poppins",
                          color: "secondary.dark_gray",
                          width: "100%",
                          mb: "4px",
                        }}
                      >
                        Withdrawing to Standard eCheck{" "}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                          fontWeight: 400,
                          fontFamily: "poppins",
                          color: "secondary.dark_gray",
                          width: "100%",
                          mb: "4px",
                          width: { sm: "40%", xxxs: "80%" },
                        }}
                      >
                        Standard eCheck delivery to {user && user.email}
                      </Typography>
                    </Box>
                  </Box>
                  <ArrowForwardIosIcon />
                </Box>
              )}
              {enterDollarAmount && !exceed && (
                <Button
                  sx={{
                    fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                    fontWeight: 600,
                    fontFamily: "poppins",
                    color: "white",
                    background: "#4831D4",
                    padding: "14px 77px",
                    mt: "32px",
                    borderRadius: "8px",
                    textTransform: "none",

                    "&.MuiButtonBase-root:hover": {
                      background: "#4831D4",
                    },
                  }}
                  onClick={openConfirm}
                >
                  Submit Request{" "}
                </Button>
              )}
            </>
          )}
          {alreadyChooseWithDraw === "paper-eCheck" && (
            <>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  mt: "13px",
                }}
              >
                <Input
                  type="number"
                  placeholder="25000"
                  sx={{
                    width: "100%",
                    borderBottom: "1px solid #494949",
                    color: "secondary.dark_gray",
                    fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
                    fontWeight: 500,
                  }}
                  value={enterDollarAmount}
                  onChange={(e) => {
                    exceedCheck(e);
                    setEnterDollarAmount(e.target.value);
                  }}
                />
              </Box>
              {exceed && (
                <Box
                  sx={{
                    width: "100%",
                    height: "49px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {exceed && <ClearIcon sx={{ color: "#E4313C" }} />}
                  {exceed && (
                    <Typography
                      sx={{
                        fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                        fontWeight: 300,
                        fontFamily: "poppins",
                        color: "#E4313C",
                        ml: "12px",
                      }}
                    >
                      {exceed}
                    </Typography>
                  )}
                </Box>
              )}
              {enterDollarAmount && !exceed && (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-between",
                    mt: "24px",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenTag("chooseAWithdrawMethod")}
                >
                  <Box
                    sx={{
                      width: "95%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/credit-card1.svg"
                      className="chooseIcon svg-blue"
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        width: "90%",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: {
                            sm: fs.normal,
                            xxs: fs.small,
                            xxxs: fs.xs,
                          },
                          fontWeight: 600,
                          fontFamily: "poppins",
                          color: "secondary.dark_gray",
                          width: "100%",
                          mb: "4px",
                        }}
                      >
                        Withdrawing to Paper Check{" "}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                          fontWeight: 400,
                          fontFamily: "poppins",
                          color: "secondary.dark_gray",
                          width: "100%",
                          mb: "4px",
                          width: { sm: "40%", xxxs: "80%" },
                        }}
                      >
                        Standard Paper Check delivery to{" "}
                        {address.address.addrLine1 +
                          " " +
                          address.address.addrLine2 +
                          " " +
                          address.address.addrCity +
                          ", " +
                          address.address.addrState +
                          ", " +
                          address.address.addrZip}
                      </Typography>
                    </Box>
                  </Box>
                  <ArrowForwardIosIcon />
                </Box>
              )}
              {enterDollarAmount && !exceed && (
                <Button
                  sx={{
                    fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                    fontWeight: 600,
                    fontFamily: "poppins",
                    color: "white",
                    background: "#4831D4",
                    padding: "14px 77px",
                    mt: "32px",
                    borderRadius: "8px",
                    textTransform: "none",

                    "&.MuiButtonBase-root:hover": {
                      background: "#4831D4",
                    },
                  }}
                  onClick={openConfirm}
                >
                  Submit Request{" "}
                </Button>
              )}
            </>
          )}
          {alreadyChooseWithDraw === "direct-deposit" && (
            <>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  mt: "13px",
                }}
              >
                <Input
                  type="number"
                  placeholder="25000"
                  sx={{
                    width: "100%",
                    borderBottom: "1px solid #494949",
                    color: "secondary.dark_gray",
                    fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
                    fontWeight: 500,
                  }}
                  value={enterDollarAmount}
                  onChange={(e) => {
                    exceedCheck(e);
                    setEnterDollarAmount(e.target.value);
                  }}
                />
              </Box>
              {exceed && (
                <Box
                  sx={{
                    width: "100%",
                    height: "49px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {exceed && <ClearIcon sx={{ color: "#E4313C" }} />}
                  {exceed && (
                    <Typography
                      sx={{
                        fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                        fontWeight: 300,
                        fontFamily: "poppins",
                        color: "#E4313C",
                        ml: "12px",
                      }}
                    >
                      {exceed}
                    </Typography>
                  )}
                </Box>
              )}
              {enterDollarAmount && !exceed && (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-between",
                    mt: "24px",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenTag("chooseAWithdrawMethod")}
                >
                  <Box
                    sx={{
                      width: "95%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/credit-card1.svg"
                      className="chooseIcon svg-blue"
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        width: "90%",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: {
                            sm: fs.normal,
                            xxs: fs.small,
                            xxxs: fs.xs,
                          },
                          fontWeight: 600,
                          fontFamily: "poppins",
                          color: "secondary.dark_gray",
                          width: "100%",
                          mb: "4px",
                        }}
                      >
                        Withdrawing to Direct Deposit{" "}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: {
                            sm: fs.small,
                            xxs: fs.xs,
                            xxxs: fs.xxs,
                          },
                          fontWeight: 400,
                          fontFamily: "poppins",
                          color: "secondary.dark_gray",
                          width: "100%",
                          mb: "4px",
                          width: { sm: "40%", xxxs: "80%" },
                        }}
                      >
                        Bank Account
                      </Typography>
                    </Box>
                  </Box>
                  <ArrowForwardIosIcon />
                </Box>
              )}
              {enterDollarAmount && !exceed && (
                <Button
                  sx={{
                    fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                    fontWeight: 600,
                    fontFamily: "poppins",
                    color: "white",
                    background: "#4831D4",
                    padding: "14px 77px",
                    mt: "32px",
                    borderRadius: "8px",
                    textTransform: "none",

                    "&.MuiButtonBase-root:hover": {
                      background: "#4831D4",
                    },
                  }}
                  onClick={openConfirm}
                >
                  Submit Request{" "}
                </Button>
              )}
            </>
          )}
        </>
      ) : (
        <form onSubmit={goChooseWidthDrawPage} style={{ width: "100%" }}>
          <Input
            placeholder="Enter dollar amount"
            sx={{
              fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
              fontWeight: 500,
              fontFamily: "poppins",
              color: "secondary.dark_gray",
              py: "10px",
              width: "100%",
              borderBottom: "1px solid #494949",
            }}
            value={enterDollarAmount}
            type="number"
            onChange={(e) => {
              exceedCheck(e);
              setEnterDollarAmount(e.target.value);
            }}
            disableUnderline
          />
          {exceed && (
            <Box
              sx={{
                width: "100%",
                height: "49px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {exceed && <ClearIcon sx={{ color: "#E4313C" }} />}
              {exceed && (
                <Typography
                  sx={{
                    fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                    fontWeight: 300,
                    fontFamily: "poppins",
                    color: "#E4313C",
                    ml: "12px",
                  }}
                >
                  {exceed}
                </Typography>
              )}
            </Box>
          )}
          {enterDollarAmount && !exceed && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-between",
                mt: "24px",
                cursor: "pointer",
              }}
              onClick={() => setOpenTag("chooseAWithdrawMethod")}
            >
              <Box
                sx={{
                  width: "95%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <img src="/credit-card1.svg" className="chooseIcon svg-blue" />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    width: "90%",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        sm: fs.normal,
                        xxs: fs.small,
                        xxxs: fs.xs,
                      },
                      fontWeight: 600,
                      fontFamily: "poppins",
                      color: "secondary.dark_gray",
                      width: "100%",
                      mb: "4px",
                    }}
                  >
                    Choose withdraw method
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        sm: fs.small,
                        xxs: fs.xs,
                        xxxs: fs.xxs,
                      },
                      fontWeight: 400,
                      fontFamily: "poppins",
                      color: "secondary.dark_gray",
                      width: "100%",
                      mb: "4px",
                      width: { sm: "40%", xxxs: "80%" },
                    }}
                  >
                    Select a withdraw method to retrieve funds from your
                    SportsBattle wallet
                  </Typography>
                </Box>
              </Box>
              <ArrowForwardIosIcon />
            </Box>
          )}
        </form>
      )}

      <Typography
        sx={{
          position: "relative",
          height: "1px",
          width: "100vw",
          background: "#494949",
          mt: "25px",
        }}
      ></Typography>
      <Typography
        sx={{
          fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
          fontWeight: 700,
          fontFamily: "poppins",
          color: "secondary.dark_gray",
          width: "100%",
          mt: "24px",
        }}
      >
        PLEASE NOTE!{" "}
      </Typography>
      {note.map((e, index) => (
        <Box
          key={index}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            py: "10px",
            borderBottom: "1px solid #494949",
          }}
        >
          <CheckCircleIcon
            sx={{
              color: "secondary.dark_gray",
              bgcolor: "primary.main",
              borderRadius: "50%",
            }}
          />
          <Typography
            sx={{
              fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
              fontWeight: 400,
              fontFamily: "poppins",
              color: "secondary.dark_gray",
              ml: "11px",
            }}
          >
            {e.note}
          </Typography>
        </Box>
      ))}
      {confirm && (
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            background: "rgba(0,0,0,0.9)",
            zIndex: "20",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: { sm: "673px", xs: "90%" },
              bgcolor: "primary.dark",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "8px",
            }}
          >
            <Box
              sx={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "26px",
                mb: "18px",
              }}
            >
              <Typography
                sx={{
                  fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
                  fontFamily: "poppins",
                  fontWeight: 700,
                  color: "secondary.dark_gray",
                }}
              >
                Please Confirm
              </Typography>
              <ClearIcon
                onClick={() => setConfirm(false)}
                sx={{ cursor: "pointer", color: "secondary.dark_gray" }}
              />
            </Box>
            <Box
              sx={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                mt: "6px",
              }}
            >
              <Typography
                sx={{
                  fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                  fontWeight: 500,
                  fontFamily: "poppins",
                  color: "secondary.dark_gray",
                }}
              >
                Withdraw Method
              </Typography>
              <Typography
                sx={{
                  fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                  fontWeight: 700,
                  fontFamily: "poppins",
                  color: "secondary.dark_gray",
                  ml: "4px",
                }}
              >
                {alreadyChooseWithDraw === "paper-eCheck"
                  ? "Paper eCheck"
                  : alreadyChooseWithDraw === "standard-eCheck"
                  ? "Standard eCheck"
                  : "Direct Deposit"}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                mt: "6px",
              }}
            >
              <Typography
                sx={{
                  fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                  fontWeight: 500,
                  fontFamily: "poppins",
                  color: "secondary.dark_gray",
                }}
              >
                Destination Address
              </Typography>
              <Typography
                sx={{
                  fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                  fontWeight: 700,
                  fontFamily: "poppins",
                  color: "secondary.dark_gray",
                  ml: "4px",
                }}
              >
                {user && user.email}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                mt: "6px",
              }}
            >
              <Typography
                sx={{
                  fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                  fontWeight: 500,
                  fontFamily: "poppins",
                  color: "secondary.dark_gray",
                }}
              >
                Withdrawing Amount
              </Typography>{" "}
              <Typography
                sx={{
                  fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                  fontWeight: 700,
                  fontFamily: "poppins",
                  color: "secondary.dark_gray",
                  ml: "4px",
                }}
              >
                ${enterDollarAmount}{" "}
              </Typography>
            </Box>

            <Button
              sx={{
                fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                fontWeight: 600,
                fontFamily: "poppins",
                color: "white",
                background: "#4831D4",
                py: "14px",
                mt: "25px",
                width: "90%",
                borderRadius: "8px",
                textTransform: "none",

                "&.MuiButtonBase-root:hover": {
                  background: "#4831D4",
                },
              }}
              onClick={() => {
                setStartAnimation(true);
                goSuccess();
              }}
            >
              {startAnimation ? (
                <div className="circleContainer">
                  <div className="circle-one"></div>
                  <div className="circle-two"></div>
                  <div className="circle-three"></div>
                </div>
              ) : (
                "Confirm"
              )}
            </Button>
            <Typography
              sx={{
                fontSize: { sm: fs.xs, xxs: fs.xxs, xxxs: fs.xxxs },
                fontWeight: 400,
                fontFamily: "poppins",
                color: "secondary.dark_gray",
                mt: "16px",
              }}
            >
              By continuing, you agree to SportsBattle's{" "}
            </Typography>
            <Typography
              sx={{
                fontSize: { sm: fs.xs, xxs: fs.xxs, xxxs: fs.xxxs },
                fontWeight: 400,
                fontFamily: "poppins",
                color: "#99CAD8",
                mt: "4px",
                mb: "33px",
              }}
            >
              terms, privacy policy & payment terms{" "}
            </Typography>
          </Box>
        </Box>
      )}
      {success && (
        <Success setSuccess={setSuccess} setWrong={setWrong} mode={mode} />
      )}
      {wrong && (
        <Wrong setWrong={setWrong} setOpenTag={setOpenTag} mode={mode} />
      )}
    </Box>
  );
}
