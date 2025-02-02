import { BrowserRouter as Router, Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import Game from "./pages/Game";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import Navbar from "./Components/Navbar";
import Result from "./pages/Result";

export default function App() {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Router>
        <Navbar />
        <div className="grow flex flex-col overflow-y-auto">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/game" element={<Game />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
