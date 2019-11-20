import React, { useState, useEffect } from "react";
import { nSQL } from "@nano-sql/core";

import nSQLEventListeners from "./actions";
// Table Models
import counterModelTables from "./models/data.model";

// Dummy Tables
import { createRandomCustomers } from "../db/_dummy/customers.dev";

// const isDEV = process.env.NODE_ENV === "development";
const isPROD = process.env.NODE_ENV === "production";

function dbExists(dbname = "shoplist_local") {
  const dbList = nSQL().listDatabases();
  return dbList.includes(dbname);
}

/////////////////
function NanoDatabase({ children, onDataChange }) {
  const [ready, setReady] = useState("NOT_READY");

  useEffect(() => {
    if (ready === "NOT_READY" && dbExists()) {
      setReady("GETTING_READY");
      return nSQL("customersTable")
        .query("select")
        .exec();
    } else if (ready === "NOT_READY") {
      setReady("GETTING_READY");
      nSQL()
        .createDatabase({
          id: "shoplist_local", // can be anything that's a string
          mode: "PERM", // save changes to IndexedDB, WebSQL or SnapDB!
          tables: [
            // tables can be created as part of createDatabase or created later with create table queries
            ...counterModelTables
          ],
          version: 3, // current schema/database version
          onVersionUpdate: prevVersion => {
            // migrate versions
            return new Promise((res, rej) => {
              switch (prevVersion) {
                case 1:
                  // migrate v1 to v2
                  res(2);
                  break;
                case 2:
                  // migrate v2 to v3
                  res(3);
                  break;
                default:
                  console.log(
                    `Consider version Upgrade gor nano-SQL from ${prevVersion}`
                  );
              }
            });
          }
        })
        .then(() => {
          // ready to query!
          setReady("READY");
          return nSQL("customersTable")
            .query("select")
            .exec();
        })
        .then(items => {
          if (isPROD || items.length > 0) {
            return nSQL("customersTable")
              .query("select")
              .exec();
          } else {
            const customers = createRandomCustomers(50);

            return nSQL("customersTable")
              .query("upsert", customers)
              .exec();
          }
        })
        .then(() => {
          nSQLEventListeners(nSQL, onDataChange);
        })
        .catch(err => {
          console.warn(err);
        });
    }
  }, [ready, onDataChange]);

  return (
    <>
      {ready && <>{children}</>}
      {!ready && <div>Loading</div>}
    </>
  );
}

export default NanoDatabase;
