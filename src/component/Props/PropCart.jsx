import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import "./props.css";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { addPropCartData } from "../../feature/userSlice";

export default function PropCart({ selectedCardList, mode, selectSports }) {
  const fs = useSelector((state) => state.user.fs);
  const dispatch = useDispatch();
  const propsDataCommingFromApi = useSelector(
    (state) => state.user.propsDataCommingFromApi
  );
  let propCartData = useSelector((state) => state.user.propCartData);
  useEffect(() => {
    dispatch(addPropCartData(null));
    if (selectedCardList.length > 0 && propsDataCommingFromApi) {
      let selectedSportPropsData = propsDataCommingFromApi.filter((each) => {
        return each.sportCode === selectSports;
      });
      if (selectedSportPropsData.length > 0) {
        // console.log(selectedCardList);
        let metadata = selectedSportPropsData[0].metadata;
        let propCartDataReturn = getPayouts(selectedCardList, metadata);
        dispatch(addPropCartData(propCartDataReturn));
      }
    }
  }, [selectedCardList, propsDataCommingFromApi, selectSports]);

  return (
    <Box
      sx={{
        borderBottom: `${
          mode === "dark" ? "1px solid #2c2c2c" : "1px solid #DBDBDB"
        }`,
        mb: "16px",
        pb: "4px",
      }}
    >
      {propCartData && propCartData.attackPayouts && (
        <Typography
          sx={{
            fontFamily: "poppins",
            fontSize: { sm: fs.xxs, xxs: fs.xxs, xxxs: fs.xxs },
            fontWeight: 400,
            color: "secondary.dark_gray",
            width: "90%",
            margin: "0 auto",
            mb: "7px",
          }}
        >
          Props Cart : : {propCartData.attackPayouts[0].picks} Picks
        </Typography>
      )}
      {propCartData && propCartData.attackPayouts && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "90%",
            margin: "0 auto",
            mb: "3px",
          }}
        >
          <Box
            sx={{
              padding: "5px 12px",
              fontSize: fs.xs,
              bgcolor: "primary.gray",
              borderRadius: "4px",
              fontFamily: "poppins",
              fontWeight: 500,
              mr: "5px",
              color: `${
                selectedCardList.length === 1 ? "white" : "secondary.dark_gray"
              }`,
            }}
          >
            1
          </Box>
          <Box
            sx={{
              padding: "5px 12px",
              bgcolor: `${
                propCartData.attackPayouts[0].picks === 2
                  ? "#439F48"
                  : "primary.gray"
              }`,
              borderRadius: "4px",
              fontFamily: "poppins",
              fontWeight: 500,
              fontSize: fs.xs,
              mr: "5px",
              color: `${
                propCartData.attackPayouts[0].picks === 2
                  ? "white"
                  : "secondary.dark_gray"
              }`,
            }}
          >
            {propCartData.attackPayouts[0].picks === 2
              ? `${propCartData.attackPayouts[0].payout}x`
              : "2"}
          </Box>
          <Box
            sx={{
              padding: "5px 12px",
              bgcolor: `${
                propCartData.attackPayouts[0].picks === 3
                  ? "#439F48"
                  : "primary.gray"
              }`,
              borderRadius: "4px",
              fontFamily: "poppins",
              fontWeight: 500,
              fontSize: fs.xs,
              mr: "5px",
              color: `${
                propCartData.attackPayouts[0].picks === 3
                  ? "white"
                  : "secondary.dark_gray"
              }`,
            }}
          >
            {propCartData.attackPayouts[0].picks === 3
              ? `${propCartData.attackPayouts[0].payout}x`
              : "3"}
          </Box>
          <Box
            sx={{
              padding: "5px 12px",
              bgcolor: `${
                propCartData.attackPayouts[0].picks === 4
                  ? "#439F48"
                  : "primary.gray"
              }`,
              borderRadius: "4px",
              fontFamily: "poppins",
              fontWeight: 500,
              fontSize: fs.xs,
              mr: "5px",
              color: `${
                propCartData.attackPayouts[0].picks === 4
                  ? "white"
                  : "secondary.dark_gray"
              }`,
            }}
          >
            {propCartData.attackPayouts[0].picks === 4
              ? `${propCartData.attackPayouts[0].payout}x`
              : "4"}
          </Box>
          <Box
            sx={{
              padding: "5px 12px",
              bgcolor: `${
                propCartData.attackPayouts[0].picks === 5
                  ? "#439F48"
                  : "primary.gray"
              }`,
              borderRadius: "4px",
              fontFamily: "poppins",
              fontWeight: 500,
              fontSize: fs.xs,
              mr: "5px",
              color: `${
                propCartData.attackPayouts[0].picks === 5
                  ? "white"
                  : "secondary.dark_gray"
              }`,
            }}
          >
            {propCartData.attackPayouts[0].picks === 5
              ? `${propCartData.attackPayouts[0].payout}x`
              : "5"}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export const getPayouts = (selectedUserProps, metadata) => {
  if (!selectedUserProps || selectedUserProps.length < 2) {
    return {};
  }
  const statsInThisEntry = _.uniq(
    _.map(selectedUserProps, (o) => o.statKey + "::" + o.sport)
  );
  const sportsInThisEntry = _.uniq(_.map(selectedUserProps, (o) => o.sport));
  const uniqueCorrSportsInThisEntry = _.uniq(
    _.map(
      selectedUserProps.filter((x) =>
        metadata.correlatedSports.includes(x.sport)
      ),
      (o) => o.sport
    )
  );
  const attackOnlySportsInThisEntry = _.uniq(
    _.map(
      selectedUserProps.filter((x) =>
        metadata.attackOnlySports.includes(x.sport)
      ),
      (o) => o.sport
    )
  );

  let appPayouts = metadata.payouts;
  let payoutsHere = JSON.parse(JSON.stringify(appPayouts));

  const numPicks = selectedUserProps.length;
  const attackPayouts = payoutsHere.filter((x) => x.totalPicks === numPicks)[0][
    "attack"
  ];
  const attackPayoutsForStatsInThisEntry = attackPayouts.filter(
    (x) => statsInThisEntry.length === x.numStats
  )[0];
  const defensePayouts = payoutsHere.filter(
    (x) => x.totalPicks === numPicks
  )[0]["defense"];
  const defensePayoutsForStatsInThisEntry = defensePayouts.filter(
    (x) => statsInThisEntry.length === x.numStats
  );

  let totalPayoutInThisEntry = 0.0;
  const correlationSportEntries = selectedUserProps.filter((x) =>
    metadata.correlatedSports.includes(x.sport)
  );
  let numOfCorrelatedSportEntries = correlationSportEntries.length;

  if (numOfCorrelatedSportEntries > 0) {
    // let payoutContributedByCorrSports = (numOfCorrelatedSportEntries / selectedUserProps.length) * attackPayoutsForStatsInThisEntry.payout * metadata.correlatedPayout;
    // let payoutContributedByCorrSports = (numOfCorrelatedSportEntries / selectedUserProps.length) * attackPayoutsForStatsInThisEntry.payout;

    let payoutContributedByCorrSports =
      (numOfCorrelatedSportEntries / selectedUserProps.length) *
      attackPayoutsForStatsInThisEntry.payout;
    const payoutContributedByOtherSports =
      ((selectedUserProps.length - numOfCorrelatedSportEntries) /
        selectedUserProps.length) *
      attackPayoutsForStatsInThisEntry.payout;

    const considerOtherSportsForPayoutReduction =
      payoutContributedByOtherSports > 0 &&
      sportsInThisEntry.length - uniqueCorrSportsInThisEntry.length >= 2;
    const action = _.map(correlationSportEntries, (o) => o.action === "over");
    const numOvers = _.filter(
      correlationSportEntries,
      (o) => o.action === "over"
    ).length;
    const numUnders = _.filter(
      correlationSportEntries,
      (o) => o.action === "under"
    ).length;

    let sameStatAllSameActionReduction = false;
    if (
      numOfCorrelatedSportEntries >= 4 ||
      considerOtherSportsForPayoutReduction
    ) {
      let distinctCorrelatedStats = _.uniq(
        _.map(correlationSportEntries, (o) => o.statKey)
      );
      distinctCorrelatedStats.forEach((x) => {
        if (!sameStatAllSameActionReduction) {
          const thisStatPicks = _.filter(
            correlationSportEntries,
            (o) => o.statKey === x
          );
          const thisStatActions = _.uniq(_.map(thisStatPicks, (o) => o.action));
          if (thisStatPicks.length > 1) {
            if (thisStatActions.length === 1) {
              sameStatAllSameActionReduction = true;
            }
          } else {
            if (x === "gir" || x === "fairwaysHit" || x === "birdiesOrBetter") {
              if (thisStatActions[0] === "under") {
                sameStatAllSameActionReduction = true;
              }
            } else if (x === "strokes") {
              if (thisStatActions[0] === "over") {
                sameStatAllSameActionReduction = true;
              }
            }
          }
        }
      });
    }

    let correlationPayoutPerc = 1.0;
    if (numOfCorrelatedSportEntries === 2) {
      if (numOvers === 0 || numUnders === 0) {
        correlationPayoutPerc = 0.865;
      } else {
        correlationPayoutPerc = 1.0;
      }
    } else if (numOfCorrelatedSportEntries === 3) {
      if (numOvers === 0 || numUnders === 0) {
        correlationPayoutPerc = 0.75;
      } else {
        correlationPayoutPerc = 1;
      }
    } else if (numOfCorrelatedSportEntries >= 4) {
      if (numOvers === 0 || numUnders === 0) {
        correlationPayoutPerc = 0.5;
      } else {
        let biggerChoice;
        if (numOvers > numUnders) {
          biggerChoice = numOvers;
        } else {
          biggerChoice = numUnders;
        }
        let biggerChoicePerc =
          100 - (biggerChoice / (numOvers + numUnders)) * 100;
        if (biggerChoicePerc <= 25) {
          correlationPayoutPerc = 0.65;
        } else {
          correlationPayoutPerc = 0.8;
        }
      }
    }
    let finalPayoutContributedByCorrSports =
      payoutContributedByCorrSports * correlationPayoutPerc;
    totalPayoutInThisEntry =
      finalPayoutContributedByCorrSports + payoutContributedByOtherSports;
    if (
      sameStatAllSameActionReduction ||
      considerOtherSportsForPayoutReduction
    ) {
      totalPayoutInThisEntry = totalPayoutInThisEntry * 1;
    }
    totalPayoutInThisEntry =
      totalPayoutInThisEntry >= 3
        ? Math.round(totalPayoutInThisEntry * 2) / 2
        : totalPayoutInThisEntry;
    if (totalPayoutInThisEntry === 5.5) {
      totalPayoutInThisEntry = 5;
    } else if (totalPayoutInThisEntry >= 2.59 && totalPayoutInThisEntry < 2.6) {
      totalPayoutInThisEntry = 3;
    } else if (totalPayoutInThisEntry > 4 && totalPayoutInThisEntry <= 5) {
      totalPayoutInThisEntry = 5;
    } else if (totalPayoutInThisEntry > 10 && totalPayoutInThisEntry <= 11) {
      totalPayoutInThisEntry = 10;
    } else if (
      numOfCorrelatedSportEntries >= 2 &&
      totalPayoutInThisEntry > 13
    ) {
      totalPayoutInThisEntry = 13.0;
    }
  } else {
    totalPayoutInThisEntry = attackPayoutsForStatsInThisEntry.payout;
  }
  totalPayoutInThisEntry = parseFloat(totalPayoutInThisEntry.toFixed(2));
  attackPayoutsForStatsInThisEntry.payout = totalPayoutInThisEntry;

  const payoutsForThisEntry = {
    attackPayouts: [attackPayoutsForStatsInThisEntry],
    defensePayouts: defensePayoutsForStatsInThisEntry,
    attackOnlyEntry:
      attackOnlySportsInThisEntry.length > 0 || selectedUserProps.length <= 2,
  };
  // console.log(payoutsForThisEntry);
  return payoutsForThisEntry;
};
