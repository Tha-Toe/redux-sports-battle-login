import { Box, Typography, Button, Input } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import "./props.css";
import { AndresCard } from "./AndresCard";
import Times from "./TImes";
import Amount from "./Amount";
import ChooseType from "./ChooseType";
import Balance from "./Balance";
import InputAdornment from "@mui/material/InputAdornment";

const SubmitProjection = ({
  selectCardId,
  setSelectCardId,
  mode,
  removeCardIndex,
  setSuccessSubmit,
  setErrorSubmit,
}) => {
  const [startSelect, setStartSelect] = useState(false);
  const [moreThanOneCard, setMoreThanOneCard] = useState(false);
  const [selectAmount, setSelectAmount] = useState(null);
  const [pickPlayType, setPickPlayType] = useState(false);
  useEffect(() => {
    if (selectCardId.length === 0) {
      setStartSelect(false);
    } else {
      setStartSelect(true);
      if (selectCardId.length > 1) {
        setMoreThanOneCard(true);
      } else {
        setMoreThanOneCard(false);
      }
    }
  }, [selectCardId]);
  const [inputAmount, setInputAmount] = useState(null);
  return (
    <Box
      sx={{
        width: { lg: "30%", md: "40%", sm: "50%", xxxs: "100%" },
        minHeight: "522px",
        border: `${mode === "dark" ? "1px solid #2c2c2c" : "none"}`,
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
          fontSize: "14px",
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
              <Times selectCardId={selectCardId} mode={mode} />
            )}
            <Box
              sx={{
                borderBottom: `${
                  mode === "dark" ? "1px solid #2c2c2c" : "1px solid #DBDBDB"
                }`,
              }}
            >
              <Amount
                setSelectAmount={setSelectAmount}
                selectAmount={selectAmount}
              />
              {selectAmount === "other" && (
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
                      fontSize: { xl: "12px", md: "10px", xxxs: "8px" },
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
                      fontSize: { xl: "12px", md: "10px", xxxs: "8px" },
                      fontWeight: 400,
                      fontFamily: "poppins",
                      color: "secondary.dark_gray",
                      borderBottom: "1px solid #4831D4",
                      py: "8px",
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        {inputAmount && (
                          <Typography
                            sx={{
                              color: "#E4313C",
                              fontSize: { xl: "12px", md: "10px", xxxs: "8px" },
                              fontWeight: "500",
                              fontFamily: "poppins",
                            }}
                          >
                            Limit is $50{" "}
                          </Typography>
                        )}
                      </InputAdornment>
                    }
                    onChange={(e) => setInputAmount(e.target.value)}
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
                  {pickPlayType && <Balance />}
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
                  fontSize: { xl: "12px", md: "10px", xxxs: "8px" },
                  fontWeight: 400,
                  fontFamily: "poppins",
                  mr: "3px",
                  color: "secondary.dark_gray",
                }}
              >
                Your Entries
              </Typography>
            </Box>

            {selectCardId.map((e, index) => (
              <AndresCard
                removeCardIndex={removeCardIndex}
                key={index}
                e={e}
                selectCardId={selectCardId}
                setSelectCardId={setSelectCardId}
                mode={mode}
              />
            ))}
          </Box>
          {pickPlayType && (
            <Button
              sx={{
                color: "white",
                fontSize: "10px",
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
              }}
              onClick={() => setSuccessSubmit(true)}
            >
              Submit
            </Button>
          )}
        </>
      ) : (
        <Typography
          sx={{
            fontFamily: "poppins",
            fontSize: "12px",
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
    </Box>
  );
};

export default SubmitProjection;
