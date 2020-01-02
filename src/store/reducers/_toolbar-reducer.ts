import TYPES from "../action-types";

const home: IToolbarButton[] = [];
const contacts: IToolbarButton[] = [
  {
    type: "add",
    label: "New Contact",
    disabled: false,
    hidden: false,
    clickAction: TYPES.EVENT_CREATE_CONTACT
  },
  { type: "delete", disabled: true, hidden: true },
  { type: "edit", disabled: true, hidden: true }
];
const saveContact: IToolbarButton[] = [
  {
    type: "save",
    label: "Save Contact",
    disabled: true,
    hidden: false,
    clickAction: TYPES.EVENT_SAVE_CONTACT
  }
];

const editContact: IToolbarButton[] = [
  {
    type: "edit",
    label: "Edit",
    disabled: false,
    hidden: false,
    clickAction: TYPES.EVENT_EDIT_CONTACT
  },
  {
    type: "delete",
    label: "Delete Contact",
    disabled: false,
    hidden: false,
    clickAction: TYPES.EVENT_DELETE_CONTACT
  }
];
export default function toolBarReducer(
  state = { buttons: home },
  action: IToolbarButtonState
) {
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
    case TYPES.TOOLBAR_SAVE_CONTACT:
      return {
        ...state,
        buttons: saveContact,
        contact: action.contact
      };
    default:
      return {
        ...state
      };
  }
}