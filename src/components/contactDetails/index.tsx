import React, { useState, useEffect, useContext } from "react";

import {
  IContactDetailsComponent,
  IworkTableModel,
} from "../../__typings/interfaces.d";

import { useSelector, useDispatch } from "react-redux";

import TYPES from "../../store/action-types";
import ReadOnlyDetails from "./readOnlyDeatils";
import EditableDetails from "./editableDetails";

import Worklogs from "../worklogs";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import { VDESIGN } from "../../store/constant-enums";
import ViewContext from "../../views/index";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

function ContactDetails({ contact, type }: IContactDetailsComponent) {
  const view = useContext(ViewContext);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isNewContact, setIsNewContact] = useState(false);
  const dispatch = useDispatch();

  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  const nSQL = useSelector((state: any) => state.db.nSQL);
  const viewClass = styles[`ContactDetails-${theme}-${view}`];

  useEffect(() => {
    if (typeof nSQL !== "function") return;
  }, [nSQL]);

  const [fullName, setFullName] = useState(
    `${contact.name} ${contact.surname}`
  );

  nSQL("workTable")
    .query("select")
    .where(["contactID", "=", contact.id])
    .exec()
    .then((worklogs: [IworkTableModel]) => {
      dispatch({ type: TYPES.WORKLOGS_UPDATE, worklogs });
    });

  useEffect(() => {
    if (contact.id === null) return;
    if (contact.id === "new-contact-to-edit") {
      setIsReadOnly(false);
      setIsNewContact(true);
    } else {
      setIsReadOnly(type === "details");
    }
    if (fullName.length > 10) {
      const shortName = `${contact.name}`.slice(0, 1);
      setFullName(`${shortName}. ${contact.surname}`);
    }
  }, [setFullName, setIsNewContact, fullName, contact, type]);

  if (isReadOnly) {
    dispatch({
      type: TYPES.VIEWSETTINGS.UPDATE_TITLE,
      title: "Contact Details",
    });

    return (
      <div className={viewClass}>
        <ReadOnlyDetails
          contact={contact}
          propsClass={{ styles, theme, view }}
        />
        <Worklogs {...contact} />
      </div>
    );
  }
  const EditableDetailTitle = isNewContact
    ? "Create New Contact"
    : "Edit Contact Details";
  dispatch({
    type: TYPES.VIEWSETTINGS.UPDATE_TITLE,
    title: EditableDetailTitle,
  });

  return (
    <div className={viewClass}>
      <EditableDetails {...contact} />
    </div>
  );
}
export default ContactDetails;
