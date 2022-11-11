import { Box, Card, Grid, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Detail from "../MyProps/Detail";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";
import NotFound from "./NotFound";
import { useDispatch, useSelector } from "react-redux";
import { APIURLs } from "../../api/ApiUrls";
import { makeGETAPICall } from "../../api/methods";
import {
  addTxHistoryDataCommingFromApi,
  addTxHistoryDataCommingFromApiNewPage,
} from "../../feature/userSlice";

const TxnType = ({ txnType }) => {
  const [txnHeader, setTxnHeader] = useState(null);
  useEffect(() => {
    const nameFunc = async () => {
      if (txnType) {
        const mySentence = txnType;
        let words = mySentence.replace(/_/gi, " ");
        words = words[0].toUpperCase() + words.substring(1);
        // const words = mySentence.replace(/_/gi, " ").split(" ");

        // let str = "";
        // await words
        //   .map((word) => {
        //     let upperCase = word[0].toUpperCase() + word.substring(1);
        //     str = str + " " + upperCase;
        //   })
        //   .join(" ");
        setTxnHeader(words);
      }
    };
    nameFunc();
  }, [txnType]);

  return (
    <Typography
      sx={{
        fontSize: { xs: "14px", xxs: "12px", xxxs: "10px" },
        fontWeight: 400,
        fontFamily: "poppins",
        color: "secondary.main",
        mt: "9px",
      }}
    >
      {txnHeader}
    </Typography>
  );
};

const Time = ({ date }) => {
  const [dateToShow, setDateToShow] = useState(null);
  useEffect(() => {
    if (date) {
      let dateData = new Date(date);
      let dd = dateData.getDate();
      let mm = dateData.getMonth() + 1;
      let yyyy = dateData.getFullYear();
      let hr = dateData.getHours();
      let min = dateData.getMinutes();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      let dateDataToShow = mm + "/" + dd + "/" + yyyy + ", " + hr + ":" + min;
      setDateToShow(dateDataToShow);
    }
  }, [date]);
  return (
    <Typography
      sx={{
        fontSize: { xs: "12px", xxs: "10px", xxxs: "8px" },
        fontWeight: 500,
        fontFamily: "poppins",
        color: "secondary.main",
        mb: "14px",
      }}
    >
      {dateToShow}
    </Typography>
  );
};

const useVerticalScrollTxHistory = ({
  txHistoryDataCommingFromApi,
  setPageNumberToChange,
}) => {
  const containerRef = useRef();

  useEffect(() => {
    const containerRefl = containerRef.current;
    if (containerRefl) {
      const onWheel = (e) => {
        if (containerRefl.scrollHeight === containerRefl.clientHeight) {
          return;
        } else if (
          containerRefl.scrollTop + containerRefl.clientHeight ===
          containerRefl.scrollHeight
        ) {
          setPageNumberToChange(true);
        }
        if (e.deltaY == 0) return;
        e.preventDefault();
        containerRefl.scrollTop = containerRefl.scrollTop + e.deltaY;
      };
      containerRefl.addEventListener("wheel", onWheel);
      return () => containerRefl.removeEventListener("wheel", onWheel);
    }
  }, [txHistoryDataCommingFromApi]);
  return containerRef;
};

export default function TransactionHistory({ mode }) {
  const txHistoryDataCommingFromApi = useSelector(
    (state) => state.user.txHistoryDataCommingFromApi
  );

  const [pageNumberToChange, setPageNumberToChange] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const txListContainer = useVerticalScrollTxHistory({
    txHistoryDataCommingFromApi,
    setPageNumberToChange,
  });
  const dispatch = useDispatch();
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      getTxHistory(user.uid, pageNumber)
        .then((res) => {
          if (res.length > 0) {
            console.log(res);
            dispatch(addTxHistoryDataCommingFromApi(res));
            setLoading(false);
          } else {
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (pageNumberToChange && user) {
      let pageNumberUpdate = pageNumber + 1;
      console.log(pageNumberUpdate);
      getTxHistory(user.uid, pageNumberUpdate)
        .then((res) => {
          if (res.length > 0) {
            console.log(res);
            dispatch(addTxHistoryDataCommingFromApiNewPage(res));
            setPageNumber(pageNumberUpdate);
            setPageNumberToChange(false);
            setLoading(false);
          } else {
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [pageNumberToChange, pageNumber]);

  if (loading) {
    return <LoadingSpinnerEachSection />;
  } else if (
    Array.isArray(txHistoryDataCommingFromApi) &&
    txHistoryDataCommingFromApi.length === 0
  ) {
    return <NotFound />;
  } else {
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
          <Box
            sx={{
              width: { md: "50%", xxxs: "100%" },
              height: "100vh",
              maxHeight: "100vh",
              overflow: "scroll",
              "&::-webkit-scrollbar": { display: "none" },
              borderBottom: "1px solid #494949",
              mb: "50px",
            }}
            ref={txListContainer}
          >
            <Grid container sx={{ width: { md: "100%", xxxs: "100%" } }}>
              {txHistoryDataCommingFromApi.map((e, index) => (
                <Grid item md={12} key={index} xxxs={12} sx={{ mb: "12px" }}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: { md: "98%", xxxs: "98%" },
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
                      // setClicked(index);
                      // setOpenHistoryDetail(true);
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
                      {e.comment ? (
                        <Typography
                          sx={{
                            fontSize: { xs: "14px", xxs: "12px", xxxs: "10px" },
                            fontWeight: 400,
                            fontFamily: "poppins",
                            color: "secondary.main",
                            mt: "9px",
                            maxWidth: "80%",
                          }}
                        >
                          {e.comment}
                        </Typography>
                      ) : (
                        <TxnType txnType={e.txnType} />
                      )}
                      {e.contestId && (
                        <Typography
                          sx={{
                            fontSize: { xs: "12px", xxs: "10px", xxxs: "8px" },
                            fontWeight: 500,
                            fontFamily: "poppins",
                            color: "secondary.main",
                            mt: "5px",
                          }}
                        >
                          Conf # :: {e.contestId.substr(e.contestId.length - 6)}
                        </Typography>
                      )}
                      <Time date={e.cDate} />
                    </Box>
                    {!e.comment && (
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
                            // color: `${
                            //   e.won
                            //     ? mode === "dark"
                            //       ? "#C2DEC7"
                            //       : "#52C03C"
                            //     : mode === "dark"
                            //     ? "#FFCED6"
                            //     : "#E4313C"
                            // }`,
                            color: "#52c03c",
                          }}
                        >
                          ${e.amount}
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
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
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
  }
}

//get Tx History

export const getTxHistory = async (userId, pageNo) => {
  var apiUrl = APIURLs.getTxHistory;
  apiUrl = apiUrl.replace("{userId}", userId);
  apiUrl = apiUrl.replace("{pageNo}", pageNo);
  const apiResponse = await makeGETAPICall(apiUrl);
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return null;
  }
};
