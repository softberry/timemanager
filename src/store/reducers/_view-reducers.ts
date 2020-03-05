import {
  ViewSettingsEnums,
  IViewState,
  IViewStateReducer,
  DesignEnums,
  UserInfo,
} from "../../__typings/interfaces.d";

const initialViewState: IViewStateReducer = {
  design: {
    type: ViewSettingsEnums.UPDATE_TITLE,
    theme: DesignEnums.DEFAULT_THEME,
    view: DesignEnums.PRIMARY_VIEW,
  },
  title: "",
};
function viewReducers(state = initialViewState, action: IViewState) {
  switch (action.type) {
    case ViewSettingsEnums.UPDATE_TITLE:
      return {
        ...state,
        title: action.title,
      };
    case ViewSettingsEnums.UPDATE_THEME:
      window.localStorage.setItem(
        UserInfo.SELECTED_THEME,
        action.theme || DesignEnums.DEFAULT_THEME
      );
      return {
        ...state,
        design: {
          ...state.design,
          theme: action.theme,
        },
      };
    default:
      return { ...state };
  }
}

export default viewReducers;
