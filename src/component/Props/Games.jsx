import React, { useEffect, useState } from "react";

export default function Games({ gameData, mode }) {
  const [time, setTime] = useState(null);
  useEffect(() => {
    let currTime = new Date();
    let currTimeMili = currTime.getTime();
    let startTime = new Date(gameData.dateTime);
    let startTimeMili = startTime.getTime();
    let differentMili = startTimeMili - currTimeMili;
    let differentSec = Math.floor(differentMili / 1000);
    const getMinutes = Math.floor(differentSec / 60);
    if (differentSec) {
      if (getMinutes < 120) {
        setInterval(() => {
          updateTimes();
        }, 1000);
      } else {
        let hours = Math.floor(getMinutes / 60);
        let hoursToMinutes = hours * 60;
        let minutes = getMinutes - hoursToMinutes;
        let timeToAdd = hours.toString() + "h" + " " + minutes.toString() + "m";
        setTime(timeToAdd);
      }
    }
  }, [gameData]);
  const updateTimes = () => {
    let currTime = new Date();
    let currTimeMili = currTime.getTime();
    let startTime = new Date(gameData.dateTime);
    let startTimeMili = startTime.getTime();
    let differentMili = startTimeMili - currTimeMili;
    let differentSec = Math.floor(differentMili / 1000);
    const getMinutes = Math.floor(differentSec / 60);
    if (differentSec) {
      let hours = Math.floor(getMinutes / 60);
      let hoursToMinutes = hours * 60;
      let minutes = getMinutes - hoursToMinutes;
      let seconds = 0;
      if (hours !== 0) {
        let hourPlusMin = minutes + 60;
        let minToSec = hourPlusMin * 60;
        seconds = differentSec - minToSec;
      } else {
        seconds = differentSec - minutes * 60;
      }
      if (seconds.toString().length === 1) {
        seconds = "0" + seconds;
      }
      if (minutes.toString().length === 1) {
        minutes = "0" + minutes;
      }
      if (hours.toString().length === 1) {
        hours = "0" + hours;
      }
      let timeToAdd =
        hours.toString() +
        " : " +
        minutes.toString() +
        " : " +
        seconds.toString();
      setTime(timeToAdd);
    }
  };
  return (
    <div
      className="matchesButton"
      style={{
        background: `${mode === "dark" ? "#4831D4" : "#DAD5F6"}`,
      }}
    >
      <div
        className="matchesName"
        style={{
          color: `${mode === "dark" ? "white" : "#4831D4"}`,
        }}
      >
        {gameData.gameName}
      </div>
      <div
        className="matchesTime"
        style={{
          color: `${mode === "dark" ? "white" : "#4831D4"}`,
        }}
      >
        {time}
      </div>
    </div>
  );
}
