// Database related Action types
const DATABASE = {
  DATABASE_REGISTER_DATABASE: "DATABASE_REGISTER_DATABASE",
  DATABASE_START_TIMER: "DATABASE_START_TIMER",
  DATABASE_STOP_TIMER: "DATABASE_STOP_TIMER",
};

// Toolbar buttons types
const TOOLBAR = {
  TOOLBAR_HOME: "TOOLBAR_HOME",
  TOOLBAR_CONTACTS: "TOOLBAR_CONTACTS",
  TOOLBAR_CALENDAR: "TOOLBAR_CALENDAR",
  TOOLBAR_SETTINGS: "TOOLBAR_SETTINGS",
  TOOLBAR_EDIT_CONTACT: "TOOLBAR_EDIT_CONTACT",
  TOOLBAR_SAVE_CONTACT: "TOOLBAR_SAVE_CONTACT",
};
// Toolbarbuttons click events related Action types
const EVENT = {
  EVENT_CREATE_CONTACT: "EVENT_CREATE_CONTACT",
  EVENT_EDIT_CONTACT: "EVENT_EDIT_CONTACT",
  EVENT_SAVE_CONTACT: "EVENT_SAVE_CONTACT",
  EVENT_DELETE_CONTACT: "EVENT_DELETE_CONTACT",
  EVENT_CREATE_WORKLOG: "EVENT_CREATE_WORKLOG",
};
// Messages related action types
const MESSAGES = {
  MESSAGES_INFO: "MESSAGES_INFO",
  MESSAGES_WARNING: "MESSAGES_WARNING",
  MESSAGES_ERROR: "MESSAGES_ERROR",
  MESSAGES_HIDE_MESSAGE: "MESSAGES_HIDE_MESSAGE",
  MESSAGES_HIDE_ALL_MESSAGES: "MESSAGES_HIDE_ALL_MESSAGES",
  MESSAGES_DELETE_ALL_MESSAGES: "MESSAGES_DELETE_ALL_MESSAGES",
};

const CONFIRM = {
  CONFIRM_DELETE_CONTACT: "CONFIRM_DELETE_CONTACT",
};

const DESIGN = {
  DESIGN_VIEW: "DESIGN_VIEW",
  DESIGN_THEME: "DESIGN_THEME",
};

const WORKLOGS = {
  WORKLOGS_UPDATE: "WORKLOGS_UPDATE",
};

const VIEWSETTINGS = {
  UPDATE_TITLE: "UPDATE_TITLE",
};
const TYPES = {
  ...DATABASE,
  ...TOOLBAR,
  ...EVENT,
  ...MESSAGES,
  ...CONFIRM,
  ...DESIGN,
  ...WORKLOGS,
  VIEWSETTINGS,
};

export {
  TYPES as default,
  DATABASE,
  TOOLBAR,
  EVENT,
  MESSAGES,
  CONFIRM,
  DESIGN,
  WORKLOGS,
  VIEWSETTINGS,
};
