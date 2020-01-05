import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Icon from "@material-ui/core/Icon";
import { useHistory } from "react-router-dom";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../store/constant-enums";

import TYPES from "../../store/action-types";

function ToolbarButton({
  type,
  clickAction,
  nSQL,
  label,
  disabled,
  contact,
  hidden,
  styles,
  theme
}: IToolbarButtonAction) {
  // { type, disabled = true, hidden = false }
  // types: add, edit, delete, save , ...
  const history = useHistory();
  const dispatch = useDispatch();
  const onClickHandler = function() {
    switch (clickAction) {
      case TYPES.EVENT_CREATE_CONTACT:
        nSQL("contactsTable")
          .presetQuery("createNewEmptyUserEntryForEdit")
          .exec()
          .then((row: []) => {
            history.push("/contact/edit/new-contact-to-edit");
          });

        break;
      case TYPES.EVENT_SAVE_CONTACT:
        if (disabled) {
          return console.log("Button is disabled!");
        }
        console.log("Validate and save form");
        break;
      case TYPES.EVENT_EDIT_CONTACT:
        history.push(`/contact/edit/${contact.id}`);
        break;
      case TYPES.EVENT_DELETE_CONTACT:
        dispatch({
          type: TYPES.CONFIRM_DELETE_CONTACT,
          caption: "Want to delete?",
          body: { contact: contact },
          closable: true
        });

        break;
      default:
        console.log(clickAction, " is not assigned to any Clickhandler! ");
    }
  };

  return (
    <div
      hidden={hidden}
      data-disabled={disabled}
      className={styles[`Button-${theme}`]}
      onClick={onClickHandler}
    >
      <Icon>{type}</Icon>
      <span className={styles[`Button-${theme}-Text`]}>{label}</span>
    </div>
  );
}

export default function Toolbar() {
  const buttons = useSelector((state: any) => state.toolbar.buttons);
  const currentContact = useSelector((state: any) => state.toolbar.contact);

  const nSQL = useSelector((state: any) => state.db.nSQL);
  let theme = VDESIGN.DESIGN_THEME_DEFAULT;
  const styles = useSelector((state: any) => {
    
    switch (state.design.theme) {
      case VDESIGN.DESIGN_THEME_OCEAN:
        theme = VDESIGN.DESIGN_THEME_OCEAN;
        return themeOcean;
      case VDESIGN.DESIGN_THEME_DEFAULT:
        theme = VDESIGN.DESIGN_THEME_DEFAULT;
        return themeDefault;
      default:
        theme = VDESIGN.DESIGN_THEME_DEFAULT;
        return themeDefault;
    }
  });

  useEffect(() => {
    if (!Array.isArray(buttons) || typeof nSQL !== "function") return;
  });

  return (
    <div className={styles[`Toolbar-${theme}`]}>
      {buttons.map((button: any, key: number) => {
        button.nSQL = nSQL;
        return (
          <ToolbarButton
            key={key}
            {...button}
            contact={currentContact}
            nSQL={nSQL}
            styles={styles}
            theme={theme}
          />
        );
      })}
    </div>
  );
}
