import { Box } from "@mui/system";
import React, { useState } from "react";
import { Typography, Button, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddIcon from "@mui/icons-material/Add";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RefreshIcon from "@mui/icons-material/Refresh";
import HomeIcon from "@mui/icons-material/Home";
import { APIURLs } from "../../api/ApiUrls";
import { makeGETAPICall } from "../../api/methods";
import { setAddressFromApi } from "../../feature/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";
export default function Address({ setAddress }) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const fs = useSelector((state) => state.user.fs);
  const [loading, setLoading] = useState(true);
  const goDepositForm = () => {
    navigate("/home?deposit=new&page=form", { replace: true });
  };
  const goAddAddressPage = () => {
    navigate("/home?deposit=new&page=add-address", { replace: true });
  };
  const addressFromApi = useSelector((state) => state.user.addressFromApi);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setLoading(true);
    if (user) {
      getUserAddress(user.uid)
        .then((result) => {
          console.log(result);
          if (result.length > 0) {
            console.log(result);
            dispatch(setAddressFromApi(result));
            setLoading(false);
          } else {
            dispatch(setAddressFromApi([]));
            setLoading(false);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setLoading(false);
    }
  }, []);

  const refreshCallAddressApi = () => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      getUserAddress(user.uid)
        .then((result) => {
          console.log(result);
          if (result.length > 0) {
            console.log(result);
            dispatch(setAddressFromApi(result));
            setLoading(false);
          } else {
            dispatch(setAddressFromApi([]));
            setLoading(false);
          }
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <Box
      sx={{
        width: { lg: "800px", md: "700px", sm: "500px", xxxs: "80%" },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          mt: { sm: "13px", xxxs: "13px" },
          cursor: "pointer",
          width: "100%",
          mb: "32px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            cursor: "pointer",
          }}
          onClick={goDepositForm}
        >
          <ArrowBackIosIcon
            sx={{
              fontSize: { sm: fs.xx_large, xxxs: fs.large },
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
            Address List{" "}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            cursor: "pointer",
            border: "1px solid #494949",
            padding: "6px 24px",
            borderRadius: "4px",
          }}
          onClick={refreshCallAddressApi}
        >
          <Typography
            sx={{
              color: "secondary.dark_gray",
              fontSize: fs.small,
              fontWeight: 400,
              fontFamily: "poppins",
            }}
          >
            Refresh
          </Typography>
          <RefreshIcon
            sx={{
              color: "secondary.dark_gray",
              ml: "4px",
              fontSize: fs.x_large,
            }}
          />
        </Box>
      </Box>
      {loading ? (
        <Box
          sx={{
            mt: "50px",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <LoadingSpinnerEachSection />
        </Box>
      ) : (
        <>
          {addressFromApi.length > 0 ? (
            <>
              {addressFromApi.map((each, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    background: "primary.main",
                    width: "100%",
                    mb: "20px",
                    cursor: "pointer",
                    borderBottom: "1px solid #494949",
                  }}
                  onClick={() => {
                    setAddress(each);
                    console.log(each);
                    goDepositForm();
                  }}
                >
                  <LocationOnIcon
                    sx={{
                      fontSize: fs.xx_large,
                      mr: "15px",
                      color: "secondary.dark_gray",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      width: { md: "25%", xs: "40%", xxxs: "60%" },
                      py: "13px",
                      cursor: "pointer",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: fs.small,
                        fontWeight: 400,
                        fontFamily: "poppins",
                        color: "secondary.dark_gray",
                        width: "100%",
                      }}
                    >
                      {each.address.abbreviation} {each.address.addrCity}{" "}
                      {each.address.addrLine1} {each.address.addrLine2}{" "}
                      {each.address.addrState}, {each.address.addrZip}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "primary.main",
                width: "100%",
                cursor: "pointer",
              }}
            >
              <HomeIcon
                sx={{
                  fontSize: "50px",
                  color: "secondary.dark_gray",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: { md: "45%", xs: "40%", xxxs: "60%" },
                  pb: "13px",
                  cursor: "pointer",
                }}
              >
                <Typography
                  sx={{
                    fontSize: fs.normal,
                    fontWeight: 400,
                    fontFamily: "poppins",
                    color: "secondary.dark_gray",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  Please add a new address
                </Typography>
              </Box>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              cursor: "pointer",
              padding: { sm: "14px 71px", xxs: "12px 40px", xxxs: "12px 30px" },
              borderRadius: "4px",
              background: "#4831D4",
              mt: "24px",
            }}
            onClick={goAddAddressPage}
          >
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
          </Box>
        </>
      )}
    </Box>
  );
}

//get list of existing addresses

export const getUserAddress = async (userId) => {
  var apiUrl = APIURLs.getUserAddress;
  apiUrl = apiUrl.replace("{userId}", userId);
  const apiResponse = await makeGETAPICall(apiUrl);
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return null;
  }
};
