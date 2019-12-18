import React, { useState, useEffect } from "react";
import { nSQL } from "@nano-sql/core";

// Table Models
import counterModelTables from "./models/data.model";

// Dummy Tables
import { createRandomContacts } from "../db/_dummy/contacts.dev";

// const isDEV = process.env.NODE_ENV === "development";
const isPROD = process.env.NODE_ENV === "production";

function dbExists(dbname = "shoplist_local") {
  const dbList = nSQL().listDatabases();
  return dbList.includes(dbname);
}

/////////////////
function NanoDatabase({ children }) {
  const [ready, setReady] = useState("NOT_READY");

  useEffect(() => {
    if (ready === "NOT_READY" && dbExists()) {
      setReady("GETTING_READY");
      return nSQL("contactsTable")
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
          nSQL().useDatabase("shoplist_local");
          setReady("BEFORE_READY");
          console.log(ready);
          // return nSQL("contactsTable")
          //   .query("select")
          //   .exec();
        })
        // .then(items => {
        //   if (isPROD || items.length > 0) {
        //     return nSQL("contactsTable")
        //       .query("select")
        //       .exec();
        //   } else {
        //     const contacts = createRandomContacts(50);

        //     return nSQL("contactsTable")
        //       .query("upsert", contacts)
        //       .exec();
        //   }
        // })
        .catch(err => {
          console.warn(err);
        });
    }
  }, [ready]);
  useEffect(() => {
    console.log(ready);
    if (ready !== "BEFORE_READY") return;
    nSQL("contactsTable")
      .query("select")
      .exec()
      .then(items => {
        console.log(isPROD)
        if (isPROD || items.length > 0) {
          setReady("READY");
        } else {
          const contacts = createRandomContacts(50);

          nSQL("contactsTable")
            .query("upsert", contacts)
            .exec()
            .then(() => {
              setReady("READY");
            });
        }
      });
  });

  return (
    <>
      {ready === "READY" && <>{children}</>}
      {ready !== "READY" && <div>Loading</div>}
    </>
  );
}

export default NanoDatabase;
