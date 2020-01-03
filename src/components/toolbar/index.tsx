import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Icon from "@material-ui/core/Icon";
import { useHistory } from "react-router-dom";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../store/constant-enums";

import TYPES from "../../store/action-types";

function ToolbarButton(props: IToolbarButtonAction) {
  // { type, disabled = true, hidden = false }
  // types: add, edit, delete, save , ...
  const history = useHistory();
  const dispatch = useDispatch();
  const onClickHandler = function() {
    switch (props.clickAction) {
      case TYPES.EVENT_CREATE_CONTACT:
        props
          .nSQL("contactsTable")
          .presetQuery("createNewEmptyUserEntryForEdit")
          .exec()
          .then((row: []) => {
            history.push("/contact/edit/new-contact-to-edit");
          });

        break;
      case TYPES.EVENT_SAVE_CONTACT:
        if (props.disabled) {
          return console.log("Button is disabled!");
        }
        console.log("Validate and save form");
        break;
      case TYPES.EVENT_EDIT_CONTACT:
        history.push(`/contact/edit/${props.contact.id}`);
        break;
      case TYPES.EVENT_DELETE_CONTACT:
        dispatch({
          type: TYPES.CONFIRM_DELETE_CONTACT,
          caption: "Want to delete?",
          body: { contact: props.contact },
          closable: true
        });

        break;
      default:
        console.log(
          props.clickAction,
          " is not assigned to any Clickhandler! "
        );
    }
  };

  return (
    <div
      hidden={props.hidden}
      data-disabled={props.disabled}
      className={props.styles.Button}
      onClick={onClickHandler}
    >
      <Icon>{props.type}</Icon>
      <span className={props.styles.ButtonText}>{props.label}</span>
    </div>
  );
}

export default function Toolbar() {
  const buttons = useSelector((state: any) => state.toolbar.buttons);
  const currentContact = useSelector((state: any) => state.toolbar.contact);

  const nSQL = useSelector((state: any) => state.db.nSQL);

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

  useEffect(() => {
    if (!Array.isArray(buttons) || typeof nSQL !== "function") return;
  });

  return (
    <div className={styles.Toolbar}>
      {buttons.map((button: any, key: number) => {
        button.nSQL = nSQL;
        return (
          <ToolbarButton
            key={key}
            {...button}
            contact={currentContact}
            nSQL={nSQL}
            styles={styles}
          />
        );
      })}
    </div>
  );
}
