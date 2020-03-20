import { SubPageActionEnums, ISubPageState } from "../../__typings/interfaces.d";

function subPageViewReducer(
  state: ISubPageState = {
    type: SubPageActionEnums.HIDE,
    action: {
      caption: "",
    },
  },
  action: ISubPageState
): ISubPageState {
  switch (action.type) {
    case SubPageActionEnums.HIDE:
    case SubPageActionEnums.OUT:
    case SubPageActionEnums.SHOW:
      return {
        ...state,
        ...action,
      };
    default:
      return {
        ...state,
      };
  }
}

export default subPageViewReducer;
