import "../../styles/Board.css";

import Paddle from "./SinglePlayerPaddle";
import Ball from "./Ball";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { toVh } from "../../helpers/toVh";
import { getRect } from "../../helpers/getRect";
import { normalizeVector } from "../../helpers/normalizeVector";

const Board = ({ hasStarted, handleScores }) => {
  // Set state for initial ball position
  const [ballPosition, setBallPosition] = useState({
    x: 50,
    y: 45,
  });

  // Set state for initial ball direction. Sets vector with x & y value.
  const ballDirection = useRef(
    normalizeVector(
      Math.floor(Math.random() * 200) / 100 - 1,
      Math.floor(Math.random() * 200) / 100 - 1
    )
  );

  // Set state for ball velocity
  const [ballVelocity, setBallVelocity] = useState(1);

  // Constant controlling how much velocity will increase per paddle collision. Multiplicative.
  const velocityTuner = 1.08;
  // Warning: max velocity larger than paddle width will make ball pass through paddle
  const maxVelocity = 2.1;

  // Return true if paddle has collided with ball. Does not use state but the actual rect because state is asynchrous.
  const hasCollided = (paddleRect, ballRect) => {
    if (
      ballRect.left <= paddleRect.right &&
      ballRect.right >= paddleRect.left &&
      ballRect.top <= paddleRect.bottom &&
      ballRect.bottom >= paddleRect.top
    ) {
      return true;
    }
    return false;
  };

  // Update ball movement. LayoutEffect is paired with animationframe as it is called before each render instead of randomly.
  useLayoutEffect(() => {
    // Keep track of ID for animationframe. This is needed for cleanup function to work!
    let requestId;

    // Control ball movement
    const moveBall = () => {
      // Handle vertical bounds
      if (
        getRect(".ball").top <= getRect(".board").top ||
        getRect(".ball").bottom >= getRect(".board").bottom
      ) {
        ballDirection.current = {
          x: ballDirection.current.x,
          y: ballDirection.current.y * -1,
        };
      }

      // Handle horizontal bounds/score
      if (getRect(".ball").left <= getRect(".board").left) {
        // Function from props in app
        handleScores("right");
      } else if (getRect(".ball").right >= getRect(".board").right) {
        // Function from props in app
        handleScores("left");
      }

      // Handle right paddle collision for speeds below ca velocity = 2. After that the ball move too fast for it to register the collision
      if (hasCollided(getRect(".left.paddle"), getRect(".ball"))) {
        ballDirection.current = {
          x: ballDirection.current.x * -1,
          y: ballDirection.current.y,
        };
        if (ballVelocity < maxVelocity) {
          setBallVelocity(ballVelocity * velocityTuner);
        }
        // Handle right paddle collision for speeds below ca velocity = 2. After that the ball move too fast for it to register the collision
      } else if (hasCollided(getRect(".right.paddle"), getRect(".ball"))) {
        ballDirection.current = {
          x: ballDirection.current.x * -1,
          y: ballDirection.current.y,
        };
        if (ballVelocity < maxVelocity) {
          setBallVelocity(ballVelocity * velocityTuner);
        }
      }

      // Updates ball position.
      setBallPosition({
        x: ballPosition.x + ballDirection.current.x * ballVelocity,
        y: ballPosition.y + ballDirection.current.y * ballVelocity,
      });

      // Called subsequent renders.
      requestId = requestAnimationFrame(moveBall);
    };

    // Called first render
    requestId = requestAnimationFrame(moveBall);

    // Clean up animation frame to prevent massive and rapid performance decline
    return () => cancelAnimationFrame(requestId);

    // Triggers on ballPosition change only when game has started. Then feeds itself.
  }, [hasStarted && ballPosition]);

  // Control left paddle movement.
  const mouseDown = useRef(false);
  const [leftPaddle, setLeftPaddle] = useState();

  const handleMouseDown = (event) => {
    mouseDown.current = true;
  };

  const handleMouseMove = (event) => {
    if (mouseDown.current) {
      setLeftPaddle(toVh(event.clientY));
    }
  };

  const handleMouseUp = (event) => {
    mouseDown.current = false;
  };

  const handleTouchMove = (event) => {
    if (mouseDown.current) {
      setLeftPaddle(toVh(event.targetTouches[0].clientY));
    }
  };

  const addPaddleListeners = () => {
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Touch screen
    document.addEventListener("touchstart", handleMouseDown);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleMouseUp);
  };

  const removePaddleListeners = () => {
    document.removeEventListener("mousedown", handleMouseDown);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    // Touch screen
    document.removeEventListener("touchstart", handleMouseDown);
    document.removeEventListener("touchmove", handleMouseMove);
    document.removeEventListener("touchend", handleMouseUp);
  };

  // Adds paddle listeners on each render and cleans up after use.
  useEffect(() => {
    addPaddleListeners();
    return () => removePaddleListeners();
  }, []);

  // Computer logic
  const [rightPaddle, setRightPaddle] = useState(45);
  const rightPaddleSpeed = 1.2;

  const moveRightPaddle = (ballPosition, rightPaddle, requestId) => {
    if (ballPosition.y < rightPaddle - 1) {
      setRightPaddle(rightPaddle - rightPaddleSpeed);
    }
    if (ballPosition.y > rightPaddle + 1) {
      setRightPaddle(rightPaddle + rightPaddleSpeed);
    }
    // Called subsequent renders.
    requestId = requestAnimationFrame(moveRightPaddle);
  };

  useLayoutEffect(() => {
    // Keep track of ID for animationframe. This is needed for cleanup function to work!
    let requestId;
    moveRightPaddle(ballPosition, rightPaddle, requestId);
    // Called first render
    requestId = requestAnimationFrame(moveRightPaddle);

    // Clean up animation frame to prevent massive and rapid performance decline
    return () => cancelAnimationFrame(requestId);
  }, [ballPosition]);

  return (
    <div className="board">
      <Paddle direction={"right"} key="right" position={rightPaddle} />
      <Paddle direction={"left"} key="left" position={leftPaddle} />
      <Ball top={ballPosition.y} left={ballPosition.x} />
    </div>
  );
};

export default Board;
