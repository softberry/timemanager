import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/home";
function App() {
  document.oncontextmenu = function() {
    return false;
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
