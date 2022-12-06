import React from "react";

const Cell = ({ details, updateFlag, revealCell }) => {
  const handleClick = () => {
    console.log(details);
  };

  return (
    <div
      className="cell-style"
      onClick={() => {
        revealCell(details.row, details.cell);
      }}
      onContextMenu={(e) => updateFlag(e, details.row, details.cell)}
    >
      {details.revealed ? details.value : ""}
    </div>
  );
};

export default Cell;
