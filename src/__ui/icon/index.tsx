import { FC } from "react";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

import { IconSizeEnums, IconNameEnums, ThemeEnums } from "../../__typings/interfaces.d";
import { useTheme, useThemeStyle } from "../typography";
export interface IIconProps {
  children: IconNameEnums;
  onClick?: () => void;
  size?: IconSizeEnums;
}
const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

const Icon: FC<IIconProps> = ({ children, size = IconSizeEnums.MEDIUM, ...rest }: IIconProps) => {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  return (
    <span className={styles[`Icon-${theme}`]} {...rest} data-size={size} data-blank={children === IconNameEnums.BLANK}>
      {children}
    </span>
  );
};
export default Icon;
