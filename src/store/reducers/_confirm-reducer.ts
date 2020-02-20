import { IConfirmTypeEnums } from "../../__typings/interfaces.d";

/**
 *
 * @param state messagebox state
 * @param payload type
 */
function confirm(state: any = { confirm: {} }, payload: any) {
  switch (payload.type) {
    case IConfirmTypeEnums.DELETE_CONTACT:
      return {
        ...state,
      };

    default:
      return {
        ...state,
      };
  }
}
export default confirm;
