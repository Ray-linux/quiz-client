import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./result.css";
import ResultTable from "./ResultTable";
import { useDispatch, useSelector } from "react-redux";

/**import actions */
import { resetAllAction } from "../../redux/question_reducer";
import { resetResultAction } from "../../redux/result_reducer";

/* helper functions */

import {
  attempts_Number,
  earnPoints_Number,
  flagResult,
} from "../../helper/helper";
import { usePublishResult } from "../../hooks/setResult";

function Result() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [isDisclosed, setIsDisclosed] = useState(false);
  const endTime = new Date("2023-11-23T13:00:00");

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
    if (endTime - cur_time < 0) {
      setIsDisclosed(true);
    }
  });

  const dispatch = useDispatch();
  const {
    questions: { queue, answers },
    result: { result, userId },
  } = useSelector((state) => state);


  const totalPoints = queue.length * 10;
  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result, answers, 10);
  const flag = flagResult(totalPoints, earnPoints);

  //store user result
  useEffect(() => {
    usePublishResult({
      result,
      username: userId,
      attempts,
      points: earnPoints,
      achived: flag ? "Passed" : "Failed",
    });
  }, []);

  const onRestart = () => {
    // console.log('on restart')
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  };
  return (
    <div className="container">
      <h1 className="title text-light">Aptitude Test</h1>
      {isDisclosed ? (
        <div className="result flex-center">
          <div className="flex">
            <span>Username</span>
            <span className="bold">{userId || ""}</span>
          </div>
          <div className="flex">
            <span>Total Quiz Points : </span>
            <span className="bold">{totalPoints || 0}</span>
          </div>
          <div className="flex">
            <span>Total Questions : </span>
            <span className="bold">{queue.length || 0}</span>
          </div>
          <div className="flex">
            <span>Total Attempts : </span>
            <span className="bold">{attempts || 0}</span>
          </div>
          <div className="flex">
            <span>Total Earned Points : </span>
            <span className="bold">{earnPoints || 0}</span>
          </div>
          <div className="flex">
            <span>Quiz result : </span>
            <span
              style={{ color: `${flag ? "#2aff95" : "#ff2a66"}` }}
              className="bold"
            >
              {flag ? "passed" : "Failed"}
            </span>
          </div>
        </div>
      ) : (
        <p className="time-display flex-display">
          result will be shwn in {hours} hours {minutes} minutes {seconds}
        </p>
      )}

      {/* <div className="start">
        <Link className="btn" to={"/"} onClick={() => onRestart()}>
          Restart
        </Link>
      </div> */}
    </div>
  );
}

export default Result;
