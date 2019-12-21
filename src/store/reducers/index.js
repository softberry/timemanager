import { default as toolbar } from "./_toolbar-reducer";
import { default as db } from "./_db-reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  toolbar,
  db
});

export default rootReducer;
