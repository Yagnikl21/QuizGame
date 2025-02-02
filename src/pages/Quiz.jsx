import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import MyContext from "../Store/context";

export default function Quiz() {

  const navigate = useNavigate();
  const playerName = localStorage.getItem("playerName") || "Guest";
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [correctAnswerMarks, setCorrectAnswerMarks] = useState(4);
  const [negativeMarks, setNegativeMarks] = useState(-1);

  const [startTime, setStartTime] = useState(Date.now());

  const { setQuizData, answerArray, setAnswerArray, setScore, score } = useContext(MyContext);

  useEffect(() => {
    fetchQuizData();
    setStartTime(Date.now());
  }, []);

  const fetchQuizData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://quizgame-backend-75j4.onrender.com/proxy");
      if (res?.data) {
        setQuizData(res.data);
        setQuestions(res.data?.questions);
        setCorrectAnswerMarks(parseInt(res?.data?.correct_answer_marks, 10));
        setNegativeMarks(parseInt(res?.data?.negative_marks, 10));

      }
    } catch (e) {
      console.error("Error fetching quiz data:", e);
    } finally {
      setLoading(false);
    }
  };


  const currentQuestion = questions[currentQuestionIndex];

  const updateAnswerAtIndex = (index, newValue) => {
    setAnswerArray(prev => {
      const newArray = [...prev]; // Copy previous state
      newArray[index] = newValue; // Update specific index
      return newArray; // Return new array
    });
  };

  const handleAnswer = (answer) => {
    updateAnswerAtIndex(currentQuestionIndex, answer);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const endGame = () => {
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000;

    let newScore = score; // Store the latest score locally

    answerArray.forEach((answer) => {
      if (answer === null || answer === undefined) {
        // No change in score
      } else if (answer.is_correct === false) {
        newScore -= negativeMarks;
      } else if (answer.is_correct === true) {
        newScore += correctAnswerMarks;
      }
    });

    // Use functional update to set score correctly
    setScore((prevScore) => {
      const finalScore = newScore; // Ensure latest score is used

      // Update leaderboard with the correct score
      const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
      leaderboard.push({ name: playerName, score: finalScore, time: timeTaken });
      leaderboard.sort((a, b) => b.score - a.score || a.time - b.time);
      localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

      return finalScore; // Update React state
    });

    navigate("/result");
  };

  return loading ? (
    <div className="flex items-center justify-center grow">
      Loading Questions ....
    </div>
  ) : (
    <div className="relative grow flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 text-black">
      <div className="absolute top-3 right-6">
        <button type="button" className="px-6 py-3 bg-blue-400 rounded-lg hover:bg-blue-600 cursor-pointer"
          onClick={endGame}
        >Finish Quiz</button>
      </div>
      <h1 className="text-3xl font-bold mb-4">Quiz</h1>
      <p className="text-lg mb-2">Player: {playerName}</p>
      <p className="text-lg mb-4">Question {currentQuestionIndex + 1} / {questions.length}</p>

      <div className="bg-gradient-to-r from-blue-200 to-purple-300 p-4 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-xl font-semibold mb-4">{currentQuestion?.description}</h2>
        {currentQuestion?.options.map((option, index) => (
          <button
            key={option.id + index}
            onClick={() => handleAnswer(option)}
            className={`w-full py-2 px-4 mb-2 rounded cursor-pointer ${answerArray[currentQuestionIndex]?.id === option.id ? "bg-blue-500" : "bg-gradient-to-r from-blue-100 to-purple-200"
              } hover:bg-blue-700`}
          >
            {option?.description}
          </button>
        ))}
      </div>

      <div className="flex space-x-4 mt-4">
        <button
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 bg-yellow-500 rounded-lg hover:bg-yellow-700 cursor-pointer disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={nextQuestion}
          disabled={currentQuestionIndex == (questions.length - 1)}
          className="px-6 py-3 bg-green-500 rounded-lg hover:bg-green-700 cursor-pointer disabled:opacity-50"
        >
          {"Next"}
        </button>
      </div>
    </div>
  );
}
