import React from "react";
import Icon from "@material-ui/core/Icon";
import { withRouter } from "react-router-dom";

import styles from "./toolbar.module.scss";

function ToolbarButton(props) {
  // { type, disabled = true, hidden = false }
  const onClickHandler = function() {
    props.history.push(props.to);
  };

  return (
    <div className={styles.Button} {...props} onClick={onClickHandler}>
      <Icon>{props.type}</Icon>
      <span>{props.type}</span>
    </div>
  );
}

function Toolbar({ history }) {
  //TODO: Use nSQL to keep toolbar structure and use nSQL-customQuery to update Toolbar buttons;
  const buttons = history.location.state.toolbar || [];

  return (
    <div className={styles.Toolbar}>
      {buttons.map((button, key) => (
        <ToolbarButton key={key} {...button} history={history} />
      ))}
    </div>
  );
}

export default withRouter(Toolbar);
