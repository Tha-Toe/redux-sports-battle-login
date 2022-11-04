import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./profile.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSelector } from "react-redux";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";
import { useNavigate } from "react-router-dom";
export default function AccountSetup({
  setOpenTag,
  myAccountDataCommingFromApi,
}) {
  const fs = useSelector((state) => state.user.fs);
  const navigate = useNavigate();
  if (myAccountDataCommingFromApi) {
    return (
      <Box
        sx={{
          width: {
            lg: "836px",
            md: "700px",
            sm: "560px",
            xs: "90%",
            xxxs: "90%",
          },
          minHeight: "100vh",
          margin: "auto",
          mt: "40px",
          mb: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        component="div"
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            mt: "15px",
            cursor: "pointer",
          }}
          onClick={() => setOpenTag("profile")}
        >
          <ArrowBackIosNewIcon />
          <Typography
            sx={{
              fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
              fontWeight: 600,
              fontFamily: "poppins",
              color: "secondary.main",
              ml: "15px",
            }}
          >
            Account Setup{" "}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "secondary.main",
            mt: "19px",
            width: "100%",
          }}
        >
          Complete below two steps below to be eligible for withdrawing your
          cash winnings
        </Typography>
        <Typography
          sx={{
            fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "#4831D4",
            width: "100%",
          }}
        >
          You only do this once
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            borderBottom: "1px solid #494949",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "26px",
            pb: "22px",
            cursor: "pointer",
          }}
          onClick={() => setOpenTag("add-phone-number")}
        >
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <CheckCircleIcon
              sx={{
                color: `${
                  myAccountDataCommingFromApi.phoneNumberVerified
                    ? "#459F48"
                    : "secondary.main"
                }`,
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography
                sx={{
                  ml: "17px",
                  fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
                  fontWeight: 600,
                  fontFamily: "poppins",
                  color: "secondary.main ",
                }}
              >
                Verify your phone
              </Typography>
              {myAccountDataCommingFromApi.phoneNumberVerified && (
                <Typography
                  sx={{
                    ml: "17px",
                    fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                    fontWeight: 400,
                    fontFamily: "poppins",
                    color: "secondary.main ",
                  }}
                >
                  You have verified your phone{" "}
                </Typography>
              )}
            </Box>
          </Box>
          {!myAccountDataCommingFromApi.phoneNumberVerified && (
            <Typography
              sx={{
                fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                fontWeight: 500,
                fontFamily: "poppins",
                color: "#459F48 ",
                width: "120px",
              }}
            >
              Verify Phone
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            borderBottom: "1px solid #494949",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "26px",
            pb: "22px",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <CheckCircleIcon
              sx={{
                color: `${
                  myAccountDataCommingFromApi.firstDeposit
                    ? "#459F48"
                    : "secondary.main"
                }`,
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography
                sx={{
                  ml: "17px",
                  fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
                  fontWeight: 600,
                  fontFamily: "poppins",
                  color: "secondary.main ",
                }}
              >
                Make your First Deposit
              </Typography>
              {myAccountDataCommingFromApi.firstDeposit && (
                <Typography
                  sx={{
                    ml: "17px",
                    fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                    fontWeight: 400,
                    fontFamily: "poppins",
                    color: "secondary.main ",
                  }}
                >
                  You have made your deposit{" "}
                </Typography>
              )}
            </Box>
          </Box>
          {!myAccountDataCommingFromApi.firstDeposit && (
            <Typography
              sx={{
                fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                fontWeight: 500,
                fontFamily: "poppins",
                color: "#459F48 ",
                width: "120px",
              }}
            >
              Verify Deposit
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            borderBottom: "1px solid #494949",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "26px",
            pb: "22px",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <CheckCircleIcon
              sx={{
                color: `${
                  myAccountDataCommingFromApi.dobQuestion &&
                  myAccountDataCommingFromApi.idpVerified
                    ? "#459F48"
                    : "secondary.main"
                }`,
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography
                sx={{
                  ml: "17px",
                  fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
                  fontWeight: 600,
                  fontFamily: "poppins",
                  color: "secondary.main ",
                }}
              >
                Verify your account{" "}
              </Typography>
              {myAccountDataCommingFromApi.dobQuestion &&
                myAccountDataCommingFromApi.idpVerified && (
                  <Typography
                    sx={{
                      ml: "17px",
                      fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                      fontWeight: 400,
                      fontFamily: "poppins",
                      color: "secondary.main ",
                    }}
                  >
                    Your account is verified{" "}
                  </Typography>
                )}
            </Box>
          </Box>
          {!myAccountDataCommingFromApi.dobQuestion ||
          !myAccountDataCommingFromApi.idpVerified ? (
            <Typography
              sx={{
                fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                fontWeight: 500,
                fontFamily: "poppins",
                color: "#459F48 ",
                width: "120px",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/home?deposit=new&page=verify", { replace: true });
              }}
            >
              Verify Account
            </Typography>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    );
  } else {
    <LoadingSpinnerEachSection />;
  }
}
