import TYPES from "../types";

const home = [];
const contacts = [
  {
    type: "add",
    disabled: false,
    hidden: false,
    clickAction: TYPES.ADD_NEW_CONTACT
  },
  { type: "delete", disabled: true, hidden: true },
  { type: "edit", disabled: true, hidden: true }
];
const editContact = [
  {
    type: "save",
    disabled: true,
    hidden: false,
    clickAction: TYPES.TOOLBAR_SAVE_EDITED_CONTACT
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
        buttons: editContact
      };
    default:
      return {
        ...state,
        buttons: []
      };
  }
}
