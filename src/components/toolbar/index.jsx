import React from "react";
import { useSelector } from "react-redux";
import Icon from "@material-ui/core/Icon";
import { withRouter } from "react-router-dom";

import styles from "./toolbar.module.scss";

function ToolbarButton(props) {
  // { type, disabled = true, hidden = false }
  // types: add, edit, delete, save

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

function Toolbar() {
  const buttons = useSelector(state => state.toolbar.buttons);
  return (
    <div className={styles.Toolbar}>
      {buttons.map((button, key) => (
        <ToolbarButton key={key} {...button} />
      ))}
    </div>
  );
}

export default withRouter(Toolbar);
