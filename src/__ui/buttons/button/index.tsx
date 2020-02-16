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
  align = undefined,
  type = ButtonTypeEnums.SIMPLE,
  isDisabled = true,
}: IButtonProps) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);
  const iconOnly = children === undefined || children.toString().length === 0;
  const clickHandler = isDisabled ? () => {} : onClick;

  return (
    <div className={styles["Button-Container"]} data-align={align}>
      <div
        className={styles[`Btn-${theme}-${view}--${type}`]}
        onClick={clickHandler}
        data-icon-only={iconOnly}
        data-disabled={isDisabled}
      >
        <button>
          {icon && <Icon size={SizeIconEnums.SMALL}>{icon}</Icon>}
          {!iconOnly && (
            <span className={styles[`Btn-${theme}-${view}--${type}-innerText`]}>
              {children}
            </span>
          )}
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
  isDisabled = true,
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
        data-disabled={isDisabled}
      >
        <Link
          to={href}
          onClick={e => {
            isDisabled && e.preventDefault();
          }}
        >
          {icon && <Icon size={SizeIconEnums.SMALL}>{icon}</Icon>}
          <span>{children}</span>
        </Link>
      </div>
    </div>
  );
}
export { Button as default, ButtonLink };
