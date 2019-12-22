import { TYPES } from "../../store/types";

function toolbarCommands(cmd) {
  switch (cmd) {
    case TYPES.ADD_NEW_CONTACT:
      console.log("this");
      break;
    default:
      return () => {};
  }
}

export { toolbarCommands as default };
