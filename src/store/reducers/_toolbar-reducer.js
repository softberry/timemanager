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
    clickAction: TYPES.SAVE_EDITED_CONTACT
  }
];
export default function toolBarReducer(state = { buttons: home }, action) {
  switch (action.type) {
    case TYPES.HOME:
      return {
        ...state,
        buttons: home
      };
    case TYPES.CONTACTS:
      return {
        ...state,
        buttons: contacts
      };
    case TYPES.EDIT_CONTACT:
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
