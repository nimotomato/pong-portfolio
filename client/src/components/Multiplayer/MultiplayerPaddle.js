import { useEffect, useRef } from "react";
import "../css/Paddle.css";
import { getRect } from "../helpers/getRect";
import { toVh } from "../helpers/toVh";

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
