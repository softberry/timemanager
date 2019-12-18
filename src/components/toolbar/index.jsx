import React, { useState, useEffect } from "react";
import Icon from "@material-ui/core/Icon";
import { withRouter } from "react-router-dom";
import { nSQL } from "@nano-sql/core";

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
  const [buttons, setButtons] = useState([]);

  console.log(nSQL().selectedDB);
  //TODO: try to modify toolbar table on other views to see the effect of subscribe

  useEffect(() => {
    const toolbar = nSQL("toolbarButtonsTable")
      .query("select")
      .listen({
        debounce: 3000,
        unique: true,
        compareFn: (oldRow, newRow) => {
          console.log(oldRow, newRow);
          return oldRow.id !== newRow.id;
        }
      });
    toolbar.exec((rows, err) => {
      if (err) return;
      // TODO: think of something unique to efficiently be informed on changes.
      // ignore same results. setButtons if on id or key different from the last one.

      // setButtons(rows);
      console.log(rows);
    });
    return () => {
      toolbar.unsubscribe();
    };
  });

  return (
    <div className={styles.Toolbar}>
      {buttons.map((button, key) => (
        <ToolbarButton key={key} {...button} />
      ))}
    </div>
  );
}

export default withRouter(Toolbar);
