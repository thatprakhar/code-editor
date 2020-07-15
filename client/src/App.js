import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Code from "./components/Code";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route path="/code" component={Code} />
    </Router>
  );
}

export default App;
