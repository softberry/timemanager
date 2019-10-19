import React from "react";
import { nSQL } from "@nano-sql/core";
// Table Models
import userTable from "./models/user.model";
import counterTable from "./models/counter.model";
//////////////////
export default function NanoDatabase() {
  nSQL()
    .createDatabase({
      id: "shoplist_local", // can be anything that's a string
      mode: "PERM", // save changes to IndexedDB, WebSQL or SnapDB!
      tables: [
        // tables can be created as part of createDatabase or created later with create table queries
        userTable,
        counterTable
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
    })
    .catch(() => {
      // ran into a problem
    });

  return <></>;
}
