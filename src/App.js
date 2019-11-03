import React from "react";
import Typography from "./__ui/typography";
import NanoDataBase from "./db";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import "./index.scss";
import Home from "./pages/home";
import WorkLog from "./pages/worklogs";
import Contacts from "./pages/contacts";
import Settings from "./pages/settings";
import Edit from "./pages/edit";

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
          <Route exact path="/history" component={WorkLog} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/edit/:type/:id" component={Edit} />
        </Switch>
      </Typography>
    </Router>
  );
}

export default App;
