let readyPlayers = 0;

const listen = (io) => {
  const pongNamespace = io.of("/pong");
  pongNamespace.on("connection", (socket) => {
    console.log("User connected", socket.id);
    let room;
    socket.on("ready", () => {
      room = "room" + Math.floor(readyPlayers / 2);
      socket.join(room);

      console.log("Player ready", socket.id);

      readyPlayers++;

      if (readyPlayers % 2 === 0) {
        pongNamespace.in(room).emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.to(room).emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballMoveData) => {
      socket.to(room).emit("ballMove", ballMoveData);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Client ${socket.id} has disconnected: ${reason}`);
      socket.leave(room);
    });
  });
};

module.exports = { listen };
