import React, { FunctionComponent } from "react";

import { IBadgeProps, ViewEnums, ThemeEnums } from "../../__typings/interfaces.d";

import { useTheme, useThemeStyle } from "../typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

/**
 * Simple badge, shows number as content in list items.
 */
const Badge: FunctionComponent<IBadgeProps> = ({ content, view = ViewEnums.PRIMARY_VIEW }) => {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  return <div className={styles[`Badge-${theme}-${view}`]}>{content}</div>;
};

export default Badge;
