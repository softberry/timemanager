import React from "react";

import { VDESIGN } from "../../store/constant-enums";
import { useTheme, useThemeStyle } from "../typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

interface IBadgeProps {
  content: number;
  view?: string;
}

/**
 * Special button, which can show drop-down like list on click.
 */
function Badge({ content, view = VDESIGN.DESIGN_VIEW_PRIMARY }: IBadgeProps) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  return <div className={styles[`Badge-${theme}-${view}`]}>{content}</div>;
}

export default Badge;
