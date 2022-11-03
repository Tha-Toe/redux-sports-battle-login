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
import FailLocationPermission from "../AddCash/FailLocationPermission";
const SubmitProjection = ({
  selectedCardList,
  setSelectedCardList,
  mode,
  removeCard,
  setSuccessSubmit,
  setErrorSubmit,
  selectSports,
}) => {
  const fs = useSelector((state) => state.user.fs);
  const propCartData = useSelector((state) => state.user.propCartData);
  const [startSelect, setStartSelect] = useState(false);
  const [moreThanOneCard, setMoreThanOneCard] = useState(false);
  const [selectAmount, setSelectAmount] = useState(null);
  const [pickPlayType, setPickPlayType] = useState(false);
  const [winAmount, setWinAmount] = useState(null);
  const [inputAmount, setInputAmount] = useState(null);
  useEffect(() => {
    if (pickPlayType && propCartData && selectAmount) {
      if (pickPlayType === "defence") {
        if (selectAmount === "Other") {
          if (inputAmount && inputAmount > 0) {
            setWinAmount(
              Math.floor(inputAmount * propCartData.defensePayouts[0].payout)
            );
          } else {
            setWinAmount(null);
          }
        } else {
          setWinAmount(selectAmount * propCartData.defensePayouts[0].payout);
        }
      } else {
        if (selectAmount === "Other") {
          if (inputAmount && inputAmount > 0) {
            setWinAmount(
              Math.floor(inputAmount * propCartData.attackPayouts[0].payout)
            );
          } else {
            setWinAmount(null);
          }
        } else {
          setWinAmount(selectAmount * propCartData.attackPayouts[0].payout);
        }
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

  const getLocation = () => {
    if (!navigator.geolocation) {
      // Geolocation is not supported by your browser
    } else {
      // setStatus('Locating...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // setStatus(null);
          console.log(position.coords);
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
          setAltitude(position.coords.altitude);
          setSpeed(position.coords.speed);
        },
        () => {
          setLocationBlock(true);
          // setStatus('Unable to retrieve your location');
        }
      );
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
                    endAdornment={
                      <InputAdornment position="end">
                        {inputAmount && inputAmount >= 100 && (
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
                      </InputAdornment>
                    }
                    onChange={(e) => {
                      setPickPlayType(null);
                      setInputAmount(e.target.value);
                    }}
                  />
                </Box>
              )}
              {selectAmount && (
                <Box sx={{ width: "90%", margin: "0 auto" }}>
                  <ChooseType
                    setPickPlayType={setPickPlayType}
                    pickPlayType={pickPlayType}
                    mode={mode}
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
              />
            ))}
          </Box>
          {pickPlayType && (
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
              Submit
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

export default SubmitProjection;
