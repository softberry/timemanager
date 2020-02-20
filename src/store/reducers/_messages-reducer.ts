import {
  IMessage,
  IMessageTypeEnums,
  IConfirmTypeEnums,
  IconEnums,
  DialogTypes,
} from "../../__typings/interfaces.d";

/**
 * Assign a unique key for each message to make it easy to remove later
 * @param {Object} payload payload to be extended with  a unique key(dialogId)
 * @param {Array} dialogIds List of all already assigned dialogIds
 */
function setUniqueDialogIdFor(payload: IMessage, dialogIds: [number]): void {
  const highestIndex: number = Math.max(10, ...dialogIds);

  payload.dialogId = highestIndex + 1;
}

const icons = new Map();
icons.set(IMessageTypeEnums.INFO, IconEnums.INFO);
icons.set(IMessageTypeEnums.WARNING, IconEnums.WARNING);
icons.set(IMessageTypeEnums.ERROR, IconEnums.ERROR);
icons.set(IConfirmTypeEnums.DELETE_CONTACT, IconEnums.CONFIRM);

const dialogTypes = new Map();
dialogTypes.set(IMessageTypeEnums.INFO, DialogTypes.INFO);
dialogTypes.set(IMessageTypeEnums.WARNING, DialogTypes.WARNING);
dialogTypes.set(IMessageTypeEnums.ERROR, DialogTypes.ERROR);
dialogTypes.set(IConfirmTypeEnums.DELETE_CONTACT, DialogTypes.CONFIRM);

/**
 *
 * @param state messagebox state
 * @param payload type, caption, body, closable, dialogId
 */
function message(state: any = { messages: [] }, payload: any) {
  switch (payload.type) {
    case IMessageTypeEnums.INFO:
    case IMessageTypeEnums.WARNING:
    case IMessageTypeEnums.ERROR:
    case IConfirmTypeEnums.DELETE_CONTACT:
      setUniqueDialogIdFor(
        payload,
        state.messages.map(({ dialogId }: IMessage): number => dialogId)
      );
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            ...payload,
            icon: icons.get(payload.type),
            dialogType: dialogTypes.get(payload.type),
          },
        ],
      };
    case IMessageTypeEnums.HIDE_MESSAGE:
      const messageToHide: IMessage[] = state.messages.filter(
        (message: IMessage) => message.dialogId !== payload.dialogId
      );

      return {
        ...state,
        messages: messageToHide,
      };
    default:
      return {
        ...state,
      };
  }
}
export default message;
