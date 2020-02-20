import {
  IStateDatabase,
  DatabaseActionEnums,
} from "../../__typings/interfaces.d";

function db(state: any, payload: IStateDatabase) {
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
