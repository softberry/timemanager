import { IStateDatabase } from "../../__typings/interfaces";

import TYPES from "../action-types";

function db(state: any, payload: IStateDatabase) {
  switch (payload.type) {
    case TYPES.DATABASE_REGISTER_DATABASE:
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
