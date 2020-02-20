import React from "react";
import Typography from "./__ui/typography";
import NanoDataBase from "./db";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider, useSelector, useDispatch } from "react-redux";

import rootReducer from "./store/reducers";

import "./index.scss";

import Home from "./views/home";
import ContactsListView from "./views/contactslist";
import WorklogsListView from "./views/worklogs";
import SettingsView from "./views/settings";
//---
import ContactView from "./views/contact";
import Message from "./components/message";
import SubPageView from "./components/subPageView";
import { IDesign, DesignEnums, UserInfo } from "./__typings/interfaces.d";

const TimerAppStore = createStore(rootReducer, applyMiddleware(thunk));

function Page() {
  document.oncontextmenu = function() {
    return false;
  };
  const theme = useSelector((state: any) => state.design.theme);
  const savedTheme =
    window.localStorage.getItem(UserInfo.SELECTED_THEME) ||
    DesignEnums.DEFAULT_THEME;
  const dispatch = useDispatch();
  if (theme !== savedTheme) {
    dispatch({
      type: IDesign.THEME,
      theme: savedTheme,
    });
  }

  return (
    <Router>
      <Typography>
        <NanoDataBase>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/contacts" component={ContactsListView} />
            <Route exact path="/worklogs" component={WorklogsListView} />
            <Route exact path="/settings" component={SettingsView} />
            <Route exact path="/contact/:type/:id" component={ContactView} />
          </Switch>
        </NanoDataBase>
        <SubPageView />
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
export { App as default, TimerAppStore };
