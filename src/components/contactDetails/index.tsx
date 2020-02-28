import React, { useState, useEffect, useContext } from "react";

import {
  IContactDetailsComponent,
  IworkTableModel,
  IContactsTableModel,
  NewEntryEnums,
  ViewSettingsEnums,
  DesignEnums,
} from "../../__typings/interfaces.d";

import { useSelector, useDispatch } from "react-redux";

import ReadOnlyDetails from "./readOnlyDeatils";
import EditableDetails from "./editableDetails";

// import Worklogs from "../worklogs/index";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import ViewContext from "../../views/index";
import WorklogListOfContact from "../../components/workLogsListOfContact";

const stylesMap = new Map();
stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

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

  const [fullName, setFullName] = useState(
    `${currentContact.name} ${currentContact.surname}`
  );

  // TODO: create custom query to have complete worklog including start/finish times and materials
  // IworkTableModel should be returned properly
  nSQL("workTable")
    .query("select")
    .where(["contactID", "=", currentContact.id])
    .exec()
    .then((worklogs: [IworkTableModel]) => {
      //      dispatch({ type: TYPES.WORKLOGS_UPDATE, worklogs });
      //TODO: get all worklogs for the current contact and dispatch result , so list of worklogs in this view should always be uptodate
    });

  useEffect(() => {
    if (currentContact.id === null) return;
    if (currentContact.id === NewEntryEnums.NEW_CONTACT_ID) {
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
      type: ViewSettingsEnums.UPDATE_TITLE,
      title: "Contact Details",
    });

    return (
      <div className={viewClass}>
        <ReadOnlyDetails
          contact={currentContact}
          editContactHandler={switchView}
        />
        <WorklogListOfContact {...currentContact} />
      </div>
    );
  }
  const EditableDetailTitle = isNewContact
    ? "Create New Contact"
    : "Edit Contact Details";
  dispatch({
    type: ViewSettingsEnums.UPDATE_TITLE,
    title: EditableDetailTitle,
  });

  return (
    <div className={viewClass}>
      <EditableDetails contact={currentContact} updateContact={switchView} />
    </div>
  );
}
export default ContactDetails;
