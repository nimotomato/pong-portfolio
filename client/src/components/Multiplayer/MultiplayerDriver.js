import "./styles/App.css";
import Paddle from "./MultiplayerPaddle";
import Board from "./MultiplayerBoard";
import Score from "./Score";
import { SocketContext } from "../../context/socket";

import { getRect } from "../../helpers/getRect";
import { toVh } from "../../helpers/toVh";
import { toVw } from "../../helpers/toVw";

import {
  useState,
  useRef,
  useEffect,
  useContext,
  useLayoutEffect,
} from "react";

function Driver({ room }) {
  const socket = useContext(SocketContext);

  // Give socket connection a player side. Data from server says either right or left.

  const [player, setPlayer] = useState(null);

  // Set up connection
  useLayoutEffect(() => {
    socket.on("set-players", (player) => {
      setPlayer(player);
      console.log("player side:", player);
    });

    const board = getRect(".board");
    const leftPaddle = getRect(".left.paddle");
    const rightPaddle = getRect(".right.paddle");
    const ball = getRect(".ball");

    const gameData = {
      boardRect: {
        top: toVh(board.top),
        bottom: toVh(board.bottom),
        left: toVw(board.left),
        right: toVw(board.right),
      },
      paddleHeight: toVh(leftPaddle.height),
      leftPaddleRect: {
        left: toVw(leftPaddle.left),
        right: toVw(leftPaddle.right),
      },
      rightPaddleRect: {
        left: toVw(rightPaddle.left),
        right: toVw(rightPaddle.right),
      },
      ballAxis: {
        height: toVh(ball.height),
        width: toVw(ball.width),
      },
    };

    socket.emit("game-data", gameData);
    console.log(gameData);
  }, []);

  const [ballPosition, setBallPosition] = useState({});

  // Represents the local paddles
  const [positions, setPositions] = useState({});

  socket.on("relay-move-bar", (data) => {
    // Handle key output. Both paddles must move.
    setPositions(data);
  });

  // Keep track of scores
  const [scores, setScores] = useState({});

  socket.on("scores", (data) => {
    setScores(data);
  });

  // Control mouse movements
  const mouseDown = useRef(false);

  const handleMouseDown = (event) => {
    mouseDown.current = true;
  };

  const handleMouseMove = (event) => {
    if (mouseDown.current && player) {
      let pos;
      if (player === "right") {
        pos = {
          left: positions.left,
          right: toVh(event.clientY),
        };
      } else if (player === "left") {
        pos = {
          left: toVh(event.clientY),
          right: positions.right,
        };
      }
      socket.emit("move-bar", pos);
    }
  };

  const handleMouseUp = (event) => {
    mouseDown.current = false;
  };

  const addPaddleListeners = () => {
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const removePaddleListeners = () => {
    document.removeEventListener("mousedown", handleMouseDown);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Adds paddle listeners on each render and cleans up after use.
  useEffect(() => {
    addPaddleListeners();
    return () => removePaddleListeners();
  }, [player]);

  /////////////////////////////////////////////////////////////////////////

  useLayoutEffect(() => {
    // Keep track of ID for animationframe. This is needed for cleanup function to work!
    let requestId;

    const moveBall = () => {
      socket.on("ball-position", (position) => {
        setBallPosition(position);
      });

      // Called subsequent renders.
      requestId = requestAnimationFrame(moveBall);
    };

    // Called first render
    requestId = requestAnimationFrame(moveBall);

    // Clean up animation frame to prevent massive and rapid performance decline
    return () => cancelAnimationFrame(requestId);
  }, [ballPosition]);

  ///////////////////////////////////////////////////////////////////
  const handleKeyPress = (event) => {
    if (event.code === "Space") {
      socket.emit("start-game", room);
    } else if (event.code === "r") {
      socket.emit("restart", true);
    }
  };

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);

    return () => document.removeEventListener("keypress", handleKeyPress);
  }, []);

  return (
    <div className="App">
      <Score
        leftScore={scores.leftScore || 0}
        rightScore={scores.rightScore || 0}
      />
      <Board ballPosition={ballPosition} />
      <Paddle direction={"left"} position={positions.left} />
      <Paddle direction={"right"} position={positions.right} />
    </div>
  );
}

export default Driver;
