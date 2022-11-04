import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PriorityHigh from "@mui/icons-material/PriorityHigh";
import { useDispatch, useSelector } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
const PointsBreakdown = ({
  mode,
  setOpenPointsBreakdown,
  setOpenFpsPopup,
  pbData,
}) => {
  const fs = useSelector((state) => state.user.fs);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(null);

  useEffect(() => {
    if (pbData) {
      let name = pbData.name.match(/\b(\w)/g).join("");
      let firstNameToAdd = name.slice(0, 2);
      setFirstName(firstNameToAdd);
    }
  }, [pbData]);

  if (pbData) {
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
              onClick={() => setOpenPointsBreakdown(false)}
            />
          </Box>
          <Box
            sx={{
              width: "90%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              sx={{
                fontSize: fs.normal,
                fontWeight: "600",
                color: "white",
                mb: "10px",
                fontFamily: "poppins",
              }}
            >
              Points: {pbData.totalScore}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
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
                <Box
                  sx={{
                    width: "70px",
                    height: "70px",
                    background: `${pbData.jerseyColor}`,
                    borderRadius: "50%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "black",
                  }}
                >
                  {firstName}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    ml: "10px",
                    fontSize: fs.large,
                    fontWeight: "600",
                    color: "white",
                    fontFamily: "poppins",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: fs.small,
                      fontWeight: "400",
                      color: "white",
                      fontFamily: "poppins",
                    }}
                  >
                    {pbData.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: fs.small,
                      fontWeight: "400",
                      color: "white",
                      fontFamily: "poppins",
                    }}
                  >
                    {pbData.teamName}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: fs.small,
                      fontWeight: "400",
                      color: "white",
                      fontFamily: "poppins",
                    }}
                  >
                    {pbData.profile}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "90%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mt: "20px",
              borderBottom: "1px solid gray",
              pb: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: fs.small,
                fontWeight: "600",
                color: "white",
                fontFamily: "poppins",
              }}
            >
              Event
            </Typography>
            <Typography
              sx={{
                fontSize: fs.small,
                fontWeight: "500",
                color: "white",
                fontFamily: "poppins",
              }}
            >
              Over-Under Points
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "90%",
              maxHeight: "80%",
              overflow: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {pbData.statKeys.map((each, index) => (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  mt: "10px",
                  borderBottom: `${
                    pbData.length - 1 !== index && "1px solid gray"
                  }`,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: fs.small,
                        fontWeight: "600",
                        color: "white",
                        fontFamily: "poppins",
                      }}
                    >
                      {each.display}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: fs.small,
                        fontWeight: "400",
                        color: "white",
                        fontFamily: "poppins",
                      }}
                    >
                      Actual value: {each.value}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontSize: fs.large,
                    fontWeight: "600",
                    color: `${
                      each.ouPoints < 0
                        ? "red"
                        : each.ouPoints === 0
                        ? "white"
                        : "green"
                    }`,
                    fontFamily: "poppins",
                  }}
                >
                  {each.ouPoints}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    );
  } else {
    return <></>;
  }
};
export default PointsBreakdown;
