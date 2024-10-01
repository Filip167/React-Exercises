// /src/Cell.js
import React from "react";
import "./Cell.css";

/** A single cell on the board. */
function Cell({ flipCellsAroundMe, isLit }) {
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;

  return <td className={classes} onClick={flipCellsAroundMe} />;
}

export default Cell;
