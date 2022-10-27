import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./detail.css";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PayoutScenarious from "./PayoutScenarious";
import { useSelector } from "react-redux";
import LoadingSpinnerDetail from "../loadingSpinner/LoadingSpinnerDetail";
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
}) {
  const userDetail = useSelector((state) => state.user.userDetail);
  const [code, setCode] = useState(null);

  useEffect(() => {
    if (userDetail) {
      setCode(userDetail.referralCode);
    }
  }, [userDetail]);
  const [tabelHead, setTabelHead] = useState([
    "Game",
    "Status",
    "Over",
    "Actual",
  ]);
  const [openPayoutScenarious, setOpenPayoutScenarious] = useState(false);
  const [projection, setProjection] = useState([]);
  useEffect(() => {
    if (detailData) {
      console.log(detailData.props[0].prop.projections);
      setProjection(detailData.props[0].prop.projections);
    }
  }, [detailData]);
  return (
    <Box
      sx={{
        width: { md: "50%", xxxs: "100%" },
        minHeight: "566px",
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
          pb: "5px",
          width: "100%",
          background: "black",
        }}
      >
        <img src="/sportBattleMyPropsLogo.png" className="logoDetail" />
        <Typography
          sx={{
            color: "white",
            fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
            fontWeight: 700,
            fontFamily: "poppins",
          }}
        >
          SportsBattle
        </Typography>
      </Box>
      {detailLoading ? (
        <LoadingSpinnerDetail />
      ) : (
        <>
          {detailData ? (
            <Box sx={{ width: "90%", mx: "auto" }}>
              <Typography
                sx={{
                  fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
                  fontWeight: 600,
                  fontFamily: "poppins",
                  color: "secondary.dark_gray",
                  mt: "14px",
                }}
              >
                Entry
              </Typography>
              <Box
                sx={{
                  width: "70px",
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
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "35%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
                        fontWeight: 700,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                      }}
                    >
                      {each.playerName}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { sm: "12px", xxs: "10px", xxxs: "8px" },
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
                        fontSize: { sm: "12px", xxs: "10px", xxxs: "8px" },
                        fontWeight: 500,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mt: "3px",
                      }}
                    >
                      {each.sport.toUpperCase()}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { sm: "12px", xxs: "10px", xxxs: "8px" },
                        fontWeight: 500,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mt: "3px",
                      }}
                    >
                      {each.gameName}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { sm: "20px", xxs: "18px", xxxs: "16px" },
                        fontWeight: 700,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                      }}
                    >
                      {each.projection}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { sm: "12px", xxs: "10px", xxxs: "8px" },
                        fontWeight: 500,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mt: "3px",
                      }}
                    >
                      {each.statDisplay}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { sm: "10px", xxs: "8px", xxxs: "8px" },
                        fontWeight: 500,
                        fontFamily: "poppins",
                        color: `${mode === "dark" ? "#C2DDF8" : "#4831D4"}`,
                      }}
                    >
                      {each.propStatus}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { sm: "20px", xxs: "18px", xxxs: "16px" },
                        fontWeight: 700,
                        fontFamily: "poppins",
                        color: `${mode === "dark" ? "#C2DDF8" : "#4831D4"}`,
                        mt: "12px",
                      }}
                    >
                      {each.actual}
                    </Typography>
                    <Box
                      sx={{
                        width: "43px",
                        height: "2px",
                        background: "#D9D9D9",
                        mt: "12px",
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          background: "#439F48",
                          background: `${
                            each.propStatus === "won" ? "#439F48" : "#D04643"
                          }`,
                        }}
                      ></Box>
                    </Box>
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
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    mt: "12px",
                  }}
                >
                  {detailData.props[0].prop.payouts.map((each, index) => (
                    <Typography
                      key={index}
                      sx={{
                        fontSize: { sm: "12px", xxs: "10px", xxxs: "8px" },
                        fontWeight: 600,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                      }}
                    >
                      {each.picks}/{detailData.props[0].prop.numGames} - win{" "}
                      {each.payout}x{" "}
                    </Typography>
                  ))}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    background: "#CEE4CC",
                    borderRadius: "4px",
                    cursor: "pointer",
                    p: "7px 18px",
                    mr: "0px",
                  }}
                  onClick={() => setOpenPayoutScenarious(true)}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "12px", xxs: "8px", xxxs: "6px" },
                      fontWeight: 500,
                      fontFamily: "poppins",
                      color: "#459F48",
                    }}
                  >
                    Payout Scenarios
                  </Typography>
                  <PlayArrowIcon sx={{ color: "#459F48" }} />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  mt: "20px",
                }}
              >
                <Button
                  sx={{
                    background: "#C2DDF8",
                    borderRadius: "4px",
                    fontSize: { xs: "12px", xxs: "8px", xxxs: "6px" },
                    fontWeight: 700,
                    fontFamily: "poppins",
                    color: "#4831D4",
                    "&.MuiButtonBase-root:hover": {
                      background: "#C2DDF8",
                    },
                    width: "47%",
                    py: "11px",
                    textTransform: "none",
                  }}
                >
                  Entry: ${detailData.props[0].entryFee}
                </Button>
                <Button
                  sx={{
                    background: "#CEE4CC",
                    borderRadius: "4px",
                    fontSize: { xs: "12px", xxs: "8px", xxxs: "6px" },
                    fontWeight: 700,
                    fontFamily: "poppins",
                    color: "#459F48",
                    "&.MuiButtonBase-root:hover": {
                      background: "#CEE4CC",
                    },
                    width: "47%",
                    py: "11px",
                    textTransform: "none",
                  }}
                >
                  TO WIN: ${detailData.props[0].toWin}
                </Button>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  mt: "11px",
                  mb: "8px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: `${detailData.props[0].modeColor}`,
                  }}
                >
                  {detailData.props[0].playTypeEmoji}{" "}
                  {detailData.props[0].playType}
                </Typography>{" "}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img src="/greatPick.png" className="greatPickPhoto" />
                <Typography
                  sx={{
                    fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
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
                    fontSize: { sm: "12px", xxs: "10px", xxxs: "8px" },
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
                    fontSize: { sm: "24px", xxs: "22px", xxxs: "20px" },
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
            </Box>
          ) : (
            <Typography
              sx={{
                fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
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
            />
          )}
        </>
      )}
    </Box>
  );
}
