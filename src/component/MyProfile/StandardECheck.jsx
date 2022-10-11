import React, { useContext } from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./profile.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function StandardECheck({
  setOpenTag,
  setAlreadyChooseWidthDraw,
}) {
  return (
    <Box
      sx={{
        width: {
          lg: "836px",
          md: "700px",
          sm: "560px",
          xs: "450px",
          xxxs: "90%",
        },
        minHeight: "100vh",
        margin: "auto",
        mt: "10px",
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
          justifyContent: "space-between",
          alignItems: "center",
          mt: "15px",
          cursor: "pointer",
          mb: "31px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => setOpenTag("chooseAWithdrawMethod")}
        >
          <ArrowBackIosNewIcon sx={{ color: "secondary.dark_gray" }} />
          <Typography
            sx={{
              fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
              fontWeight: 600,
              fontFamily: "poppins",
              color: "secondary.dark_gray",
              ml: "15px",
            }}
          >
            Choose a withdraw method{" "}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
            fontWeight: 500,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => setOpenTag("chooseAWithdrawMethod")}
        >
          Show all options
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #494949",
          mb: "11px",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img src="/check1.png" className="chooseIcon" />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              width: "90%",
            }}
          >
            <Typography
              sx={{
                fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
                fontWeight: 600,
                fontFamily: "poppins",
                color: "secondary.dark_gray",
                width: "100%",
                mb: "4px",
              }}
            >
              Standard eCheck{" "}
            </Typography>
            <Typography
              sx={{
                fontSize: { sm: "12px", xxs: "10px", xxxs: "8px" },
                fontWeight: 400,
                fontFamily: "poppins",
                color: "secondary.dark_gray",
                width: "100%",
                mb: "4px",
              }}
            >
              Under 24 hours{" "}
            </Typography>
            <Typography
              sx={{
                fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
                fontWeight: 400,
                fontFamily: "poppins",
                color: "secondary.dark_gray",
                width: "100%",
                mb: "4px",
              }}
            >
              An eCheck is emailed within 3-5 business P days to your email
              address. You can print this check and deposit at the bank in your
              preferred way.{" "}
            </Typography>
          </Box>
        </Box>
        <ArrowForwardIosIcon />
      </Box>
      <Typography
        sx={{
          color: "secondary.dark_gray",
          fontFamily: "poppins",
          fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
          fontWeight: 600,
          mt: "16px",
          width: "100%",
        }}
      >
        Destination
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "flex-start",
          mt: "16px",
        }}
      >
        <Typography
          sx={{
            color: "secondary.dark_gray",
            fontFamily: "poppins",
            fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
            fontWeight: 600,
          }}
        >
          Name:
        </Typography>
        <Typography
          sx={{
            color: "secondary.dark_gray",
            fontFamily: "poppins",
            fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
            fontWeight: 400,
            ml: "8px",
          }}
        >
          PHANI GUNDAMRAJ{" "}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "flex-start",
          mt: "12px",
        }}
      >
        <Typography
          sx={{
            color: "secondary.dark_gray",
            fontFamily: "poppins",
            fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
            fontWeight: 600,
          }}
        >
          Email:
        </Typography>
        <Typography
          sx={{
            color: "secondary.dark_gray",
            fontFamily: "poppins",
            fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
            fontWeight: 400,
            ml: "8px",
          }}
        >
          dattaganeshan@gmail.com{" "}
        </Typography>
      </Box>
      <Button
        sx={{
          fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
          fontWeight: 600,
          fontFamily: "poppins",
          color: "white",
          background: "#4831D4",
          padding: { xs: "14px 77px", xxxs: "10px 60px" },
          mt: "32px",
          borderRadius: "8px",
          "&.MuiButtonBase-root:hover": {
            background: "#4831D4",
          },
          textTransform: "none",
        }}
        onClick={() => {
          setAlreadyChooseWidthDraw("standard-eCheck");
          setOpenTag("WidthDrawCash");
        }}
      >
        Choose Standard eCheck
      </Button>
      <Typography
        sx={{
          fontSize: { sm: "14px", xxs: "12px", xxxs: "10px" },
          fontWeight: 400,
          fontFamily: "poppins",
          color: "secondary.dark_gray",
          width: "100%",
          mt: "32px",
        }}
      >
        Declaration and payment of all income taxes associated with contest
        winnings are sole responsibility of the contest winner. Failure to
        comply with tax regulations and failure to pay tax liabilities may
        result in civil penalities or criminal liability.
      </Typography>
    </Box>
  );
}
