import React, { useContext } from "react";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import { VDESIGN } from "../../store/constant-enums";
import ViewContext from "../../views/index";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

function Calendar({ state }: any) {
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
}

export default Calendar;
