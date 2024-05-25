// fetch question hooks to fetch api data and set value to store

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

/* redux actions */
import * as Action from "../redux/question_reducer";
import { getServerData } from "../helper/helper";

export const useFetchQuestion = () => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  //RENDOMIZE THE QUESTIONS

  function shuffleArrays(arr1, arr2) {
    // Create an array of indices
    const indices = Array.from({ length: arr1.length }, (_, index) => index);

    // Shuffle the array of indices
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // Use the shuffled indices to rearrange both arrays
    const shuffledArr1 = indices.map((index) => arr1[index]);
    const shuffledArr2 = indices.map((index) => arr2[index]);

    return [shuffledArr1, shuffledArr2];
  }

  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }));

    //async function fetch backend data
    (async () => {
      try {
        const [{ questions, answers }] = await getServerData(
          // "http://localhost:8080/api/questions",
          "https://quiz-backend-zpzx.vercel.app/api/questions",
          (data) => data
        );
        console.log({ questions, answers });
        const [newQuestions, newAnswers] = shuffleArrays(questions, answers);

        if (questions.length > 0) {
          setGetData((prev) => ({ ...prev, isLoading: false }));
          setGetData((prev) => ({
            ...prev,
            apiData: { questions: newQuestions, answers: newAnswers },
          }));

          //dispatch an action
          dispatch(
            Action.startExamAction({
              question: newQuestions,
              answers: newAnswers,
            })
          );
        } else {
          throw new Error("No Question Available");
        }
      } catch (e) {
        setGetData((prev) => ({ ...prev, isLoading: false }));
        setGetData((prev) => ({ ...prev, serverError: e }));
      }
    })();
  }, [dispatch]);

  return [getData, setGetData];
};

/**MoveAction Dispatch function */

export const moveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.moveNextAction());
  } catch (e) {
    console.log(e);
  }
};

export const movePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.movePrevAction());
  } catch (e) {
    console.log(e);
  }
};
