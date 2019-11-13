import React from "react";
import Typography from "./__ui/typography";
import NanoDataBase from "./db";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import "./index.scss";
import Home from "./pages/home";
import WorkLog from "./pages/worklogs";
import Customers from "./pages/customers";
import Settings from "./pages/settings";
import Edit from "./pages/edit";

function App() {
  document.oncontextmenu = function() {
    return false;
  };
  
  return (
    <Router>
      <Typography>
        <NanoDataBase>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/customers" component={Customers} />
          <Route exact path="/history" component={WorkLog} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/edit/:type/:id" component={Edit} />
        </Switch>
        </NanoDataBase>
      </Typography>
    </Router>
  );
}

export default App;
