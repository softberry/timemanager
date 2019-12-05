import React from "react";
import Icon from "@material-ui/core/Icon";
import { withRouter } from "react-router-dom";

import styles from "./toolbar.module.scss";

function ToolbarButton(props) {
  // { type, disabled = true, hidden = false }

  return (
    <div className={styles.Button} {...props}>
      <Icon>{props.type}</Icon>
      <span>{props.type}</span>
    </div>
  );
}

function Toolbar({ location }) {
  const buttons = location.state.toolbar;

  return (
    <div className={styles.Toolbar}>
      {buttons.map((button, key) => (
        <ToolbarButton key={key} {...button} />
      ))}
    </div>
  );
}

export default withRouter(Toolbar);
