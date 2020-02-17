import { default as db } from "./_db-reducer";
import { default as messages } from "./_messages-reducer";
import { default as confirm } from "./_confirm-reducer";
import { default as design } from "./_design-reducer";
import { default as worklogs } from "./_worklogs-reducers";
import { default as viewSettings } from "./_view-reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  db,
  messages,
  confirm,
  design,
  worklogs,
  viewSettings,
});

export default rootReducer;
