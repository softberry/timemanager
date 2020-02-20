import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import List from "../list";
import Button from "../../__ui/buttons/button";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import {
  IContactsTableModel,
  ButtonAlignmentEnums,
  ButtonTypeEnums,
  IconEnums,
  NewEntryEnums,
  ViewSettingsEnums,
  DesignEnums,
} from "../../__typings/interfaces.d";

import ViewContext from "../../views/index";

const stylesMap = new Map();
stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

function ContactsList() {
  const view = useContext(ViewContext);
  const nSQL = useSelector((state: any) => state.db.nSQL);
  const [ready, setReady] = useState(false);
  const [contacts, setContacts] = useState<IContactsTableModel[]>([]);
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const dispatch = useDispatch();
  const history = useHistory();
  const createContactClickHandler = () => {
    nSQL("contactsTable")
      .presetQuery("createNewEmptyUserEntryForEdit")
      .exec()
      .then((row: []) => {
        history.push(`/contact/edit/${NewEntryEnums.NEW_CONTACT_ID}`);
      });
  };
  useEffect(() => {
    nSQL("contactsTable")
      .query("select")
      .where(["id", "!=", NewEntryEnums.NEW_CONTACT_ID])
      .orderBy(["name ASC", "surname ASC"])
      .exec()
      .then((list: [IContactsTableModel]) => {
        setContacts(list);
        setReady(true);
      });
  }, [nSQL]);

  useEffect(() => {
    if (!ready) return;
  }, [ready]);

  dispatch({ type: ViewSettingsEnums.UPDATE_TITLE, title: "Contacts" });

  return (
    <div className={styles[`Contacts-${theme}-${view}`]}>
      <div className={styles[`Contacts-${theme}-${view}-Create-New`]}>
        <Button
          icon={IconEnums.ADD}
          align={ButtonAlignmentEnums.RIGHT}
          isDisabled={false}
          onClick={createContactClickHandler}
          type={ButtonTypeEnums.POISITIVE}
        >
          Create Contact
        </Button>
      </div>

      <List title="Contacts" list={contacts} type="CONTACTS_LIST" view={view} />
    </div>
  );
}
export default ContactsList;
