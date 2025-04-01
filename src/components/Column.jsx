import { NUM_ROWS } from "@/modules/board/constants"
import { getRowToFill } from "@/modules/board/lib/logic"
import { useCallback, useEffect, useState } from "react"
import { Circle } from "./Circle"

const useBoardColumn = ({
  rows = NUM_ROWS,
  // I think we could use something like a global state manager (zustand,
  // jotai, etc) to to manage the state of the board while avoiding prop
  // drilling
  restart,
  updateBoard,
  turn,
  columnIndex,
} = {}) => {
  const createFreshBoard = useCallback(() => {
    return Array.from({ length: rows }).fill(null)
  }, [rows])

  const [boardRows, setBoardRows] = useState(createFreshBoard)

  const handleColumnSelection = () => {
    const selectedRowIndex = getRowToFill(boardRows, rows)

    // Guard against invalid row selection (e.g., column is full). Consider
    // the case when the game is finished (someone won or the board is
    // complete)
    if (selectedRowIndex === null) return

    const newBoardRows = [...boardRows]
    newBoardRows[selectedRowIndex] = turn

    setBoardRows(newBoardRows)
    updateBoard(selectedRowIndex, columnIndex)
  }

  useEffect(() => {
    setBoardRows(createFreshBoard())
  }, [restart, createFreshBoard])

  return { boardRows, handleColumnSelection }
}

export function Column({ index, rows, turn, updateBoard, restart }) {
  const { boardRows, handleColumnSelection } = useBoardColumn({
    rows,
    restart,
    updateBoard,
    turn,
    columnIndex: index,
  })

  const columnPlayerClass = turn ? "player-1" : "player-2"

  return (
    <div
      className={`column ${columnPlayerClass}`}
      onClick={() => {
        handleColumnSelection()
      }}
    >
      {boardRows.map((turn, localIndex) => (
        <div className="row" key={`${index}-${localIndex}`}>
          <Circle turn={turn} restart={restart} />
        </div>
      ))}
    </div>
  )
}
