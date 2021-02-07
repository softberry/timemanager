import { useContext, MouseEvent, FC, Children, ReactNode } from "react";
import { Link } from "react-router-dom";

import { useTheme, useThemeStyle } from "../../typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

import Icon from "../../icon";
import {
  IconSizeEnums,
  ButtonAlignmentEnums,
  ButtonTypeEnums,
  ThemeEnums,
  IconNameEnums,
} from "../../../__typings/interfaces.d";
import ViewContext from "../../../views";

interface IButtonProps {
  children?: ReactNode;
  icon?: IconNameEnums;
  align?: ButtonAlignmentEnums;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
  type: ButtonTypeEnums;
  isDisabled: boolean;
}
export interface IButtonLinkProps extends Omit<IButtonProps, "onClick"> {
  href: string;
}

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

const Button: FC<IButtonProps> = ({
  children,
  icon,
  onClick,
  align = undefined,
  type = ButtonTypeEnums.SIMPLE,
  isDisabled = true,
}: IButtonProps) => {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);
  const iconOnly = children === undefined || Children.count(children) === 0 || children === "";
  const clickHandler = isDisabled ? (): boolean => false : onClick;

  return (
    <div className={styles["Button-Container"]} data-align={align}>
      <div
        className={styles[`Btn-${theme}-${view}--${type}`]}
        onClick={clickHandler}
        data-icon-only={iconOnly}
        data-disabled={isDisabled}
      >
        <button>
          {icon && <Icon size={IconSizeEnums.SMALL}>{icon}</Icon>}
          {!iconOnly && <span className={styles[`Btn-${theme}-${view}--${type}-innerText`]}>{children}</span>}
        </button>
      </div>
    </div>
  );
};

const ButtonLink: FC<IButtonLinkProps> = ({
  children,
  icon,
  href,
  align = ButtonAlignmentEnums.CENTER,
  type = ButtonTypeEnums.SIMPLE,
  isDisabled = true,
}: IButtonLinkProps) => {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);
  const iconOnly = children === undefined || Children.count(children) === 0 || children === "";

  return (
    <div className={styles["Button-Container"]} data-align={align} data-icon-only={iconOnly}>
      <div className={styles[`Btn-${theme}-${view}--${type}`]} data-icon-only={iconOnly} data-disabled={isDisabled}>
        <Link
          to={href}
          onClick={(event: MouseEvent<HTMLAnchorElement>): void => {
            isDisabled && event.preventDefault();
          }}
        >
          {icon && <Icon size={IconSizeEnums.SMALL}>{icon}</Icon>}
          {!iconOnly && <span>{children}</span>}
        </Link>
      </div>
    </div>
  );
};
export { Button as default, ButtonLink };
