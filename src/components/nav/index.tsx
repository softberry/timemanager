import React from "react";
import AutoComplete from "../../__ui/autocomplete";
import Toolbar from "../toolbar";
import Icon from "../../__ui/icon";
import { useHistory } from "react-router-dom";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import { VDESIGN } from "../../store/constant-enums";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

function NavBack({ index, goBack, theme, styles }: any) {
  const disabled = !!(index === 0);

  return (
    <div
      className={styles[`HistoryNav-${theme}-Arrow`]}
      data-disabled={disabled}
    >
      <Icon onClick={goBack}>arrow_back</Icon>
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
      <Icon onClick={goForward}>arrow_forward</Icon>
    </div>
  );
}

export default function Nav() {
  const history = useHistory();

  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  return (
    <nav className={styles[`Nav-${theme}`]}>
      <div className={styles[`HistoryNav-${theme}`]}>
        <NavBack {...history} styles={styles} theme={theme} />
        <NavForward {...history} styles={styles} theme={theme} />
      </div>
      <div className={styles[`ToolsNav-${theme}`]}>
        <Toolbar />
      </div>
      <div className={styles[`SearchNav-${theme}`]}>
        <AutoComplete variant={VDESIGN.DESIGN_VIEW_PRIMARY} />
      </div>
    </nav>
  );
}
