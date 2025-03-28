import { numCols, numRows } from "../constants";

const directions = {
  w: (i, j) => [i, j - 1],
  nw: (i, j) => [i - 1, j - 1],
  n: (i, j) => [i - 1, j],
  ne: (i, j) => [i - 1, j + 1],
  e: (i, j) => [i, j + 1],
  se: (i, j) => [i + 1, j + 1],
  s: (i, j) => [i + 1, j],
  sw: (i, j) => [i + 1, j - 1],
};
export function getRowToFill(arrayRows, numRows) {
  while (arrayRows[numRows] !== null) {
    numRows--;
  }
  return numRows;
}

export function isWinner(board) {
  const rows = board.length;
  const cols = board[0].length;

  const directionCycle = Object.keys(directions);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      for (const direction of directionCycle) {
        if (
          isWinnerRow(board, board[i][j], direction, i, j, numRows, numCols)
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function isWinnerRow(board, turn, direction, i, j, numRows, numCols) {
  let counter = 0;
  let newTurn = turn;
  let [newI, newJ] = directions[direction](i, j);
  while (
    inRange(newI, newJ, numRows, numCols) &&
    counter < 4 &&
    newTurn !== null &&
    turn === newTurn
  ) {
    newTurn = board[newI][newJ];
    let [moveI, moveJ] = directions[direction](newI, newJ);
    newI = moveI;
    newJ = moveJ;
    counter = counter + 1;

    if (counter === 4) {
      return true;
    }
  }
  return false;
}

function inRange(i, j, numRows, numCols) {
  return i >= 0 && i < numRows && j >= 0 && j < numCols;
}
