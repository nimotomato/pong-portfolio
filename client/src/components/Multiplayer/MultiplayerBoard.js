import "../css/Board.css";
import Ball from "../Ball";

const Board = ({ socket, ballPosition }) => {
  return (
    <div className="board">
      <Ball top={ballPosition.top} left={ballPosition.left} />
    </div>
  );
};

export default Board;
