//import components
import "../styling/app.css";

//import pages
import Board from "./Board";
import Cell from "./Cell";
import Timer from "./Timer";

function App() {
  return (
    <div className="App">
      <h1>Minesweeper</h1>
      <Board />
    </div>
  );
}

export default App;
