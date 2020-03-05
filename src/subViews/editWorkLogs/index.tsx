import React, {
  ReactElement,
  useReducer,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Button from "../../__ui/buttons/button";

import {
  ButtonTypeEnums,
  ButtonAlignmentEnums,
  IconNameEnums,
  IEditWorkLogProps,
  IStateDatabaseReducer,
  IWorkTableModel,
  AddEditWorklogEnums,
  IWorklogState,
  IWorklogAction,
} from "../../__typings/interfaces.d";

import WorkLogsTitle from "./workLogsTitle";
import TimeLogs from "./timelogs";
import MaterialLogs from "./materiallogs";
import { useSelector } from "react-redux";

/*

const worklogInitial: IWorkTableModel = {
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
*/

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
      <WorkLogsTitle
        name={worklog.name}
        description={worklog.description}
        dispatcher={dispatcher}
      />
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

const WorklogContext = createContext<IWorklogState>({
  id: "",
  contactID: "",
  name: "",
  description: "",
  labour: [],
  materials: [],
  valid: false,
});
const DispatchContext = createContext({});
const worklogsReducer = (
  state: IWorklogState,
  action: IWorklogAction
): IWorklogState => {
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

function EditWorkLogs({
  contactID,
  worklogID,
}: IEditWorkLogProps): ReactElement {
  const [worklog, dispatcher] = useReducer(worklogsReducer, {
    id: "",
    name: "",
    description: "",
    valid: false,
    contactID: "",
    labour: [],
    materials: [],
  });
  const nSQL = useSelector(({ db }: IStateDatabaseReducer) => db.nSQL);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isReady) {
      nSQL("workTable")
        .presetQuery("createNewWorkLogForContact", {
          contactID,
          worklogID,
        })
        .exec()
        .then((logs: IWorkTableModel[]) => {
          dispatcher({ type: AddEditWorklogEnums.INIT, data: logs[0] });
          setIsReady(true);
        });
    }
  }, [isReady, contactID, nSQL, worklogID]);

  if (!isReady) return <></>;
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