import React from "react";

const Cell = ({ details, updateFlag, revealCell }) => {
  const setBackgroundColor = () => {
    if (details.flagged && !details.revealed) {
      return { backgroundColor: "orange" };
    } else {
      return { backgroundColor: "grey" };
    }
  };

  return (
    <div
      className="cell-style"
      style={setBackgroundColor()}
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
