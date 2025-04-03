import { NUM_COLS, NUM_ROWS } from "@/modules/board/constants"
import { getRowToFill, isWinner } from "@/modules/board/lib/logic"
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

/**
 * Board statefull logic hook.
 *
 * This could be turned into a global state, using the `React Context API` or
 * some other state management library, such as `Zustand`. This would fix the
 * prop drilling issue and would lead to remove many unnecessary props which
 * could be extracted from the global state.
 *
 * References:
 * - [Kent C. Dodds - How to use React Context effectively](https://kentcdodds.com/blog/how-to-use-react-context-effectively)
 * - [Zustand Docs](https://zustand.docs.pmnd.rs/getting-started/introduction)
 * - [Midulive (YouTube) - ¡No necesitas Redux en React! Aprende a usar Zustand, alternativa sencilla. (Curso de React)](https://www.youtube.com/watch?v=p2wF2wRjcN0)
 * @returns
 */
export const useBoard = ({ rows = NUM_ROWS, columns = NUM_COLS } = {}) => {
  const boardColumns = Array(columns).fill(null)

  const createFreshBoard = useCallback(() => {
    return Array.from({ length: rows }, () => [...boardColumns])
  }, [rows, boardColumns])

  const [board, setBoard] = useState(createFreshBoard)

  const [restart, setRestart] = useState(false)
  const [winner, setWinner] = useState(false)
  const [turn, setTurn] = useState(true)

  const resetBoard = useCallback(() => {
    setBoard(createFreshBoard)
  }, [createFreshBoard])

  const restartGame = useCallback(() => {
    setWinner(false)
    setTurn(true)

    resetBoard()

    setRestart((current) => !current)
  }, [resetBoard])

  const canUpdateBoard = () => isWinner(board) === false

  const updateBoard = (row, col) => {
    const newBoard = [...board]
    newBoard[row][col] = turn

    if (isWinner(newBoard)) {
      setWinner(true)
      return
    }

    setTurn((currentTurn) => !currentTurn)
  }

  return {
    board,
    boardColumns,
    canUpdateBoard,
    resetBoard,
    restart,
    restartGame,
    turn,
    updateBoard,
    winner,
  }
}
