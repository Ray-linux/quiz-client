import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import "./main.css";
import { useDispatch } from "react-redux";

import { setUserId } from "../../redux/result_reducer";

function Main() {
  //code for time

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [start, setStart] = useState(true);

  const endTime = new Date("2024-11-23T02:41:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      
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

  useEffect(() => {
    const cur_time = new Date()
    if (endTime - cur_time <0) {
      setStart(true);
    }
  });

  //old code

  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const startQuiz = () => {
    if (inputRef.current?.value) {
      dispatch(setUserId(inputRef.current?.value));
    }
  };

  return (
    <div className="container">
      <h1 className="title text-light">Internet usage addition Test</h1>
      <ol>
        <li>You will be asked 20 questions one after another.</li>
        <li>Each question has five options. you can choose only one option.</li>
        <li>You can review and change answer before the test finish.</li>
        <li>The result will be declared at the end of the test</li>
      </ol>

      <form id="form">
        <input
          ref={inputRef}
          type="text"
          className="userid"
          placeholder="enrollment*"
        />
      </form>

      <div className="start">
        {start ? (
          <Link className="btn" to={"quiz"} onClick={() => startQuiz()}>
            Start
          </Link>
        ) : (
          <p className="time-display">
            exam starts in {hours} hours {minutes} minutes {seconds} seconds
          </p>
        )}
      </div>
    </div>
  );
}

export default Main;
