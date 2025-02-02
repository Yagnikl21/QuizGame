import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="w-full bg-gradient-to-r from-blue-500 to-blue-300 p-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">Quiz Game</h1>
      <div>
        <Link to="/" className="text-white mx-4 hover:underline cursor-pointer">Home</Link>
        <Link to="/leaderboard" className="text-white mx-4 hover:underline cursor-pointer">Leaderboard</Link>
      </div>
    </nav>
  );
}
