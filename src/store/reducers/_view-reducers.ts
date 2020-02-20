import { ViewSettingsEnums } from "../../__typings/interfaces.d";

function viewReducers(state = { title: "" }, action: any) {
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
