import TYPES from "../action-types";

function worklogs(state: any = { worklogs: [] }, action: any) {
  switch (action.type) {
    case TYPES.WORKLOGS_UPDATE:
      return {
        ...state,
        worklogs: action.worklogs,
      };
    default:
      return state;
  }
}

export default worklogs;
