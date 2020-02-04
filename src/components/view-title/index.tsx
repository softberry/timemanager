import React from "react";

import { useSelector } from "react-redux";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import { VDESIGN } from "../../store/constant-enums";

// import TYPES from "../../store/action-types";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

function ViewTitle() {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const viewTitle = useSelector((state: any) => state.viewSettings.title);

  return <div className={styles[`ViewTitle-${theme}`]}>{viewTitle}</div>;
}

export default ViewTitle;
