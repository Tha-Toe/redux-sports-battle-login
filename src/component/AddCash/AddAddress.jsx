import { Box, Input, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import "./addCash.css";
import "./newAddCashForm.css";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SelectDepositOption from "./SelectDepositOption";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcon from "@mui/icons-material/Add";
import SelectState from "./SelectState";
import { useSelector, useDispatch } from "react-redux";

import { APIURLs } from "../../api/ApiUrls";
import { makePOSTAPICall, makeGETAPICall } from "../../api/methods";
import FailAddAddress from "./FailAddAddress";
import RefreshIcon from "@mui/icons-material/Refresh";
import { setAddressFromApi } from "../../feature/userSlice";

export default function AddAddress({ setAddress, mode }) {
  const dispatch = useDispatch();
  const fs = useSelector((state) => state.user.fs);
  let navigate = useNavigate();
  const goAddress = () => {
    navigate("/home?deposit=new&page=address", { replace: true });
  };
  const [openStatePicker, setOpenStatePicker] = useState(false);
  const goDepositForm = () => {
    navigate("/home?deposit=new&page=form", { replace: true });
  };
  const [stateData, setStateData] = useState([]);
  useEffect(() => {
    console.log("call");
    getStates()
      .then((result) => {
        if (result) {
          setStateData(result);
          console.log(result);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const line1Ref = useRef();
  const line2Ref = useRef();
  const cityRef = useRef();
  const zipRef = useRef();

  const [addressObject, setAddressObject] = useState({
    addrLine1: null,
    addrLine2: null,
    addrCity: null,
    addrZip: null,
    addrState: null,
    abbreviation: null,
  });
  const [showLoadingButton, setShowLoadingButton] = useState(false);
  const [failAddAddress, setFailAddAddress] = useState(false);
  const line1Change = (e) => {
    if (e) {
      let obj = addressObject;
      obj.addrLine1 = e;
      setAddressObject(obj);
    } else {
      let obj = addressObject;
      obj.addressLine1 = null;
      setAddressObject(obj);
    }
    console.log(e);
  };
  const line2Change = (e) => {
    if (e) {
      let obj = addressObject;
      obj.addrLine2 = e;
      setAddressObject(obj);
    } else {
      let obj = addressObject;
      obj.addressLine2 = null;
      setAddressObject(obj);
    }
    console.log(e);
  };
  const cityChange = (e) => {
    if (e) {
      let obj = addressObject;
      obj.addrCity = e;
      setAddressObject(obj);
    } else {
      let obj = addressObject;
      obj.addrCity = null;
      setAddressObject(obj);
    }
    console.log(e);
  };
  const zipChange = (e) => {
    if (e) {
      let obj = addressObject;
      obj.addrZip = e;
      setAddressObject(obj);
    } else {
      let obj = addressObject;
      obj.addrZip = null;
      setAddressObject(obj);
    }
    console.log(e);
  };
  const setSelectState = (e) => {
    if (e) {
      let obj = addressObject;
      obj.addrState = e;
      setAddressObject(obj);
    } else {
      let obj = addressObject;
      obj.addrState = null;
      setAddressObject(obj);
    }
    console.log(e);
  };
  const setAbbreviation = (e) => {
    if (e) {
      let obj = addressObject;
      obj.abbreviation = e;
      setAddressObject(obj);
    } else {
      let obj = addressObject;
      obj.abbreviation = null;
      setAddressObject(obj);
    }
    console.log(e);
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const handleAddAddress = () => {
    if (
      addressObject.addrLine1 &&
      addressObject.addrLine2 &&
      addressObject.addrCity &&
      addressObject.addrZip &&
      addressObject.addrState &&
      addressObject.abbreviation
    ) {
      console.log(addressObject);
      setShowLoadingButton(true);
      addUserAddress(user.uid, addressObject)
        .then((result) => {
          if (result) {
            setShowLoadingButton(false);
            navigate("/home?deposit=new&page=address", { replace: true });
          }
        })
        .catch((error) => {
          if (error) {
            setFailAddAddress(true);
            setShowLoadingButton(false);
          }
        });
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100%",
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
        flexDirection: { lg: "column", xxxs: "column" },
        alignItem: "flex-start",
        mt: { lg: 0, xxxs: "50px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          mt: "13px",
          cursor: "pointer",
          width: "100%",
          mb: "19px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            mt: "13px",
            cursor: "pointer",
          }}
          onClick={goAddress}
        >
          <ArrowBackIosIcon
            sx={{
              fontSize: { sm: fs.xxx_large, xxxs: fs.large },
              color: "secondary.dark_gray",
            }}
          />
          <Typography
            sx={{
              fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
              fontWeight: 600,
              fontFamily: "poppins",
              color: "secondary.dark_gray",
            }}
          >
            Age Verification Setup{" "}
          </Typography>
        </Box>
      </Box>
      <Typography
        sx={{
          color: "secondary.dark_gray",
          fontSize: fs.small,
          fontWeight: 600,
          fontFamily: "poppins",
        }}
      >
        Address Line 1
      </Typography>
      <Input
        type="text"
        placeholder="Address 1"
        variant="outlined"
        onChange={(e) => line1Change(e.target.value)}
        sx={{
          color: "secondary.dark_gray",
          borderBottom: "1px solid #494949",
          width: "100%",
          pb: "7px",
          fontSize: { sm: fs.normal, xxxs: fs.small },
          fontWeight: 500,
          fontFamily: "poppins",
          outline: "none",
          mt: "5px",
        }}
        ref={line1Ref}
      />
      <Typography
        sx={{
          color: "secondary.dark_gray",
          fontSize: fs.small,
          fontWeight: 600,
          fontFamily: "poppins",
          mt: "12px",
        }}
      >
        Address Line 2
      </Typography>
      <Input
        ref={line2Ref}
        type="text"
        placeholder="Address 2"
        variant="outlined"
        onChange={(e) => line2Change(e.target.value)}
        sx={{
          color: "secondary.dark_gray",
          borderBottom: "1px solid #494949",
          width: "100%",
          pb: "7px",
          fontSize: { sm: fs.normal, xxxs: fs.small },
          fontWeight: 500,
          fontFamily: "poppins",
          outline: "none",
          mt: "5px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", xxxs: "column" },
          alignItems: "center",
          justifyContent: { xs: "space-between", xxxs: "center" },
          width: "100%",
          mt: "12px",
        }}
      >
        <Box
          sx={{
            width: { xs: "45%", xxxs: "100%" },
            mb: { xs: 0, xxxs: "32px" },
          }}
        >
          <Typography
            sx={{
              fontSize: { sm: fs.small, xxxs: fs.xs },
              fontWeight: 600,
              fontFamily: "poppins",
              color: "secondary.dark_gray",
              mb: "5px",
            }}
          >
            City
          </Typography>
          <Input
            ref={cityRef}
            type="text"
            placeholder="Enter City Name"
            variant="outlined"
            onChange={(e) => cityChange(e.target.value)}
            sx={{
              color: "secondary.dark_gray",
              borderBottom: "1px solid #494949",
              width: "100%",
              pb: "7px",
              fontSize: { sm: fs.normal, xxxs: fs.small },
              fontWeight: 500,
              fontFamily: "poppins",
              outline: "none",
            }}
          />
        </Box>
        <Box sx={{ width: { xs: "45%", xxxs: "100%" } }}>
          <Typography
            sx={{
              fontSize: { sm: fs.small, xxxs: fs.xs },
              fontWeight: 600,
              fontFamily: "poppins",
              color: "secondary.dark_gray",
              mb: "5px",
            }}
          >
            Zipcode
          </Typography>
          <Input
            ref={zipRef}
            type="number"
            placeholder="Enter zipcode"
            variant="outlined"
            onChange={(e) => zipChange(e.target.value)}
            sx={{
              color: "secondary.dark_gray",
              borderBottom: "1px solid #494949",
              width: "100%",
              pb: "7px",
              fontSize: { sm: fs.normal, xxxs: fs.small },
              fontWeight: 500,
              fontFamily: "poppins",
              outline: "none",
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          mt: "31px",
          borderBottom: "1px solid #494949",
          pb: "4px",
        }}
        onClick={() => setOpenStatePicker(true)}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <LocationOnIcon
            sx={{ color: "#4831D4", mr: "14px", fontSize: fs.mega }}
          />
          {addressObject.addrState ? (
            <Typography
              sx={{
                fontSize: { sm: fs.normal, xxxs: fs.small },
                fontWeight: 700,
                fontFamily: "poppins",
                color: "secondary.dark_gray",
                mb: "5px",
              }}
            >
              {addressObject.addrState}
            </Typography>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography
                sx={{
                  fontSize: { sm: fs.normal, xxxs: fs.small },
                  fontWeight: 700,
                  fontFamily: "poppins",
                  color: "secondary.dark_gray",
                  mb: "5px",
                }}
              >
                State
              </Typography>
              <Typography
                sx={{
                  fontSize: { sm: fs.normal, xxxs: fs.small },
                  fontWeight: 400,
                  fontFamily: "poppins",
                  color: "secondary.dark_gray",
                }}
              >
                Select US state to which this address belongs to
              </Typography>
            </Box>
          )}
        </Box>
        <ArrowForwardIosIcon sx={{ color: "secondary.dark_gray" }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          mt: "24px",
          cursor: "pointer",
          py: "14px",
          width: { xs: "256px", xxxs: "150px" },
          borderRadius: "4px",
          background: "#4831D4",
        }}
        onClick={() => {
          // setAddress(
          //   "27834 Gateway Blvd B308 Farmington hills, Michigan, 48334"
          // );
          // goDepositForm();
          handleAddAddress();
        }}
      >
        {showLoadingButton ? (
          <>
            <div className="circle-one"></div>
            <div className="circle-two"></div>
            <div className="circle-three"></div>
          </>
        ) : (
          <>
            <AddIcon sx={{ color: "white" }} />
            <Typography
              sx={{
                color: "white",
                fontSize: fs.small,
                fontWeight: 600,
                fontFamily: "poppins",
                ml: "4px",
              }}
            >
              Add Address
            </Typography>
          </>
        )}
      </Box>
      {openStatePicker && (
        <SelectState
          setOpenStatePicker={setOpenStatePicker}
          mode={mode}
          stateData={stateData}
          setAbbreviation={setAbbreviation}
          setSelectState={setSelectState}
        />
      )}
      {failAddAddress && (
        <FailAddAddress setFailAddAddress={setFailAddAddress} mode={mode} />
      )}
    </Box>
  );
}

//add new address

export const addUserAddress = async (userId, addressObject) => {
  var apiUrl = APIURLs.addUserAddress;
  var reqBody = {
    userId: userId,
    address: {
      addrLine1: addressObject.addrLine1,
      addrLine2: addressObject.addrLine2,
      addrCity: addressObject.addrCity,
      addrZip: addressObject.addrZip,
      addrState: addressObject.addrState,
      abbreviation: addressObject.abbreviation,
    },
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

//get list of states

export const getStates = async () => {
  var apiUrl = APIURLs.getStates;
  const apiResponse = await makeGETAPICall(apiUrl);
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return null;
  }
};
