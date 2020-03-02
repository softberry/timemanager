import React, {
  ReactElement,
  useReducer,
  createContext,
  useContext,
} from "react";
import Button from "../../__ui/buttons/button";

import {
  ButtonTypeEnums,
  ButtonAlignmentEnums,
  IconNameEnums,
  IworkTableModel,
} from "../../__typings/interfaces.d";

import WorkLogsTitle from "./workLogsTitle";
import TimeLogs from "./timelogs";
import MaterialLogs from "./materiallogs";

const worklogInitial: IworkTableModel = {
  id: "",
  contactID: "",
  description: "x",
  name: "a",
  labour: [
    {
      id: "",
      workID: "",
      start: new Date(),
      finish: new Date(),
      description: "",
    },
  ],
  materials: [
    {
      id: "",
      items: [
        {
          id: "",
          name: "",
          description: "",
          amount: 0,
          price: 0,
          materialListID: "",
          unit: "",
        },
      ],
      workID: "",
    },
  ],
};

function EditWorkLogsForm(): ReactElement {
  const worklog = useContext(WorklogContext);
  const dispatcher = useContext(DispatchContext);

  const cancelWorkLogViewHandler = (): void => {
    console.log("test");
  };
  const saveWorkLogViewHandler = (): void => {
    console.log("test");
  };

  return (
    <>
      <WorkLogsTitle worklog={worklog} dispatcher={dispatcher} />
      <TimeLogs />
      <MaterialLogs />

      <div>
        <Button
          icon={IconNameEnums.CLEAR}
          isDisabled={false}
          onClick={cancelWorkLogViewHandler}
          align={ButtonAlignmentEnums.LEFT}
          type={ButtonTypeEnums.WARNING}
        >
          Cancel
        </Button>
        <Button
          icon={IconNameEnums.ADD}
          isDisabled={!worklog.valid}
          onClick={saveWorkLogViewHandler}
          align={ButtonAlignmentEnums.RIGHT}
          type={ButtonTypeEnums.POISITIVE}
        >
          Save
        </Button>
      </div>
    </>
  );
}

const WorklogContext = createContext<any>({});
const DispatchContext = createContext<any>({});
const worklogsReducer = (state: any, action: any): any => {
  console.log("->", action);
  switch (action.uniqueName) {
    case "worklogName":
      return { ...state, name: action.value, valid: action.valid };
    case "worklogDesc":
      return { ...state, description: action.value };
    default:
      return state;
  }
};
function EditWorkLogs({ contactId }: any) {
  const [worklog, dispatcher] = useReducer(worklogsReducer, worklogInitial);
  console.log(worklog, " -- final state");
  return (
    <DispatchContext.Provider value={dispatcher}>
      <WorklogContext.Provider value={worklog}>
        <EditWorkLogsForm />
      </WorklogContext.Provider>
    </DispatchContext.Provider>
  );
}
export { EditWorkLogs as default, WorklogContext, DispatchContext };

// TODO: - Add Craete time log button in subpage view
// TODO: -  - Delete time log button in subpage view

// TODO: - Apply finalizes style from time log to materials log
// TODO: - Save/Update functionality to work log
// TODO: - Delete worklog from the list

//FIXME:****************************************************************
//        input doesnt updates parent and results too many re-renders **
//        useContext /useReducer / forwardRef may help to fix this    **
//        -- start from the entry point :                             **
//          src/components/workLogsListOfContact/index.tsx line:66    **
// *********************************************************************
