import {
  ViewSettingsEnums,
  IViewState,
  IViewStateReducer,
  IDesign,
} from "../../__typings/interfaces.d";

const initialViewState: IViewStateReducer = {
  design: {
    type: IDesign.THEME,
    theme: "",
    view: "",
  },
};
function viewReducers(state = initialViewState, action: IViewState) {
  switch (action.type) {
    case ViewSettingsEnums.UPDATE_TITLE:
      return {
        ...state,
        title: action.title,
      };
    default:
      return state;
  }
}

export default viewReducers;
