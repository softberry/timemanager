import React, { ReactElement } from "react";

import { IBadgeProps, ViewEnums, ThemeEnums } from "../../__typings/interfaces.d";

import { useTheme, useThemeStyle } from "../typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

/**
 * Special button, which can show drop-down like list on click.
 */
const Badge = ({ content, view = ViewEnums.PRIMARY_VIEW }: IBadgeProps): ReactElement => {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  return <div className={styles[`Badge-${theme}-${view}`]}>{content}</div>;
};

export default Badge;
