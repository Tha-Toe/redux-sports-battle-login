import React, { useContext } from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import "./profile.css";
import { useSelector } from "react-redux";
export default function ReferalHistory({ setOpenReferalHistory, mode }) {
  const fs = useSelector((state) => state.user.fs);
  const [data, setData] = useState([
    {
      name: "SOFTWARE EURO",
      time: "08/02/2022",
      icon: "/Group 4215.png",
      condition: "complete",
    },
    {
      name: "RAGUL R",
      time: "08/02/2022",
      icon: "/pending.png",
      condition: "pending",
    },
  ]);

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
        zIndex: "20",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: { sm: "691px", xxxs: "90%" },
          background: `${mode === "dark" ? "#494949" : "white"}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            mt: "12px",
          }}
        >
          <Typography
            sx={{
              fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
              fontWeight: 700,
              fontFamily: "poppins",
              color: "secondary.main",
            }}
          >
            Referral History
          </Typography>
          <ClearIcon
            sx={{ color: "secondary.main", cursor: "pointer" }}
            onClick={() => setOpenReferalHistory(false)}
          />
        </Box>
        <img src="/gift.png" className="giftIcon" />
        <Typography
          sx={{
            fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
            fontWeight: 700,
            fontFamily: "poppins",
            color: "secondary.main",
            mt: "24px",
          }}
        >
          Share your love of Fantasy Sports
        </Typography>
        <Typography
          sx={{
            fontSize: { sm: "15px", xxs: "13px", xxxs: "11px" },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "secondary.main",
            mt: "8px",
            textAlign: "center",
            width: "75%",
          }}
        >
          You have not invited any friends yet. Introduce a friend to
          SportsBattle and you both get $25 bonus cash when they deposit & play.{" "}
        </Typography>
        <Button
          sx={{
            padding: "12px 47px",
            fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
            fontWeigh: 500,
            fontFamily: "poppins",
            color: "white",
            background: "#439F48",
            mt: "24px",
            borderRadius: "8px",
            textTransform: "none",
            "&.MuiButtonBase-root:hover": {
              background: "#439F48",
            },
          }}
        >
          Invite Now
        </Button>
        <Box
          sx={{
            display: "flex",
            width: "90%",
            border: "1px solid #7a7a7a",
            borderRadius: "4px",
            mb: "22px",
            mt: "31px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "98%",
            }}
          >
            {data.map((e, index) => (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #7a7a7a",
                  alignItems: "center",
                  pt: "8px",
                  pb: "16px",
                }}
              >
                <Box
                  sx={{
                    width: { xs: "50%", xxxs: "80%" },
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <img src={e.icon} className="referalHistoryDataICon" />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      ml: { xs: "16px", xxxs: "12px" },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
                        fontWeight: 400,
                        fontFamily: "poppins",
                        color: "secondary.main",
                      }}
                    >
                      {e.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
                        fontWeight: 400,
                        fontFamily: "poppins",
                        color: "secondary.main",
                      }}
                    >
                      {e.time}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
                    fontWeight: 400,
                    fontFamily: "poppins",
                    color: "secondary.main",
                    mr: "9px",
                  }}
                >
                  {e.condition}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "2%",
              alignItems: "center",
              borderLeft: "1px solid #7a7a7a",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "50%",
                borderRadius: "16px",
                background: "#7a7a7a",
                mt: "4px",
              }}
            ></Box>
          </Box>
        </Box>
        <Typography
          sx={{
            fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "secondary.main",
            width: "90%",
            mb: "40px",
          }}
        >
          Bonus cash is released when your friend makes their first deposit{" "}
        </Typography>
      </Box>
    </Box>
  );
}
