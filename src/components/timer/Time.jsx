import React, { useEffect, useState } from "react";
import "./time.css"

function Time() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const endTime = new Date("2023-11-23T02:50:00");
      const remainingTime = endTime - now;

      setHours(Math.floor(remainingTime / (1000 * 60 * 60)));
      setMinutes(Math.floor((remainingTime / (1000 * 60)) % 60));
      setSeconds(Math.floor((remainingTime / 1000) % 60));

      if (remainingTime <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="timer-container">
      <p className="time-display">
        {hours} :: {minutes} :: {seconds} left
      </p>
    </div>
  );
}

export default Time;
