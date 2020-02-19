import { ISubPageViewActionTypes } from "../../__typings/interfaces.d";

function subPageViewReducer(
  state: any = { type: ISubPageViewActionTypes.HIDE },
  action: any
) {
  switch (action.type) {
    case ISubPageViewActionTypes.HIDE:
    case ISubPageViewActionTypes.OUT:
    case ISubPageViewActionTypes.SHOW:
      return {
        ...state,
        ...action,
      };
    default:
      return {
        ...state,
        type: ISubPageViewActionTypes.HIDE,
      };
  }
}

export default subPageViewReducer;
