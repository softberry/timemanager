import { IMessage, IMessageState, IMessageAction, IDialogActionEnums } from "../../__typings/interfaces.d";

/**
 *
 * @param state messagebox state
 * @param action type, caption, body, closable, dialogId
 */
function message(
  state: IMessageState = {
    messages: [],
  },
  action: IMessageAction
): IMessageState {
  switch (action.type) {
    case IDialogActionEnums.OPEN:
      return {
        ...state,
        messages: [...state.messages, { ...action.message }],
      };
    case IDialogActionEnums.CLOSE:
      const messageToHide: IMessage[] = state.messages.filter(
        (message: IMessage) => message.dialogId !== action.message.dialogId
      );

      return {
        ...state,
        messages: messageToHide,
      };
    default:
      return { ...state };
  }
}
export default message;

/*
  actions.types:
    -open
    -close
  dialogTypes:
    - message
    - confirm
*/
