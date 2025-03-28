import { Circle } from "./Circle";

export function WinnerModal({ winner, turn, restartGame }) {
  if (!winner) return null;

  const handleClick = () => {
    restartGame();
  };

  return (
    <div className="winner-modal">
      <div className="winner-container">
        <Circle turn={turn}></Circle>
        <h1 className="winner-title">wins!</h1>
        <button onClick={handleClick}>Restart game</button>
      </div>
    </div>
  );
}
