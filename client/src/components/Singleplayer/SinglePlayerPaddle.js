import "../../styles/Paddle.css";

import { useRef, useEffect } from "react";

import { getRect } from "../../helpers/getRect";
import { toVh } from "../../helpers/toVh";

const Paddle = ({ direction, position }) => {
  // There has to be a better way of keeping track of HARD CODED STATIC html lol
  const boardTop = useRef(0);
  const boardBottom = useRef(0);
  const paddleHeight = useRef(0);

  // Gets dimensions for needed elements once they have been rendered
  useEffect(() => {
    boardTop.current = getRect(".board").top;
    boardBottom.current = getRect(".board").bottom;
    paddleHeight.current = getRect(".paddle").height;
  }, []);

  // Makes sure that the paddle never gets higher than board bounds
  const containBounds = (position) => {
    if (position < toVh(boardTop.current)) {
      return toVh(boardTop.current);
    } else if (position > toVh(boardBottom.current - paddleHeight.current)) {
      return toVh(boardBottom.current - paddleHeight.current);
    } else {
      return position;
    }
  };

  return (
    <div
      className={`${direction} paddle`}
      style={{
        top: `${containBounds(position)}vh`,
      }}
    ></div>
  );
};

export default Paddle;
