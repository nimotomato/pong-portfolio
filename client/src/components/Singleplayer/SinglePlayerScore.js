import "../../styles/Score.css";

const Score = ({ playerOne, playerTwo }) => {
  // Simple scorekeeper
  return (
    <div className="score-container">
      <div className="score">{playerOne}</div>
      <div className="score">{playerTwo}</div>
    </div>
  );
};

export default Score;
