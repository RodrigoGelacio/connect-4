import { useEffect, useRef, useState } from "react"
import { getRowToFill } from "@/logic/board"
import { Circle } from "./Circle"
import { NUM_ROWS } from "@/board/constants"

const initializeBoardColumns = (rows) => {
  return Array.from({ length: rows }).fill(null)
}

const useBoardColumn = ({
  rows = NUM_ROWS,
  // I think we could use something like a global state manager (zustand,
  // jotai, etc) to to manage the state of the board while avoiding prop
  // drilling
  restart,
  updateBoard,
  turn,
} = {}) => {
  const initialColumns = useRef(initializeBoardColumns(rows))

  const [arrayRows, setArrayRows] = useState(initialColumns.current)

  const handleColumnClick = (index) => {
    const rowtoChange = getRowToFill(arrayRows, rows)

    const newArrayRows = [...arrayRows]

    newArrayRows[rowtoChange] = turn
    setArrayRows(newArrayRows)
    updateBoard(rowtoChange, index)
  }

  // If restart is a boolean flag:
  const resetColumns = () => setArrayRows(initialColumns.current)

  // If restart should trigger the reset:
  useEffect(() => {
    if (!restart) return

    resetColumns()
  }, [restart])

  return { arrayRows, handleColumnClick, resetColumns }
}

export function Column({ index, rows, turn, updateBoard, restart }) {
  const { arrayRows, handleColumnClick } = useBoardColumn({
    rows,
    restart,
    updateBoard,
    turn,
  })

  const columnPlayerClass = turn ? "column-player-1" : "column-player-2"

  return (
    <div
      className={columnPlayerClass}
      onClick={() => {
        handleColumnClick(index)
      }}
    >
      {arrayRows.map((turn, localIndex) => {
        return (
          <div key={`${index}-${localIndex}`} className="row">
            <Circle
              key={`${index}-${localIndex}`}
              index={localIndex}
              turn={turn}
              restart={restart}
            ></Circle>
          </div>
        )
      })}
    </div>
  )
}
