import React, { useContext, ReactElement, useEffect } from "react";
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
  ThemeEnums,
  IDatabaseReducer,
  IWorkTableModel,
} from "../../__typings/interfaces.d";
import { useTheme, useThemeStyle } from "../../__ui/typography";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

function TimelogList(): ReactElement {
  const dispatch = useDispatch();
  const view = useContext(ViewContext);
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const nSQL = useSelector((state: IDatabaseReducer) => state.db.action.nSQL);

  useEffect(() => {
    dispatch({ type: ViewSettingsEnums.UPDATE_TITLE, title: "All Worklogs" });
  });

  function createNewWorklogHandler(): void {
    console.log("createNewWorklogHandler : placeholder");
  }

  nSQL("workDurationTable")
    .query("select")
    .orderBy(["start ASC"])
    .exec()
    .then((list: [IWorkTableModel]) => {
      // console.log(list);
    });

  return (
    <div className={styles[`TimelogList-${theme}-${view}`]}>
      <div className={styles[`TimelogList-${theme}-${view}-Create-New`]}>
        <Button
          icon={IconNameEnums.ADD}
          align={ButtonAlignmentEnums.STRETCH}
          isDisabled={false}
          onClick={createNewWorklogHandler}
          type={ButtonTypeEnums.POSITIVE}
        >
          Create Time log
        </Button>
      </div>
    </div>
  );
}

export default TimelogList;
