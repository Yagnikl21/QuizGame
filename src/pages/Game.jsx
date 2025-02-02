import { useContext } from "react";
import { useNavigate } from "react-router";
import MyContext from "../Store/context";

export default function Game() {

  const { answerArray, setAnswerArray, setScore } = useContext(MyContext);
  const navigate = useNavigate();

  const clearArray = () => {
    setAnswerArray(answerArray.map(() => ({})));  // Update all objects to empty {}
  };
  
  const playerName = localStorage.getItem("playerName") || "Guest";

  return (
    <div className="grow flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 text-black">
      <h1 className="text-3xl font-bold mb-4">Hello, {playerName}!</h1>
      <button
        onClick={() => {
          clearArray();
          setScore(0);
          navigate("/quiz")
        }}
        className="px-6 py-3 bg-green-500 rounded-lg hover:bg-green-700 cursor-pointer"
      >
        Start Quiz
      </button>
    </div>
  );
}
