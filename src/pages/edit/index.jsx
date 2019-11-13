import React, { useEffect, useState } from "react";

import DefaultLayout from "../../layout/layout.default";
import { nSQL } from "@nano-sql/core";
import styles from "./edit.module.scss";

import CustomerDetails from "./customers";

/**
 * Renders editable form from given values in given table
 * @param {Object} props
 */

export default function Edit(props) {
  const [table, setTable] = useState({ id: null });
  const [queryState, setQueryState] = useState("INITIAL");

  function getSelectedData() {
    return nSQL("customersTable")
      .query("select")
      .where(["id", "=", props.match.params.id])
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
        <div>Error reading Customers Data Table!</div>
      )}
      <section className={styles.Edit}>
        <CustomerDetails customer={table} />
      </section>
    </DefaultLayout>
  );
}
