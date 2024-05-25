import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**Custom Hook */
import { useFetchQuestion } from "../../hooks/FatchQuestions";
import { updateResult } from "../../hooks/setResult";

function Questions({ onChecked , num}) {
  const [checked, setChecked] = useState(undefined);
  const { trace } = useSelector((state) => state.questions);
  const result = useSelector((state) => state.result.result);
  const [{ isLoading, apiData, serverError }] = useFetchQuestion();


  

  const questions = useSelector(
    (state) => state.questions.queue[state.questions.trace]
  );
  const dispatch = useDispatch();
  // const trace = useSelector((state) => state.questions.trace);

  useEffect(() => {
    dispatch(updateResult({ trace, checked }));
  }, [checked]);

  const onSelect = (i) => {
    onChecked(i);
    setChecked(i);
  };

  if (isLoading) return <h3 className="text-light">isLoading</h3>;
  if (serverError)
    return <h3 className="text-light">{serverError || "Unknown error"}</h3>;
  


  return (
    <div className="questions">
      <h2 className="text-light">{num}) {questions?.question}</h2>

      <ul key={questions?.id}>
        {questions?.option.map((q, i) => (
          <li key={i}>
            <input
              type="radio"
              value={false}
              name="options"
              id={`q${i}-option`}
              onChange={() => onSelect(i)}
            />
            <label className="text-primary" htmlFor={`q${i}-option`}>
              {q}
            </label>
            <div
              className={`check ${result[trace] == i ? "checked" : ""}`}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Questions;
