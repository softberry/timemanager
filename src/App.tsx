import React from "react";
import Typography from "./__ui/typography";
import NanoDataBase from "./db";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";

import rootReducer from "./store/reducers";
import { DESIGN } from "./store/action-types";
import { VDESIGN, USERSETTINGS } from "./store/constant-enums";

import "./index.scss";

import Home from "./views/home";
import Calendar from "./views/calendar";
import Contacts from "./views/contacts";
import Settings from "./views/settings";
import Contact from "./views/contact";
import Message from "./__ui/message";

const TimerAppStore = createStore(rootReducer);

function Page() {
  document.oncontextmenu = function() {
    return false;
  };
  const theme = useSelector((state: any) => state.design.theme);
  const savedTheme =
    window.localStorage.getItem(USERSETTINGS.USERSETTINGS_SELECTED_THEME) ||
    VDESIGN.DESIGN_THEME_DEFAULT;
  const dispatch = useDispatch();
  if (theme !== savedTheme) {
    dispatch({
      type: DESIGN.DESIGN_THEME,
      theme: savedTheme,
    });
  }

  return (
    <Router>
      <Typography>
        <NanoDataBase>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/contacts" component={Contacts} />
            <Route exact path="/calendar" component={Calendar} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/contact/:type/:id" component={Contact} />
          </Switch>
        </NanoDataBase>
        <Message />
      </Typography>
    </Router>
  );
}

function App() {
  return (
    <Provider store={TimerAppStore}>
      <Page />
    </Provider>
  );
}
export default App;
