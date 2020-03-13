import React, { useContext, ReactElement } from "react";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import ViewContext from "../../views/index";
import { ThemeEnums } from "../../__typings/interfaces.d";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

const Calendar = (): ReactElement => {
  const theme = useTheme();
  const style = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);
  return (
    <div className={style[`Calendar-${theme}-${view}`]}>
      <p>Todo:</p>
      ****
      <ul>
        <li>Worklogs(UnSaved, uncomplete, complete)</li>
        <li>Show Calendar</li>
        <li>Show Appointments</li>
      </ul>
    </div>
  );
};

export default Calendar;
