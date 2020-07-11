import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="Login">
      <div className="login-window">
        <p className="title">Real Time Code Collaborator</p>
        <input className="input-usr" placeholder="Enter you name" />
        <br />
        <button className="join-btn">Join</button>
      </div>
    </div>
  );
}

export default Login;
