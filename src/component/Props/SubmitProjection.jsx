import { Box, Typography, Button, Input } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import "./props.css";
import { AndresCard } from "./AndresCard";
import PropCart from "./PropCart";
import Amount from "./Amount";
import ChooseType from "./ChooseType";
import Balance from "./Balance";
import InputAdornment from "@mui/material/InputAdornment";
import { useSelector } from "react-redux";
import FailLocationPermission from "../Identity/FailLocationPermission";
import { APIURLs } from "../../api/ApiUrls";
import { makePOSTAPICall } from "../../api/methods";
import axios from "axios";

const SubmitProjection = ({
  selectedCardList,
  setSelectedCardList,
  mode,
  removeCard,
  setSuccessSubmit,
  setErrorSubmit,
  selectSports,
  selectAmount,
  setSelectAmount,
  pickPlayType,
  setPickPlayType,
  setNotEnoughBalance,
}) => {
  const fs = useSelector((state) => state.user.fs);
  const propCartData = useSelector((state) => state.user.propCartData);
  const userDetail = useSelector((state) => state.user.userDetail);
  const [startSelect, setStartSelect] = useState(false);
  const [moreThanOneCard, setMoreThanOneCard] = useState(false);

  const [winAmount, setWinAmount] = useState(null);
  const [inputAmount, setInputAmount] = useState(null);
  const [startButtonAnimation, setStartButtonAnimation] = useState(false);
  useEffect(() => {
    if (pickPlayType && propCartData && selectAmount) {
      setWinAmount(null);
      if (pickPlayType === "defense") {
        if (selectAmount === "Other") {
          if (inputAmount && inputAmount >= 5 && inputAmount <= 100) {
            setWinAmount(
              Math.floor(inputAmount * propCartData.defensePayouts[0].payout)
            );
          } else {
            setWinAmount(null);
          }
        } else {
          setWinAmount(selectAmount * propCartData.defensePayouts[0].payout);
        }
      } else if (pickPlayType === "attack") {
        if (selectAmount === "Other") {
          if (inputAmount && inputAmount >= 5 && inputAmount <= 100) {
            setWinAmount(
              Math.floor(inputAmount * propCartData.attackPayouts[0].payout)
            );
          } else {
            setWinAmount(null);
          }
        } else {
          setWinAmount(selectAmount * propCartData.attackPayouts[0].payout);
        }
      } else {
        setWinAmount(null);
        console.log("change");
      }
    }
  }, [pickPlayType, selectAmount, propCartData, selectedCardList, inputAmount]);
  useEffect(() => {
    if (selectedCardList.length === 0) {
      setStartSelect(false);
    } else {
      setStartSelect(true);
      if (selectedCardList.length > 1) {
        setMoreThanOneCard(true);
      } else {
        setMoreThanOneCard(false);
      }
    }
  }, [selectedCardList]);
  const [Lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [altitude, setAltitude] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [locationBlock, setLocationBlock] = useState(false);
  let user = JSON.parse(localStorage.getItem("user"));
  let doubleClick = false;
  const getLocation = async () => {
    if (userDetail) {
      let totalBalance = userDetail.unutilizedCash
        ? userDetail.numOUBonusCash +
          userDetail.numCash +
          userDetail.unutilizedCash
        : userDetail.numOUBonusCash + userDetail.numCash;

      let continues = false;
      if (selectAmount === "Other") {
        if (inputAmount > totalBalance) {
          continues = false;
          setNotEnoughBalance(true);
        } else {
          continues = true;
        }
      } else {
        if (selectAmount > totalBalance) {
          continues = false;
          console.log(totalBalance);
          setNotEnoughBalance(true);
        } else {
          continues = true;
        }
      }
      if (continues) {
        if (
          !doubleClick &&
          user &&
          selectedCardList.length > 0 &&
          winAmount &&
          pickPlayType &&
          propCartData
        ) {
          setStartButtonAnimation(true);
          doubleClick = true;

          let submitObject = {};
          //userId
          submitObject.userId = user.uid;

          //game
          submitObject.game = {};

          //projections
          submitObject.projections = [...selectedCardList];

          //amount
          if (selectAmount === "Other") {
            submitObject.amount = inputAmount;
          } else {
            submitObject.amount = selectAmount;
          }
          //towin
          submitObject.toWin = winAmount;

          //joinwith
          submitObject.joinWith = "cash";

          //playType
          submitObject.playType = pickPlayType;

          //payout
          if (pickPlayType === "attack") {
            submitObject.payouts = propCartData.attackPayouts[0];
          } else {
            submitObject.payouts = propCartData.defensePayouts[0];
          }

          //device
          submitObject.device = {};

          //deviceDateTime
          const currTime = new Date();
          let deviceTime =
            currTime.toLocaleDateString().toString() +
            " " +
            currTime.toTimeString().toString();
          submitObject.device.deviceDateTime = deviceTime;

          //ipAddress
          const res = await axios.get("https://geolocation-db.com/json/");
          if (!res.data) {
            return;
          }
          submitObject.device.ipAddress = res.data.IPv4;

          if (!navigator.geolocation) {
            // Geolocation is not supported by your browser
          } else {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                submitObject.device.latitude = position.coords.latitude;
                submitObject.device.longitude = position.coords.longitude;
                submitObject.device.altitude = 0;
                submitObject.device.speed = -1;
                console.log(submitObject);
                // setSuccessSubmit(true);
                let userId = submitObject.userId;
                let game = submitObject.game;
                let projections = submitObject.projections;
                let amount = submitObject.amount;
                let toWin = submitObject.toWin;
                let joinWith = submitObject.joinWith;
                let playType = submitObject.playType;
                let payouts = submitObject.payouts;
                let device = submitObject.device;
                submitProjections(
                  userId,
                  game,
                  projections,
                  amount,
                  toWin,
                  joinWith,
                  playType,
                  payouts,
                  device
                )
                  .then((result) => {
                    if (result) {
                      if (result.status && result.status === "fail") {
                        setErrorSubmit(result.message);
                        setSelectedCardList([]);
                      } else {
                        if (result.status === "success") {
                          setSuccessSubmit(true);
                          setSelectedCardList([]);
                        }
                      }
                      doubleClick = false;
                      setStartButtonAnimation(false);
                    }
                  })
                  .catch((error) => {
                    if (error) {
                      console.log("error");
                    }
                  });
              },
              () => {
                setLocationBlock(true);
                doubleClick = false;
                setStartButtonAnimation(false);
                // setStatus('Unable to retrieve your location');
              }
            );
          }
        }
      }
    }
  };

  return (
    <Box
      sx={{
        width: { lg: "30%", md: "40%", sm: "50%", xxxs: "100%" },
        // minHeight: "522px",
        border: `${mode === "dark" ? "1px solid #2c2c2c" : "none"}`,
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        ml: { sm: "5px", xxxs: "0px" },
        borderRadius: "4px",
        mb: "30px",
        bgcolor: "primary.main",
        mt: { sm: "0px", xxxs: "10px" },
      }}
    >
      <Typography
        id="submitProjection"
        sx={{
          display: { xs: "none", xxxs: "block" },
        }}
      ></Typography>
      <Typography
        sx={{
          fontFamily: "poppins",
          fontSize: fs.small,
          fontWeight: 600,
          color: "secondary.dark_gray",
          mt: "13px",
          mb: "9px",
          width: "90%",
          mx: "auto",
          mt: "13px",
          mb: "9px",
        }}
      >
        Submit Projections
      </Typography>
      {startSelect ? (
        <>
          <Box
            id="top-submit"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              margin: "0 auto",
            }}
          >
            {moreThanOneCard && (
              <PropCart
                selectedCardList={selectedCardList}
                mode={mode}
                selectSports={selectSports}
              />
            )}
            <Box
              sx={{
                borderBottom: `${
                  mode === "dark" ? "1px solid #2c2c2c" : "1px solid #DBDBDB"
                }`,
                pb: "12px",
              }}
            >
              <Amount
                setSelectAmount={setSelectAmount}
                selectAmount={selectAmount}
                moreThanOneCard={moreThanOneCard}
                setPickPlayType={setPickPlayType}
                setInputAmount={setInputAmount}
              />
              {selectAmount === "Other" && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "90%",
                    margin: "0 auto",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: "4px",
                    mb: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "secondary.dark_gray",
                      width: "100%",
                      fontSize: { xl: fs.xs, md: fs.xxs, xxxs: fs.xxxs },
                      fontWeight: "500",
                      fontFamily: "poppins",
                    }}
                  >
                    Enter Amount
                  </Typography>
                  <Input
                    placeholder="Enter dollar amount"
                    type="number"
                    sx={{
                      width: "100%",
                      fontSize: { xl: fs.xs, md: fs.xxs, xxxs: fs.xxxs },
                      fontWeight: 400,
                      fontFamily: "poppins",
                      color: "secondary.dark_gray",
                      borderBottom: "1px solid #4831D4",
                      py: "8px",
                    }}
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                    endAdornment={
                      <InputAdornment position="end">
                        {inputAmount && inputAmount > 100 && (
                          <Typography
                            sx={{
                              color: "#E4313C",
                              fontSize: {
                                xl: fs.xs,
                                md: fs.xxs,
                                xxxs: fs.xxxs,
                              },
                              fontWeight: "500",
                              fontFamily: "poppins",
                            }}
                          >
                            Limit is $100{" "}
                          </Typography>
                        )}
                        {inputAmount && inputAmount < 5 && (
                          <Typography
                            sx={{
                              color: "#E4313C",
                              fontSize: {
                                xl: fs.xs,
                                md: fs.xxs,
                                xxxs: fs.xxxs,
                              },
                              fontWeight: "500",
                              fontFamily: "poppins",
                            }}
                          >
                            Minimum is $5{" "}
                          </Typography>
                        )}
                      </InputAdornment>
                    }
                    onChange={(e) => {
                      setPickPlayType(null);
                      setInputAmount(e.target.value);
                    }}
                  />
                </Box>
              )}
              {selectAmount && selectAmount !== "Other" && (
                <Box sx={{ width: "90%", margin: "0 auto" }}>
                  <ChooseType
                    setPickPlayType={setPickPlayType}
                    pickPlayType={pickPlayType}
                    mode={mode}
                    selectAmount={selectAmount}
                    inputAmount={inputAmount}
                  />
                  {pickPlayType && winAmount && (
                    <Balance winAmount={winAmount} />
                  )}
                </Box>
              )}
              {selectAmount &&
                selectAmount === "Other" &&
                inputAmount >= 5 &&
                inputAmount <= 100 && (
                  <Box sx={{ width: "90%", margin: "0 auto" }}>
                    <ChooseType
                      setPickPlayType={setPickPlayType}
                      pickPlayType={pickPlayType}
                      mode={mode}
                      selectAmount={selectAmount}
                      inputAmount={inputAmount}
                    />
                    {pickPlayType && winAmount && (
                      <Balance winAmount={winAmount} />
                    )}
                  </Box>
                )}
            </Box>
          </Box>

          <Box sx={{ mt: "14px" }}>
            <Box
              sx={{
                display: "flex",
                width: "90%",
                margin: "0 auto",
                mb: "9px",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xl: fs.xs, md: fs.xxs, xxxs: fs.xxxs },
                  fontWeight: 400,
                  fontFamily: "poppins",
                  mr: "3px",
                  color: "secondary.dark_gray",
                }}
              >
                Your Entries
              </Typography>
            </Box>

            {selectedCardList.map((e, index) => (
              <AndresCard
                removeCard={removeCard}
                key={index}
                e={e}
                selectedCardList={selectedCardList}
                setSelectedCardList={setSelectedCardList}
                mode={mode}
                setPickPlayType={setPickPlayType}
                setSelectAmount={setSelectAmount}
              />
            ))}
          </Box>
          {pickPlayType && winAmount && (
            <Button
              sx={{
                color: "white",
                fontSize: fs.xs,
                fontWieght: 600,
                fontFamily: "poppins",
                background: "#4831D4",
                width: "90%",
                margin: "0 auto",
                mb: "10px",
                "&.MuiButtonBase-root:hover": {
                  background: "#4831D4",
                },
                textTransform: "none",
                height: "31px",
              }}
              onClick={() => {
                // setSuccessSubmit(true)
                getLocation();
              }}
            >
              {startButtonAnimation ? (
                <div className="circleSubmitContainer">
                  <div className="circle-submit-one-address"></div>
                  <div className="circle-submit-two-address"></div>
                  <div className="circle-submit-three-address"></div>
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          )}
        </>
      ) : (
        <Typography
          sx={{
            fontFamily: "poppins",
            fontSize: fs.xs,
            fontWeight: 400,
            color: "secondary.dark_gray",
            mx: "auto",
            mt: "60px",
            mb: "9px",
            width: "70%",
          }}
        >
          Choose over or under on a player to make your entry.{" "}
        </Typography>
      )}
      {locationBlock && (
        <FailLocationPermission
          mode={mode}
          setLocationBlock={setLocationBlock}
        />
      )}
    </Box>
  );
};

// submit projections

export const submitProjections = async (
  userId,
  game,
  projections,
  amount,
  toWin,
  joinWith,
  playType,
  payouts,
  device
) => {
  var apiUrl = APIURLs.submitProjections;

  var reqBody = {
    userId: userId,
    game: game,
    projections: projections,
    amount: amount,
    toWin: toWin,
    joinWith: joinWith,
    playType: playType,
    payouts: payouts,
    mixMatch: true,
    device: device,
    overUnder: true,
  };
  //console.log(apiUrl);
  const apiResponse = await makePOSTAPICall(apiUrl, reqBody);
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return {
      status: "failed",
      errorMsg: "Error occurred, Please try later.",
    };
  }
};

export default SubmitProjection;
