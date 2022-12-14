import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./detail.css";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PayoutScenarious from "./PayoutScenarious";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinnerDetail from "../loadingSpinner/LoadingSpinnerDetail";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FpsPopup from "./FpsPopup";
import PointsBreakdown from "./PointsBreakdown";

import { APIURLs } from "../../api/ApiUrls";
import { makeGETAPICall } from "../../api/methods";

export default function Detail({
  mode,
  setOpenDetail,
  detailData,
  openDetail,
  referCode,
  mainDetail,
  clickedId,
  emptyText,
  detailLoading,
  refreshAndCallDetailApi,
}) {
  const userDetail = useSelector((state) => state.user.userDetail);
  const dispatch = useDispatch();
  const [code, setCode] = useState(null);
  const fs = useSelector((state) => state.user.fs);
  const [openFpsPopup, setOpenFpsPopup] = useState(false);
  const [openPointsBreakdown, setOpenPointsBreakdown] = useState(false);
  useEffect(() => {
    if (userDetail) {
      setCode(userDetail.referralCode);
    }
  }, [userDetail]);

  const [openPayoutScenarious, setOpenPayoutScenarious] = useState(false);
  const [projection, setProjection] = useState([]);
  const [isRefunded, setIsRefunded] = useState(false);
  useEffect(() => {
    if (detailData) {
      setProjection(detailData.props[0].prop.projections);
      console.log(detailData);
      console.log(detailData.props[0].status);
      if (detailData.props[0].status === "x") {
        setIsRefunded(true);
      } else {
        setIsRefunded(false);
      }
    }
  }, [detailData]);
  const [fpsData, setFpsData] = useState([]);
  const [pbData, setPbData] = useState(null);
  const callFpsFunc = () => {
    setOpenFpsPopup(true);
    getFantasyPoints(detailData.props[0].id)
      .then((result) => {
        setFpsData(result);
      })
      .catch((error) => {
        if (error) {
          console.log(error);
        }
      });
  };

  return (
    <Box
      sx={{
        width: { md: "50%", xxxs: "100%" },
        minHeight: "500px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ml: { md: "10px", xxxs: "0px" },
        border: `${
          mode === "dark" ? "1px solid #494949" : "1px solid #494949"
        }`,
        bgcolor: "primary.main",
        bgcolor: "transparent",
        mt: "0px",
        marginBottom: "50px",
      }}
      component="div"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #494949",
          py: "5px",
          width: "100%",
          background: "black",
        }}
      >
        <img src="/sportBattleMyPropsLogo.png" className="logoDetail" />
        <Typography
          sx={{
            color: "white",
            fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
            fontWeight: 700,
            fontFamily: "poppins",
            position: "relative",
            left: "-5px",
          }}
          id="detail"
        >
          SportsBattle
        </Typography>
      </Box>
      {detailLoading ? (
        <LoadingSpinnerDetail />
      ) : (
        <>
          {detailData ? (
            <Box sx={{ width: "90%", mx: "auto", mb: "100px" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  mt: "14px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
                    fontWeight: 600,
                    fontFamily: "poppins",
                    color: "secondary.dark_gray",
                    mr: "5px",
                  }}
                >
                  {detailData.props[0].playTypeEmoji} Entry Fee: $
                  {detailData.props[0].entryFee},
                </Typography>
                <Typography
                  sx={{
                    fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
                    fontWeight: 600,
                    fontFamily: "poppins",
                    color: "secondary.dark_gray",
                    mr: "7px",
                  }}
                >
                  To Win: ${detailData.props[0].toWin}
                </Typography>
                <InfoOutlinedIcon
                  sx={{
                    fontSize: {
                      sm: fs.large,
                      xxs: fs.normal,
                      xxxs: fs.normal,
                    },
                    fontWeight: 200,
                    fontFamily: "poppins",
                    color: "lightblue",
                    cursor: "pointer",
                    mb: "1px",
                  }}
                  onClick={() => setOpenPayoutScenarious(true)}
                />
              </Box>

              <Box
                sx={{
                  width: "100%",
                  height: "3px",
                  mt: "6px",
                  bgcolor: "secondary.dark_gray",
                }}
              ></Box>
              {projection.map((each, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #494949",
                    pb: "12px",
                    mt: "12px",
                    mb: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "35%",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          sm: each.playerName.length > 16 ? fs.xs : fs.small,
                          xxs: each.playerName.length > 16 ? fs.xxs : fs.xs,
                          xxxs: each.playerName.length > 16 ? fs.xxxs : fs.xxs,
                        },
                        fontWeight: 700,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                      }}
                    >
                      {each.playerName}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { sm: fs.xxs, xxs: fs.xxs, xxxs: fs.xxxs },
                        fontWeight: 500,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mt: "1px",
                      }}
                    >
                      {each.teamName} - {each.profile}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { sm: fs.xxs, xxs: fs.xxs, xxxs: fs.xxxs },
                        fontWeight: 500,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mt: "3px",
                        textDecoration: `${
                          !each.considered && detailData.props[0].status === "c"
                            ? "line-through"
                            : "none"
                        }`,
                      }}
                    >
                      {each.sport.toUpperCase()}, {each.gameName}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: { sm: fs.xxs, xxs: fs.xxs, xxxs: fs.xxxs },
                        fontWeight: 900,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mt: "3px",
                        color: `${
                          each.propStatus === "won"
                            ? "#439F48"
                            : each.propStatus === "lost"
                            ? "#d04643"
                            : "lightblue"
                        }`,
                      }}
                    >
                      {each.propStatus ? each.propStatus : "yet to begin"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around",
                      height: "100%",
                    }}
                  >
                    {each.action === "under" ? (
                      <Typography
                        sx={{
                          fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                          fontWeight: 700,
                          fontFamily: "poppins",
                          color: `${
                            isRefunded
                              ? "gray"
                              : openDetail === "Upcoming" ||
                                openDetail === "Live"
                              ? "white"
                              : each.propStatus === "lost"
                              ? "#D04643"
                              : "#439F48"
                          }`,
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        BELOW{" "}
                        <KeyboardArrowDownIcon
                          sx={{ mb: "4px", fontSize: fs.large }}
                        />
                      </Typography>
                    ) : (
                      <Typography
                        sx={{
                          fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                          fontWeight: 700,
                          fontFamily: "poppins",
                          color: `${
                            isRefunded
                              ? "gray"
                              : openDetail === "Upcoming" ||
                                openDetail === "Live"
                              ? "white"
                              : each.propStatus === "lost"
                              ? "#D04643"
                              : "#439F48"
                          }`,
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        ABOVE{" "}
                        <KeyboardArrowUpIcon
                          sx={{ mb: "3px", fontSize: fs.large }}
                        />
                      </Typography>
                    )}
                    <Typography
                      sx={{
                        fontSize: {
                          sm: fs.x_large,
                          xxs: fs.large,
                          xxxs: fs.normal,
                        },
                        fontWeight: 700,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                      }}
                    >
                      {each.projection}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { sm: fs.xs, xxs: fs.xxs, xxxs: fs.xxxs },
                        fontWeight: 500,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                      }}
                    >
                      {each.statDisplay}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { sm: fs.xxs, xxs: fs.xxxs, xxxs: fs.xxxs },
                        fontWeight: 500,
                        fontFamily: "poppins",
                        color: `${
                          openDetail === "Upcoming" || openDetail === "Live"
                            ? "white"
                            : mode === "dark"
                            ? "#C2DDF8"
                            : "#4831D4"
                        }`,
                      }}
                    >
                      Actual
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: {
                          sm: fs.x_large,
                          xxs: fs.large,
                          xxxs: fs.normal,
                        },
                        fontWeight: 700,
                        fontFamily: "poppins",
                        color: `${
                          openDetail === "Upcoming" || openDetail === "Live"
                            ? "white"
                            : mode === "dark"
                            ? "#C2DDF8"
                            : "#4831D4"
                        }`,
                        mt: `${
                          each.statKey === "fps"
                            ? isRefunded
                              ? "10px"
                              : "0px"
                            : "10px"
                        }`,
                      }}
                    >
                      {each.actual ? each.actual : "0"}
                    </Typography>
                    <Box
                      sx={{
                        width: "43px",
                        height: "2px",
                        background: "gray",
                        mt: `${
                          each.statKey === "fps"
                            ? isRefunded
                              ? "10px"
                              : "0px"
                            : "10px"
                        }`,
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Box
                        sx={{
                          width: `${
                            each.actual
                              ? (each.actual / each.projection) * 100 > 100
                                ? 100
                                : (each.actual / each.projection) * 100
                              : 0
                          }%`,
                          height: "100%",
                          background: "#439F48",
                          background: `${
                            openDetail === "Upcoming" || openDetail === "Live"
                              ? "white"
                              : each.propStatus === "won"
                              ? "#439F48"
                              : "#D04643"
                          }`,
                        }}
                      ></Box>
                    </Box>
                    {each.statKey === "fps" && !isRefunded && (
                      <Box
                        sx={{
                          background: "#4831D4",
                          color: "white",
                          padding: "5px",
                          borderRadius: "4px",
                          fontSize: { sm: fs.xxs, xxs: fs.xxxs, xxxs: fs.xxxs },

                          fontWeight: 700,
                          fontFamily: "poppins",
                          mt: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => callFpsFunc()}
                      >
                        FPS
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: "25px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  {detailData.props[0].prop.payouts.map((each, index) => (
                    <Typography
                      key={index}
                      sx={{
                        fontSize: { xs: fs.xs, xxs: fs.xxs, xxxs: fs.xxxs },
                        fontWeight: 600,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                      }}
                    >
                      {each.picks}/{detailData.props[0].prop.projections.length}{" "}
                      - wins {each.payout}x{" "}
                    </Typography>
                  ))}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: fs.small,
                      fontWeight: "600",
                      color: `${detailData.props[0].modeColor}`,
                    }}
                  >
                    {detailData.props[0].playTypeEmoji}{" "}
                    {detailData.props[0].playType}
                  </Typography>{" "}
                </Box>
              </Box>

              {openDetail === "Upcoming" || openDetail === "Live" ? (
                <>
                  {openDetail === "Live" && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { sm: "row", xxxs: "column" },
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        flexWrap: "wrap",
                        border: "1px solid #4831D4",
                        padding: "3px 10px",
                        borderRadius: "4px",
                        mt: "4px",
                        width: "100px",
                      }}
                      onClick={() => refreshAndCallDetailApi(mainDetail)}
                    >
                      <img
                        src="/refresh.png"
                        style={{
                          marginRight: "3px",
                          height: "15px",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: { md: fs.small, sm: fs.xxs, xxxs: fs.xxxs },
                          fontFamily: "poppins",
                          fontWeight: 500,
                          color: "secondary.main",
                          ml: { sm: "5px", xxxs: "0px" },
                        }}
                      >
                        Refresh
                      </Typography>
                    </Box>
                  )}
                </>
              ) : (
                <>
                  {detailData.props[0].prop.status === "x" ? (
                    <Typography
                      sx={{
                        fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                        fontWeight: 400,
                        fontFamily: "poppins",
                        color: "white",
                        mt: "16px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: "20px",
                      }}
                    >
                      {detailData.props[0].prop.comment}
                    </Typography>
                  ) : (
                    <>
                      {detailData.props[0].prop.userWon && (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          {detailData.props[0].userWon && (
                            <img
                              src="/greatPick.png"
                              className="greatPickPhoto"
                            />
                          )}
                          <Typography
                            sx={{
                              fontSize: {
                                sm: fs.small,
                                xxs: fs.xs,
                                xxxs: fs.xxs,
                              },

                              fontWeight: 400,
                              fontFamily: "poppins",
                              color: "#BBDEFA",
                              mt: "12px",
                            }}
                          >
                            Refer a Friend & Get $25{" "}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: {
                                sm: fs.xs,
                                xxs: fs.xxs,
                                xxxs: fs.xxxs,
                              },
                              fontWeight: 400,
                              fontFamily: "poppins",
                              color: "#459F48",
                              mt: "3px",
                            }}
                          >
                            Your Referral Code{" "}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: {
                                sm: fs.xxx_large,
                                xxs: fs.xx_large,
                                xxxs: fs.x_large,
                              },
                              fontWeight: 600,
                              fontFamily: "poppins",
                              color: "secondary.dark_gray",
                              mt: "3px",
                              mb: "15px",
                            }}
                          >
                            {code}{" "}
                          </Typography>
                        </Box>
                      )}
                    </>
                  )}
                </>
              )}
            </Box>
          ) : (
            <Typography
              sx={{
                fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
                fontWeight: 400,
                fontFamily: "poppins",
                color: "secondary.dark_gray",
                mt: "50%",
                width: "50%",
                textAlign: "center",
              }}
            >
              {emptyText}
            </Typography>
          )}
          {openPayoutScenarious && (
            <PayoutScenarious
              setOpenPayoutScenarious={setOpenPayoutScenarious}
              mode={mode}
              detailData={detailData}
            />
          )}
          {openFpsPopup && (
            <FpsPopup
              mode={mode}
              setOpenPointsBreakdown={setOpenPointsBreakdown}
              setOpenFpsPopup={setOpenFpsPopup}
              fpsData={fpsData}
              setPbData={setPbData}
              setFpsData={setFpsData}
            />
          )}
          {openPointsBreakdown && (
            <PointsBreakdown
              mode={mode}
              setOpenPointsBreakdown={setOpenPointsBreakdown}
              setOpenFpsPopup={setOpenFpsPopup}
              pbData={pbData}
            />
          )}
        </>
      )}
    </Box>
  );
}

// fantasy score api

export const getFantasyPoints = async (propId) => {
  var apiUrl = APIURLs.getFantasyPoints;
  apiUrl = apiUrl.replace("{propId}", propId);
  const apiResponse = await makeGETAPICall(apiUrl);
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return null;
  }
};
