import React from "react";
import AutoComplete from "../../__ui/autocomplete";
import Toolbar from "../toolbar";
import Icon from "@material-ui/core/Icon";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../store/constant-enums";

function NavBack({ index, goBack, styles }: any) {
  const disabled = !!(index === 0);

  return (
    <div className={styles.HistoryNavArrow} data-disabled={disabled}>
      <Icon onClick={goBack}>arrow_back</Icon>
    </div>
  );
}
function NavForward({ index, length, goForward, styles }: any) {
  const disabled = !!(index + 1 >= length);

  return (
    <div className={styles.HistoryNavArrow} data-disabled={disabled}>
      <Icon onClick={goForward}>arrow_forward</Icon>
    </div>
  );
}

export default function Nav() {
  const history = useHistory();

  const styles = useSelector((state: any) => {
    switch (state.design.theme) {
      case VDESIGN.DESIGN_THEME_OCEAN:
        return themeOcean;
      case VDESIGN.DESIGN_THEME_DEFAULT:
        return themeDefault;
      default:
        return themeDefault;
    }
  });

  return (
    <nav className={styles.Nav}>
      <div className={styles.HistoryNav}>
        <NavBack {...history} styles={styles} />
        <NavForward {...history} styles={styles} />
      </div>
      <div className={styles.ToolsNav}>
        <Toolbar />
      </div>
      <div className={styles.SearchNav}>
        <AutoComplete variant={VDESIGN.DESIGN_VIEW_PRIMARY} />
      </div>
    </nav>
  );
}
