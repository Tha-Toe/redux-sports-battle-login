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
    if (differentSec) {
      const getMinutes = Math.floor(differentSec / 60);
      let hours = Math.floor(getMinutes / 60);
      let hoursToMinutes = hours * 60;
      let minutes = getMinutes - hoursToMinutes;
      let timeToAdd = hours.toString() + "h" + " " + minutes.toString() + "m";
      setTime(timeToAdd);
    }
  }, [gameData]);
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
