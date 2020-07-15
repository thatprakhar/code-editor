import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [name, setName] = useState("");

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div className="Login">
      <div className="login-window">
        <p className="title">Real Time Code Collaborator</p>
        <input
          className="input-usr"
          placeholder="Enter you name"
          value={name}
          onChange={handleChange}
          required
        />
        <br />
        <button className="join-btn">
          {name === "" ? (
            <p>Join</p>
          ) : (
            <Link className="Link" to="/Code">
              Join
            </Link>
          )}
        </button>
      </div>
    </div>
  );
}

export default Login;
