import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import { Grid, Card } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PayoutScenarious from "./PayoutScenarious";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import "./detail.css";
export default function Detail({
  mode,
  setOpenDetail,
  detailData,
  openDetail,
  referCode,
  mainDetail,
  clicked,
  emptyText,
}) {
  const [tabelHead, setTabelHead] = useState([
    "Game",
    "Status",
    "Over",
    "Actual",
  ]);

  const [openPayoutScenarious, setOpenPayoutScenarious] = useState(false);

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
            Entry #36475f
          </Typography>
          <Box
            sx={{
              width: "91px",
              height: "3px",
              mt: "6px",
              bgcolor: "secondary.dark_gray",
            }}
          ></Box>
          {detailData.map((e, index) => (
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
                sx={{ display: "flex", flexDirection: "column", width: "35%" }}
              >
                <Typography
                  sx={{
                    fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
                    fontWeight: 700,
                    fontFamily: "poppins",
                    color: "secondary.dark_gray",
                  }}
                >
                  {e.player.name}
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
                  {e.player.forward}
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
                  {e.game.playType.type}
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
                  {e.game.vs}
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
                  {e.goal.amount}
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
                  {e.goal.name}
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
                  {e.status}
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
                  {e.actual}
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
                  {e.bar === "full" && (
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        background: "#439F48",
                      }}
                    ></Box>
                  )}
                  {e.bar === "half" && (
                    <Box
                      sx={{
                        width: "50%",
                        height: "100%",
                        background: "#439F48",
                      }}
                    ></Box>
                  )}
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
              <Typography
                sx={{
                  fontSize: { sm: "12px", xxs: "10px", xxxs: "8px" },
                  fontWeight: 600,
                  fontFamily: "poppins",
                  color: "secondary.dark_gray",
                }}
              >
                3/3 correct - win $11.25{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: { sm: "12px", xxs: "10px", xxxs: "8px" },
                  fontWeight: 600,
                  fontFamily: "poppins",
                  color: "secondary.dark_gray",
                }}
              >
                2/3 correct - win $6.25{" "}
              </Typography>
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
              Entry: $5
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
              TO WIN: $11.25
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
            <img src={mainDetail[clicked].src} style={{ width: "116px" }} />
          </Box>
          {mainDetail[clicked].won && (
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
                IUUASV18{" "}
              </Typography>
            </Box>
          )}
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
    </Box>
  );
}
