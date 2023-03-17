import "./styles/Board.css";
import Ball from "./Ball";

const Board = ({ ballPosition }) => {
  return (
    <div className="board">
      <Ball top={ballPosition.top} left={ballPosition.left} />
    </div>
  );
};

export default Board;
