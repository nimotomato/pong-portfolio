import "./styles/Board.css";
import Ball from "./Ball";

const Board = ({ ballPosition, ready }) => {
  const handleReady = () => {
    console.log("Ready fired");
    if (window.innerWidth > 1025) {
      return <div className="info-text">PRESS ANY KEY TO BE READY</div>;
    } else {
      return <div className="info-text">TOUCH TO BE READY</div>;
    }
  };

  return (
    <div className="board">
      <Ball top={ballPosition.top} left={ballPosition.left} />
      {!ready && handleReady()}
    </div>
  );
};

export default Board;
