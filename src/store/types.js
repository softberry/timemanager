// Database related Action types
const DATABASE = {
  DATABASE_REGISTER_DATABASE: "DATABASE_REGISTER_DATABASE",
  DATABASE_ADD_NEW_CONTACT: "DATABASE_ADD_NEW_CONTACT"
};

// Toolbar buttons types and their click events related Action types
const TOOLBAR = {
  TOOLBAR_HOME: "TOOLBAR_HOME",
  TOOLBAR_CONTACTS: "TOOLBAR_CONTACTS",
  TOOLBAR_CALENDAR: "TOOLBAR_CALENDAR",
  TOOLBAR_SETTINGS: "TOOLBAR_SETTINGS",
  TOOLBAR_EDIT_CONTACT: "TOOLBAR_EDIT_CONTACT",
  TOOLBAR_SAVE_CONTACT: "TOOLBAR_SAVE_CONTACT"
};

const EVENT = {
  EVENT_EDIT_CONTACT: "EVENT_EDIT_CONTACT",
  EVENT_SAVE_CONTACT: "EVENT_SAVE_CONTACT",
  EVENT_DELETE_CONTACT: "EVENT_DELETE_CONTACT"
};
// Messages related action types
const MESSAGES = {
  MESSAGES_INFO: "MESSAGES_INFO",
  MESSAGES_WARNING: "MESSAGES_WARNING",
  MESSAGES_ERROR: "MESSAGES_ERROR",
  MESSAGES_HIDE_MESSAGE: "MESSAGES_HIDE_MESSAGE",
  MESSAGES_HIDE_ALL_MESSAGES: "MESSAGES_HIDE_ALL_MESSAGES",
  MESSAGES_DELETE_ALL_MESSAGES: "MESSAGES_DELETE_ALL_MESSAGES"
};

const CONFIRM = {
  CONFIRM_DELETE_CONTACT: "CONFIRM_DELETE_CONTACT"
};
const TYPES = {
  ...DATABASE,
  ...TOOLBAR,
  ...EVENT,
  ...MESSAGES,
  ...CONFIRM
};

export default TYPES;
