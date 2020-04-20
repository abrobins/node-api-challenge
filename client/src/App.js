import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProjectList from "./components/ProjectList";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={ProjectList} />
      </div>
    </Router>
  );
}

export default App;
