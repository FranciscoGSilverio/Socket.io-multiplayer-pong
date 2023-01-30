const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 3000;

server.listen(PORT);
console.log("Server up and running on port " + PORT);

let readyPlayers = 0;

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("ready", () => {
    console.log("Player ready", socket.id);

    readyPlayers++;

    if (readyPlayers === 2) {
      io.emit("startGame", socket.id);
    }
  });

  socket.on("paddleMove", (paddleData) => {
    socket.broadcast.emit("paddleMove", paddleData);
  });

  socket.on("ballMove", (ballMoveData) => {
    socket.broadcast.emit("ballMove", ballMoveData);
  });
});
