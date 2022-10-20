import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./bonusOffer.css";
import ClearIcon from "@mui/icons-material/Clear";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSelector } from "react-redux";
export default function BonusOffer({ setOpenInviteFriend, mode }) {
  const userDetail = useSelector((state) => state.user.userDetail);
  const [code, setCode] = useState(null);

  useEffect(() => {
    if (userDetail) {
      setCode(userDetail.referralCode);
    }
    console.log(userDetail);
  }, [userDetail]);
  const [referNote, setReferNote] = useState([
    { note: "Refer a friend and give them your referral code" },
    {
      note: "Your friend must deposit and play in at least one paid game formats",
    },
    {
      note: "We will give you both bonus cash that can be used 100% for over-unde & player -battle to win real money, when your friend enters your referral code in REFERRAL BONUS screen in Lobby",
    },
  ]);
  return (
    <div
      className="bonus-offer-container"
      style={{
        background: `${
          mode === "dark" ? "rgba(0,0,0,0.9)" : "rgba(115, 115, 115, 0.7)"
        }`,
      }}
    >
      <Box
        sx={{
          width: { sm: "566px", xs: "400px", xxs: "100%", xxxs: "100%" },
          height: "608px",
          bgcolor: "primary.main",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          m: "0 auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <ClearIcon
            sx={{
              fontSize: "25px",
              color: `${mode === "dark" ? "white" : "#494949"}`,
              mr: "14px",
              mt: "14px",
              cursor: "pointer",
            }}
            onClick={() => setOpenInviteFriend(false)}
          />
        </Box>
        <img src="/refer1.png" className="refer1" />
        <Typography
          sx={{
            fontSize: { sm: "20px", xxxs: "18px" },
            fontWeight: 800,
            fontFamily: "poppins",
            mt: "23px",
            color: "#F5A922",
          }}
        >
          BONUS OFFER
        </Typography>
        <Typography
          sx={{
            fontSize: { sm: "16px", xxxs: "14px" },
            fontWeight: 600,
            fontFamily: "poppins",
            mt: "8px",
            color: "secondary.dark_gray",
          }}
        >
          Invite a friend, earn $25{" "}
        </Typography>
        <Box
          sx={{
            bgcolor: "primary.main",
            border: "1px solid #F5A922",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            width: {
              sm: "445px",
              xs: "345px",
              xxs: "245px",
              xxxs: "200px",
            },

            alignItems: "center",
            mt: "15px",
          }}
        >
          <Typography
            sx={{
              fontSize: { sm: "14px", xxxs: "12px" },
              fontWeight: 600,
              fontFamily: "poppins",
              mt: "24px",
              color: "secondary.dark_gray",
            }}
          >
            SHARE YOUR REFERRAL CODE{" "}
          </Typography>
          <Typography
            sx={{
              fontSize: { sm: "16px", xxxs: "14px" },
              fontWeight: 600,
              fontFamily: "poppins",
              mt: "12px",
              mb: "12px",
              color: "secondary.dark_gray",
            }}
          >
            {code}
          </Typography>
          <Button
            sx={{
              color: "primary.main",
              background: "#F5A922",
              fontSize: { sm: "15px", xxxs: "13px" },
              fontWeight: 700,
              p: {
                sm: "14px 45px",
                xs: "14px 40px",
                xxs: "12px 25px",
                xxxs: "10px 15px",
              },
              mb: "32px",
              "&.MuiButtonBase-root:hover": {
                background: "#F5A922",
              },
              cursor: "pointer",
            }}
          >
            COPY CODE{" "}
          </Button>
        </Box>
        <Box
          sx={{
            background: "transparent",
            display: "flex",
            flexDirection: "column",
            width: {
              sm: "445px",
              xs: "345px",
              xxs: "245px",
              xxxs: "200px",
            },
            alignItems: "flex-start",
            mt: "29px",
          }}
        >
          {referNote.map((e, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "rows",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
                mb: "12px",
              }}
            >
              <CheckCircleIcon
                sx={{
                  color: "#F5A922",
                  fontSize: { sm: "25px", xxxs: "23px" },
                  mr: "12px",
                }}
              />
              <Typography
                sx={{
                  color: "secondary.dark_gray",
                  fontSize: { sm: "12px", xxxs: "10px" },
                  fontFamily: "poppins",
                }}
              >
                {e.note}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
}
