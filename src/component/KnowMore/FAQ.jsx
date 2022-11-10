import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./knowMore.css";
import { APIURLs } from "../../api/ApiUrls";
import { makeGETAPICall } from "../../api/methods";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";

export default function FAQ({ openTag }) {
  const fs = useSelector((state) => state.user.fs);

  const [loading, setLoading] = useState(true);
  const [faq, setFaq] = useState(null);

  useEffect(() => {
    if (openTag === "Frequently Asked Questions") {
      setLoading(true);
      getFaq()
        .then((result) => {
          setFaq(result);
          setLoading(false);
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    }
  }, [openTag]);

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          border: "1px solid #494949",
          borderRadius: "4px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingSpinnerEachSection />
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          maxHeight: "100vh",
          border: "1px solid #494949",
          borderRadius: "4px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Typography
          sx={{
            width: "90%",
            color: "secondary.main",
            fontSize: { lg: fs.normal, xs: fs.small, xxxs: fs.xs },
            fontWeight: 600,
            fontFamily: "poppins",
            py: "13px",
          }}
        >
          FAQ
        </Typography>
        {faq.map((each, index) => (
          <Box
            key={index}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "100%", background: "#494949", mb: "9px" }}>
              <Typography
                sx={{
                  width: "90%",
                  color: "white",
                  fontSize: { lg: fs.small, xs: fs.xs, xxxs: fs.xxs },
                  fontWeight: 600,
                  fontFamily: "poppins",
                  py: "9px",
                  margin: "0 auto",
                }}
              >
                {each.title}
              </Typography>
            </Box>
            {each.data.map((e, index) => (
              <Box
                key={index}
                sx={{
                  width: "90%",
                  borderBottom: `${
                    each.data.length === index + 1
                      ? "none"
                      : "1px solid #494949"
                  }`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  mt: "12px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { lg: fs.small, xs: fs.xs, xxxs: fs.xxs },
                    fontWeight: 700,
                    fontFamily: "poppins",
                    color: "secondary.main",
                    width: "100%",
                    mb: "14px",
                  }}
                >
                  {e.question}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { lg: fs.small, xs: fs.xs, xxxs: fs.xxs },
                    fontWeight: 500,
                    fontFamily: "poppins",
                    color: "secondary.main",
                    width: "100%",
                    mb: "10px",
                  }}
                >
                  {e.answer}
                </Typography>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    );
  }
}

//get faqs

export const getFaq = async () => {
  var apiUrl = APIURLs.getFaq;
  const apiResponse = await makeGETAPICall(apiUrl);
  if (apiResponse.status === 200) {
    return apiResponse.data;
  } else {
    return null;
  }
};
