import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layout/layout.default";
import { nSQL } from "@nano-sql/core";
import styles from "./edit.module.scss";

import Input from "../../__ui/input";

/**
 * Renders editable form from given values in given table
 * @param {Object} props
 */

export default function Edit(props) {
  const [table, setTable] = useState({ id: null });
  const [queryState, setQueryState] = useState("INITIAL");
  const availableTables = {
    customer: "customersTable",
    worklog: "workDurationTable"
  };
  function getSelectedData() {
    return nSQL(tableName)
      .query("select")
      .where(["id", "=", props.match.params.id])
      .exec()
      .then(item => {
        setTable(item[0]);
        setQueryState("READY");
      })
      .catch(err => {
        if (queryState === "INITIAL") {
          setQueryState("RETRYING");
          setTimeout(() => {
            getSelectedData();
          }, 300);
        }
        //TODO: add error handler for second try prompt to user
      });
  }

  const tableName = availableTables[props.match.params.type];
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
      <section className={styles.Edit}>
        <div>
          {Object.keys(table).map((item, key) => {
            const field = {
              name: item,
              value: table[item]
            };
            return (
              <div key={key}>
                <Input {...field} />
              </div>
            );
          })}
        </div>
      </section>
    </DefaultLayout>
  );
}
