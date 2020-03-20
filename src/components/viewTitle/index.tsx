import React, { ReactElement } from "react";

import { useSelector } from "react-redux";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";

import { ThemeEnums, IViewStateReducer } from "../../__typings/interfaces.d";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

function ViewTitle(): ReactElement {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const viewTitle = useSelector(({ viewSettings }: IViewStateReducer) => viewSettings.title);

  return <div className={styles[`ViewTitle-${theme}`]}>{viewTitle}</div>;
}

export default ViewTitle;
