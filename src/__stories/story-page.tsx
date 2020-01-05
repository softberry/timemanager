import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import '@csstools/normalize.css';

import "../index.scss";

import Typography from "../__ui/typography";

import rootReducer from "../store/reducers";

import styles from "./default.module.scss";

const store = createStore(rootReducer);

export default function StoryPage({ children, viewType = "PrimaryView" }:any) {
  return (
    <Provider store={store}>
      <Typography />
      <div className={styles[viewType]}>{children}</div>
    </Provider>
  );
}
