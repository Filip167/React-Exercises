// /src/Board.js
import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out. */
function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());
  const [hasWon, setHasWon] = useState(false);

  /** Create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn); // true if light is on
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  /** Check the board in state to determine whether the player has won. */
  function hasWonCheck(board) {
    return board.every(row => row.every(cell => !cell)); // check if all cells are false (off)
  }

  /** Flip the cell and the cells around it */
  function flipCellsAround(coord) {
    const [y, x] = coord.split("-").map(Number);
    setBoard(oldBoard => {
      const boardCopy = oldBoard.map(row => [...row]);

      const flipCell = (y, x) => {
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      flipCell(y, x);
      flipCell(y - 1, x); // flip above
      flipCell(y + 1, x); // flip below
      flipCell(y, x - 1); // flip left
      flipCell(y, x + 1); // flip right

      setHasWon(hasWonCheck(boardCopy));

      return boardCopy;
    });
  }

  /** Render the game board or winning message. */
  if (hasWon) {
    return <div className="Board">You Won!</div>;
  }

  let tableBoard = [];
  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      );
    }
    tableBoard.push(<tr key={y}>{row}</tr>);
  }

  return (
    <table className="Board">
      <tbody>{tableBoard}</tbody>
    </table>
  );
}

export default Board;
