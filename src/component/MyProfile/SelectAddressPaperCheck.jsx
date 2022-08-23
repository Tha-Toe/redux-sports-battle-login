import { Box } from "@mui/system";
import React, { useState } from "react";
import { Typography, Button, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddIcon from "@mui/icons-material/Add";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
export default function SelectAddressPaperCheck({ setAddress, setOpenTag }) {
  let navigate = useNavigate();
  const goBackPaperECheckPage = () => {
    setAddress("27834 Gateway BlvdB308Farmington hills, Michigan, 48334");
    setOpenTag("paperECheck");
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
          mt: "13px",
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
            mt: "13px",
            cursor: "pointer",
          }}
          onClick={() => {
            setOpenTag("paperECheck");
          }}
        >
          <ArrowBackIosIcon
            sx={{
              fontSize: { sm: "23px", xxxs: "18px" },
              color: "secondary.main",
            }}
          />
          <Typography
            sx={{
              fontSize: { sm: "16px", xxs: "14px", xxxs: "12px" },
              fontWeight: 600,
              fontFamily: "poppins",
              color: "secondary.main",
            }}
          >
            Select Address{" "}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            mt: "13px",
            cursor: "pointer",
            border: "1px solid #494949",
            padding: "6px 24px",
            borderRadius: "4px",
          }}
        >
          <Typography
            sx={{
              color: "secondary.main",
              fontSize: "14px",
              fontWeight: 400,
              fontFamily: "poppins",
            }}
          >
            Refresh
          </Typography>
          <RestartAltIcon sx={{ color: "secondary.main", ml: "4px" }} />
        </Box>
      </Box>
      <Box
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
      >
        <LocationOnIcon
          sx={{ fontSize: "25px", mr: "15px", color: "secondary.main" }}
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
              fontSize: "14px",
              fontWeight: 400,
              fontFamily: "poppins",
              color: "secondary.main",
              width: "100%",
            }}
          >
            27834 Gateway Blvd B308 Farmington hills, Michigan, 48334{" "}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          mt: "24px",
          cursor: "pointer",
          padding: { sm: "14px 71px", xxs: "12px 40px", xxxs: "12px 30px" },
          borderRadius: "4px",
          background: "#4831D4",
        }}
        onClick={goBackPaperECheckPage}
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
    </Box>
  );
}