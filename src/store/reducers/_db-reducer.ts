import {
  IDatabaseState,
  DatabaseActionEnums,
} from "../../__typings/interfaces.d";

function db(
  state: IDatabaseState = {
    type: DatabaseActionEnums.UNDEFINED_DATABASE,
    action: {
      nSQL: null,
    },
  },
  action: IDatabaseState
): IDatabaseState {
  switch (action.type) {
    case DatabaseActionEnums.REGISTER_DATABASE:
      return {
        ...state,
        ...action,
      };
    default:
      return {
        ...state,
      };
  }
}

export default db;
