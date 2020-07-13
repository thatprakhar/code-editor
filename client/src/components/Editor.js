import React, { useState, useEffect } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "./Editor.css";

require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");
require("codemirror/mode/clike/clike.js");
require("codemirror/mode/javascript/javascript.js");

/*const ENDPOINT = "192.168.1.101:9000";
const socket = socketIOClient(ENDPOINT);*/
function Editor(props) {
  const [clientCode, setClientCode] = useState("");
  const [serverCode, setServerCode] = useState("");
  const [line, setLine] = useState(1);
  const socket = props.socket;
  const [ch, setCh] = useState(0);

  useEffect(() => {
    socket.on("receive-msg", data => {
      setServerCode(data);
      setClientCode(data);
    });
  });

  return (
    <CodeMirror
      className="Editor"
      value={clientCode}
      options={{
        mode: "javascript",
        theme: "material",
        lineNumbers: true
      }}
      onChange={(editor, data, value) => {
        setLine(editor.getCursor().line);
        setCh(editor.getCursor().ch);
        if (value === "") {
          setClientCode("");
          socket.emit("change-code", "");
        } else {
          setClientCode(value);
          if (serverCode !== clientCode) {
            socket.emit("change-code", clientCode);
          }
        }
        editor.setCursor({ line: line, ch: ch });
      }}
      /*onCursorActivity={(editor, data, value) => {
        setLine(editor.getCursor().line);
        setCh(editor.getCursor().ch);
        editor.setCursor({ line: line, ch: ch });
      }}*/
    />
  );
}

export default Editor;
