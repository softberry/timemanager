import React from "react";
import Typography from "./__ui/typography";
import NanoDataBase from "./db";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider, useSelector, useDispatch } from "react-redux";

import rootReducer from "./store/reducers";
import { DESIGN } from "./store/action-types";
import { VDESIGN, USERSETTINGS } from "./store/constant-enums";

import "./index.scss";

import Home from "./views/home";
import CalendarView from "./views/calendar";
import ContactsView from "./views/contacts";
import SettingsView from "./views/settings";
import ContactView from "./views/contact";
import Message from "./__ui/message";

const TimerAppStore = createStore(rootReducer, applyMiddleware(thunk));

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
            <Route exact path="/contacts" component={ContactsView} />
            <Route exact path="/calendar" component={CalendarView} />
            <Route exact path="/settings" component={SettingsView} />
            <Route exact path="/contact/:type/:id" component={ContactView} />
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
