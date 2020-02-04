import TYPES from "../action-types";

function viewReducers(state = { title: "" }, action: any) {
  switch (action.type) {
    case TYPES.VIEWSETTINGS.UPDATE_TITLE:
      return {
        ...state,
        title: action.title,
      };
    default:
      return state;
  }
}

export default viewReducers;
