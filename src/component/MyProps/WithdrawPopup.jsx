import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import "./withdrawPopup.css";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { APIURLs } from "../../api/ApiUrls";
import { makePOSTAPICall } from "../../api/methods";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSelector } from "react-redux";

export default function WithdrawPopup({
  mode,
  setOpenWithdrawPopup,
  openWithdrawPopup,
  setOpenWithdrawLoading,
  callUpCommingMyPropsApi,
}) {
  const fs = useSelector((state) => state.user.fs);

  const [condition, setCondition] = useState("asking");

  const user = JSON.parse(localStorage.getItem("user"));
  const [errorResponse, setErrorResponse] = useState(null);
  const withdrawApiCall = async () => {
    if (openWithdrawPopup.id && user) {
      try {
        setCondition("pending");
        var res = await withdrawProp(openWithdrawPopup.id, user.uid);
        if (res.status === "failed") {
          setCondition("fail");
          setErrorResponse(res);
        } else {
          console.log(res);
          setCondition("success");
        }
      } catch (error) {
        if (error) {
          console.log(error);
          setCondition("fail");
        }
      }
    }
  };
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
        zIndex: "200",
      }}
    >
      <Box
        sx={{
          width: { sm: "396px", xxxs: "90%" },
          bgcolor: "primary.dark",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "8px",
          height: "250px",
          justifyContent: "center",
        }}
      >
        {condition === "asking" && (
          <>
            <Typography
              sx={{
                fontSize: fs.normal,
                fontWeight: "400",
                fontFamily: "poppins",
                color: "white",
              }}
            >
              Are you sure you want to withdraw?
            </Typography>
            <Box
              sx={{
                bgcolor: "primary.dark",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                mt: "30px",
              }}
            >
              <Button
                sx={{
                  width: "130px",
                  height: "40px",
                  fontSize: fs.normal,
                  fontWeight: "400",
                  fontFamily: "poppins",
                  color: "white",
                  background: "red",
                  borderRadius: "4px",
                  "&.MuiButtonBase-root:hover": {
                    background: "red",
                  },
                  textTransform: "none",
                  mr: "10px",
                }}
                onClick={() => {
                  withdrawApiCall();
                }}
              >
                Yes
              </Button>
              <Button
                sx={{
                  width: "130px",
                  height: "40px",
                  fontSize: fs.normal,
                  fontWeight: "400",
                  fontFamily: "poppins",
                  color: "white",
                  background: "transparent",
                  borderRadius: "4px",
                  "&.MuiButtonBase-root:hover": {
                    background: "transparent",
                  },
                  border: "1px solid gray",
                  textTransform: "none",
                }}
                onClick={() => setOpenWithdrawPopup(null)}
              >
                No, Cancel
              </Button>
            </Box>
          </>
        )}
        {condition === "pending" && (
          <>
            <Box
              sx={{
                fontSize: { sm: fs.normal, xxxs: fs.small },
                fontWeight: 600,
                fontFamily: "poppins",
                padding: { xs: "14px 89px", xxxs: "10px 70px" },
                color: "#F4C7CC",
                mt: "0px",
              }}
              onClick={() => {}}
            >
              <div className="pendingCircleContainer">
                <div className="pending-circle-one"></div>
                <div className="pending-circle-two"></div>
                <div className="pending-circle-three"></div>
              </div>
            </Box>
            <Typography
              sx={{
                fontSize: fs.normal,
                fontWeight: "400",
                fontFamily: "poppins",
                color: "white",
                mt: "5px",
              }}
            >
              Withdrawing your projections
            </Typography>
          </>
        )}
        {condition === "success" && (
          <>
            <CheckCircle sx={{ fontSize: "60px", color: "green" }} />
            <Typography
              sx={{
                fontSize: fs.normal,
                fontWeight: "600",
                fontFamily: "poppins",
                color: "white",
                mt: "10px",
              }}
            >
              Successfully withdrew your props
            </Typography>
            <Button
              sx={{
                fontSize: fs.normal,
                fontWeight: "600",
                fontFamily: "poppins",
                color: "white",
                mt: "10px",
                padding: "5px 75px",
                borderRadius: "5px",
                background: "#4831D4",
                "&.MuiButtonBase-root:hover": {
                  background: "#4831D4",
                },
                textTransform: "none",
              }}
              onClick={() => {
                setCondition("asking");
                setOpenWithdrawPopup(null);
                callUpCommingMyPropsApi();
              }}
            >
              Okay
            </Button>
          </>
        )}
        {condition === "fail" && errorResponse && (
          <>
            <CancelIcon sx={{ fontSize: "60px", color: "red" }} />
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "600",
                fontFamily: "poppins",
                color: "red",
                mt: "10px",
              }}
            >
              {errorResponse && errorResponse.status.toUpperCase()}
            </Typography>
            <Typography
              sx={{
                fontSize: fs.normal,
                fontWeight: "600",
                fontFamily: "poppins",
                color: "white",
                mt: "10px",
              }}
            >
              {errorResponse && errorResponse.errorMsg}
            </Typography>
            <Button
              sx={{
                fontSize: fs.normal,
                fontWeight: "600",
                fontFamily: "poppins",
                color: "white",
                mt: "10px",
                padding: "5px 75px",
                borderRadius: "5px",
                background: "#4831D4",
                "&.MuiButtonBase-root:hover": {
                  background: "#4831D4",
                },
                textTransform: "none",
              }}
              onClick={() => {
                setCondition("asking");
                setOpenWithdrawPopup(null);
                callUpCommingMyPropsApi();
              }}
            >
              Okay
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export const withdrawProp = async (propId, userId) => {
  var apiUrl = APIURLs.withdrawProp;
  var reqBody = {
    _id: propId,
    userId: userId,
    mixMatch: true,
  };
  //console.log(apiUrl);
  const apiResponse = await makePOSTAPICall(apiUrl, reqBody);
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return {
      status: "failed",
      errorMsg: "Error occurred, Please try later.",
    };
  }
};
