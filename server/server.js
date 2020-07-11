const express = require("express");
const app = express();
const http = require("http");
var socketIo = require("socket.io");
const index = require("./routes/index");

app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

var code = "";

io.on("connection", socket => {
  console.log("New user joined");
  socket.on("change-code", msg => {
    code = msg;
    io.emit("receive-msg", code);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(9000, "192.168.1.101", () => console.log("running on 9000"));
