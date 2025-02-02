export default function Leaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");

  return (
    <div className="grow bg-gradient-to-r from-blue-100 to-purple-200 flex flex-col items-center justify-center text-black">
      <h1 className="text-3xl mb-6 mt-10">Leaderboard</h1>
      {leaderboard.length === 0 ? (
        <p className="text-lg">No scores yet! Play a game to see results.</p>
      ) : (
        leaderboard.map((player, index) => (
          <p key={index} className="text-lg">
            {index + 1}. {player.name} - {player.score} points ({player.time} sec)
          </p>
        ))
      )}
    </div>
  );
}
