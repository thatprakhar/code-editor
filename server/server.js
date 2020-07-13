const express = require("express");
const app = express();
const http = require("http");
var socketIo = require("socket.io");
const index = require("./routes/index");

app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

var code = "";
var users = [];
var count_users = 0;

var user_map = new Map();

io.on("connection", socket => {
  count_users++;
  user_map[socket] = count_users;
  console.log("User " + count_users + " joined");
  users.push("User " + count_users);
  io.emit("receive-msg", code);
  io.emit("user-list", users);
  socket.on("change-code", msg => {
    code = msg;
    io.emit("receive-msg", code);
  });

  socket.on("disconnect", socket => {
    console.log("Client disconnected");
    users.splice(users.indexOf(user_map[socket]), 1);
    io.emit("user-list", users);
  });
});

server.listen(9000, "192.168.1.101", () => console.log("running on 9000"));
