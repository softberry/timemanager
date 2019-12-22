import TYPES from "../types";

export default function db(state, action) {
  switch (action.type) {
    case TYPES.REGISTER_DATABASE:
      return {
        ...state,
        nSQL: action.nSQL
      };
    default:
      return {
        ...state
      };
  }
}
