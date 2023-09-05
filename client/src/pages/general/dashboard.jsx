import React, { useState, useEffect } from "react";
import { FetchClosestScheduleAPI } from "../../apis/general/GetClosestSchedule";
import Navbar from "../../components/navbar/navbar";
import TimerBox from "../../components/timerbox/timerbox";
import "../../styles/dashboard/dashboards.css";
import Spinner from "react-spinner"; // Import the Spinner component

export default function Dashboard() {
  const [remainingTime, setRemainingTime] = useState(null);
  const [votingStatus, setVotingStatus] = useState("");
  const [ElectionSchedule, setElectionSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schedulesData = await FetchClosestScheduleAPI();
        setElectionSchedule(schedulesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching election schedules:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const updateRemainingTime = () => {
      if (ElectionSchedule) {
        const currentDateTime = new Date();
        if (!ElectionSchedule.active) {
          const timeUntilStart = new Date(ElectionSchedule.startDateTime) - currentDateTime;
          if (timeUntilStart > 0) {
            setRemainingTime(formatTime(timeUntilStart));
            setVotingStatus("Voting hasn't started");
          }
        } else {
          const timeUntilEnd = new Date(ElectionSchedule.endDateTime) - currentDateTime;
          if (timeUntilEnd > 0) {
            setRemainingTime(formatTime(timeUntilEnd));
            setVotingStatus("Voting has started");
          } else {
            setRemainingTime("Election ended");
            setVotingStatus("");
          }
        }
      }
    };

    const formatTime = (timeInMillis) => {
      const seconds = Math.floor((timeInMillis / 1000) % 60);
      const minutes = Math.floor((timeInMillis / 1000 / 60) % 60);
      const hours = Math.floor((timeInMillis / (1000 * 60 * 60)) % 24);
      const days = Math.floor(timeInMillis / (1000 * 60 * 60 * 24));

      return { days, hours, minutes, seconds };
    };

    let timer;
    if (ElectionSchedule) {
      updateRemainingTime()
      timer = setInterval(updateRemainingTime, 1000);
    }

    return () => clearInterval(timer);
  }, [ElectionSchedule]);

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="content">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <h1 className="header-text">{votingStatus ? "Current Voting Timer" : "No Active Schedules"}</h1>
            {votingStatus && <p className="voting-text">{votingStatus}</p>}
            <div className="timer-container">
              {remainingTime && (
                <>
                  <TimerBox label="Days" value={remainingTime.days} />
                  <TimerBox label="Hours" value={remainingTime.hours} />
                  <TimerBox label="Minutes" value={remainingTime.minutes} />
                  <TimerBox label="Seconds" value={remainingTime.seconds} />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
