import React from "react";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../store/constant-enums";
import { useTheme, useThemeStyle } from "../typography";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

export default function Icon({ children, ...rest }: any) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  return (
    <span className={styles[`Icon-${theme}`]} {...rest}>
      {children}
    </span>
  );
}
