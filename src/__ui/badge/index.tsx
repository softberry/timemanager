import React from "react";

import { IBadgeProps, DesignEnums } from "../../__typings/interfaces.d";

import { useTheme, useThemeStyle } from "../typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

const stylesMap = new Map();
stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

/**
 * Special button, which can show drop-down like list on click.
 */
function Badge({ content, view = DesignEnums.PRIMARY_VIEW }: IBadgeProps) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  return <div className={styles[`Badge-${theme}-${view}`]}>{content}</div>;
}

export default Badge;
