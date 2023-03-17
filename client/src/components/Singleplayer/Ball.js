import "../../styles/Ball.css";

const Ball = ({ top, left }) => {
  // Render ball, controlled by top and left. Notice value VH and VW.
  return (
    <div
      className="ball"
      style={{
        top: `${top}vh`,
        left: `${left}vw`,
      }}
    ></div>
  );
};

export default Ball;
