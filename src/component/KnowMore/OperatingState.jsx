import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import "./knowMore.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";
import { APIURLs } from "../../api/ApiUrls";
import { makeGETAPICall } from "../../api/methods";
import { useEffect } from "react";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";

export default function OperatingState({ openTag }) {
  const fs = useSelector((state) => state.user.fs);
  const [operatingState, setOperatingState] = useState([
    { name: "Alabama", status: false, age: "18", collegeSports: false },
    { name: "Alaska", status: true, age: "18", collegeSports: false },
    { name: "Arizona", status: false, age: "18", collegeSports: false },
    { name: "Arkansas", status: true, age: "18", collegeSports: false },
    { name: "California ", status: true, age: "18", collegeSports: true },
    { name: "Colorado", status: true, age: "18", collegeSports: true },
    { name: "Connecticut", status: false, age: "18", collegeSports: false },
    { name: "Delaware", status: false, age: "18", collegeSports: true },
    { name: "Florida", status: true, age: "18", collegeSports: true },
    { name: "Delaware", status: true, age: "18", collegeSports: true },
    { name: "California", status: true, age: "18", collegeSports: false },
    { name: "California", status: true, age: "18", collegeSports: false },
    { name: "California", status: true, age: "18", collegeSports: true },
    { name: "California", status: true, age: "18", collegeSports: false },
    { name: "California", status: true, age: "18", collegeSports: false },
    { name: "California", status: true, age: "18", collegeSports: true },
  ]);
  const [os, setOs] = useState([]);
  useEffect(() => {
    if (openTag === "Operating States") {
      setOs([]);
      getStates()
        .then((result) => {
          setOs(result);
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    }
  }, [openTag]);

  if (os.length > 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "90vh",
          maxHeight: "90vh",
          border: "1px solid #494949",
          borderRadius: "4px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          overflow: "scroll",
        }}
      >
        <Typography
          sx={{
            fontSize: { lg: fs.normal, xs: fs.small, xxxs: fs.xs },
            fontWeight: 600,
            fontFamily: "poppins",
            color: "secondary.main",
            width: "90%",
            mt: "10px",
          }}
        >
          Operating States
        </Typography>
        <Typography
          sx={{
            fontSize: { lg: "12px", xs: "10px", xxxs: "8px" },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "secondary.main",
            width: "90%",
            mt: "9px",
          }}
        >
          US States from where SportsBattle allows users to participate in cash
          contests. Users can however participate in free contests. We are
          working on introducing new States{" "}
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            background: "#494949",
            mb: "9px",
            mt: "14px",
          }}
        >
          <Box
            sx={{
              width: "90%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mx: "auto",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: { lg: fs.small, xs: fs.xs, xxxs: fs.xxs },
                fontWeight: 600,
                fontFamily: "poppins",
                py: "9px",
                width: "25%",
              }}
            >
              About
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontSize: { lg: fs.small, xs: fs.xs, xxxs: fs.xxs },
                fontWeight: 600,
                fontFamily: "poppins",
                py: "9px",
                width: "25%",
                textAlign: "center",
              }}
            >
              Status
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontSize: { lg: fs.small, xs: fs.xs, xxxs: fs.xxs },
                fontWeight: 600,
                fontFamily: "poppins",
                py: "9px",
                width: "25%",
                textAlign: "center",
              }}
            >
              Age
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontSize: { lg: fs.small, xs: fs.xs, xxxs: fs.xxs },
                fontWeight: 600,
                fontFamily: "poppins",
                py: "9px",
                width: "25%",
                textAlign: "center",
              }}
            >
              College Sports
            </Typography>
          </Box>
        </Box>
        {os.map((e, index) => (
          <Box
            key={index}
            sx={{
              width: "90%",
              borderBottom: "1px solid #494949",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: { lg: fs.small, xs: fs.xs, xxxs: fs.xxs },
                fontWeight: 500,
                fontFamily: "poppins",
                color: "secondary.main",
                width: "25%",
              }}
            >
              {e.state}
            </Typography>
            {e.allowed ? (
              <Box sx={{ width: "25%", textAlign: "center" }}>
                <CheckCircleIcon sx={{ color: "#52C03C" }} />
              </Box>
            ) : (
              <Box sx={{ width: "25%", textAlign: "center" }}>
                <ClearIcon
                  sx={{
                    background: "#E4313C",
                    color: "black",
                    borderRadius: "50%",
                    fontSize: fs.xx_large,
                  }}
                />
              </Box>
            )}
            <Typography
              sx={{
                fontSize: { lg: fs.small, xs: fs.xs, xxxs: fs.xxs },
                fontWeight: 500,
                fontFamily: "poppins",
                color: "secondary.main",
                width: "25%",
                textAlign: "center",
              }}
            >
              {e.minAge}
            </Typography>
            {e.allowed ? (
              <Box sx={{ width: "25%", textAlign: "center" }}>
                <CheckCircleIcon sx={{ color: "#52C03C" }} />
              </Box>
            ) : (
              <Box sx={{ width: "25%", textAlign: "center" }}>
                <ClearIcon
                  sx={{
                    background: "#E4313C",
                    color: "black",
                    borderRadius: "50%",
                    fontSize: fs.xx_large,
                  }}
                />
              </Box>
            )}
          </Box>
        ))}
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          width: "100%",
          height: "90vh",
          maxHeight: "90vh",
          border: "1px solid #494949",
          borderRadius: "4px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LoadingSpinnerEachSection />
      </Box>
    );
  }
}

export const getStates = async () => {
  var apiUrl = APIURLs.getStates;
  const apiResponse = await makeGETAPICall(apiUrl);
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return null;
  }
};
