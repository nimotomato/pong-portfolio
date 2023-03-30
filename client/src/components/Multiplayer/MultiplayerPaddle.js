import "./styles/Paddle.css";

const Paddle = ({ direction, position }) => {
  return (
    <div
      className={`${direction} paddle`}
      style={{
        top: `${position}vh`,
      }}
    ></div>
  );
};

export default Paddle;
