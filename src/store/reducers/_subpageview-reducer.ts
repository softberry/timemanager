import { SubPageViewActionTypes } from "../../__typings/interfaces.d";

function subPageViewReducer(
  state: any = { type: SubPageViewActionTypes.HIDE },
  action: any
) {
  switch (action.type) {
    case SubPageViewActionTypes.HIDE:
    case SubPageViewActionTypes.OUT:
    case SubPageViewActionTypes.SHOW:
      return {
        ...state,
        ...action,
      };
    default:
      return {
        ...state,
        type: SubPageViewActionTypes.HIDE,
      };
  }
}

export default subPageViewReducer;