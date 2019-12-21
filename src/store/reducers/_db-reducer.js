import { db as __db } from "../action-types";

export default function db(state, action) {
  switch (action.type) {
    case __db.REGISTER_DATABASE:
      return {
        ...state,
        nSQL: action.nSQL
      };
    case "ADD_NEW_CUSTOMER":
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
}
