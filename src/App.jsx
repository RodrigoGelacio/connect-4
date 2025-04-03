import { Column } from "@/modules/board/components/Column"
import { NUM_COLS, NUM_ROWS } from "@/modules/board/constants"
import "./App.css"
import { RestartButton } from "./modules/board/components/RestartButton"
import { WinnerModal } from "./modules/board/components/WinnerModal"
import { useBoard } from "./modules/board/hooks/useBoard"

function App() {
  const { updateBoard, turn, restart, restartGame, winner, boardColumns } =
    useBoard({
      rows: NUM_ROWS,
      columns: NUM_COLS,
    })

  return (
    <div className="board-container">
      <h1 className="game-title">4 CONNECT!</h1>

      <div className="board">
        {boardColumns.map((_, index) => {
          return (
            <Column
              updateBoard={updateBoard}
              turn={turn}
              key={index}
              index={index}
              rows={NUM_ROWS}
              restart={restart}
            ></Column>
          )
        })}
      </div>
      <div className="game-footer">
        <div className="">{turn ? "Player 1" : "Player 2"} turn!</div>
        <RestartButton restartGame={restartGame} />
      </div>
      <WinnerModal
        restartGame={restartGame}
        winner={winner}
        turn={turn}
      ></WinnerModal>
    </div>
  )
}

export default App
