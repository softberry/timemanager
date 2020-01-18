import React from "react";

import Icon from "../../../__ui/icon";
import { VDESIGN } from "../../../store/constant-enums";
import { useTheme, useThemeStyle } from "../../typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

interface IOptionsButtonProps {
  /** Action */
  onClick: () => any;
}

/**
 * Special button, which can show drop-down like list on click.
 */
function OptionsButton({ onClick }: IOptionsButtonProps) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  return (
    <div className={styles[`Options-${theme}`]}>
      <Icon>more_horiz</Icon>
    </div>
  );
}

export default OptionsButton;
