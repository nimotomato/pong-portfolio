const { normalizeVector } = require("./helpers/normalizeVector.js");

// Server
const io = require("socket.io")(3001, {
  cors: {
    origin: "*",
  },
});

// Board data
let boardRect;

// Paddle data
let leftPaddleRect = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

let rightPaddleRect = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

let paddleHeight;

// Scores
let scores = {
  leftScore: 0,
  rightScore: 0,
};

// Ball data
let ballDirection = normalizeVector(
  Math.floor(Math.random() * 200) / 100 - 1,
  Math.floor(Math.random() * 200) / 100 - 1
);

let ballVelocity = 0.2;

let ballPosition = {
  top: 50,
  left: 50,
};

let ballAxis;

let gameStart = true;

// Broadcast
io.on("connection", (socket) => {
  // Sets players
  io.to(Array.from(socket.adapter.sids.keys())[0]).emit("set-players", "left");
  io.to(Array.from(socket.adapter.sids.keys())[1]).emit("set-players", "right");

  // Set board rect
  socket.on("board-rect", (data) => {
    boardRect = data;
  });

  // Get ball height
  socket.on("ball-axis", (data) => {
    ballAxis = data;
  });

  // Set left and right paddle rects X
  socket.on("left-paddle-rect", (data) => {
    const { left, right } = data;
    leftPaddleRect.left = left;
    leftPaddleRect.right = right;
  });

  // Set paddle height
  socket.on("paddle-height", (data) => {
    paddleHeight = data;
  });

  socket.on("right-paddle-rect", (data) => {
    const { left, right } = data;
    rightPaddleRect.left = left;
    rightPaddleRect.right = right;
  });

  // Moves paddles on input
  socket.on("move-bar", (data) => {
    if (boardRect) {
      // contain left paddle within bounds
      if (data.left <= boardRect.top) {
        data.left = boardRect.top;
      } else if (data.left + paddleHeight >= boardRect.bottom) {
        data.left = boardRect.bottom - paddleHeight;
      }

      // contain right paddle within bounds
      if (data.right <= boardRect.top) {
        data.right = boardRect.top;
      } else if (data.right + paddleHeight >= boardRect.bottom) {
        data.right = boardRect.bottom - paddleHeight;
      }

      rightPaddleRect.top = data.right;
      rightPaddleRect.bottom = data.right + paddleHeight;
      leftPaddleRect.top = data.left;
      leftPaddleRect.bottom = data.left + paddleHeight;

      {
        io.emit("relay-move-bar", data);
      }
    }
  });

  socket.on("restart", (value) => {
    if (value) {
      ballDirection = normalizeVector(
        Math.floor(Math.random() * 200) / 100 - 1,
        Math.floor(Math.random() * 200) / 100 - 1
      );

      ballPosition = {
        top: 50,
        left: 50,
      };

      gameStart = true;
    }
  });

  if (gameStart) {
    // Moves ball on interval
    setInterval(() => {
      if (boardRect && gameStart) {
        // Handle vertical bounds
        if (ballPosition.top + ballAxis.height <= boardRect.top) {
          ballDirection.y = ballDirection.y * -1;
        } else if (ballPosition.top + ballAxis.height * 2 >= boardRect.bottom) {
          ballDirection.y = ballDirection.y * -1;
        }

        // Handle horizontal bounds/score
        if (ballPosition.left <= boardRect.left) {
          scores.rightScore += 1;
          // Send scores
          io.emit("scores", scores);
          gameStart = false;
        } else if (ballPosition.left + ballAxis.width * 2 >= boardRect.right) {
          scores.leftScore += 1;
          // Send scores
          io.emit("scores", scores);
          gameStart = false;
        }

        //Handle paddle bounds
        if (
          ballPosition.left + ballAxis.width * 2 < leftPaddleRect.right &&
          ballPosition.left + ballAxis.width > leftPaddleRect.left &&
          ballPosition.top + ballAxis.height < leftPaddleRect.bottom &&
          ballPosition.top > leftPaddleRect.top
        ) {
          ballDirection.x = ballDirection.x * -1;
        }
        if (
          ballPosition.left <= rightPaddleRect.right &&
          ballPosition.left + ballAxis.width * 2 >= rightPaddleRect.left &&
          ballPosition.top + ballAxis.height <= rightPaddleRect.bottom &&
          ballPosition.top >= rightPaddleRect.top
        ) {
          ballDirection.x = ballDirection.x * -1;
        }

        // Actual ball movement
        ballPosition.top = ballPosition.top + ballDirection.y * ballVelocity;
        ballPosition.left = ballPosition.left + ballDirection.x * ballVelocity;
      }

      // Sending data to client
      io.emit("ball-position", ballPosition);
    }, 15);
  }
});
