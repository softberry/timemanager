import React from "react";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

import {
  IIconProps,
  SizeIconEnums,
  IconEnums,
  DesignEnums,
} from "../../__typings/interfaces.d";
import { useTheme, useThemeStyle } from "../typography";

const stylesMap = new Map();
stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

function Icon({ children, size = SizeIconEnums.MEDIUM, ...rest }: IIconProps) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  return (
    <span
      className={styles[`Icon-${theme}`]}
      {...rest}
      data-size={size}
      data-blank={children === IconEnums.BLANK}
    >
      {children}
    </span>
  );
}
export default Icon;
