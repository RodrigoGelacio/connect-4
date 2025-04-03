import { NUM_COLS, NUM_ROWS } from "@/modules/board/constants"
import { getRowToFill } from "@/modules/board/lib/logic"
import { useCallback, useEffect, useState } from "react"

export const useBoardColumn = ({
  rows = NUM_ROWS,
  // I think we could use something like a global state manager (zustand,
  // jotai, etc) to to manage the state of the board while avoiding prop
  // drilling
  restart,
  updateBoard,
  turn,
  columnIndex,
} = {}) => {
  const createFreshRows = useCallback(() => {
    return Array.from({ length: rows }).fill(null)
  }, [rows])

  const [boardRows, setBoardRows] = useState(createFreshRows)

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
    setBoardRows(createFreshRows())
  }, [restart, createFreshRows])

  return { boardRows, handleColumnSelection }
}

export const useBoard = ({ rows = NUM_ROWS, columns = NUM_COLS } = {}) => {
  const createFreshBoard = useCallback(() => {
    return Array.from({ length: rows }, () => Array(columns).fill(null))
  }, [rows, columns])

  const [board, setBoard] = useState(createFreshBoard)

  const resetBoard = useCallback(() => {
    setBoard(createFreshBoard)
  }, [createFreshBoard])

  return {
    board,
    resetBoard,
  }
}
