import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layout/layout.default";
import { nSQL } from "@nano-sql/core";
import styles from "./edit.module.scss";

import ContactDetails from "./contacts";

/**
 * Renders editable form from given values in given table
 * @param {Object} props
 */
export default function EditContacts(props) {
  const [table, setTable] = useState({ id: null });
  const [queryState, setQueryState] = useState("INITIAL");

  function getSelectedData() {
    const edit = nSQL("contactsTable")
      .query("select")
      .where(["id", "=", props.match.params.id]);

    const createBeforeEdit = nSQL("contactsTable").presetQuery(
      "createNewEmptyUserEntryForEdit"
    );

    const sql =
      props.match.params.id === "new-contact-to-edit" ? createBeforeEdit : edit;
    return sql
      .exec()
      .then(item => {
        setTable(item[0]);
        setQueryState("READY");
      })
      .catch(err => {
        if (queryState === "INITIAL") {
          if (queryState === "RETRYING") {
            setQueryState("ERRORED");
          }
          setQueryState("RETRYING");
          setTimeout(() => {
            getSelectedData();
          }, 300);
        }
      });
  }

  useEffect(() => {
    if (queryState === "INITIAL") {
      getSelectedData();
      return;
    }
    if (queryState !== "READY") return;
  });
  // {props.match.params.type}:{props.match.params.id}
  return (
    <DefaultLayout>
      {queryState === "ERRORED" && (
        <div>Error reading Contact's Data Table!</div>
      )}
      <section className={styles.Edit}>
        <ContactDetails contact={table} />
      </section>
    </DefaultLayout>
  );
}
