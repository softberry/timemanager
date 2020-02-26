import {
  IStateDatabase,
  DatabaseActionEnums,
  IStateDatabaseReducer,
} from "../../__typings/interfaces.d";

function db(state: IStateDatabaseReducer, payload: IStateDatabase) {
  switch (payload.type) {
    case DatabaseActionEnums.REGISTER_DATABASE:
      return {
        ...state,
        nSQL: payload.nSQL,
      };
    default:
      return {
        ...state,
      };
  }
}

export default db;
