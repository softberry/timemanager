import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import DefaultLayout from "../../layout/layout.default";
import styles from "./edit.module.scss";

import ContactDetails from "../contact/contact.details";


/**
 * Renders editable form from given values in given table
 * @param {Object} props
 */
export default function Contact(props) {
  const [table, setTable] = useState({ id: null });
  const [queryState, setQueryState] = useState("INITIAL");
  const nSQL = useSelector(state => state.db.nSQL);

  useEffect(() => {
    if (typeof nSQL === "undefined") return;
  }, [nSQL]);

  if (queryState === "INITIAL") {
    setQueryState("TRYING");
    nSQL("contactsTable")
      .query("select")
      .where(["id", "=", props.match.params.id])
      .exec()
      .then(item => {
        setTable(item[0]);
        setQueryState("READY");
      })
      .catch(err => {
        setQueryState("ERRORED");
      });
  }

  useEffect(() => {
    if (queryState === "TRYING") {
      return;
    }
  }, [queryState]);
  // {props.match.params.type}:{props.match.params.id}

  return (
    <DefaultLayout>
      {queryState === "ERRORED" && (
        <div>Error reading Contact's Data Table!</div>
      )}
      <section className={styles.Edit}>
        {queryState === "READY" && (
          <ContactDetails contact={table} type={props.match.params.type} />
        )}
      </section>
    </DefaultLayout>
  );
}
