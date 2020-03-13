import React, { useContext, ReactElement } from "react";

import {
  ITippProps,
  ThemeEnums,
  IconSizeEnums,
  IconNameEnums,
} from "../../__typings/interfaces.d";
import ViewContext from "../../views/index";
import { useTheme, useThemeStyle } from "../typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import Icon from "../icon";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

/**
 * Inline informaion container, for better usability.
 */
function Tipp({ children }: ITippProps): ReactElement {
  const view = useContext(ViewContext);

  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  return (
    <div className={styles[`Tipp-${theme}-${view}`]}>
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.INFO}</Icon>
      <div className={styles[`Tipp-${theme}-${view}-Content`]}>{children}</div>
    </div>
  );
}

export default Tipp;
