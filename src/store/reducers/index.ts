import { default as db } from "./_db-reducer";
import { default as msg } from "./_messages-reducer";
import { default as confirm } from "./_confirm-reducer";
import { default as subpageview } from "./_subpageview-reducer";
// import { default as design } from "./_design-reducer";
import { default as viewSettings } from "./_view-reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  db,
  msg,
  confirm,
  subpageview,
  // design,
  viewSettings,
});

export default rootReducer;
