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

const DIRECTION_FUNCTIONS = Object.values(DIRECTIONS)

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

function isWinnerRow({
  board,
  i,
  j,
  directionFunction,
  numberOfRows,
  numberOfColumns,
} = {}) {
  const turn = board[i][j]
  let newTurn = turn

  let counter = 0

  let [newI, newJ] = directionFunction(i, j)

  while (
    inRange(newI, newJ, numberOfRows, numberOfColumns) &&
    counter < 4 &&
    newTurn !== null &&
    turn === newTurn
  ) {
    newTurn = board[newI][newJ]
    let [moveI, moveJ] = directionFunction(newI, newJ)
    newI = moveI
    newJ = moveJ
    counter = counter + 1

    if (counter === 4) {
      return true
    }
  }
  return false
}

/**
 * Evaluates every direction given a board and coordinates to determine if a
 * user has won the game.
 *
 * By using the `some` method, the evaluation will stop once a `truthy` value
 * is found.
 * https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/some#descripci%C3%B3n
 * @param {*} board
 * @param {*} i
 * @param {*} j
 * @returns
 */
const isWinnerCell = ({ board, i, j, numberOfRows, numberOfColumns } = {}) => {
  return DIRECTION_FUNCTIONS.some((directionFunction) => {
    const hasWon = isWinnerRow({
      board,
      directionFunction,
      i,
      j,
      numberOfRows,
      numberOfColumns,
    })

    return hasWon
  })
}

export function isWinner(board) {
  const numberOfRows = board.length
  const numberOfColumns = board[0].length

  for (let i = 0; i < numberOfRows; i++) {
    for (let j = 0; j < numberOfColumns; j++) {
      if (isWinnerCell({ board, i, j, numberOfRows, numberOfColumns })) {
        return true
      }
    }
  }

  return false
}

function inRange(i, j, numRows, numCols) {
  return i >= 0 && i < numRows && j >= 0 && j < numCols
}
