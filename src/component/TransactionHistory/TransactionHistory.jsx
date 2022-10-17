import { Box, Card, Grid, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Detail from "../MyProps/Detail";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";
import NotFound from "./NotFound";
import { useSelector } from "react-redux";
export default function TransactionHistory({ mode }) {
  const [history, setHistory] = useState([
    {
      name: "Prop join",
      code: "Conf #3 :: 34534,",
      time: " 08/06/2022, 11:28",
      amount: "$10.0",
      won: true,
      src: "/attack-play-my-props.png",
    },
    {
      name: "Prop join",
      code: "Conf #3 :: 34534,",
      time: " 08/06/2022, 11:28",
      amount: "$5.0",
      won: true,
      src: "/defence-play-my-props.png",
    },
    {
      name: "Prop join",
      code: "Conf #3 :: 34534,",
      time: " 08/06/2022, 11:28",
      amount: "$10.0",
      won: false,
      src: "/attack-play-my-props.png",
    },
    {
      name: "Prop join",
      code: "Conf #3 :: 34534,",
      time: " 08/06/2022, 11:28",
      amount: "$5.0",
      won: true,
      src: "/defence-play-my-props.png",
    },
    {
      name: "Prop join",
      code: "Conf #3 :: 34534,",
      time: " 08/06/2022, 11:28",
      amount: "$10.0",
      won: false,
      src: "/attack-play-my-props.png",
    },
    {
      name: "Prop join",
      code: "Conf #3 :: 34534,",
      time: " 08/06/2022, 11:28",
      amount: "$5.0",
      won: true,
      src: "/defence-play-my-props.png",
    },
    {
      name: "Prop join",
      code: "Conf #3 :: 34534,",
      time: " 08/06/2022, 11:28",
      amount: "$10.0",
      won: true,
      src: "/attack-play-my-props.png",
    },
    {
      name: "Prop join",
      code: "Conf #3 :: 34534,",
      time: " 08/06/2022, 11:28",
      amount: "$5.0",
      won: false,
      src: "/attack-play-my-props.png",
    },
    {
      name: "Prop join",
      code: "Conf #3 :: 34534,",
      time: " 08/06/2022, 11:28",
      amount: "$10.0",
      won: false,
      src: "/defence-play-my-props.png",
    },
    {
      name: "Prop join",
      code: "Conf #3 :: 34534,",
      time: " 08/06/2022, 11:28",
      amount: "$5.0",
      won: false,
      src: "/attack-play-my-props.png",
    },
  ]);

  const [openHistoryDetail, setOpenHistoryDetail] = useState(false);
  const [historyDetailData, setHistoryDetailData] = useState([
    {
      player: { name: "Issac Paredes", forward: "LIV - Forward " },
      game: {
        playType: { type: "soccer", src: "/soccer.png" },
        vs: " CHI vs KC",
      },
      status: "lost",
      goal: { amount: "43.5", name: "Longest Field Goal" },
      actual: "0",
    },
    {
      player: { name: "Mohamed Salah", forward: "TB - Batter" },
      game: {
        playType: { type: "soccer", src: "/soccer.png" },
        vs: " TB vs BAL",
      },
      status: "won",
      goal: { amount: "0.5", name: "Bat.Runs + RBIs" },
      actual: "3",
      color: "#459F48",
    },
    {
      player: { name: "Isiah Pacheco", forward: "KC - RB" },
      game: {
        playType: { type: "soccer", src: "/soccer.png" },
        vs: " LIV vs CRY",
      },
      status: "lost",
      goal: { amount: "30.5 ", name: "Goal" },
      actual: "11",
      actualBar: "50%",
    },
  ]);
  const [referCode] = useState(true);
  const [clicked, setClicked] = useState(null);

  const txHistoryDataCommingFromApi = useSelector(
    (state) => state.user.txHistoryDataCommingFromApi
  );
  if (
    Array.isArray(txHistoryDataCommingFromApi) &&
    txHistoryDataCommingFromApi.length === 0
  ) {
    return <NotFound />;
  } else if (txHistoryDataCommingFromApi) {
    return (
      <Box
        sx={{
          width: {
            xl: "1000px",
            lg: "836px",
            md: "700px",
            sm: "500px",
            xs: "450px",
            xxxs: "90%",
          },
          height: "100vh",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        component="div"
      >
        <Typography
          sx={{
            fontSize: { xs: "16px", xxs: "14px", xxxs: "12px" },
            fontWeight: 700,
            fontFamily: "poppins",
            color: "secondary.dark_gray",
            mt: "23px",
            width: "100%",
          }}
        >
          Transaction History{" "}
        </Typography>
        <Box sx={{ width: "100%", mt: "9px", mb: "20px" }}>
          <Box
            sx={{
              width: { xs: "232px", xxs: "170px", xxxs: "130px" },
              height: "2px",
              bgcolor: "secondary.dark",
            }}
          ></Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { md: "row", xxxs: "column" },
            wdith: "100%",
          }}
        >
          <Grid container sx={{ width: { md: "50%", xxxs: "100%" } }}>
            {history.map((e, index) => (
              <Grid item md={12} key={index} xxxs={12} sx={{ mb: "12px" }}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: { md: "95%", xxxs: "100%" },
                    borderRadius: "4px",
                    border: `${
                      clicked === index
                        ? "1px solid #4831D4"
                        : mode === "dark"
                        ? "1px solid #494949"
                        : "1px solid #494949"
                    }`,
                    bgcolor: "primary.main",
                    bgcolor: "transparent",
                    boxShadow: "none",
                  }}
                  onClick={() => {
                    setClicked(index);
                    setOpenHistoryDetail(true);
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      ml: "10px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "14px", xxs: "12px", xxxs: "10px" },
                        fontWeight: 400,
                        fontFamily: "poppins",
                        color: "secondary.main",
                        mt: "9px",
                      }}
                    >
                      {e.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: "12px", xxs: "10px", xxxs: "8px" },
                        fontWeight: 500,
                        fontFamily: "poppins",
                        color: "secondary.main",
                        mt: "5px",
                      }}
                    >
                      {e.code}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: "12px", xxs: "10px", xxxs: "8px" },
                        fontWeight: 500,
                        fontFamily: "poppins",
                        color: "secondary.main",
                        mb: "14px",
                      }}
                    >
                      {e.time}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      ml: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "16px", xxs: "14px", xxxs: "12px" },
                        fontWeight: 600,
                        fontFamily: "poppins",
                        color: `${
                          e.won
                            ? mode === "dark"
                              ? "#C2DEC7"
                              : "#52C03C"
                            : mode === "dark"
                            ? "#FFCED6"
                            : "#E4313C"
                        }`,
                      }}
                    >
                      {e.amount}
                    </Typography>
                    <ArrowForwardIosIcon
                      sx={{
                        color: "#494949",
                        mr: { sm: "13px", xxs: "7px", xxxs: "4px" },

                        ml: "16px",
                        ml: { sm: "16px", xxs: "7px", xxxs: "4px" },
                        fontSize: { xs: "20px", xxs: "18px", xxxs: "16px" },
                      }}
                    />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          {openHistoryDetail ? (
            <Detail
              setOpenDetail={setOpenHistoryDetail}
              detailData={historyDetailData}
              referCode={referCode}
              clicked={clicked}
              mainDetail={history}
              mode={mode}
            />
          ) : (
            <Detail
              emptyText={"Select a transaction to know more information"}
              mode={mode}
            />
          )}
        </Box>
      </Box>
    );
  } else {
    return <LoadingSpinnerEachSection />;
  }
}
