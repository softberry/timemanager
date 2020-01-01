import TYPES from "../types";

export default function designReducer(state = { view: "primary" }, action) {
  switch (action.type) {
    case TYPES.DESIGN_VIEW_SET:
      return {
        ...state,
        view: action.view
      };
    default:
      return state;
  }
}
