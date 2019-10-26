import React from "react";
import Typography from "./__ui/typography";
import NanoDataBase from "./db";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.scss";
import Home from "./pages/home";
import History from "./pages/history";
import Contacts from "./pages/contacts";
import Settings from "./pages/settings";

function App() {
  document.oncontextmenu = function() {
    return false;
  };
  
  return (
    <Router>
      <Typography>
        <NanoDataBase />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/contacts" component={Contacts} />
          <Route exact path="/history" component={History} />
          <Route exact path="/settings" component={Settings} />
        </Switch>
      </Typography>
    </Router>
  );
}

export default App;
