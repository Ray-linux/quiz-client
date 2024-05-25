import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/main/Main";
import Quiz from "./components/quiz/Quiz";
import Result from "./components/result/Result";

import { CheckUserExist } from "./helper/helper";
import Time from "./components/timer/Time";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
  },
  {
    path: "/quiz",
    element: (
      <CheckUserExist>
        <Time />
        <Quiz />
      </CheckUserExist>
    ),
  },
  {
    path: "/result",
    element: (
      <CheckUserExist>
        <Result />
      </CheckUserExist>
    ),
  },
]);

function App() {
  return (
    <>
      
      <RouterProvider router={router} />
    </>
  );
}

export default App;
