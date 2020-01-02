import TYPES from"../action-types";

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
icons.set(TYPES.MESSAGES_INFO, "info");
icons.set(TYPES.MESSAGES_WARNING, "warning");
icons.set(TYPES.MESSAGES_ERROR, "error");
icons.set(TYPES.CONFIRM_DELETE_CONTACT, "assignment_turned_in");

//type, caption, body, closable, dialogId

export default function message(state: any = { messages: [] }, payload: any) {
  switch (payload.type) {
    case TYPES.MESSAGES_INFO:
    case TYPES.MESSAGES_WARNING:
    case TYPES.MESSAGES_ERROR:
    case TYPES.CONFIRM_DELETE_CONTACT:
      setUniqueDialogIdFor(
        payload,
        state.messages.map(({ dialogId }: IMessage): number => dialogId)
      );
      return {
        ...state,
        messages: [
          ...state.messages,
          { ...payload, icon: icons.get(payload.type) }
        ]
      };
    case TYPES.MESSAGES_HIDE_MESSAGE:
      const messageToHide: IMessage[] = state.messages.filter(
        (message: IMessage) => message.key !== payload.key
      );
      return {
        ...state,
        messages: messageToHide
      };
    default:
      return {
        ...state
      };
  }
}
