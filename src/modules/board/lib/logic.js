import { NUM_COLS, NUM_ROWS } from "@/modules/board/constants"

const DIRECTIONS = {
  w: (i, j) => [i, j - 1],
  nw: (i, j) => [i - 1, j - 1],
  n: (i, j) => [i - 1, j],
  ne: (i, j) => [i - 1, j + 1],
  e: (i, j) => [i, j + 1],
  se: (i, j) => [i + 1, j + 1],
  s: (i, j) => [i + 1, j],
  sw: (i, j) => [i + 1, j - 1],
}

/**
 * Get the index of the row to fill when selecting a column.
 * @param {Array<boolean>} boardRows Array with the current information of the
 * game: which cell correspond to which player.
 * @param {number} numberOfRows The game's configured number of rows. The
 * original number.
 * @returns The index of the row which can be filled. If the board is from 6
 * rows and the indices 4 and 5 are already selected, it will return the index
 * 3.
 */
export function getRowToFill(boardRows, numberOfRows) {
  const INDEX_OVERFLOW = -1
  let currentRow = numberOfRows

  while (boardRows[currentRow] !== null) {
    currentRow--

    if (currentRow === INDEX_OVERFLOW) return null
  }

  return currentRow
}

export function isWinner(board) {
  const rows = board.length
  const cols = board[0].length

  const directionCycle = Object.keys(DIRECTIONS)

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      for (const direction of directionCycle) {
        if (
          isWinnerRow(board, board[i][j], direction, i, j, NUM_ROWS, NUM_COLS)
        ) {
          return true
        }
      }
    }
  }
  return false
}

function isWinnerRow(board, turn, direction, i, j, numRows, numCols) {
  let counter = 0
  let newTurn = turn
  let [newI, newJ] = DIRECTIONS[direction](i, j)
  while (
    inRange(newI, newJ, numRows, numCols) &&
    counter < 4 &&
    newTurn !== null &&
    turn === newTurn
  ) {
    newTurn = board[newI][newJ]
    let [moveI, moveJ] = DIRECTIONS[direction](newI, newJ)
    newI = moveI
    newJ = moveJ
    counter = counter + 1

    if (counter === 4) {
      return true
    }
  }
  return false
}

function inRange(i, j, numRows, numCols) {
  return i >= 0 && i < numRows && j >= 0 && j < numCols
}
