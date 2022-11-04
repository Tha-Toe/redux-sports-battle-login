import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import "./props.css";
import { useSelector } from "react-redux";
export default function ({
  setSelectAmount,
  selectAmount,
  moreThanOneCard,
  setPickPlayType,
  setInputAmount,
}) {
  const fs = useSelector((state) => state.user.fs);
  const currentSportDataRedux = useSelector(
    (state) => state.user.currentSportDataRedux
  );
  useEffect(() => {
    if (!moreThanOneCard) {
      setSelectAmount(null);
      setPickPlayType(null);
    }
  }, [moreThanOneCard]);
  return (
    <Box sx={{ mb: "7px" }}>
      <Typography
        sx={{
          fontFamily: "poppins",
          fontSize: { xl: fs.xs, md: fs.xxs, xxxs: fs.xxxs },
          fontWeight: 400,
          color: "secondary.dark_gray",
          width: "90%",
          margin: "0 auto",
          mb: "7px",
        }}
      >
        Please choose an entry amount{" "}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "90%",
          margin: "0 auto",
          mb: "4px",
        }}
      >
        {currentSportDataRedux &&
          currentSportDataRedux.metadata.amount.map((each, index) => (
            <Box
              key={index}
              sx={{
                padding: "10px 12px",
                fontSize: fs.xs,
                bgcolor: `${
                  selectAmount === each ? "#4831D4" : "primary.gray"
                }`,
                cursor: "pointer",
                borderRadius: "4px",
                fontFamily: "poppins",
                fontWeight: 500,
                mr: { xl: "5px", xxxs: "5px" },
                color: `${
                  !moreThanOneCard
                    ? "gray"
                    : selectAmount === each
                    ? "white"
                    : "secondary.dark_gray"
                }`,
              }}
              onClick={() => {
                if (moreThanOneCard) {
                  setSelectAmount(each);
                  setPickPlayType(null);
                  setInputAmount(null);
                }
              }}
            >
              {each !== "Other" && "$"}
              {each}
            </Box>
          ))}
        {/* <Box
          sx={{
            padding: "10px 12px",
            fontSize: fs.xs,
            bgcolor: `${selectAmount === 5 ? "#4831D4" : "primary.gray"}`,
            cursor: "pointer",
            borderRadius: "4px",
            fontFamily: "poppins",
            fontWeight: 500,
            mr: { xl: "5px", xxxs: "5px" },
            color: `${
              !moreThanOneCard
                ? "gray"
                : selectAmount === 5
                ? "white"
                : "secondary.dark_gray"
            }`,
          }}
          onClick={() => {
            if (moreThanOneCard) {
              setSelectAmount(5);
            }
          }}
        >
          $5
        </Box>
        <Box
          sx={{
            padding: "10px 12px",
            fontSize: fs.xs,
            bgcolor: `${selectAmount === 10 ? "#4831D4" : "primary.gray"}`,
            cursor: "pointer",
            borderRadius: "4px",
            fontFamily: "poppins",
            fontWeight: 500,
            mr: { xl: "5px", xxxs: "5px" },
            color: `${
              !moreThanOneCard
                ? "gray"
                : selectAmount === 10
                ? "white"
                : "secondary.dark_gray"
            }`,
          }}
          onClick={() => {
            if (moreThanOneCard) {
              setSelectAmount(10);
            }
          }}
        >
          $10
        </Box>
        <Box
          sx={{
            padding: "10px 12px",
            fontSize: fs.xs,
            bgcolor: `${selectAmount === 25 ? "#4831D4" : "primary.gray"}`,
            cursor: "pointer",
            borderRadius: "4px",
            fontFamily: "poppins",
            fontWeight: 500,
            mr: { xl: "5px", xxxs: "5px" },
            color: `${
              !moreThanOneCard
                ? "gray"
                : selectAmount === 25
                ? "white"
                : "secondary.dark_gray"
            }`,
          }}
          onClick={() => {
            if (moreThanOneCard) {
              setSelectAmount(25);
            }
          }}
        >
          $25
        </Box>
        <Box
          sx={{
            padding: "10px 12px",
            fontSize: fs.xs,
            bgcolor: `${selectAmount === 50 ? "#4831D4" : "primary.gray"}`,
            cursor: "pointer",
            borderRadius: "4px",
            fontFamily: "poppins",
            fontWeight: 500,
            mr: { xl: "5px", xxxs: "5px" },
            color: `${
              !moreThanOneCard
                ? "gray"
                : selectAmount === 50
                ? "white"
                : "secondary.dark_gray"
            }`,
          }}
          onClick={() => {
            if (moreThanOneCard) {
              setSelectAmount(50);
            }
          }}
        >
          $50
        </Box>
        <Box
          sx={{
            padding: "10px 12px",
            fontSize: fs.xs,
            bgcolor: `${selectAmount === "other" ? "#4831D4" : "primary.gray"}`,
            cursor: "pointer",
            borderRadius: "4px",
            fontFamily: "poppins",
            fontWeight: 500,
            color: `${
              !moreThanOneCard
                ? "gray"
                : selectAmount === "other"
                ? "white"
                : "secondary.dark_gray"
            }`,
          }}
          onClick={() => {
            if (moreThanOneCard) {
              setSelectAmount("other");
            }
          }}
        >
          Other
        </Box> */}
      </Box>
    </Box>
  );
}
