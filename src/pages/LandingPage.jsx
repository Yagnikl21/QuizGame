import { useState } from "react";
import { useNavigate } from "react-router";

export default function LandingPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const startGame = () => {
    if (name.trim()) {
      localStorage.setItem("playerName", name);
      navigate("/game");
    }
  };

  return (
    <div className="grow bg-gradient-to-r from-blue-100 to-purple-200 flex flex-col items-center justify-center text-black">
      <h1 className="text-4xl mb-6 mt-10">Welcome to the Quiz Game</h1>
      <input
        type="text"
        placeholder="Enter your name"
        className="p-3 text-black rounded mb-4 border"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={startGame}
        className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-700 cursor-pointer"
      >
        Start Game
      </button>
    </div>
  );
}
