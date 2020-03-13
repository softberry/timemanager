import {
  ViewSettingsEnums,
  IViewState,
  ThemeEnums,
  UserInfo,
  ViewEnums,
} from "../../__typings/interfaces.d";

const initialViewState: IViewState = {
  type: ViewSettingsEnums.UPDATE_TITLE,
  design: {
    theme: ThemeEnums.DEFAULT_THEME,
    view: ViewEnums.PRIMARY_VIEW,
  },
  title: "",
};
function viewReducers(
  state = initialViewState,
  action: IViewState
): IViewState {
  switch (action.type) {
    case ViewSettingsEnums.UPDATE_TITLE:
      return {
        ...state,
        title: action.title,
      };
    case ViewSettingsEnums.UPDATE_THEME:
      window.localStorage.setItem(
        UserInfo.SELECTED_THEME,
        action.design.theme || ThemeEnums.DEFAULT_THEME
      );
      return {
        ...state,
        design: {
          ...state.design,
          theme: action.design.theme,
        },
      };
    default:
      return { ...state };
  }
}

export default viewReducers;
