import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Icon from "@material-ui/core/Icon";
import { useHistory } from "react-router-dom";

import styles from "./toolbar.module.scss";

import TYPES from "../../store/types";

function ToolbarButton(props) {
  // { type, disabled = true, hidden = false }
  // types: add, edit, delete, save
  const history = useHistory();

  const onClickHandler = function() {
    switch (props.clickAction) {
      case TYPES.ADD_NEW_CONTACT:
        props
          .nSQL("contactsTable")
          .presetQuery("createNewEmptyUserEntryForEdit")
          .exec()
          .then(row => {
            history.push("/edit/contact/new-contact-to-edit");
          });

        break;
      case TYPES.SAVE_EDITED_CONTACT:
        console.log("Validate and save form");
        break;
      default:
    }
  };

  return (
    <div
      hidden={props.hidden}
      disabled={props.disabled}
      className={styles.Button}
      onClick={onClickHandler}
    >
      <Icon>{props.type}</Icon>
      <span>{props.type}</span>
    </div>
  );
}

function Toolbar() {
  const buttons = useSelector(state => state.toolbar.buttons);
  const nSQL = useSelector(state => state.db.nSQL);

  useEffect(() => {
    if (!Array.isArray(buttons) || typeof nSQL !== "function") return;
  });
  return (
    <div className={styles.Toolbar}>
      {buttons.map((button, key) => {
        button.nSQL = nSQL;
        return <ToolbarButton key={key} {...button} />;
      })}
    </div>
  );
}

export default Toolbar;
