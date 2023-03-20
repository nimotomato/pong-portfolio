// Server
const io = require("socket.io")(3001, {
  cors: {
    origin: "*",
  },
});

// Refresh rate in ms.
const REFRESH_RATE = 15;

const Game = require("./models/Game.js");

let game = new Game();

// Broadcast
io.on("connection", (socket) => {
  // Sets players
  io.to(Array.from(socket.adapter.sids.keys())[0]).emit("set-players", "left");
  io.to(Array.from(socket.adapter.sids.keys())[1]).emit("set-players", "right");
  console.log(socket.id);

  /////////////////////////////////////////////
  // Get information about local sprite positioning
  socket.on("game-data", (data) => {
    game.boardRect = data.boardRect;
    game.ballAxis = data.ballAxis;
    game.leftPaddleX = data.leftPaddleRect;
    game.rightPaddleX = data.rightPaddleRect;
    game.paddleHeight = data.paddleHeight;
  });

  ///////////////////////////////////////////////////
  // Moves paddles on input
  socket.on("move-bar", (data) => {
    game.movePaddles(data);
    {
      io.emit("relay-move-bar", game.paddleYPositions);
    }
  });

  socket.on("restart", (value) => {
    if (value) {
      game.reset();
    }
  });

  if (game.gameStart) {
    // Moves ball on interval
    setInterval(() => {
      if (game.boardRect && game.gameStart) {
        // Handle vertical bounds
        if (game.verticalCollision()) {
          game.ballDirection.y = game.ballDirection.y * -1;
        }

        // Handle horizontal bounds/score
        if (game.horizontalCollision()) {
          // Send scores
          io.emit("scores", game.scores);
          game.gameStart = false;
        }

        //Handle paddle bounds
        if (game.handlePaddleCollision()) {
          game.ballDirection.x *= -1;
        }

        game.moveBall();
      }

      // Sending data to client
      io.emit("ball-position", game.ballPosition);
    }, REFRESH_RATE);
  }
});
