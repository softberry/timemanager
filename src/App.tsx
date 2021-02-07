import { useEffect, FC } from "react";
import Typography, { useTheme } from "./__ui/typography";
import NanoDataBase from "./db";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider, useDispatch } from "react-redux";

import rootReducer from "./store/reducers";

import "./index.scss";

import Home from "./views/home";
import ContactsListView from "./views/contactslist";
import CalendarView from "./views/calendar";
import SettingsView from "./views/options";
//---
import ContactView from "./views/contact";
import Message from "./components/message";

import { ThemeEnums, UserInfo, ViewSettingsEnums } from "./__typings/interfaces.d";

const TimerAppStore = createStore(rootReducer, applyMiddleware(thunk));

const Page: FC = () => {
  document.oncontextmenu = (): boolean => {
    return false;
  };

  const theme = useTheme();
  const savedTheme = window.localStorage.getItem(UserInfo.SELECTED_THEME) || ThemeEnums.DEFAULT_THEME;

  const dispatch = useDispatch();
  useEffect(() => {
    if (theme !== savedTheme) {
      dispatch({
        type: ViewSettingsEnums.UPDATE_THEME,
        design: {
          theme: savedTheme,
        },
      });
    }
  }, [dispatch, theme, savedTheme]);

  return (
    <Router>
      <Typography>
        <NanoDataBase>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/contacts" component={ContactsListView} />
            <Route exact path="/worklogs" component={CalendarView} />
            <Route exact path="/options" component={SettingsView} />
            <Route exact path="/contact/:type/:id" component={ContactView} />
          </Switch>
        </NanoDataBase>
        <Message />
      </Typography>
    </Router>
  );
};

const App: FC = () => {
  return (
    <Provider store={TimerAppStore}>
      <Page />
    </Provider>
  );
};

export { App as default, TimerAppStore };
