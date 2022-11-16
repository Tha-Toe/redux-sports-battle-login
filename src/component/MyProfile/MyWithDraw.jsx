import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./profile.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { APIURLs } from "../../api/ApiUrls";
import { makeGETAPICall } from "../../api/methods";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { Grid, Card } from "@mui/material";
import { useSelector } from "react-redux";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";

const Time = ({ date }) => {
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
      let time = dateData.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      let dateDataToShow = mm + "/" + dd + "/" + yyyy + ", " + time;
      setDateToShow(dateDataToShow);
    }
  }, [date]);
  return (
    <Typography
      sx={{
        fontSize: { xs: "12px", xxs: "10px", xxxs: "8px" },
        fontWeight: 500,
        fontFamily: "poppins",
        color: "secondary.main",
        mt: "6px",
      }}
    >
      {dateToShow}
    </Typography>
  );
};

export default function MyWithDraw({ mode, setOpenTag }) {
  const fs = useSelector((state) => state.user.fs);

  const [loading, setLoading] = useState(true);
  const [myWithdrawData, setMyWithdrawData] = useState([]);
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      getWithdrawHistory(user.uid)
        .then((res) => {
          if (res) {
            console.log(res);
            setMyWithdrawData(res);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const backToProfile = () => {
    setOpenTag("profile");
  };

  if (loading) {
    return (
      <Box sx={{ width: "100%", height: "100%" }}>
        <LoadingSpinnerEachSection />
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          width: {
            xl: "1000px",
            lg: "836px",
            md: "700px",
            sm: "560px",
            xs: "450px",
            xxxs: "90%",
          },
          margin: "auto",
          mt: "10px",
          mb: "30px",
        }}
        component="div"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            mt: "23px",
            cursor: "pointer",
          }}
          onClick={backToProfile}
        >
          <ArrowBackIosNewIcon sx={{ color: "secondary.dark_gray" }} />
          <Typography
            sx={{
              fontSize: { xs: fs.normal, xxs: fs.small, xxxs: fs.xs },
              fontWeight: 700,
              fontFamily: "poppins",
              color: "secondary.dark_gray",
              ml: "10px",
            }}
          >
            My Withdrawals
          </Typography>
        </Box>
        <Box
          sx={{
            width: { xs: "232px", xxxs: "150px" },
            height: "2px",
            bgcolor: "secondary.dark_gray",
            mt: "9px",
            mb: "21px",
          }}
        ></Box>
        <Box
          sx={{
            width: "100%",
            maxHeight: "100vh",
            overflow: "scroll",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Grid container sx={{ width: "100%" }}>
            {myWithdrawData.map((e, index) => (
              <Grid item md={6} xxxs={12} sx={{ mb: "12px" }} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "95%",
                    borderRadius: "4px",
                    border: `${
                      mode === "dark"
                        ? "1px solid #494949"
                        : "1px solid #494949"
                    }`,
                    bgcolor: "primary.main",
                    bgcolor: "transparent",
                    boxShadow: "none",
                    // height: { lg: "210px", md: "200px", xxxs: "auto" },
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      height: "100%",
                      ml: "10px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                        fontWeight: 400,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mt: "9px",
                      }}
                    >
                      {e.type}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: fs.xs, xxs: fs.xxs, xxxs: fs.xxxs },
                        fontWeight: 500,
                        fontFamily: "poppins",
                        color: "#9dc6d2",
                        mt: "6px",
                      }}
                    >
                      {e.statusText}
                    </Typography>
                    {e.mailingAddress && (
                      <Typography
                        sx={{
                          fontSize: {
                            xl: fs.xs,
                            xs: fs.xxs,
                            xxs: fs.xxs,
                            xxxs: fs.xxxs,
                          },
                          fontWeight: 500,
                          fontFamily: "poppins",
                          color: "secondary.dark_gray",
                          mt: "6px",
                          maxWidth: "90%",
                        }}
                      >
                        Mail to {e.mailingAddress.addrLine1}{" "}
                        {e.mailingAddress.addressLine2},{" "}
                        {e.mailingAddress.addrCity},{" "}
                        {e.mailingAddress.addrState}, {e.mailingAddress.addrZip}
                      </Typography>
                    )}
                    {e.comment && (
                      <Typography
                        sx={{
                          fontSize: {
                            xl: fs.xs,
                            xs: fs.xxs,
                            xxs: fs.xxs,
                            xxxs: fs.xxxs,
                          },
                          fontWeight: 500,
                          fontFamily: "poppins",
                          color: "secondary.dark_gray",
                          mt: "6px",
                          maxWidth: "90%",
                        }}
                      >
                        {e.comment}{" "}
                      </Typography>
                    )}
                    <Time date={e.updateDate} />
                    <Typography
                      sx={{
                        fontSize: { xs: fs.xs, xxs: fs.xxs, xxxs: fs.xxxs },
                        fontWeight: 400,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        mt: "6px",
                        mb: "8px",
                      }}
                    >
                      Conf# :: {e._id.substr(e._id.length - 6)}
                    </Typography>
                    {e.status === "a" && (
                      <Button
                        sx={{
                          color: "#32a038",
                          background: "#aff0af",
                          padding: "7px 15px",
                          borderRadius: "4px",
                          fontSize: { xs: fs.xxs, xxs: fs.xxxs, xxxs: fs.xxxs },
                          fontFamily: "poppins",
                          fontWeight: 600,
                          "&.MuiButtonBase-root:hover": {
                            background: "#aff0af",
                          },
                          textTransform: "none",
                          mb: "8px",
                        }}
                      >
                        Withdraw remaining ${e.amount}
                      </Button>
                    )}
                    {e.status === "a" && (
                      <Typography
                        sx={{
                          fontSize: { xs: fs.xxs, xxs: fs.xxxs, xxxs: fs.xxxs },
                          fontWeight: 400,
                          fontFamily: "poppins",
                          color: "#aff0af",
                          mb: "10px",
                        }}
                      >
                        Please click the above button to finish your withdrawal{" "}
                      </Typography>
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      justifyContent: "center",
                      cursor: "pointer",
                      mr: "20px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          xs: fs.x_large,
                          xxs: fs.small,
                          xxxs: fs.xs,
                        },
                        fontWeight: 500,
                        fontFamily: "poppins",
                        color: `${mode === "dark" ? "#FFCED6" : "#E4313C"}`,
                        color: `${mode === "dark" ? "#ffffff" : "#494949"}`,
                      }}
                    >
                      ${e.amount}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    );
  }
}

//get my withdrawal History

export const getWithdrawHistory = async (userId) => {
  var apiUrl = APIURLs.getWithdrawHistory;
  apiUrl = apiUrl.replace("{userId}", userId);
  const apiResponse = await makeGETAPICall(apiUrl);
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return null;
  }
};
