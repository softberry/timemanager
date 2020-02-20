import {
  IDesignActionTypes,
  IDesign,
  DesignEnums,
  UserInfo,
} from "../../__typings/interfaces.d";

function designReducer(state = {}, action: IDesignActionTypes) {
  switch (action.type) {
    case IDesign.THEME:
      window.localStorage.setItem(
        UserInfo.SELECTED_THEME,
        action.theme || DesignEnums.DEFAULT_THEME
      );
      return {
        ...state,
        theme: action.theme,
      };
    case IDesign.VIEW:
      return {
        ...state,
        view: action.view,
      };
    default:
      return state;
  }
}

export default designReducer;
