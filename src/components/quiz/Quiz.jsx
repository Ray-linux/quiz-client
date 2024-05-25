import React, { useEffect, useState } from "react";
import Questions from "../questions/Questions";

// redux store import

import { useSelector, useDispatch } from "react-redux";

//custom hooks
import { moveNextQuestion, movePrevQuestion } from "../../hooks/FatchQuestions";
import { PushAnswer } from "../../hooks/setResult";
import { Navigate } from "react-router-dom";

function Quiz() {
  const [num, setNum] = useState(1);


  const [check, setCheck] = useState(undefined);

  const result = useSelector((state) => state.result.result);
  const { queue, trace } = useSelector((state) => state.questions);
  const dispatch = useDispatch();


  // next button event handler
  const onNext = () => {
    /**update the trace value by one using MoveNextAction */
    setNum(num + 1)

    if (trace < queue.length) {
      dispatch(moveNextQuestion());
      /**insert a new result in the array .*/
      if (result.length <= trace) {
        dispatch(PushAnswer(check));
      }
    }
    /* reset the value of the checked variable */

    setCheck(undefined)

  };

  //prev button event handler
  const onPrev = () => {
    setNum(num - 1)
    if (trace > 0) {
      dispatch(movePrevQuestion());
    }
  };

  const onChecked = (check) => {
    setCheck(check);
  };

  /** finish exam after last question */

  if (result.length && result.length >= queue.length) {
    return <Navigate to={"/result"} replace="true"></Navigate>;
  }

  return (
    <div className="container">
      {/* <h1 className="title text-light">Quiz Application</h1> */}

      {/* display question*/}

      <Questions onChecked={onChecked} num ={num} setNum = {setNum} />

      <div className="grid">

        {trace > 0 ? <button className="btn prev" onClick={() => onPrev()}>Prev</button>: <div></div>}
        <button className="btn next" onClick={() => onNext()}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Quiz;
