import React, { ReactElement } from "react";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";

import { ThemeEnums } from "../../__typings/interfaces.d";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

const Loading = (): ReactElement => {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  return (
    <div className={styles[`Loading-${theme}`]}>
      <div className={styles[`Circle-${theme}`]}></div>
    </div>
  );
};
export default Loading;
