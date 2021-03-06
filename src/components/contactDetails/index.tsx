import { useState, useEffect, useContext, ReactElement } from "react";

import {
  IContactDetailsComponent,
  IContactsTableModel,
  NewEntryEnums,
  ViewSettingsEnums,
  ThemeEnums,
} from "../../__typings/interfaces.d";

import { useDispatch } from "react-redux";
import ReadOnlyDetails from "./readOnlyDeatils";
import EditContact from "./editContact";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import ViewContext from "../../views/index";
import WorklogListOfContact from "../../components/workLogsListOfContact";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

const ContactDetails = ({ contact, type }: IContactDetailsComponent): ReactElement => {
  const view = useContext(ViewContext);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isNewContact, setIsNewContact] = useState(false);
  const [currentContact, setCurrentContact] = useState(contact);
  const dispatch = useDispatch();

  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  const viewClass = styles[`ContactDetails-${theme}-${view}`];

  function switchView(contact: IContactsTableModel, readOnly?: boolean): void {
    setCurrentContact(contact);
    if (typeof readOnly !== undefined) {
      setIsReadOnly(readOnly === true);
    }
  }

  const [fullName, setFullName] = useState(`${currentContact.name} ${currentContact.surname}`);

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

  useEffect(() => {
    if (isReadOnly) {
      dispatch({
        type: ViewSettingsEnums.UPDATE_TITLE,
        title: "Contact Details",
      });
    } else {
      const EditableDetailTitle = isNewContact ? "Create New Contact" : "Edit Contact Details";
      dispatch({
        type: ViewSettingsEnums.UPDATE_TITLE,
        title: EditableDetailTitle,
      });
    }
  }, [dispatch, isNewContact, isReadOnly]);
  if (isReadOnly) {
    return (
      <div className={viewClass}>
        <ReadOnlyDetails contact={currentContact} editContactHandler={switchView} />
        <WorklogListOfContact contact={currentContact} />
      </div>
    );
  }
  return (
    <div className={viewClass}>
      <EditContact
        contact={currentContact}
        theme={theme}
        styles={styles}
        view={view}
        onComplete={(contact: IContactsTableModel): void => {
          switchView(contact, true);
          setIsReadOnly(true);
        }}
      />
    </div>
  );
};
export default ContactDetails;
