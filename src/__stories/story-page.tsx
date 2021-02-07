import { ReactElement, PropsWithChildren } from "react";
import NanoDataBase from "../db";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "@csstools/normalize.css";

import "../index.scss";
import ViewContext from "../views";

import Typography from "../__ui/typography";

import rootReducer from "../store/reducers";

import styles from "./default.module.scss";
import { ViewEnums, IStoryPageProps } from "../__typings/interfaces.d";

const store = createStore(rootReducer);

const StoryPage = ({ children, viewType = "PrimaryView" }: PropsWithChildren<IStoryPageProps>): ReactElement => {
  return (
    <ViewContext.Provider value={viewType === "PrimaryView" ? ViewEnums.PRIMARY_VIEW : ViewEnums.SECONDARY_VIEW}>
      <Provider store={store}>
        <NanoDataBase>
          <Typography />
          <div className={styles[viewType]}>{children}</div>
        </NanoDataBase>
      </Provider>
    </ViewContext.Provider>
  );
};

export default StoryPage;
