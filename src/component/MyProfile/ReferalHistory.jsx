import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import "./profile.css";
import { useSelector } from "react-redux";
import { APIURLs } from "../../api/ApiUrls";
import { makeGETAPICall } from "../../api/methods";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";
import LoadingSpinnerTransparent from "../loadingSpinner/LoadingSpinnerTransparent";

const DateComponent = ({ date, fs }) => {
  const [dateToShow, setDateToShow] = useState(null);
  useEffect(() => {
    if (date) {
      let dateData = new Date(date);
      let dd = dateData.getDate();
      let mm = dateData.getMonth() + 1;

      let yyyy = dateData.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      let dateDataToShow = mm + "/" + dd + "/" + yyyy;
      setDateToShow(dateDataToShow);
    }
  }, [date]);
  return (
    <Typography
      sx={{
        fontSize: {
          sm: fs.normal,
          xxs: fs.small,
          xxxs: fs.xs,
        },
        fontWeight: 400,
        fontFamily: "poppins",
        color: "secondary.main",
      }}
    >
      {dateToShow}
    </Typography>
  );
};
export default function ReferalHistory({ setOpenReferalHistory, mode }) {
  const fs = useSelector((state) => state.user.fs);

  const [referrals, setReferrals] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      getRefHistory(user.uid)
        .then((res) => {
          console.log(res);
          setReferrals(res);
          setLoading(false);
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    }
  }, []);

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
      {loading ? (
        <Box
          sx={{
            width: { sm: "691px", xxxs: "90%" },
            background: `${mode === "dark" ? "#494949" : "white"}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "80%",
            maxHeight: "80%",
            borderRadius: "8px",
          }}
        >
          <LoadingSpinnerTransparent />
        </Box>
      ) : (
        <Box
          sx={{
            width: { sm: "691px", xxxs: "90%" },
            background: `${mode === "dark" ? "#494949" : "white"}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "8px",

            height: `${
              referrals && referrals.referrals.length > 0 ? "80%" : "350px"
            }`,
            maxHeight: `${
              referrals && referrals.referrals.length > 0 ? "80%" : "350px"
            }`,
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
          {referrals && referrals.referrals.length === 0 ? (
            <>
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
                {referrals.heading}
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
                {referrals.subHeading}
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
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  width: "90%",
                  border: "1px solid #7a7a7a",
                  borderRadius: "4px",
                  mb: "22px",
                  mt: "31px",
                  maxHeight: "80%",
                  overflow: "scroll",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  {referrals.referrals.map((e, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderBottom: `${
                          referrals.referrals.length === index + 1
                            ? "none"
                            : "1px solid #7a7a7a"
                        }`,
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
                        <img
                          src={`${
                            e.status === "p"
                              ? "/pending.png"
                              : "/Group 4215.png"
                          }`}
                          className="referalHistoryDataICon"
                        />
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
                              fontSize: {
                                sm: fs.normal,
                                xxs: fs.small,
                                xxxs: fs.xs,
                              },
                              fontWeight: 400,
                              fontFamily: "poppins",
                              color: "secondary.main",
                            }}
                          >
                            {e.name}
                          </Typography>
                          <DateComponent date={e.date} fs={fs} />
                        </Box>
                      </Box>
                      <Typography
                        sx={{
                          fontSize: {
                            sm: fs.normal,
                            xxs: fs.small,
                            xxxs: fs.xs,
                          },
                          fontWeight: 400,
                          fontFamily: "poppins",
                          color: "secondary.main",
                          mr: "9px",
                        }}
                      >
                        {e.status === "p" ? "pending" : "completed"}
                      </Typography>
                    </Box>
                  ))}
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
                Bonus cash is released when your friend makes their first
                deposit{" "}
              </Typography>
            </>
          )}
        </Box>
      )}
    </Box>
  );
}

//get referal history

export const getRefHistory = async (userId) => {
  var apiUrl = APIURLs.getRefHistory;
  apiUrl = apiUrl.replace("{userId}", userId);
  const apiResponse = await makeGETAPICall(apiUrl);
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return null;
  }
};
