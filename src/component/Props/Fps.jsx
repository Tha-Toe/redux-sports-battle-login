import {
  Box,
  Card,
  getBottomNavigationUtilityClass,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import "./props.css";
import { APIURLs } from "../../api/ApiUrls";
import { makeGETAPICall } from "../../api/methods";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";

export default function Fps({ setOpenFps, mode, currentSportsData }) {
  const [point, setPoint] = useState([
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
    { name: "Single Batter", point: "+3" },
  ]);

  const sportDataCommingFromApi = useSelector(
    (state) => state.user.sportDataCommingFromApi
  );
  const [sportName, setSportName] = useState(null);
  const [apiData, setApiData] = useState("data");
  useEffect(() => {
    if (sportDataCommingFromApi && currentSportsData) {
      let currSportDataNameArray = sportDataCommingFromApi.filter((each) => {
        return each.code === currentSportsData.sportCode;
      });
      if (currSportDataNameArray.length > 0) {
        setSportName(currSportDataNameArray[0].sportName);
      }
    }
  }, [sportDataCommingFromApi, currentSportsData]);

  useEffect(() => {
    if (currentSportsData && currentSportsData.sportCode) {
      setApiData(null);
      getFpsSport(currentSportsData.sportCode)
        .then((res) => {
          console.log("t20", res);
          setApiData(res);
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    }
  }, [currentSportsData]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background: `${
          mode === "dark" ? "rgba(0,0,0,0.9)" : "rgba(115, 115, 115, 0.7)"
        }`,
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: {
            md: "501px",
            sm: "400px",
            xs: "400px",
            xxs: "320px",
            xxxs: "300px",
          },
          height: "512px",
          bgcolor: "primary.main",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          boxShadow: "1px 1px 100px -60px rgba(255,255,255,0.5)",
          border: "1px solid #2C2C2C",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "90%",
            margin: "0 auto",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "11px",
            mb: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography
              sx={{
                color: "secondary.dark_gray",
                fontSize: { sm: "20px", xxxs: "16px" },
                fontWeight: 700,
                fontFamily: "poppins",
                borderBottom: "3px solid white",
              }}
            >
              {sportName}{" "}
            </Typography>{" "}
            <Typography
              sx={{
                color: "secondary.dark_gray",
                fontSize: { sm: "20px", xxxs: "16px" },
                fontWeight: 700,
                fontFamily: "poppins",
              }}
            >
              - Over/ Under Points{" "}
            </Typography>{" "}
          </Box>
          <ClearIcon
            sx={{
              fontSize: "35px",
              color: "secondary.dark_gray",
              cursor: "pointer",
            }}
            onClick={() => {
              setOpenFps(false);
            }}
          />
        </Box>
        {apiData ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItem: "center",
              justifyContent: "flex-start",
              width: "100%",
              margin: "0 auto",
              height: "100%",
              maxHeight: "100%",
              overflow: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                margin: "0 auto",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#494949",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "poppins",
                  ml: "25px",
                  py: "10px",
                }}
              >
                BATTING
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "poppins",
                  mr: "25px",
                  py: "10px",
                }}
              >
                POINTS
              </Typography>
            </Box>
            {point.map((e, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  width: "90%",
                  margin: "0 auto",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #494949",
                }}
              >
                <Typography
                  sx={{
                    color: "secondary.dark_gray",
                    fontSize: "14px",
                    fontWeight: 600,
                    fontFamily: "poppins",
                    ml: "25px",
                    py: "10px",
                  }}
                >
                  {e.name}
                </Typography>
                <Typography
                  sx={{
                    color: "#52C03C",
                    fontSize: "14px",
                    fontWeight: 600,
                    fontFamily: "poppins",
                    mr: "25px",
                    py: "10px",
                  }}
                >
                  {e.point}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <LoadingSpinnerEachSection />
        )}
      </Box>
    </Box>
  );
}

export const getFpsSport = async (sportcode) => {
  var apiUrl = APIURLs.getFpsSport;
  apiUrl = apiUrl.replace("{sportcode}", sportcode);
  const apiResponse = await makeGETAPICall(apiUrl, [{ "fps-game-type": "ou" }]);
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return null;
  }
};
