import TYPES from "../types";
/**
 * Assign a unique key for each message to make it easy to remove later
 * @param {Object} action Action to be added a unique key
 * @param {Array} keys List of available keys
 */
function getUniqueKeyfor(action, keys) {
  let randomKey = Math.floor(Math.random() * 1000);

  while (keys.includes(randomKey)) {
    randomKey = Math.floor(Math.random() * 1000);
  }
  action.key = randomKey;
}

export default function message(state = { messages: [] }, action) {
  
  switch (action.type) {
    case TYPES.MESSAGES_INFO:
    case TYPES.MESSAGES_WARNING:
    case TYPES.MESSAGES_ERROR:
      getUniqueKeyfor(
        action,
        state.messages.map(({ key }) => key)
      );

      return {
        ...state,
        messages: [...state.messages, action]
      };
    case TYPES.CONFIRM_DELETE_CONTACT:
      getUniqueKeyfor(
        action,
        state.messages.map(({ key }) => key)
      );
      return {
        ...state,
        messages: [...state.messages, action]
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
