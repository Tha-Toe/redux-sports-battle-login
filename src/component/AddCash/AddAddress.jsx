import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import "./addCash.css";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SelectDepositOption from "./SelectDepositOption";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcon from "@mui/icons-material/Add";
import SelectState from "./SelectState";

export default function AddAddress({ setAddress, mode }) {
  let navigate = useNavigate();
  const goAddress = () => {
    navigate("/home?deposit=new&page=address", { replace: true });
  };
  const [openStatePicker, setOpenStatePicker] = useState(false);
  const goDepositForm = () => {
    navigate("/home?deposit=new&page=form", { replace: true });
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
              fontSize: { sm: "23px", xxxs: "18px" },
              color: "secondary.dark_gray",
            }}
          />
          <Typography
            sx={{
              fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
              fontWeight: 600,
              fontFamily: "poppins",
              color: "secondary.dark_gray",
            }}
          >
            Age Verification Setup{" "}
          </Typography>
        </Box>

        <RestartAltIcon sx={{ color: "secondary.main", ml: "4px" }} />
      </Box>
      <Typography
        sx={{
          color: "secondary.dark_gray",
          fontSize: "14px",
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
        sx={{
          color: "secondary.dark_gray",
          borderBottom: "1px solid #494949",
          width: "100%",
          py: "7px",
          fontSize: { sm: "16px", xxxs: "14px" },
          fontWeight: 500,
          fontFamily: "poppins",
          outline: "none",
          mt: "5px",
        }}
      />
      <Typography
        sx={{
          color: "secondary.dark_gray",
          fontSize: "14px",
          fontWeight: 600,
          fontFamily: "poppins",
          mt: "12px",
        }}
      >
        Address Line 2
      </Typography>
      <Input
        type="text"
        placeholder="Address 2"
        variant="outlined"
        sx={{
          color: "secondary.dark_gray",
          borderBottom: "1px solid #494949",
          width: "100%",
          py: "7px",
          fontSize: { sm: "16px", xxxs: "14px" },
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
              fontSize: { sm: "14px", xxxs: "12px" },
              fontWeight: 600,
              fontFamily: "poppins",
              color: "secondary.dark_gray",
              mb: "5px",
            }}
          >
            City
          </Typography>
          <Input
            type="text"
            placeholder="Enter City Name"
            variant="outlined"
            sx={{
              color: "secondary.dark_gray",
              borderBottom: "1px solid #494949",
              width: "100%",
              py: "7px",
              fontSize: { sm: "16px", xxxs: "14px" },
              fontWeight: 500,
              fontFamily: "poppins",
              outline: "none",
            }}
          />
        </Box>
        <Box sx={{ width: { xs: "45%", xxxs: "100%" } }}>
          <Typography
            sx={{
              fontSize: { sm: "14px", xxxs: "12px" },
              fontWeight: 600,
              fontFamily: "poppins",
              color: "secondary.dark_gray",
              mb: "5px",
            }}
          >
            Zipcode
          </Typography>
          <Input
            type="number"
            placeholder="Enter zipcode"
            variant="outlined"
            sx={{
              color: "secondary.dark_gray",
              borderBottom: "1px solid #494949",
              width: "100%",
              py: "7px",
              fontSize: { sm: "16px", xxxs: "14px" },
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
            sx={{ color: "#4831D4", mr: "14px", fontSize: "30px" }}
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
                fontSize: { sm: "16px", xxxs: "14px" },
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
                fontSize: { sm: "16px", xxxs: "14px" },
                fontWeight: 400,
                fontFamily: "poppins",
                color: "secondary.dark_gray",
              }}
            >
              Select US state to which this address belongs to
            </Typography>
          </Box>
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
          setAddress(
            "27834 Gateway Blvd B308 Farmington hills, Michigan, 48334"
          );
          goDepositForm();
        }}
      >
        <AddIcon sx={{ color: "white" }} />
        <Typography
          sx={{
            color: "white",
            fontSize: "14px",
            fontWeight: 400,
            fontFamily: "poppins",
            ml: "4px",
          }}
        >
          Add Address
        </Typography>
      </Box>
      {openStatePicker && (
        <SelectState setOpenStatePicker={setOpenStatePicker} mode={mode} />
      )}
    </Box>
  );
}
