import { Circle } from "@/modules/board/components/Circle"
import { RestartButton } from "./RestartButton"

export function WinnerModal({ winner, turn, restartGame }) {
  if (!winner) return null

  return (
    <div className="winner-modal">
      <div className="winner-container">
        <Circle turn={turn} />
        <h1 className="winner-title">wins!</h1>
        <RestartButton restartGame={restartGame} />
      </div>
    </div>
  )
}
