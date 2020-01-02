import { default as toolbar } from "./_toolbar-reducer";
import { default as db } from "./_db-reducer";
import { default as messages } from "./_messages-reducer";
import { default as design } from "./_design-reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  toolbar,
  db,
  messages,
  design
});

export default rootReducer;
