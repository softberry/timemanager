import TYPES from "../action-types";

export default function designReducer(
  state = { view: "primary" },
  action: IDesignActionTypes
) {
  switch (action.type) {
    case TYPES.DESIGN_THEME:
      return {
        ...state,
        theme: action.theme
      };
    case TYPES.DESIGN_VIEW:
      return {
        ...state,
        view: action.view
      };
    default:
      return state;
  }
}
