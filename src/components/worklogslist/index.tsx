import React, { useContext, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../__ui/buttons/button";

import ViewContext from "../../views/index";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import {
  IconNameEnums,
  ButtonAlignmentEnums,
  ButtonTypeEnums,
  ViewSettingsEnums,
  DesignEnums,
  IStateDatabaseReducer,
  IworkTableModel,
} from "../../__typings/interfaces.d";
import { useTheme, useThemeStyle } from "../../__ui/typography";

const stylesMap = new Map();
stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

function WorklogsList(): ReactElement {
  const dispatch = useDispatch();
  const view = useContext(ViewContext);
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const nSQL = useSelector((state: IStateDatabaseReducer) => state.db.nSQL);

  dispatch({ type: ViewSettingsEnums.UPDATE_TITLE, title: "All Worklogs" });

  function createNewWorklogHandler(): void {
    console.log("createNewWorklogJHandler : placeholder");
  }

  nSQL("workDurationTable")
    .query("select")
    .orderBy(["start ASC"])
    .exec()
    .then((list: [IworkTableModel]) => {
      console.log(list);
    });

  return (
    <div className={styles[`Worklogslist-${theme}-${view}`]}>
      <div className={styles[`Worklogslist-${theme}-${view}-Create-New`]}>
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

export default WorklogsList;
