import "./styles/Score.css";

const Score = ({ leftScore, rightScore }) => {
  // Simple scorekeeper
  return (
    <div className="score-container">
      <div className="score">{leftScore}</div>
      <div className="score">{rightScore}</div>
    </div>
  );
};

export default Score;
