import React, { useContext } from "react";

import { VDESIGN } from "../../../store/constant-enums";
import { useTheme, useThemeStyle } from "../../typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

import Icon from "../../icon";
import {
  SizeIconEnums,
  ButtonAlignmentEnums,
  ButtonTypeEnums,
  IButtonProps,
} from "../../../__typings/interfaces.d";
import ViewContext from "../../../views";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

function Button({
  children,
  icon,
  onClick,
  align = ButtonAlignmentEnums.CENTER,
  type = ButtonTypeEnums.SIMPLE,
}: IButtonProps) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);

  return (
    <div className={styles["Button-Container"]} data-align={align}>
      <div
        className={styles[`Btn-${theme}-${view}--${type}`]}
        onClick={onClick}
      >
        <button>
          {icon && <Icon size={SizeIconEnums.SMALL}>{icon}</Icon>}
          <span>{children}</span>
        </button>
      </div>
    </div>
  );
}

export default Button;
