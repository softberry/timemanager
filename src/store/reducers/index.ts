import { default as db } from "./_db-reducer";
import { default as msg } from "./_messages-reducer";
import { default as subPage } from "./_subpageview-reducer";
import { default as viewSettings } from "./_view-reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  db,
  msg,
  subPage,
  viewSettings,
});

export default rootReducer;
