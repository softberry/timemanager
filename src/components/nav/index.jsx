import React from "react";
import AutoComplete from "../../__ui/autocomplete";
import Icon from "@material-ui/core/Icon";
import { withRouter } from "react-router-dom";
import styles from "./nav.module.scss";

function NavBack({ index, goBack }) {
  const stateClass =
    index > 0 ? styles.HistoryNavBack : styles.HistoryNavBackDisabled;

  return (
    <div className={stateClass}>
      <Icon onClick={goBack}>arrow_back</Icon>
    </div>
  );
}
function NavForward({ index, length, goForward }) {
  const stateClass =
    length > index + 1
      ? styles.HistoryNavForward
      : styles.HistoryNavForwardDisabled;

  return (
    <div className={stateClass}>
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
      <AutoComplete variant="primary" />
    </nav>
  );
}
export default withRouter(Nav);
