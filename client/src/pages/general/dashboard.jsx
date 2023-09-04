import React from "react";
import { useState, useEffect } from "react";

import { FetchClosestScheduleAPI } from "../../apis/general/GetClosestSchedule";

import Navbar from "../../components/navbar/navbar";
import "../../styles/navbar/navbar.css";

export default function Dashboard() {
  const [remainingTime, setRemainingTime] = useState(null);
  const [votingStatus, setVotingStatus] = useState("");
  const [ElectionSchedule, setElectionSchedule] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schedulesData = await FetchClosestScheduleAPI();
        setElectionSchedule(schedulesData);
      } catch (error) {
        console.error("Error fetching election schedules:", error);
      }
    };
    fetchData();
    const timerInterval = setInterval(() => {
      fetchData();
    }, 120000);
    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
      const updateRemainingTime = () => {
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

      const formatTime = (timeInMillis) => {
      const seconds = Math.floor((timeInMillis / 1000) % 60);
      const minutes = Math.floor((timeInMillis / 1000 / 60) % 60);
      const hours = Math.floor((timeInMillis / (1000 * 60 * 60)) % 24);
      const days = Math.floor(timeInMillis / (1000 * 60 * 60 * 24));

      return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
    };
    
    let timer;
    if(ElectionSchedule)
    {
       timer = setInterval(updateRemainingTime, 1000);
    }

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, [ElectionSchedule]);

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="content">
          {votingStatus && <p>{votingStatus}</p>}
          {remainingTime && <p>Remaining Time: {remainingTime}</p>}
          {votingStatus?<h1>Timer</h1>:<h1>No Active Schedules</h1>}
      </div>

    </div>
  );
}
