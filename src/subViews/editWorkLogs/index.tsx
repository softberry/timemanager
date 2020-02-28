import React, { ReactElement, useReducer, createContext } from "react";
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

const worklog: IworkTableModel = {
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

const WorklogContext = createContext<IworkTableModel>(worklog);
function EditWorkLogsForm({ contactId }: any): ReactElement {
  const [newWorkLog, dispatchNewWorkLogData] = useReducer(
    newWorkLogState,
    worklog
  );

  function newWorkLogState(state: any, action: any) {
    console.log(action);
    return {
      ...state,
      ...action.payload,
    };
  }

  const cancelWorkLogViewHandler = (): void => {
    console.log("test");
  };
  const saveWorkLogViewHandler = (): void => {
    console.log("test");
  };

  const updateTitleCallback = ({ name, description, valid }: any): void => {
    console.log("*");
    dispatchNewWorkLogData({ payload: { name, description, valid } });
  };

  return (
    <>
      <WorkLogsTitle updateTitleCallback={updateTitleCallback} />
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
          isDisabled={!newWorkLog.valid}
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

function EditWorkLogs({ contactId }: any) {
  return (
    <WorklogContext.Provider value={worklog}>
      <EditWorkLogsForm />
    </WorklogContext.Provider>
  );
}
export { EditWorkLogs as default, WorklogContext };

// TODO: - Add Craete time log button in subpage view
// TODO: -  - Delete time log button in subpage view

// TODO: - Apply finalizes style from time log to materials log
// TODO: - Save/Update functionality to work log
// TODO: - Delete worklog from the list
