import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import styles from "./contacts.module.scss";
import List from "../../components/list";

import { toolbar } from "../../store/action-types";

export default function ContactsList() {
  const nSQL = useSelector(state => state.db.nSQL);
  const [ready, setReady] = useState(false);
  const [contacts, setContacts] = useState([]);

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

  useDispatch()({ type: toolbar.CONTACTS });

  return <List title="Contacts" list={contacts} type="CONTACTS_LIST" />;
}
