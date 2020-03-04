import React, { ReactElement } from "react";
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
import TimelogsListView from "./views/timelogs";
import SettingsView from "./views/options";
//---
import ContactView from "./views/contact";
import Message from "./components/message";

import {
  IDesign,
  DesignEnums,
  UserInfo,
  IViewStateReducer,
} from "./__typings/interfaces.d";

const TimerAppStore = createStore(rootReducer, applyMiddleware(thunk));

const Page = (): ReactElement => {
  document.oncontextmenu = (): boolean => {
    return false;
  };
  const theme = useSelector(({ design }: IViewStateReducer) => design.theme);
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
            <Route exact path="/worklogs" component={TimelogsListView} />
            <Route exact path="/options" component={SettingsView} />
            <Route exact path="/contact/:type/:id" component={ContactView} />
          </Switch>
        </NanoDataBase>
        <Message />
      </Typography>
    </Router>
  );
};

const App = (): ReactElement => {
  return (
    <Provider store={TimerAppStore}>
      <Page />
    </Provider>
  );
};
export { App as default, TimerAppStore };
