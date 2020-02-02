import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import List from "../list";

import TYPES from "../../store/action-types";
import { VDESIGN } from "../../store/constant-enums";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import { IContactsTableModel } from "../../__typings/interfaces";

import ViewContext from "../../views/index";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

function ContactsList() {
  const view = useContext(ViewContext);
  const nSQL = useSelector((state: any) => state.db.nSQL);
  const [ready, setReady] = useState(false);
  const [contacts, setContacts] = useState<IContactsTableModel[]>([]);
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  const viewClass = styles[`Contacts-${theme}-${view}`];

  useEffect(() => {
    if (typeof nSQL !== "function") return;

    nSQL("contactsTable")
      .query("select")
      .where(["id", "!=", "new-contact-to-edit"])
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

  useDispatch()({ type: TYPES.TOOLBAR_CONTACTS });

  return (
    <div className={viewClass}>
      <List title="Contacts" list={contacts} type="CONTACTS_LIST" view={view} />
    </div>
  );
}
export default ContactsList;
