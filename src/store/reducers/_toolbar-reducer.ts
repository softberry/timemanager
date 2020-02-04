import {
  IToolbarButton,
  IToolbarButtonState,
  IconEnums,
} from "../../__typings/interfaces.d";
import TYPES from "../action-types";

const home: IToolbarButton[] = [];
const contacts: IToolbarButton[] = [
  {
    type: IconEnums.ADD,
    label: "New Contact",
    disabled: false,
    hidden: false,
    clickAction: TYPES.EVENT_CREATE_CONTACT,
  },
  { type: IconEnums.CLOSE, disabled: true, hidden: true },
  { type: IconEnums.EDIT, disabled: true, hidden: true },
];
const saveContact: IToolbarButton[] = [
  {
    type: IconEnums.SAVE,
    label: "Save Contact",
    disabled: true,
    hidden: false,
    clickAction: TYPES.EVENT_SAVE_CONTACT,
  },
];

const editContact: IToolbarButton[] = [
  {
    type: IconEnums.EDIT,
    label: "Edit",
    disabled: false,
    hidden: false,
    clickAction: TYPES.EVENT_EDIT_CONTACT,
  },
  {
    type: IconEnums.TRASH,
    label: "Delete Contact",
    disabled: false,
    hidden: false,
    clickAction: TYPES.EVENT_DELETE_CONTACT,
  },
  {
    type: IconEnums.ADD,
    label: "New Worklog",
    disabled: false,
    hidden: false,
    clickAction: TYPES.EVENT_CREATE_WORKLOG,
  },
];
const calendar: IToolbarButton[] = [];
const settings: IToolbarButton[] = [];
function toolBarReducer(
  state = { buttons: home },
  action: IToolbarButtonState
) {
  switch (action.type) {
    case TYPES.TOOLBAR_HOME:
      return {
        ...state,
        buttons: home,
      };
    case TYPES.TOOLBAR_CONTACTS:
      return {
        ...state,
        buttons: contacts,
      };
    case TYPES.TOOLBAR_EDIT_CONTACT:
      return {
        ...state,
        buttons: editContact,
        contact: action.contact,
      };
    case TYPES.TOOLBAR_SAVE_CONTACT:
      return {
        ...state,
        buttons: saveContact,
        contact: action.contact,
      };
    case TYPES.TOOLBAR_CALENDAR:
      return {
        ...state,
        buttons: calendar,
      };
    case TYPES.TOOLBAR_SETTINGS:
      return {
        ...state,
        buttons: settings,
      };
    default:
      return {
        ...state,
      };
  }
}
export default toolBarReducer;
