import React, { useContext } from "react";

import { VDESIGN } from "../../../store/constant-enums";
import { useTheme, useThemeStyle } from "../../typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

import Icon from "../../icon";
import {
  ESizeIcon,
  EButtonActionClasses,
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
  actionClass = EButtonActionClasses.SIMPLE,
}: IButtonProps) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);

  return (
    <>
      <div
        className={styles[`Btn-${theme}-${view}--${actionClass}`]}
        onClick={onClick}
      >
        <button>
          {icon && <Icon size={ESizeIcon.SMALL}>{icon}</Icon>}
          <span>{children}</span>
        </button>
      </div>
    </>
  );
}

export default Button;
