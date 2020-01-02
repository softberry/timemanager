import TYPES from"../action-types";

export default function designReducer(
  state = { view: "primary" },
  payload: { type: any; view: any }
) {
  switch (payload.type) {
    case TYPES.DESIGN_VIEW_SET:
      return {
        ...state,
        view: payload.view
      };
    default:
      return state;
  }
}
