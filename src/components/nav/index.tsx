import React from "react";
import AutoComplete from "../../__ui/autocomplete";
import Toolbar from "../toolbar";
import Icon from "@material-ui/core/Icon";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../store/constant-enums";

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

  let theme = VDESIGN.DESIGN_THEME_DEFAULT;
  const styles = useSelector((state: any) => {

    switch (state.design.theme) {
      case VDESIGN.DESIGN_THEME_OCEAN:
        theme = VDESIGN.DESIGN_THEME_OCEAN;
        return themeOcean;
      case VDESIGN.DESIGN_THEME_DEFAULT:
        theme = VDESIGN.DESIGN_THEME_DEFAULT;
        return themeDefault;
      default:
        theme = VDESIGN.DESIGN_THEME_DEFAULT;
        return themeDefault;
    }
  });
  
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
