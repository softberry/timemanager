import React from "react";
import Typography from "./__ui/typography";
import NanoDataBase from "./db";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import rootReducer from "./store/reducers";

import "./index.scss";

import Message from "./__ui/message";
import Home from "./views/home";
import WorkLog from "./views/worklogs";
import Contacts from "./views/contacts";
import Settings from "./views/settings";
import Edit from "./views/edit";

const TimerAppStore = createStore(rootReducer);

function Page() {
  document.oncontextmenu = function() {
    return false;
  };

  return (
    <Router>
      <Typography>
        <NanoDataBase>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/contacts" component={Contacts} />
            <Route exact path="/history" component={WorkLog} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/edit/:type/:id" component={Edit} />
          </Switch>
        </NanoDataBase>
      </Typography>
    </Router>
  );
}

function App() {
  return (
    <Provider store={TimerAppStore}>
      <Page />
      <Message />
    </Provider>
  );
}
export default App;
