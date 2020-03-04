import React, { ReactElement, FunctionComponent } from "react";
import AutoComplete from "../../__ui/autocomplete";

import ViewTitle from "../viewTitle";
import Icon from "../../__ui/icon";
import { useHistory } from "react-router-dom";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import {
  IconNameEnums,
  DesignEnums,
  INavProps,
} from "../../__typings/interfaces.d";

const stylesMap = new Map();
stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

const NavBack = ({ goBack, styles, theme }: INavProps): ReactElement => {
  const disabled = false; //!!(index === 0);
  return (
    <div
      className={styles[`HistoryNav-${theme}-Arrow`]}
      data-disabled={disabled}
    >
      <Icon onClick={goBack}>{IconNameEnums.ARROW_BACK}</Icon>
    </div>
  );
};
const NavForward = ({
  goForward,
  length,
  styles,
  theme,
}: INavProps): ReactElement => {
  const disabled = false; // !!(index + 1 >= length);

  return (
    <div
      className={styles[`HistoryNav-${theme}-Arrow`]}
      data-disabled={disabled}
    >
      <Icon onClick={goForward}>{IconNameEnums.ARROW_FORWARD}</Icon>
    </div>
  );
};

const Nav: FunctionComponent = (): ReactElement => {
  const history = useHistory();
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  return (
    <>
      <nav className={styles[`Nav-${theme}`]}>
        <div className={styles[`HistoryNav-${theme}`]}>
          <NavBack {...history} theme={theme} styles={styles} />
          <NavForward {...history} theme={theme} styles={styles} />
        </div>
        <div className={styles[`NavTitle-${theme}`]}>
          <ViewTitle />
        </div>
        <div className={styles[`SearchNav-${theme}`]}>
          <AutoComplete variant={DesignEnums.PRIMARY_VIEW} />
        </div>
      </nav>
    </>
  );
};

export default Nav;
