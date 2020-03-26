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
  ThemeEnums,
} from "../../__typings/interfaces.d";

import WorkLogsTitle from "./workLogsTitle";

import MaterialLogs from "./materiallogs";
import { useSelector } from "react-redux";
import Card, { CardFooter } from "../../__ui/card";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import TimeLogs from "./timelogs";
const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

const EditWorkLogsForm: FunctionComponent = () => {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

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
      <TimeLogs worklog={worklog} styles={styles} theme={theme} />
      <MaterialLogs worklog={worklog} theme={theme} styles={styles} />

      <Card>
        <CardFooter>
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
            type={ButtonTypeEnums.POSITIVE}
          >
            Save
          </Button>
        </CardFooter>
      </Card>
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

const EditWorkLogs: FunctionComponent<IEditWorkLogProps> = ({ contactID, worklogID, theme, styles }) => {
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
