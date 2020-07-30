const express = require("express");
const app = express();
const http = require("http");
var socketIo = require("socket.io");
const path = require("path");
const fs = require("fs");
const { c, cpp, node, python, java } = require("compile-run");

app.use(express.static(__dirname + "/build"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
  //res.send("server runnnng");
});

const server = http.createServer(app);

const io = socketIo(server);

var code = "";
var users = [];
var count_users = 0;
var curr_lang = "C++";

var user_map = new Map();

io.on("connection", socket => {
  socket.on("join", msg => {
    console.log(msg + " joined");
    count_users++;
    console.log(socket.id);
    user_map[socket.id] = msg;
    users.push(msg);
    io.emit("receive-msg", code);
    io.emit("user-list", users);
  });
  console.log("User connected");
  socket.on("change-code", msg => {
    code = msg;
    socket.broadcast.emit("receive-msg", code);

    if (curr_lang == "cpp") {
      fs.writeFileSync("code.cpp", code);
    } else if (curr_lang == "js") {
      fs.writeFileSync("code.js", code);
    }
  });

  socket.on("compile", () => {
    console.log("Lang is " + curr_lang);
    if (curr_lang == "cpp") {
      let compile = cpp.runFile("./code.cpp");
      compile
        .then(res => {
          console.log(res);
          if (res.stderr !== "") socket.emit("compile-rec", res.stderr);
          else socket.emit("compile-rec", res.stdout);
        })
        .catch(err => {
          console.log(err.stderr);
          socket.emit("compile-rec", err.stderr);
        });
    } else if (curr_lang == "js") {
      let compile = node.runFile("./code.js");
      compile
        .then(res => {
          console.log(res);
          if (res.stderr !== "") socket.emit("compile-rec", res.stderr);
          else socket.emit("compile-rec", res.stdout);
        })
        .catch(err => {
          console.log(err.stderr);
          socket.emit("compile-rec", err.stderr);
        });
    }
  });

  socket.on("change-lang", lang => {
    curr_lang = lang;
    code = "";
    console.log("Language changed to " + lang);
    io.emit("receive-msg", code);
    io.emit("change-lang", lang);
  });

  socket.on("disconnect", () => {
    console.log(user_map[socket.id] + " disconnected");
    users.splice(users.indexOf(user_map[socket.id]), 1);
    io.emit("user-list", users);
  });
});

server.listen(9000, () => console.log("running on 9000"));
