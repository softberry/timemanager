import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "@csstools/normalize.css";

import "../index.scss";
import ViewContext from "../views";

import Typography from "../__ui/typography";

import rootReducer from "../store/reducers";

import styles from "./default.module.scss";
import { DesignEnums } from "../__typings/interfaces.d";

const store = createStore(rootReducer);

function StoryPage({ children, viewType = "PrimaryView" }: any) {
  return (
    <ViewContext.Provider
      value={
        viewType === "PrimaryView"
          ? DesignEnums.PRIMARY_VIEW
          : DesignEnums.SECONDARY_VIEW
      }
    >
      <Provider store={store}>
        <Typography />
        <div className={styles[viewType]}>{children}</div>
      </Provider>
    </ViewContext.Provider>
  );
}

export default StoryPage;
