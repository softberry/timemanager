import { toolbar } from "../action-types";

const home = [];
const contacts = [
  { type: "add", disabled: false, hidden: false },
  { type: "delete", disabled: true, hidden: false },
  { type: "edit", disabled: true, hidden: false }
];

export default function toolBarReducer(state = { buttons: home }, action) {
  switch (action.type) {
    case toolbar.HOME:
      return {
        ...state,
        buttons: home
      };
    case toolbar.CONTACTS:
      return {
        ...state,
        buttons: contacts
      };
    default:
      return {
        ...state
      };
  }
}
