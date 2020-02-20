import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../__ui/buttons/button";

import ViewContext from "../../views/index";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import {
  IconEnums,
  ButtonAlignmentEnums,
  ButtonTypeEnums,
  ViewSettingsEnums,
  DesignEnums,
} from "../../__typings/interfaces.d";
import { useTheme, useThemeStyle } from "../../__ui/typography";

const stylesMap = new Map();
stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

function WorklogsList() {
  const dispatch = useDispatch();
  const view = useContext(ViewContext);
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const nSQL = useSelector((state: any) => state.db.nSQL);

  dispatch({ type: ViewSettingsEnums.UPDATE_TITLE, title: "All Worklogs" });

  nSQL("workDurationTable")
    .query("select")
    .orderBy(["start ASC"])
    .exec()
    .then((list: [any]) => {
      // console.log(list);
    });

  return (
    <div className={styles[`Worklogslist-${theme}-${view}`]}>
      <div className={styles[`Worklogslist-${theme}-${view}-Create-New`]}>
        <Button
          icon={IconEnums.ADD}
          align={ButtonAlignmentEnums.RIGHT}
          isDisabled={false}
          onClick={() => {}}
          type={ButtonTypeEnums.POISITIVE}
        >
          Create Work log
        </Button>
      </div>
    </div>
  );
}

export default WorklogsList;
