import React, { useReducer, createContext, useContext, useEffect, FunctionComponent } from "react";
import Button from "../../__ui/buttons/button";

import {
  ButtonTypeEnums,
  ButtonAlignmentEnums,
  IconNameEnums,
  IEditWorkLogProps,
  IDatabaseReducer,
  IWorkTableModel,
  AddEditWorklogEnums,
  IWorklogState,
  IWorklogAction,
} from "../../__typings/interfaces.d";

import WorkLogsTitle from "./workLogsTitle";
import TimeLogs from "./timelogs";
import MaterialLogs from "./materiallogs";
import { useSelector } from "react-redux";

const EditWorkLogsForm: FunctionComponent = () => {
  const worklog = useContext(WorklogContext);
  const dispatcher = useContext(DispatchContext);

  const cancelWorkLogViewHandler = (): void => {
    //TODO: to be done
  };
  const saveWorkLogViewHandler = (): void => {
    //TODO: to be done
  };

  return (
    <>
      <WorkLogsTitle name={worklog.name} description={worklog.description} dispatcher={dispatcher} />
      <TimeLogs worklog={worklog} />
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
};

const WorklogContext = createContext<IWorklogState>({
  id: "",
  contactID: "",
  name: "",
  description: "",
  labour: [],
  materials: [],
  valid: false,
});
const DispatchContext = createContext((p: IWorklogAction) => {
  // do nothing
});
const worklogsReducer = (state: IWorklogState, action: IWorklogAction): IWorklogState => {
  switch (action.type) {
    case AddEditWorklogEnums.INIT:
      return { ...state, ...action.data };
    case AddEditWorklogEnums.TITLE:
      return {
        ...state,
        name: action.input?.value || "",
        valid: action.input?.valid || false,
      };
    case AddEditWorklogEnums.DESCRIPTION:
      return { ...state, description: action.input?.value || "" };
    default:
      return state;
  }
};

const EditWorkLogs: FunctionComponent<IEditWorkLogProps> = ({ contactID, worklogID }) => {
  const [worklog, dispatcher] = useReducer(worklogsReducer, {
    id: "",
    name: "",
    description: "",
    valid: false,
    contactID,
    labour: [],
    materials: [],
  });
  const nSQL = useSelector(({ db }: IDatabaseReducer) => db.action.nSQL);

  useEffect(() => {
    nSQL("workTable")
      .presetQuery("createNewWorkLogForContact", {
        contactID,
        id: worklogID,
      })
      .exec()
      .then((logs: IWorkTableModel[]) => {
        dispatcher({ type: AddEditWorklogEnums.INIT, data: logs[0] });
      });
  }, [contactID, nSQL, worklogID]);

  if (worklog.id === "") return <></>;
  return (
    <DispatchContext.Provider value={dispatcher}>
      <WorklogContext.Provider value={worklog}>
        <EditWorkLogsForm />
      </WorklogContext.Provider>
    </DispatchContext.Provider>
  );
};
export { EditWorkLogs as default };

// TODO: - Apply finalizes style from time log to materials log
// TODO: - Save/Update functionality to work log
// TODO: - Delete worklog from the list
