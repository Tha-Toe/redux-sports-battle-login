import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PriorityHigh from "@mui/icons-material/PriorityHigh";
import { useDispatch, useSelector } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";
const FpsPopup = ({
  mode,
  setOpenPointsBreakdown,
  setOpenFpsPopup,
  fpsData,
  setPbData,
  setFpsData,
}) => {
  const fs = useSelector((state) => state.user.fs);
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        background: `${
          mode === "dark" ? "rgba(0,0,0,0.9)" : "rgba(115, 115, 115, 0.7)"
        }`,
        zIndex: "100",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: { sm: "600px", xxxs: "90%" },
          bgcolor: "primary.dark",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "80%",
        }}
      >
        {fpsData.length > 0 ? (
          <>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <ClearIcon
                sx={{ mr: "10px", mt: "10px", color: "white" }}
                onClick={() => {
                  setFpsData([]);
                  setOpenFpsPopup(false);
                }}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Typography
                sx={{
                  fontSize: fs.normal,
                  ml: "10px",
                  fontWeight: "600",
                  color: "white",
                  mb: "10px",
                  fontFamily: "poppins",
                }}
              >
                Tap on a player to view points breakdown
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                overflow: "scroll",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                maxHeight: "100%",
              }}
            >
              {fpsData.map((each) => (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    background: "black",
                    alignItems: "center",
                    mb: "2px",
                  }}
                  onClick={() => {
                    setPbData(each);
                    setOpenPointsBreakdown(true);
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      mt: "5px",
                      mb: "5px",
                    }}
                  >
                    <img
                      src="/wnba.png"
                      style={{
                        width: "50px",
                        height: "50px",
                        marginLeft: "10px",
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        ml: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: fs.normal,
                          fontWeight: "400",
                          color: "white",
                          fontFamily: "poppins",
                        }}
                      >
                        {each.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: fs.normal,
                          fontWeight: "400",
                          color: "white",
                          fontFamily: "poppins",
                        }}
                      >
                        {each.teamName}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: fs.large,
                      mr: "20px",
                      fontWeight: "600",
                      color: "white",
                      mt: "5px",
                      mb: "5px",
                      fontFamily: "poppins",
                    }}
                  >
                    {each.totalScore}
                  </Typography>
                </Box>
              ))}
            </Box>
          </>
        ) : (
          <LoadingSpinnerEachSection />
        )}
      </Box>
    </Box>
  );
};
export default FpsPopup;
