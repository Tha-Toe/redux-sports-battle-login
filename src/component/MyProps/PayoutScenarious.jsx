import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";

export default function PayoutScenarious({
  setOpenPayoutScenarious,
  mode,
  detailData,
}) {
  const fs = useSelector((state) => state.user.fs);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `${
          mode === "dark" ? "rgba(0,0,0,0.9)" : "rgba(115, 115, 115, 0.7)"
        }`,
        zIndex: 20,
      }}
    >
      <Box
        sx={{
          width: { sm: "673px", xs: "400px", xxs: "350px", xxxs: "280px" },
          bgcolor: "primary.dark",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "95%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            mt: "12px",
          }}
        >
          <Typography
            sx={{
              fontSize: { sm: fs.normal, xxs: fs.small, xxxs: fs.xs },
              fontWeight: 700,
              fontFamily: "poppins",
              color: "secondary.dark_gray",
            }}
          >
            Payout Scenarios
          </Typography>
          <ClearIcon
            sx={{ color: "secondary.dark_gray", cursor: "pointer" }}
            onClick={() => setOpenPayoutScenarious(false)}
          />
        </Box>
        <Typography
          sx={{
            width: "95%",
            fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
            mt: "16px",
            pb: "10px",
            borderBottom: "1px solid #D9D9D9",
            mb: "5px",
          }}
        >
          A player is considered if (sohe s not a did Ni not play/ or not a tie
          or not any condition that causes the entry to downgrade depending on
          the sport. Please read the rules for each sport in the props screen.
          In • n event player(s) is not lc • nsideredir th entry is downgraded
          and payouts are adjusted accordingly as per below{" "}
        </Typography>
        {detailData &&
          detailData.props[0].prop.payouts.map((each, index) => (
            <Typography
              key={index}
              sx={{
                width: "95%",
                fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
                fontWeight: 400,
                fontFamily: "poppins",
                color: "secondary.dark_gray",
                mt: "4px",
              }}
            >
              {each.picks}/{detailData.props[0].prop.projections.length} - wins{" "}
              {each.payout}x{" "}
            </Typography>
          ))}
        <Typography
          sx={{
            width: "95%",
            fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
            py: "16px",
            borderBottom: "1px solid #D9D9D9",
            borderTop: "1px solid #D9D9D9",
            mt: "5px",
          }}
        >
          It only 2 players remain, one is a tie and other is green, pays out
          1r25x in an attack entry. Defense entry follows the 2-pick defense
          payout rules.
        </Typography>
        <Typography
          sx={{
            width: "95%",
            fontSize: { sm: fs.small, xxs: fs.xs, xxxs: fs.xxs },
            fontWeight: 400,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
            py: "16px",
            mb: "5px",
          }}
        >
          If no valid players remain or all valid players are from same team,
          entry is canceled and refunded
        </Typography>
      </Box>
    </Box>
  );
}
