import { numCols, numRows } from "@/modules/board/constants"
import { isWinner } from "@/modules/board/lib/logic"
import { useState } from "react"
import "./App.css"
import { WinnerModal } from "./components/winnerModal.jsx"
import { Column } from "./modules/board/components/Column"

function App() {
  const [winner, setWinner] = useState(false)
  const [restart, setRestart] = useState(false)
  const [turn, setTurn] = useState(true)
  const [board, setBoard] = useState(
    Array.from({ length: numRows }, () => Array(numCols).fill(null)),
  )

  const colArray = Array.from({ length: numCols }, (_, index) => index)

  const restartGame = () => {
    setWinner(false)
    setTurn(true)
    setBoard(Array.from({ length: numRows }, () => Array(numCols).fill(null)))
    setRestart(!restart)
    // document.querySelectorAll(".circle").forEach((elem) => {
    //   elem.className = "circle";
    // });
  }

  const updateBoard = (row, col) => {
    const newBoard = [...board]
    newBoard[row][col] = turn

    if (isWinner(newBoard)) {
      setWinner(true)
    } else {
      setTurn(!turn)
    }
  }

  return (
    <div className="board-container">
      <h1 className="game-title">4 CONNECT!</h1>
      <div className="board">
        {colArray.map((_, index) => {
          return (
            <Column
              updateBoard={updateBoard}
              turn={turn}
              key={index}
              index={index}
              rows={numRows}
              restart={restart}
            ></Column>
          )
        })}
      </div>
      <div className="">{turn ? "Player 1" : "Player 2"} turn!</div>
      <WinnerModal
        restartGame={restartGame}
        winner={winner}
        turn={turn}
      ></WinnerModal>
    </div>
  )
}

export default App
