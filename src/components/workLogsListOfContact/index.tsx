import React, { useContext, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditWorkLogsForm from "../../subViews/editWorkLogs";
import Button from "../../__ui/buttons/button";

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
  IContactsTableModel,
  ISubPageState,
} from "../../__typings/interfaces.d";
import { useTheme, useThemeStyle } from "../../__ui/typography";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

function WorklogListOfContact({ id }: IContactsTableModel): ReactElement {
  const dispatch = useDispatch();
  const view = useContext(ViewContext);
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const nSQL = useSelector(({ db }: IDatabaseReducer) => db.action.nSQL);

  const [contactsWorklogs, setContactsWorklogs] = useState<IWorkTableModel[] | []>([]);

  useEffect(() => {
    dispatch({ type: ViewSettingsEnums.UPDATE_TITLE, title: "All Worklogs" });
  });

  function createNewWorklogHandler(): void {
    const action: ISubPageState = {
      type: SubPageActionEnums.SHOW,
      action: {
        caption: "New Worklog",
        content: (
          <>
            <EditWorkLogsForm contactID={id} />
          </>
        ),
      },
    };
    dispatch(action);
  }

  nSQL("workTable")
    .query("select")
    .where(["contactID", "=", id])
    .exec()
    .then((worklogs: [IWorkTableModel]) => {
      // console.log(worklogs);
    });

  return (
    <div className={styles[`TimelogList-${theme}-${view}`]}>
      <div className={styles[`TimelogList-${theme}-${view}-Create-New`]}>
        <Button
          icon={IconNameEnums.ADD}
          align={ButtonAlignmentEnums.RIGHT}
          isDisabled={false}
          onClick={createNewWorklogHandler}
          type={ButtonTypeEnums.POISITIVE}
        >
          Create Work log
        </Button>
      </div>
    </div>
  );
}

export default WorklogListOfContact;
