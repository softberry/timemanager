import React, { useReducer, createContext, useContext, useEffect, FunctionComponent } from "react";
import Button from "../../__ui/buttons/button";

import {
  ButtonTypeEnums,
  ButtonAlignmentEnums,
  IconNameEnums,
  IEditWorkLogProps,
  IDatabaseReducer,
  AddEditWorklogEnums,
  IWorklogState,
  IWorklogAction,
  ThemeEnums,
  ISubPageState,
  SubPageActionEnums,
  NewEntryEnums,
  IWorkTableModel,
} from "../../__typings/interfaces.d";

import WorkLogsTitle from "./workLogsTitle";

import MaterialLogs from "./materiallogs";
import { useSelector, useDispatch } from "react-redux";
import Card, { CardFooter } from "../../__ui/card";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import TimeLogs from "./timelogs";
import { uuid } from "@nano-sql/core/lib/utilities";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

const EditWorkLogsForm: FunctionComponent = () => {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const nSQL = useSelector(({ db }: IDatabaseReducer) => db.action.nSQL);
  const dispatch = useDispatch();

  const worklog = useContext(WorklogContext);
  const dispatcher = useContext(DispatchContext);
  //TODO: update (parent) list of worklogs in readonly conact details page
  const cancelWorkLogViewHandler = (): void => {
    const action: ISubPageState = {
      type: SubPageActionEnums.OUT,
      action: {
        caption: "",
        content: <></>,
      },
    };
    dispatch(action);
  };
  const saveWorkLogViewHandler = (): void => {
    if (worklog.id === NewEntryEnums.NEW_WORKLOG_ID) {
      delete worklog.id;
    }
    nSQL("workTable")
      .query("upsert", worklog)
      .exec()
      .then((m: IWorkTableModel) => {
        dispatcher({
          type: AddEditWorklogEnums.UPDATEPARENT,
        });
      })
      .catch((err: Error) => {
        throw err;
      })
      .finally(() => {
        setTimeout(cancelWorkLogViewHandler, 100);
      });
  };

  return (
    <>
      <WorkLogsTitle />
      <TimeLogs styles={styles} theme={theme} />
      <MaterialLogs theme={theme} styles={styles} />

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
  reloadKey: uuid(),
});
const DispatchContext = createContext((p: IWorklogAction) => {
  // do nothing
});

const EditWorkLogs: FunctionComponent<IEditWorkLogProps> = ({ contactID, worklogID, updateParentCallback }) => {
  const worklogsReducer = (state: IWorklogState, action: IWorklogAction): IWorklogState => {
    switch (action.type) {
      case AddEditWorklogEnums.INIT:
        return { ...state, ...action.worklog };
      case AddEditWorklogEnums.TITLE:
        return {
          ...state,
          name: action.input?.value || "",
          valid: action.input?.valid || false,
        };
      case AddEditWorklogEnums.DESCRIPTION:
        return { ...state, description: action.input?.value || "" };
      case AddEditWorklogEnums.TIMELOGS:
        return { ...state, labour: action?.labour || [] };
      case AddEditWorklogEnums.MATERIALS:
        return { ...state, materials: action?.materials || [] };
      case AddEditWorklogEnums.UPDATEPARENT:
        return { ...state, reloadKey: uuid() };
      default:
        return { ...state };
    }
  };
  const [worklog, dispatcher] = useReducer(worklogsReducer, {
    id: "",
    name: "",
    description: "",
    valid: false,
    contactID,
    labour: [],
    materials: [],
    reloadKey: uuid(),
  });
  const nSQL = useSelector(({ db }: IDatabaseReducer) => db.action.nSQL);

  useEffect(() => {
    if (worklogID === NewEntryEnums.NEW_WORKLOG_ID) {
      dispatcher({
        type: AddEditWorklogEnums.INIT,
        worklog: {
          id: worklogID,
          contactID,
          name: "",
          description: "",
          labour: [],
          materials: [],
        },
      });
    } else {
      nSQL("workTable")
        .query("select")
        .where(["id", "=", worklogID])
        .exec()
        .then((w: IWorkTableModel[]) => {
          dispatcher({
            type: AddEditWorklogEnums.INIT,
            worklog: w[0],
          });
        });
    }
  }, [contactID, worklogID, nSQL]);
  useEffect(() => {
    updateParentCallback();
  }, [worklog.reloadKey, updateParentCallback]);
  if (worklog.id === "") return <></>;
  return (
    <DispatchContext.Provider value={dispatcher}>
      <WorklogContext.Provider value={worklog}>
        <EditWorkLogsForm />
      </WorklogContext.Provider>
    </DispatchContext.Provider>
  );
};
export { EditWorkLogs as default, WorklogContext, DispatchContext };
