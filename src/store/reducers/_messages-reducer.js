import TYPES from "../types";
/**
 * Assign a unique key for each message to make it easy to remove later
 * @param {Object} action Action to be added a unique key
 * @param {Array} dialogIds List of available keys
 */
function getUniqueDialogIdFor(action, dialogIds) {
  let randomDialogId = Math.floor(Math.random() * 1000);

  while (dialogIds.includes(randomDialogId)) {
    randomDialogId = Math.floor(Math.random() * 1000);
  }
  action.dialogId = randomDialogId;
}
const icons = {};
// Message Icon Types
icons[TYPES.MESSAGES_INFO] = "info";
icons[TYPES.MESSAGES_WARNING] = "warning";
icons[TYPES.MESSAGES_ERROR] = "error";
icons[TYPES.MESSAGES_INFO] = "info";
// Confirm Icon Types
icons[TYPES.CONFIRM_DELETE_CONTACT] = "assignment_turned_in";

export default function message(state = { messages: [] }, action) {
  switch (action.type) {
    case TYPES.MESSAGES_INFO:
    case TYPES.MESSAGES_WARNING:
    case TYPES.MESSAGES_ERROR:
    case TYPES.CONFIRM_DELETE_CONTACT:
      getUniqueDialogIdFor(
        action,
        state.messages.map(({ dialogID }) => dialogID)
      );
      return {
        ...state,
        messages: [...state.messages, { ...action, icon: icons[action.type] }]
      };
    case TYPES.MESSAGES_HIDE_MESSAGE:
      const messageToHide = state.messages.filter(
        message => message.key !== action.key
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
