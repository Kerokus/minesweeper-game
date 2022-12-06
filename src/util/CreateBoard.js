//Create a 2D array
// --Each entry in the board array is a row
// --Each entry in the row is a cell
//Cell will have two values: X (bomb) or number (nearby bomb)
//"flagged" and "reveal" are boolean
//Each cell has 8 neighboring cells
//Set boundary conditions for cells around the edge

const CreateBoard = (row, col, bombs) => {
  // Set up board and mines
  let board = [];
  let mineLocation = [];

  //everything starts at zero. No flags, not revealed
  for (let x = 0; x < row; x++) {
    let subCol = [];
    for (let y = 0; y < col; y++) {
      subCol.push({
        value: 0,
        revealed: false,
        row: x,
        cell: y,
        flagged: false,
      });
    }
    board.push(subCol);
  }

  // Spin up the bomb placement
  let bombsCount = 0;
  while (bombsCount < bombs) {
    // Implementing random function
    let x = random(0, row - 1);
    let y = random(0, col - 1);

    // place bombs
    if (board[x][y].value === 0) {
      board[x][y].value = "X";
      mineLocation.push([x, y]);
      bombsCount++;
    }
  }

  // Increasing the value of specific cells
  // Each cell has 8 neighbors
  // Add Numbers for nearby bombs
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (board[i][j].value === "X") {
        continue;
      }

      //Math Directions:
      // i = rows - Think of this as up and down
      // j = cells - Think of this as left and right
      // Straight Up: board[i - 1][j]
      // Straight Down: board[i + 1][j]
      // Straight Left: board[i][j - 1]
      // Straight Right: board[i][j + 1]
      // Combination of both for diagonal checks

      // Top
      if (i > 0 && board[i - 1][j].value === "X") {
        board[i][j].value++;
      }

      // Top Right
      if (i > 0 && j < col - 1 && board[i - 1][j + 1].value === "X") {
        board[i][j].value++;
      }

      // Top Left
      if (i > 0 && j > 0 && board[i - 1][j - 1].value === "X") {
        board[i][j].value++;
      }

      // Right
      if (j < col - 1 && board[i][j + 1].value === "X") {
        board[i][j].value++;
      }

      // Left
      if (j > 0 && board[i][j - 1].value === "X") {
        board[i][j].value++;
      }

      // Bottom
      if (i < row - 1 && board[i + 1][j].value === "X") {
        board[i][j].value++;
      }

      // Bottom Right
      if (i < row - 1 && j < col - 1 && board[i + 1][j + 1].value === "X") {
        board[i][j].value++;
      }

      // Bottom Left
      if (i < row - 1 && j > 0 && board[i + 1][j - 1].value === "X") {
        board[i][j].value++;
      }
    }
  }
  return { board, mineLocation };
};

// Random function used for generating random value of x & y
function random(min = 0, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default CreateBoard;
