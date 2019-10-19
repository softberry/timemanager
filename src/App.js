import React from "react";
import Typography from "./__ui/typography";
import NanoDataBase from "./db/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.scss";
import Home from "./pages/home";
function App() {
  document.oncontextmenu = function() {
    return false;
  };

  return (
    <Router>
      <NanoDataBase />
      <Typography>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Typography>
    </Router>
  );
}

export default App;
