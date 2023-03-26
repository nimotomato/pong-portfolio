const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const port = 3001;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: "*",
});

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// Refresh rate in ms.
const REFRESH_RATE = 25;

const Game = require("./models/Game.js");

// Keep track of games and what rooms they belong to
let games = {};

// let game = new Game();

// Broadcast
io.on("connection", (socket) => {
  let roomId;

  socket.on("create-lobby", (data) => {
    if (!games[data]) {
      socket.join(data);

      roomId = data;

      games[data] = new Game(data);

      const status = data;

      socket.emit("create-status", status);
    } else {
      const status = false;

      socket.emit("create-status", status);
    }
  });

  socket.on("request-rooms", () => {
    const activeRooms = Object.keys(games).filter((roomId) => {
      return io.sockets.adapter.rooms.has(roomId);
    });
    console.log(io.sockets.adapter.rooms);
    console.log(activeRooms);

    // Update the games object to only include active rooms
    const updatedGames = {};
    activeRooms.forEach((roomId) => {
      updatedGames[roomId] = games[roomId];
    });

    games = updatedGames;
    console.log(updatedGames);

    socket.emit("rooms", Object.keys(games));
  });

  socket.on("join-lobby", (data) => {
    if (games[data] && io.sockets.adapter.rooms.get(data).size === 1) {
      socket.join(data);

      roomId = data;

      const status = data;

      socket.emit("join-status", status);

      // Set players
      io.to(Array.from(io.sockets.adapter.rooms.get(data))[0]).emit(
        "set-players",
        "left"
      );

      io.to(Array.from(io.sockets.adapter.rooms.get(data))[1]).emit(
        "set-players",
        "right"
      );
    } else if (!games[data]) {
      const status = "not-found";

      socket.emit("join-status", status);
    } else if (io.sockets.adapter.rooms.get(data).size > 1) {
      const status = "full";

      socket.emit("join-status", status);

      console.log("lobby is full", data);
    }
  });

  socket.on("leave-lobby", (data) => {
    socket.leave(roomId);
    console.log(`Socket ${socket.id} left lobby ${roomId}`);
  });

  // Get information about local sprite positioning
  socket.on("game-data", (data) => {
    const game = games[roomId];

    if (game) {
      game.boardRect = data.boardRect;
      game.paddleHeight = data.paddleHeight;
      game.leftPaddleRect.left = data.leftPaddleRect.left;
      game.leftPaddleRect.right = data.leftPaddleRect.right;
      game.rightPaddleRect.left = data.rightPaddleRect.left;
      game.rightPaddleRect.right = data.rightPaddleRect.right;
      game.ballAxis = data.ballAxis;
    }
  });

  // Start game on spacebar.
  socket.on("start-game", (room) => {
    const game = games[room];

    // Moves paddles on input, timeout to prevent sending data too frequently causing lag
    socket.on("move-bar", (data) => {
      game.movePaddles(data);
      io.in(roomId).emit("relay-move-bar", game.paddleYPositions);
    });

    // Allows client to restart on 'r'.
    socket.on("restart", (value) => {
      clearInterval(game.gameLoop);
      game.reset();
    });

    // Start the game loop only if it's not already running
    if (!game.gameLoop) {
      game.gameStart = true;

      game.gameLoop = setInterval(() => {
        updateGame(game);
      }, REFRESH_RATE);
    }
  });

  function updateGame(game) {
    if (game.boardRect && game.gameStart) {
      // Handle vertical bounds
      if (game.verticalCollision()) {
        game.ballDirection.y = game.ballDirection.y * -1;
      }
      // Handle horizontal bounds/score
      if (game.horizontalCollision()) {
        // Send scores
        io.in(game.roomId).emit("scores", game.scores);
        clearInterval(game.gameLoop);
        game.reset();
      }
      //Handle paddle bounds
      if (game.handlePaddleCollision()) {
        game.ballDirection.x = game.ballDirection.x * -1;
      }
      game.moveBall();
      // Sending data to client
      io.in(game.roomId).emit("ball-position", game.ballPosition);
    }
  }
});
