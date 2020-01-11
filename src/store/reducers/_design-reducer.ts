import { IDesignActionTypes } from "../../__typings/interfaces";

import TYPES from "../action-types";
import { VDESIGN, USERSETTINGS } from "../constant-enums";

export default function designReducer(
  state = {
    view: VDESIGN.DESIGN_VIEW_PRIMARY,
    theme: VDESIGN.DESIGN_THEME_DEFAULT
  },
  action: IDesignActionTypes
) {
  switch (action.type) {
    case TYPES.DESIGN_THEME:
      window.localStorage.setItem(
        USERSETTINGS.USERSETTINGS_SELECTED_THEME,
        action.theme || VDESIGN.DESIGN_THEME_DEFAULT
      );
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
