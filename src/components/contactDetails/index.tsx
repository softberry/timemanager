import React, { useState, useEffect, useContext } from "react";

import {
  IContactDetailsComponent,
  IworkTableModel,
  IContactsTableModel,
} from "../../__typings/interfaces.d";

import { useSelector, useDispatch } from "react-redux";

import TYPES from "../../store/action-types";
import ReadOnlyDetails from "./readOnlyDeatils";
import EditableDetails from "./editableDetails";

import Worklogs from "../worklogs/index";

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
  const [currentContact, setCurrentContact] = useState(contact);
  const dispatch = useDispatch();

  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  const nSQL = useSelector((state: any) => state.db.nSQL);
  const viewClass = styles[`ContactDetails-${theme}-${view}`];

  function switchView(contact: IContactsTableModel, readOnly?: boolean) {
    setCurrentContact(contact);
    if (typeof readOnly === undefined) return;
    setIsReadOnly(readOnly === true);
  }

  useEffect(() => {}, [nSQL]);

  const [fullName, setFullName] = useState(
    `${currentContact.name} ${currentContact.surname}`
  );

  nSQL("workTable")
    .query("select")
    .where(["contactID", "=", currentContact.id])
    .exec()
    .then((worklogs: [IworkTableModel]) => {
      dispatch({ type: TYPES.WORKLOGS_UPDATE, worklogs });
    });

  useEffect(() => {
    if (currentContact.id === null) return;
    if (currentContact.id === "new-contact-to-edit") {
      setIsReadOnly(false);
      setIsNewContact(true);
    } else {
      setIsReadOnly(type === "details");
    }
    if (fullName.length > 10) {
      const shortName = `${currentContact.name}`.slice(0, 1);
      setFullName(`${shortName}. ${currentContact.surname}`);
    }
  }, [setFullName, setIsNewContact, fullName, currentContact, type]);

  if (isReadOnly) {
    dispatch({
      type: TYPES.VIEWSETTINGS.UPDATE_TITLE,
      title: "Contact Details",
    });

    return (
      <div className={viewClass}>
        <ReadOnlyDetails
          contact={currentContact}
          editContactHandler={switchView}
        />
        <Worklogs {...currentContact} />
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
      <EditableDetails contact={currentContact} updateContact={switchView} />
    </div>
  );
}
export default ContactDetails;
