import TYPES from "../types";

const home = [];
const contacts = [
  {
    type: "add",
    label: "New Contact",
    disabled: false,
    hidden: false,
    clickAction: TYPES.ADD_NEW_CONTACT
  },
  { type: "delete", disabled: true, hidden: true },
  { type: "edit", disabled: true, hidden: true }
];
const saveContact = [
  {
    type: "save",
    label: "Save Contact",
    disabled: true,
    hidden: false,
    clickAction: TYPES.EVENT_SAVE_CONTACT
  }
];

const editContact = [
  {
    type: "edit",
    label: "Edit",
    disabled: false,
    hidden: false,
    clickAction: TYPES.EVENT_EDIT_CONTACT
  }
];
export default function toolBarReducer(state = { buttons: home }, action) {
  switch (action.type) {
    case TYPES.TOOLBAR_HOME:
      return {
        ...state,
        buttons: home
      };
    case TYPES.TOOLBAR_CONTACTS:
      return {
        ...state,
        buttons: contacts
      };
    case TYPES.TOOLBAR_EDIT_CONTACT:
      return {
        ...state,
        buttons: editContact,
        contact: action.contact
      };
    case TYPES.TOOLBAR_SAVE_EDITED_CONTACT:
      return {
        ...state,
        buttons: saveContact,
        contact: action.contact
      };
    default:
      return {
        ...state,
        buttons: []
      };
  }
}
