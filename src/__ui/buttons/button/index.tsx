import React, { useContext } from "react";
import { Link } from "react-router-dom";
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
  IButtonLinkProps,
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
  const iconOnly = children === undefined || children.toString().length === 0;

  return (
    <div className={styles["Button-Container"]} data-align={align}>
      <div
        className={styles[`Btn-${theme}-${view}--${type}`]}
        onClick={onClick}
        data-icon-only={iconOnly}
      >
        <button>
          {icon && <Icon size={SizeIconEnums.SMALL}>{icon}</Icon>}
          {!iconOnly && <span className={styles[`Btn-${theme}-${view}--${type}-innerText`]}>{children}</span>}
        </button>
      </div>
    </div>
  );
}

function ButtonLink({
  children,
  icon,
  href,
  align = ButtonAlignmentEnums.CENTER,
  type = ButtonTypeEnums.SIMPLE,
}: IButtonLinkProps) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);
  const iconOnly = children === undefined || children.toString().length === 0;
  return (
    <div
      className={styles["Button-Container"]}
      data-align={align}
      data-icon-only={iconOnly}
    >
      <div
        className={styles[`Btn-${theme}-${view}--${type}`]}
        data-icon-only={iconOnly}
      >
        <Link to={href}>
          {icon && <Icon size={SizeIconEnums.SMALL}>{icon}</Icon>}
          <span>{children}</span>
        </Link>
      </div>
    </div>
  );
}
export { Button as default, ButtonLink };
