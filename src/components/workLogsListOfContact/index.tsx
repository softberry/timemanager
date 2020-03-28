import React, { useContext, useEffect, useState, FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditWorkLogs from "../../subViews/editWorkLogs";
import Button from "../../__ui/buttons/button";
import List from "../list";
import ViewContext from "../../views/index";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import {
  IconNameEnums,
  ButtonAlignmentEnums,
  ButtonTypeEnums,
  ViewSettingsEnums,
  ThemeEnums,
  IDatabaseReducer,
  IWorkTableModel,
  SubPageActionEnums,
  ISubPageState,
  NewEntryEnums,
  IWorklogsEditProps,
} from "../../__typings/interfaces.d";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import { uuid } from "@nano-sql/core/lib/utilities";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

const WorklogListOfContact: FunctionComponent<IWorklogsEditProps> = ({ contact }) => {
  const dispatch = useDispatch();
  const view = useContext(ViewContext);
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const nSQL = useSelector(({ db }: IDatabaseReducer) => db.action.nSQL);

  const [shouldUpdate, setShouldUpdate] = useState(uuid());
  const [contactsWorklogs, setContactsWorklogs] = useState<IWorkTableModel[]>([
    { name: "", contactID: "", description: "", id: "", labour: [], materials: [] },
  ]);

  useEffect(() => {
    dispatch({ type: ViewSettingsEnums.UPDATE_TITLE, title: "All Worklogs" });
  });

  function createNewWorklogHandler(caption: string, worklogID: string): void {
    const action: ISubPageState = {
      type: SubPageActionEnums.SHOW,
      action: {
        caption,
        content: (
          <>
            <EditWorkLogs
              contactID={contact.id}
              worklogID={worklogID}
              updateParentCallback={updateParentCallbackHandler}
            />
          </>
        ),
      },
    };
    dispatch(action);
  }
  function updateParentCallbackHandler(): void {
    setShouldUpdate(uuid());
  }
  useEffect(() => {
    nSQL("workTable")
      .presetQuery("getWorkLogsOfContact", { contactID: contact.id })
      .exec()
      .then((worklogs: [IWorkTableModel]) => {
        setContactsWorklogs(worklogs);
      })
      .catch((err: Error) => {
        throw err;
      });
  }, [contact.id, nSQL, shouldUpdate]);

  return (
    <div className={styles[`WorklogsList-${theme}-${view}`]}>
      <div className={styles[`WorklogsList-${theme}-${view}-Create-New`]}>
        <Button
          icon={IconNameEnums.ADD}
          align={ButtonAlignmentEnums.RIGHT}
          isDisabled={false}
          onClick={(): void => {
            createNewWorklogHandler("New Worklog", NewEntryEnums.NEW_WORKLOG_ID);
          }}
          type={ButtonTypeEnums.POSITIVE}
        >
          Create Work log
        </Button>
      </div>
      <List>
        {contactsWorklogs.map((log, index: number) => (
          <div
            key={index}
            onClick={(): void => {
              createNewWorklogHandler("Edit Worklog", log.id);
            }}
          >
            <div className={styles[`WorklogsList-${theme}-${view}-ListItem-Name`]}>{log.name}</div>
            <div className={styles[`WorklogsList-${theme}-${view}-ListItem-Description`]}>{log.description} &nbsp;</div>
          </div>
        ))}
      </List>
    </div>
  );
};

export default WorklogListOfContact;
