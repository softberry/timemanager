import React from "react";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import { VDESIGN } from "../../store/constant-enums";

import { CircularProgress } from "@material-ui/core";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

export default function() {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  return (
    <div className={styles[`Loading-${theme}`]}>
      <CircularProgress className={styles[`Loading-${theme}`]} />
    </div>
  );
}
