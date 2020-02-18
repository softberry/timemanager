enum IConfirmActionsEnums {
  DELETE_CONTACT = "DELETE_CONTACT",
}

/**
 *
 * @param state messagebox state
 * @param payload type
 */
function confirm(state: any = { confirm: {} }, payload: any) {
  switch (payload.type) {
    case IConfirmActionsEnums.DELETE_CONTACT:
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
