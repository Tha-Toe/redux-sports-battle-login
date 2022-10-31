import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import PriorityHigh from "@mui/icons-material/PriorityHigh";
import { setUserAccountNotExist, endChecking } from "../../feature/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const UserAccountNotExist = ({ mode }) => {
  const dispatch = useDispatch();
  const userAccountNotExist = useSelector(
    (state) => state.user.userAccountNotExist
  );
  const fs = useSelector((state) => state.user.fs);
  const navigate = useNavigate();
  const goSignUpPage = () => {
    navigate("/choose", { replace: true });
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
        zIndex: "100",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: { sm: "500px", xxxs: "90%" },
          bgcolor: "primary.dark",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "10px",
        }}
      >
        <PriorityHigh
          sx={{
            bgcolor: "#E4313c",
            color: "black",
            borderRadius: "50%",
            fontSize: { xs: "40px", xxxs: "30px" },
            mt: "32px",
          }}
        />
        <Typography
          sx={{
            color: "secondary.dark_gray",
            fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
            fontWeight: 700,
            fontFamily: "poppins",
            mt: "36px",
            textAlign: "center",
            width: "80%",
          }}
        >
          {userAccountNotExist}
        </Typography>
        <Button
          sx={{
            background: "#4831D4",
            fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
            fontWeight: 500,
            fontFamily: "poppins",
            padding: { xs: "12px 89px", xxxs: "10px 70px" },
            color: "white",
            "&.MuiButtonBase-root:hover": {
              background: "#4831D4",
            },
            mt: "34px",
            mb: "32px",
            textTransform: "none",
          }}
          onClick={() => {
            dispatch(setUserAccountNotExist(null));
            dispatch(endChecking());
            goSignUpPage();
          }}
        >
          Ok
        </Button>
      </Box>
    </Box>
  );
};
export default UserAccountNotExist;
