import React from "react";
import AutoComplete from "../../__ui/autocomplete";

import ViewTitle from "../view-title";
import Icon from "../../__ui/icon";
import { useHistory } from "react-router-dom";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import { IconEnums, DesignEnums } from "../../__typings/interfaces.d";

const stylesMap = new Map();
stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

function NavBack({ index, goBack, theme, styles }: any) {
  const disabled = !!(index === 0);

  return (
    <div
      className={styles[`HistoryNav-${theme}-Arrow`]}
      data-disabled={disabled}
    >
      <Icon onClick={goBack}>{IconEnums.ARROW_BACK}</Icon>
    </div>
  );
}
function NavForward({ index, length, goForward, theme, styles }: any) {
  const disabled = !!(index + 1 >= length);

  return (
    <div
      className={styles[`HistoryNav-${theme}-Arrow`]}
      data-disabled={disabled}
    >
      <Icon onClick={goForward}>{IconEnums.ARROW_FORWARD}</Icon>
    </div>
  );
}

function Nav() {
  const history = useHistory();

  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  return (
    <nav className={styles[`Nav-${theme}`]}>
      <div className={styles[`HistoryNav-${theme}`]}>
        <NavBack {...history} styles={styles} theme={theme} />
        <NavForward {...history} styles={styles} theme={theme} />
      </div>
      <div className={styles[`ViewTitle-${theme}`]}>
        <ViewTitle />
      </div>
      <div className={styles[`SearchNav-${theme}`]}>
        <AutoComplete variant={DesignEnums.PRIMARY_VIEW} />
      </div>
    </nav>
  );
}

export default Nav;
