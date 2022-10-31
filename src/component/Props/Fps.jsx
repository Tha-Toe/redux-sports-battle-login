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

export function EntireTitleContainer({ each, index }) {
  const fs = useSelector((state) => state.user.fs);

  const [ouPoints, setOuPoints] = useState(null);
  useEffect(() => {
    if (each && each.events) {
      let array = each.events;
      array.map((e) => {
        if (e.ouPoints && e.ouPoints !== "+0") {
          setOuPoints(e.ouPoints);
        } else if (e.profiles) {
          let filterArr = e.profiles.filter((eachObj) => {
            return eachObj.ouPoints && eachObj.ouPoints !== "+0";
          });
          if (filterArr.length > 0) {
            setOuPoints(filterArr[0].ouPoints);
          } else {
            return;
          }
        } else {
          return;
        }
      });
    }
  }, [each, ouPoints]);
  if (ouPoints) {
    return (
      <Box key={index}>
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
              fontSize: fs.small,
              fontWeight: 600,
              fontFamily: "poppins",
              ml: "25px",
              py: "10px",
            }}
          >
            {each.title}
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontSize: fs.small,
              fontWeight: 600,
              fontFamily: "poppins",
              mr: "25px",
              py: "10px",
            }}
          >
            POINTS
          </Typography>
        </Box>
        {each.events.map((e, indexEvent) => (
          <EventTag
            key={indexEvent}
            index={index}
            e={e}
            each={each}
            indexEvent={indexEvent}
          />
        ))}
      </Box>
    );
  } else {
    return <></>;
  }
}

export function EventTag({ each, e, index, indexEvent }) {
  const [ouPoints, setOuPoints] = useState(null);
  useEffect(() => {
    if (each && e) {
      console.log(e);
      if (e.ouPoints && e.ouPoints !== "+0") {
        setOuPoints(e.ouPoints);
      } else if (e.profiles) {
        let filterArr = e.profiles.filter((eachObj) => {
          return eachObj.ouPoints && eachObj.ouPoints !== "+0";
        });
        if (filterArr.length > 0) {
          setOuPoints(filterArr[0].ouPoints);
        } else {
          setOuPoints(null);
        }
      } else {
        setOuPoints(null);
      }
    }
  }, [each, e]);
  const fs = useSelector((state) => state.user.fs);

  if (ouPoints) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "90%",
          margin: "0 auto",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #494949",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            ml: "25px",
            py: "10px",
            maxWidth: "80%",
          }}
        >
          <Typography
            sx={{
              color: "secondary.dark_gray",
              fontSize: fs.small,
              fontWeight: 600,
              fontFamily: "poppins",
            }}
          >
            {e.text}
          </Typography>
          {e.profiles ? (
            <>
              <Typography
                sx={{
                  color: "secondary.dark_gray",
                  fontSize: fs.small,
                  fontWeight: 600,
                  fontFamily: "poppins",
                  mt: "5px",
                }}
              >
                {e.subText}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  mt: "5px",
                }}
              >
                {e.profiles.map((profile, i) => (
                  <Typography
                    key={i}
                    sx={{
                      color: "secondary.dark_gray",
                      fontSize: fs.small,
                      fontWeight: 600,
                      fontFamily: "poppins",
                    }}
                  >
                    {profile.name}
                    {e.profiles.length > 1 && ", "}
                  </Typography>
                ))}
              </Box>
            </>
          ) : (
            <Typography
              sx={{
                color: "secondary.dark_gray",
                fontSize: fs.small,
                fontWeight: 600,
                fontFamily: "poppins",
                mt: "5px",
              }}
            >
              All Profiles
            </Typography>
          )}
        </Box>
        <Typography
          sx={{
            color: "#52C03C",
            fontSize: fs.small,
            fontWeight: 600,
            fontFamily: "poppins",
            mr: "25px",
            py: "10px",
            color: `${ouPoints.charAt() === "-" ? "red" : "#52C03C"}`,
          }}
        >
          {ouPoints}
        </Typography>
      </Box>
    );
  } else {
    return <></>;
  }
}

export default function Fps({ setOpenFps, mode, currentSportsData }) {
  const fs = useSelector((state) => state.user.fs);

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
  const [apiData, setApiData] = useState(null);
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
          console.log(res);
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
            md: "601px",
            sm: "450px",
            xs: "400px",
            xxs: "320px",
            xxxs: "300px",
          },
          height: "85%",
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
                fontSize: { sm: fs.x_large, xxxs: fs.normal },
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
                fontSize: { sm: fs.x_large, xxxs: fs.normal },
                fontWeight: 700,
                fontFamily: "poppins",
              }}
            >
              - Above/ Below Points{" "}
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
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItem: "center",
                justifyContent: "flex-start",
                width: "100%",
                margin: "0 auto",
                height: "90%",
                overflow: "scroll",
                maxHeight: "90%",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {apiData.fps.map((each, index) => (
                <EntireTitleContainer each={each} index={index} key={index} />
              ))}
            </Box>
          </>
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
