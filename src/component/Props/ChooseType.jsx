import { Box, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import "./props.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSelector } from "react-redux";

export default function ({ setPickPlayType, pickPlayType, mode }) {
  const fs = useSelector((state) => state.user.fs);
  let propCartData = useSelector((state) => state.user.propCartData);

  return (
    <>
      <Typography
        sx={{
          fontSize: { xl: fs.xs, md: fs.xxs, xxxs: fs.xxxs },
          fontFamily: "poppins",
          fontWeight: 600,
          color: "secondary.dark_gray",
          mb: "5px",
        }}
      >
        Next, Choose a play type
      </Typography>
      {propCartData.attackOnlyEntry && (
        <Typography
          sx={{
            fontSize: { xl: fs.xxs, md: fs.xxxs, xxxs: "6px" },
            fontFamily: "poppins",
            fontWeight: 400,
            color: `${mode === "dark" ? "#FFCED6" : "#EA1E63"}`,
            mb: "10px",
          }}
        >
          This entry can only be attack
        </Typography>
      )}
      {propCartData && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: `${
              !propCartData.attackOnlyEntry ? "space-between" : "center"
            }`,
            width: "100%",
            mb: "8px",
          }}
        >
          {!propCartData.attackOnlyEntry && (
            <Box sx={{ width: "auto", minWidth: "35%" }}>
              <Typography
                sx={{
                  fontSize: fs.small,
                  fontFamily: "poppins",
                  fontWeight: "600",
                  color: "#459F48",
                }}
              >
                ❄️ DEFENSE PLAY
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  bgcolor: "primary.gray",
                  alignItems: "center",
                  mt: "5px",
                  p: "10px 4px",
                  border: `${
                    pickPlayType === "defence"
                      ? "1px solid #4831D4"
                      : "1px solid transparent"
                  }`,
                  borderRadius: "3px",
                  cursor: "pointer",
                  minHeight: "35px",
                }}
                onClick={() => setPickPlayType("defence")}
              >
                {pickPlayType === "defence" && (
                  <CheckCircleIcon
                    sx={{ color: "#52C03C", fontSize: fs.small, mr: "6px" }}
                  />
                )}
                <Box>
                  {propCartData.defensePayouts.map((each, index) => (
                    <Typography
                      key={index}
                      sx={{
                        fontSize: {
                          xl: fs.xs,
                          sm: fs.xxs,
                          xxxs: fs.xxxs,
                        },
                        fontWeight: 400,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mr: "10px",
                        ml: "4px",
                      }}
                    >
                      {each.picks} correct pays {each.payout}x
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          )}
          <Box sx={{ width: "auto", minWidth: "35%" }}>
            <Typography
              sx={{
                fontSize: fs.small,
                fontFamily: "poppins",
                fontWeight: "600",
                color: "#459F48",
              }}
            >
              🔥 ATTACK PLAY
            </Typography>
            <Box
              sx={{
                display: "flex",
                bgcolor: "primary.gray",
                alignItems: "center",
                mt: "5px",
                p: "10px 4px",
                pl: "8px",
                borderRadius: "3px",
                border: `${
                  pickPlayType === "attack"
                    ? "1px solid #4831D4"
                    : "1px solid transparent"
                }`,
                cursor: "pointer",
                minHeight: "35px",
              }}
              onClick={() => setPickPlayType("attack")}
            >
              {pickPlayType === "attack" && (
                <CheckCircleIcon
                  sx={{ color: "#52C03C", fontSize: fs.small, mr: "6px" }}
                />
              )}
              <Box>
                {propCartData.attackPayouts.map((each, index) => (
                  <Typography
                    key={index}
                    sx={{
                      fontSize: {
                        xl: fs.xs,
                        sm: fs.xxs,
                        xxxs: fs.xxxs,
                      },
                      fontWeight: 400,
                      fontFamily: "poppins",
                      color: "secondary.dark_gray",
                      mr: "10px",
                      ml: "4px",
                    }}
                  >
                    {each.picks} correct pays {each.payout}x
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
