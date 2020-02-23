import React from "react";

import { useSelector } from "react-redux";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";

import { DesignEnums } from "../../__typings/interfaces.d";

const stylesMap = new Map();
stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

function ViewTitle() {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const viewTitle = useSelector((state: any) => state.viewSettings.title);

  return <div className={styles[`ViewTitle-${theme}`]}>{viewTitle}</div>;
}

export default ViewTitle;