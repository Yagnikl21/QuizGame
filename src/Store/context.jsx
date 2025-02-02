import { createContext, useState } from "react";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
   const [quizData, setQuizData] = useState({});
   const [answerArray, setAnswerArray] = useState(Array(10).fill({}));
   const [score, setScore] = useState(0);
   return (
      <MyContext.Provider
         value={{ quizData, setQuizData, answerArray, setAnswerArray,score, setScore }}
      >
         {children}
      </MyContext.Provider>
   );
};

export default MyContext;
