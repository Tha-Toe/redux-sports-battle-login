import React from "react";
import "./selectUserName.css";
import Box from "@mui/material/Box";
import { FormControl, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ContinueButtonComponent,
  InputComponent,
  BackButtonComponent,
} from "../../defaultComponent/DefaultComponent";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { setGoSignUpPage } from "../../../feature/userSlice";
import { useSelector, useDispatch } from "react-redux";
const SelectUserName = ({ mode, setMode }) => {
  const [name, setName] = useState(null);
  const fs = useSelector((state) => state.user.fs);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleBack = () => {
    dispatch(setGoSignUpPage(false));
    navigate("/choose", { replace: true });
  };

  const handleContinue = () => {
    // navigate("/createpassword", { replace: true });
  };

  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    if (name) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [name]);

  const [validCode, setValidCode] = useState(true);
  const switchMode = () => {
    if (mode === "dark") {
      setMode("light");
    } else {
      setMode("dark");
    }
  };
  return (
    <div className="first-signup-flow-container">
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: { sm: "60%", xxxs: "100%" },
          position: "relative",
          height: "100%",
          bgcolor: "primary.dark_gray",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: { md: "408px", xs: "80%" },
            mr: { xxxs: "20px", sm: 0 },
          }}
        >
          <Box component={"div"} sx={{ width: 1, mb: "25px" }}>
            <img src="/sportsbattle.png" className="logo" />
          </Box>
          <FormControl
            sx={{
              width: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              sx={{
                fontSize: { sm: fs.mega, xxxs: fs.x_large },
                fontWeight: "700",
                mb: "4px",
                fontFamily: "Poppins",
                color: "secondary.dark_gray",
              }}
            >
              Create your username
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                mb: "25px",
                fontFamily: "Poppins",
                color: "secondary.dark_gray",
              }}
            >
              Enter your unique user name
            </Typography>
            <InputComponent
              placeholder={"User Name"}
              setName={setName}
              mode={mode}
            />
            <Box
              component={"div"}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                mb: "34px",
              }}
            >
              {name && (
                <>
                  {validCode ? (
                    <CheckIcon
                      sx={{ color: "green", fontSize: fs.xxx_large }}
                    />
                  ) : (
                    <ClearIcon sx={{ color: "red", fontSize: fs.xxx_large }} />
                  )}
                  <Typography
                    sx={
                      validCode
                        ? {
                            color: "green",
                            fontSize: fs.small,
                            ml: "16px",
                            fontFamily: "Poppins",
                            fontWeight: 700,
                          }
                        : {
                            color: "red",
                            fontSize: fs.small,
                            ml: "16px",
                            fontFamily: "Poppins",
                            fontWeight: 700,
                          }
                    }
                  >
                    {validCode ? "User name available" : "Invalid code"}
                  </Typography>
                </>
              )}
            </Box>
            <Box
              component="div"
              sx={{
                width: {
                  md: "408px",
                  sm: "390px",
                  xs: "408px",
                  xxs: "300px",
                  xxxs: "250px",
                },
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <BackButtonComponent text={"Back"} handleBack={handleBack} />
              <ContinueButtonComponent
                text={"Complete Sign Up"}
                handleContinue={handleContinue}
                disabled={disableButton}
                rightArrow={true}
              />
            </Box>
          </FormControl>
        </Box>
      </Box>
      <div
        className={`${"rightImageContainer"} ${
          mode !== "dark" && "right-container-light-mode"
        }`}
      >
        {" "}
        <img src="RightPhoneFinal.png" className="right-image" />{" "}
        <img src="Vector.png" className="right-vector" />
      </div>
      <img
        src={
          mode === "dark"
            ? "/switchModeLoginPage.png"
            : "/switchModeLightLoginPage.png"
        }
        className="switchMode"
        onClick={switchMode}
      />
    </div>
  );
};
export default SelectUserName;
