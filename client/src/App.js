import React from "react";
import Editor from "./components/Editor";
import Users from "./components/Users";
import socketIOClient from "socket.io-client";
import "./App.css";

const ENDPOINT = "192.168.1.101:9000";
const socket = socketIOClient(ENDPOINT);

function App() {
  return (
    <div className="App">
      <Editor socket={socket} />
      <Users socket={socket} />
    </div>
  );
}

export default App;
