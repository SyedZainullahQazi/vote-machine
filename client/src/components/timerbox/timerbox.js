import React from "react";
import "../../styles/dashboard/timerbox.css"

const TimerBox = ({ label, value }) => {
  return (
    <div className="timer-box">
      <div className="timer-label">{label}</div>
      <div className="timer-value">{value}</div>
    </div>
  );
};

export default TimerBox;
