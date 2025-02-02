import { useContext } from "react";
import { useNavigate } from "react-router";
import MyContext from "../Store/context";

const Result = () => {
   const { quizData, answerArray, score, setAnswerArray, setScore } = useContext(MyContext);
   const navigate = useNavigate();

   const clearArray = () => {
      setAnswerArray(answerArray.map(() => ({})));  // Update all objects to empty {}
    };

   const handlePlayAgain = () => {
      clearArray();
      setScore(0); 
      navigate("/quiz"); 
   };

   return (
      <div className="grow flex flex-col max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
         <h1 className="text-2xl font-bold text-center mb-4">Quiz Results</h1>
         <p className="text-lg text-center mb-4">Final Score: <span className="font-bold">{score}</span></p>

         <div className="grow overflow-y-auto">
            {quizData.questions?.map((question, index) => {
               const userAnswer = answerArray[index]?.description || "No answer";
               const correctAnswer = question.options.find(opt => opt.is_correct)?.description;
               const answerExplanation = question.detailed_solution || "No explanation available";

               return (
                  <div key={question.id} className="mb-6 p-4 border rounded-lg">
                     <p className="font-semibold">{index + 1}. {question.description}</p>

                     <p className={`mt-2 ${userAnswer === correctAnswer ? "text-green-600" : "text-red-600"}`}>
                        Your Answer: {userAnswer}
                     </p>

                     <p className="text-blue-600">Correct Answer: {correctAnswer}</p>

                     <p className="text-gray-600 mt-2"><b>Explanation:</b> {answerExplanation}</p>
                  </div>
               );
            })}

         </div>

         {/* Play Again Button */}
         <button
            onClick={handlePlayAgain}
            className="block mx-auto mt-6 px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
         >
            Play Again
         </button>
      </div>
   );
};

export default Result;
