import React from "react";

import Editor from "./Editor";
import Users from "./Users";
import socketIOClient from "socket.io-client";
import "./Code.css";

const ENDPOINT = "192.168.1.101:9000";
const socket = socketIOClient(ENDPOINT);

function Code() {
  return (
    <div className="App">
      <Editor socket={socket} />
      <Users socket={socket} />
    </div>
  );
}

export default Code;

/*

*/
