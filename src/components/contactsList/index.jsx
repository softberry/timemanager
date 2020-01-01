import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./contacts-list.module.scss";
import List from "../list";

import TYPES from "../../store/types";

export default function ContactsList({ view = "secondary" }) {
  const nSQL = useSelector(state => state.db.nSQL);
  const [ready, setReady] = useState(false);
  const [contacts, setContacts] = useState([]);
  const viewClass = styles[`Contacts-${view}`];
  useEffect(() => {
    if (typeof nSQL !== "function") return;

    nSQL("contactsTable")
      .query("select")
      .where(["id", "!=", "new-contact-to-edit"])
      .orderBy(["name ASC", "surname ASC"])
      .exec()
      .then(list => {
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
      <List title="Contacts" list={contacts} type="CONTACTS_LIST" />
    </div>
  );
}
