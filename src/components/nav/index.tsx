import React from "react";
import AutoComplete from "../../__ui/autocomplete";
import Toolbar from "../toolbar";
import Icon from "@material-ui/core/Icon";
import { useHistory } from "react-router-dom";
import styles from "./nav.module.scss";
import { DESIGN } from "../../store/action-types";

function NavBack({ index, goBack }: any) {
  const disabled = !!(index === 0);

  return (
    <div className={styles.HistoryNavArrow} data-disabled={disabled}>
      <Icon onClick={goBack}>arrow_back</Icon>
    </div>
  );
}
function NavForward({ index, length, goForward }: any) {
  const disabled = !!(index + 1 >= length);

  return (
    <div className={styles.HistoryNavArrow} data-disabled={disabled}>
      <Icon onClick={goForward}>arrow_forward</Icon>
    </div>
  );
}

export default function Nav() {
  const history = useHistory();
  return (
    <nav className={styles.Nav}>
      <div className={styles.HistoryNav}>
        <NavBack {...history} />
        <NavForward {...history} />
      </div>
      <div className={styles.ToolsNav}>
        <Toolbar />
      </div>
      <div className={styles.SearchNav}>
        <AutoComplete variant={DESIGN.DESIGN_VIEW_PRIMARY} />
      </div>
    </nav>
  );
}
