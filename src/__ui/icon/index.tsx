import React, { ReactElement } from "react";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

import {
  IIconProps,
  IconSizeEnums,
  IconNameEnums,
  ThemeEnums,
} from "../../__typings/interfaces.d";
import { useTheme, useThemeStyle } from "../typography";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

const Icon = ({
  children,
  size = IconSizeEnums.MEDIUM,
  ...rest
}: IIconProps): ReactElement => {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  return (
    <span
      className={styles[`Icon-${theme}`]}
      {...rest}
      data-size={size}
      data-blank={children === IconNameEnums.BLANK}
    >
      {children}
    </span>
  );
};
export default Icon;
