import {
  Box,
  Button,
  getStepButtonUtilityClass,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import "./addCash.css";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SelectDepositOption from "./SelectDepositOption";
import { useSelector } from "react-redux";
import { APIURLs } from "../../api/ApiUrls";
import { makeGETAPICall } from "../../api/methods";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";
import LoadingSpinnerTransparent from "../loadingSpinner/LoadingSpinnerTransparent";

export default function AddCash({ mode }) {
  const fs = useSelector((state) => state.user.fs);
  const userDetail = useSelector((state) => state.user.userDetail);
  const depositData = useSelector((state) => state.user.depositData);
  const myAccountDataCommingFromApi = useSelector(
    (state) => state.user.myAccountDataCommingFromApi
  );
  const [amountList, setAmountList] = useState([
    { amount: "$30", bonus: 30 },
    { amount: "$50", bonus: 50 },
    { amount: "$100", bonus: 100 },
    { amount: "$250", bonus: 250 },
    { amount: "Other", bonus: 100 },
  ]);
  const [selected, setSelected] = useState("");
  const [amount, setAmount] = useState("");
  const [showLimit, setShowLimit] = useState(null);
  const [openSelectDepositOption, setOpenSelectDepositOption] = useState(false);
  const [supportChatOpen, setSupportChatOpen] = useState(false);
  const [firstDeposit, setFirstDeposit] = useState(false);
  const openSupportChat = () => {
    if (supportChatOpen) {
      window.Intercom("hide");
      setSupportChatOpen(false);
    } else {
      window.Intercom("show");
      setSupportChatOpen(true);
    }
  };
  useEffect(() => {
    if (userDetail) {
      setFirstDeposit(userDetail.firstDeposit);
    }
  }, [userDetail]);
  //get FAQ
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (depositData?.depositAmounts.length > 0) {
      let depositAmountToNum = Number(depositData.depositAmounts[0]);
      console.log(depositAmountToNum);
      setSelected(depositAmountToNum);
      setAmount(depositAmountToNum);
    }
  }, [depositData]);
  if (!depositData) {
    return (
      <Box
        component="div"
        sx={{
          width: { lg: "100%", md: "100%" },
          minHeight: { lg: "100%", xxxs: "auto" },
          display: "flex",
          flexDirection: "column",
          alignItem: "center",
          justifyContent: "center",
        }}
      >
        <LoadingSpinnerTransparent />
      </Box>
    );
  } else
    return (
      <Box
        sx={{
          height: "100%",
          width: {
            xl: "900px",
            lg: "800px",
            md: "500px",
            sm: "500px",
            xs: "80%",
            xxxs: "95%",
          },
          margin: "0 auto",
          display: "flex",
          flexDirection: { lg: "row", xxxs: "column" },
          alignItem: "center",
          justifyContent: "center",
          mt: { lg: 0, xxxs: "0px" },
          pb: "20px",
        }}
      >
        <Box
          component="div"
          sx={{
            width: { lg: "50%", md: "100%" },
            height: { lg: "100%", xxxs: "auto" },
            display: "flex",
            flexDirection: "column",
            alignItem: "center",
            justifyContent: "flex-start",
            mb: { xxxs: "30px", lg: 0 },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: fs.normal, xxxs: fs.small },
              fontWeight: 600,
              fontFamily: "poppins",
              color: "secondary.dark_gray",
              mt: "14px",
            }}
          >
            Add Cash
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: fs.small, xxxs: fs.xs },
              fontWeight: 300,
              fontFamily: "poppins",
              color: "secondary.dark_gray",
              mt: "16px",
            }}
          >
            How much would you like to deposit?{" "}
          </Typography>
          <Box sx={{ mt: "13px" }}>
            {depositData?.depositAmounts.map((e, index) => (
              <Button
                key={index}
                sx={{
                  minWidth: { xs: "64px", xxxs: "50px" },
                  height: "40px",
                  background: `${
                    selected.toString() === e
                      ? "#439F48"
                      : "secondary.dark_gray"
                  }`,
                  border: "1px solid #439F48",
                  borderRadius: "4px",
                  fontSize: { xs: fs.normal, xxxs: fs.small },
                  fontWeight: 600,
                  fontFamily: "poppins",
                  color: `${
                    selected.toString() === e ? "primary.main" : "#439F48"
                  }`,
                  mr: "4px",
                  "&.MuiButtonBase-root:hover": {
                    background: "#439F48",
                    color: "primary.main",
                  },
                }}
                onClick={() => {
                  setShowLimit(false);
                  if (e === "Other") {
                    setSelected(e);
                    setAmount(0);
                  } else {
                    let amountToNumber = Number(e);
                    setSelected(amountToNumber);
                    setAmount(amountToNumber);
                  }
                }}
              >
                {e !== "Other" && "$"}
                {e}
              </Button>
            ))}
          </Box>
          {selected === "Other" && (
            <Box sx={{ mt: "23px", mb: "0px" }}>
              <Typography
                sx={{
                  fontSize: { xs: fs.small, xxxs: fs.xs },
                  fontWeight: 600,
                  fontFamily: "poppins",
                  color: "secondary.dark_gray",
                  mb: "7px",
                }}
              >
                Enter Amount
              </Typography>
              <Input
                type="number"
                placeholder="100"
                variant="outlined"
                sx={{
                  color: "secondary.dark_gray",
                  borderBottom: "1px solid #439F48",
                  width: "100%",
                  py: "7px",
                  fontSize: { xs: fs.normal, xxxs: fs.small },
                  fontWeight: 500,
                  fontFamily: "poppins",
                  outline: "none",
                }}
                onChange={(e) => {
                  if (e.target.valueAsNumber !== e.target.valueAsNumber) {
                    setAmount(0);
                    setShowLimit(null);
                  } else {
                    setAmount(e.target.valueAsNumber);
                    if (e.target.valueAsNumber > depositData.limits.max) {
                      setShowLimit(`Limit is $${depositData.limits.max}`);
                    } else if (
                      depositData.limits.min > e.target.valueAsNumber
                    ) {
                      setShowLimit(
                        `Minimum deposit amount is $${depositData.limits.min}`
                      );
                    } else {
                      setShowLimit(null);
                    }
                  }
                }}
              />
              {showLimit && (
                <Typography
                  sx={{
                    fontSize: { xs: fs.small, xxxs: fs.xs },
                    fontWeight: 600,
                    fontFamily: "poppins",
                    color: "#E4313C",
                    mt: "16px",
                  }}
                >
                  {showLimit}
                </Typography>
              )}
            </Box>
          )}
          <Typography
            sx={{
              fontSize: { xs: fs.small, xxxs: fs.xs },
              fontWeight: 600,
              fontFamily: "poppins",
              color: "#439F48",
              mt: "23px",
            }}
          >
            You will receive: ${firstDeposit ? amount : amount ? amount * 2 : 0}{" "}
            {!firstDeposit && `(Bonus: $${amount ? amount : 0})`}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: fs.small, xxxs: fs.xs },
              fontWeight: 300,
              fontFamily: "poppins",
              color: "secondary.dark_gray",
              mt: "8px",
              textAlign: { xs: "start", xxxs: "center" },
            }}
          >
            You will see this transaction as from Onecricket Fantasy Inc, in
            your statement{" "}
          </Typography>
          <Button
            sx={{
              color: "white",
              fontSize: { xs: fs.normal, xxxs: fs.small },
              fontWeight: 600,
              fontFamily: "poppins",
              background: "#439F48",
              borderRadius: "8px",
              mt: "16px",
              py: { xs: "16px", xxxs: "12px" },
              "&.MuiButtonBase-root:hover": {
                background: "#439F48",
              },
            }}
            onClick={() => {
              if (!showLimit && amount) {
                setOpenSelectDepositOption(true);
              }
            }}
          >
            Continue
          </Button>
          <Box sx={{ background: "#494949", height: "2px", mt: "24px" }}></Box>
          <Typography
            sx={{
              fontSize: { xs: fs.small, xxxs: fs.xs },
              fontWeight: 300,
              fontFamily: "poppins",
              color: "secondary.dark_gray",
              mt: "16px",
              textAlign: { xs: "start", xxxs: "center" },
            }}
          >
            You will see this transaction as from Onecricket Fantasy Inc, in
            your statement{" "}
          </Typography>
          <Button
            sx={{
              color: "#439F48",
              fontSize: { xs: fs.small, xxxs: fs.xs },
              fontWeight: 500,
              fontFamily: "poppins",
              background: "primary.main",
              borderRadius: "8px",
              border: "1px solid #439F48",
              mt: "16px",
              width: { xs: "240px", xxxs: "200px" },
              height: "40px",
            }}
            onClick={openSupportChat}
          >
            Support Chat
          </Button>
        </Box>

        <Box
          component="div"
          sx={{
            width: { lg: "50%", md: "100%" },
            maxHeight: { lg: "100%", xxxs: "100%" },
            display: "flex",
            flexDirection: "column",
            alignItem: "center",
            justifyContent: "flex-start",
            borderLeft: { lg: "1px solid #494949", xxxs: 0 },
            px: { lg: "20px", xxxs: 0 },
            ml: { lg: "18px", xxxs: 0 },
            mb: { xxxs: "30px", lg: 0 },
            overflow: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {depositData?.note.length > 0 && (
            <>
              <Typography
                sx={{
                  fontSize: { xs: fs.normal, xxxs: fs.small },
                  fontWeight: 600,
                  fontFamily: "poppins",
                  color: "#4831D4",
                  mt: "20px",
                  mb: "2px",
                }}
              >
                NOTE
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "rows",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  borderBottom: "2px solid #494949",
                  mb: "15px",
                  pb: "14px",
                }}
              >
                <CheckCircleIcon
                  sx={{
                    color: "#52C03C",
                    fontSize: { xs: fs.x_large, xxxs: fs.large },
                    mr: "12px",
                  }}
                />
                <Typography
                  sx={{
                    color: "secondary.dark_gray",
                    fontSize: { xs: fs.small, xxxs: fs.xs },
                    fontWeight: 600,
                    fontFamily: "poppins",
                  }}
                >
                  {depositData.note[0]}
                </Typography>
              </Box>
            </>
          )}

          <Typography
            sx={{
              fontSize: { xs: fs.normal, xxxs: fs.small },
              fontWeight: 600,
              fontFamily: "poppins",
              color: "secondary.dark_gray",
              mb: "14px",
            }}
          >
            Payment FAQ’s
          </Typography>
          {depositData &&
            depositData.faq.length > 0 &&
            depositData.faq.map((each, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  mb: "15px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: fs.normal, xxxs: fs.small },
                    fontWeight: 500,
                    fontFamily: "poppins",
                    color: "secondary.dark_gray",
                    mb: "10px",
                  }}
                >
                  {each.question}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: fs.small, xxxs: fs.xs },
                    fontWeight: 400,
                    fontFamily: "poppins",
                    color: "secondary.dark_gray",
                    mb: "10px",
                  }}
                >
                  {each.answer}
                </Typography>
                {depositData.faq.length !== index + 1 && (
                  <Box
                    sx={{
                      background: "#494949",
                      height: "2px",
                      width: "100%",
                      mt: "14px",
                    }}
                  ></Box>
                )}
              </Box>
            ))}
        </Box>

        {openSelectDepositOption && (
          <SelectDepositOption
            setOpenSelectDepositOption={setOpenSelectDepositOption}
            mode={mode}
            amount={amount}
          />
        )}
      </Box>
    );
}
