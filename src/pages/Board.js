import React, { useState, useEffect } from "react";
import CreateBoard from "../util/CreateBoard";
import Cell from "./Cell";
import revealed from "../util/revealed";

const Board = () => {
  const [grid, setGrid] = useState([]);
  const [nonMinecount, setNonMinecount] = useState(0);
  const [mineLocation, setmineLocation] = useState([]);
  const [newGame, setNewGame] = useState(false);
  const [mineCount, setMineCount] = useState(0);
  const [flaggedMineCount, setFlaggedMineCount] = useState(0);

  useEffect(() => {
    freshBoard();
  }, [newGame]);

  const freshBoard = () => {
    const newBoard = CreateBoard(10, 10, 10);
    setNonMinecount(10 * 10 - 10);
    setMineCount(10);
    setFlaggedMineCount(0);
    setmineLocation(newBoard.mineLocation);
    setGrid(newBoard.board);
  };

  const updateFlag = (e, x, y) => {
    e.preventDefault();
    // deep copy of the object
    let newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[x][y].flagged = true;
    console.log(newGrid[x][y]);
    if (newGrid[x][y].flagged === true && newGrid[x][y].value === "X") {
      setFlaggedMineCount(flaggedMineCount + 1);
      console.log(flaggedMineCount);
    }
    if (flaggedMineCount === mineCount) {
      alert("You win!");
    }
    console.log("Flagged mines: " + flaggedMineCount);
    setGrid(newGrid);
  };

  const revealCell = (x, y) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].value === "X") {
      alert("You have stepped on a mine.");
      for (let i = 0; i < mineLocation.length; i++) {
        newGrid[mineLocation[i][0]][mineLocation[i][1]].revealed = true;
      }
      setGrid(newGrid);
    } else {
      let revealedboard = revealed(newGrid, x, y, nonMinecount);
      setGrid(revealedboard.arr);
      setNonMinecount(revealedboard.newNonMines);
    }
  };

  const handleNewGame = () => {
    setNewGame((current) => !current);
  };

  return (
    <div className="parent">
      <div style={{ color: "white", textAlign: "center", fontSize: "35px" }}>
        <p></p>
        <button className="new-game-button" onClick={handleNewGame}>
          New Game
        </button>
      </div>
      <div>
        {grid.map((singlerow, index1) => {
          return (
            <div className="board-row" key={index1}>
              {singlerow.map((singlecol, index2) => {
                return (
                  <Cell
                    details={singlecol}
                    key={index2}
                    updateFlag={updateFlag}
                    revealCell={revealCell}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
