import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Clear from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector } from "react-redux";
export default function SelectState({
  setOpenStatePicker,
  mode,
  stateData,
  setAbbreviation,
  setSelectState,
}) {
  const fs = useSelector((state) => state.user.fs);

  const [selectName, setSelectName] = useState(null);
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
      <Box
        sx={{
          width: { sm: "500px", xxxs: "90%" },
          bgcolor: "primary.main",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          border: `${mode === "dark" ? "1px solid #2C2C2C" : "none"}`,
          borderRadius: "4px",
          height: "70%",
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mx: "auto",
            mt: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: { sm: fs.x_large, xxs: fs.large, xxxs: fs.normal },
              fontWeight: 700,
              fontFamily: "poppins",
              color: "secondary.dark_gray",
            }}
          >
            Select a State
          </Typography>
          <Clear
            onClick={() => setOpenStatePicker(false)}
            sx={{ cursor: "pointer" }}
          />
        </Box>
        <Box
          sx={{
            height: "4px",
            width: "80px",
            bgcolor: "secondary.dark_gray",
            borderRadius: "4px",
            ml: "20px",
            mt: "5px",
            mb: "17px",
          }}
        ></Box>
        <Box
          sx={{
            width: "90%",
            mx: "auto",
            height: "100%",
            maxHeight: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "spcae-between",
            overflow: "scroll",
            border: "1px solid #2C2C2C",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                width: "100%",
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {stateData.map((e, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #494949",
                    width: "100%",
                    py: "6px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectName(e);
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LocationOnIcon
                      sx={{
                        ml: "15px",
                        color: `${
                          selectName && e.state === selectName.state
                            ? "#4831D4"
                            : "#494949"
                        }`,
                      }}
                    />
                    <Typography
                      sx={{
                        color: "secondary.dark_gray",

                        fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
                        fontWeight: 400,
                        ml: "18px",
                        fontFamily: "poppins",
                      }}
                    >
                      {e.state}
                    </Typography>
                  </Box>
                  {selectName && e.state === selectName.state && (
                    <CheckIcon sx={{ color: "#52C03F" }} />
                  )}
                </Box>
              ))}
            </Box>
          </Box>
          {/* <Box
            sx={{ width: "3%", height: "100%", border: "1px solid #494949" }}
          >
            <Box
              sx={{
                width: "70%",
                height: "24px",
                mx: "auto",
                background: "#494949",
                borderRadius: "16px",
                mt: "5px",
              }}
            ></Box>
          </Box> */}
        </Box>
        <Button
          sx={{
            mx: "auto",
            background: "#4831D4",
            color: "white",
            py: "14px",
            px: "78px",
            mt: "10px",
            textTransform: "none",
            "&.MuiButtonBase-root:hover": {
              background: "#4831D4",
            },
            mb: "12px",
            fontFamily: "poppins",
            fontSize: fs.small,
            fontWeight: "600",
            borderRadius: "8px",
          }}
          onClick={() => {
            if (selectName) {
              setOpenStatePicker(false);
              setSelectState(selectName.state);
              setAbbreviation(selectName.abbreviation);
            }
          }}
        >
          Confirm State
        </Button>
      </Box>
    </Box>
  );
}
