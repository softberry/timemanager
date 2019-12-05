import React from "react";
import AutoComplete from "../../__ui/autocomplete";
import Toolbar from "../../components/toolbar";
import Icon from "@material-ui/core/Icon";
import { withRouter } from "react-router-dom";
import styles from "./nav.module.scss";

function NavBack({ index, goBack }) {
  const disabled = index > 0 ? null : "disabled";

  return (
    <div className={styles.HistoryNavArrow} disabled={disabled}>
      <Icon onClick={goBack}>arrow_back</Icon>
    </div>
  );
}
function NavForward({ index, length, goForward }) {
  const disabled = length > index + 1 ? null : "disabled";

  return (
    <div className={styles.HistoryNavArrow} disabled={disabled}>
      <Icon onClick={goForward}>arrow_forward</Icon>
    </div>
  );
}

function Nav({ history }) {
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
        <AutoComplete variant="primary" />
      </div>
    </nav>
  );
}
export default withRouter(Nav);
