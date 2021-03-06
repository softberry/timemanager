import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../components/loading";
import { nSQL } from "@nano-sql/core";

// Table Models
import counterModelTables from "./models/data.model";

// Dummy Tables: Feke content using fakersJS used during development
import { createRandomContacts } from "./_dummy/contacts.dev";
import { DatabaseActionEnums, IDatabaseReducer } from "../__typings/interfaces.d";

// const isDEV = process.env.NODE_ENV === "development";
const isPROD = process.env.NODE_ENV === "production";

function dbExists(dbname = "shoplist_local"): boolean {
  const dbList = nSQL().listDatabases();
  return dbList.includes(dbname);
}

const NanoDatabase: FC = ({ children }) => {
  const [ready, setReady] = useState<string>("NOT_READY");
  const _nSQL = useSelector(({ db }: IDatabaseReducer) => db.action.nSQL);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof _nSQL === "function") {
      setReady("READY");
    }
  }, [setReady, _nSQL]);

  useEffect(() => {
    if (ready === "NOT_READY" && dbExists()) {
      nSQL().useDatabase("shoplist_local");

      setReady("READY");
      return;
    } else if (ready === "NOT_READY") {
      setReady("GETTING_READY");
      nSQL()
        .createDatabase({
          id: "shoplist_local", // can be anything that's a string
          mode: "PERM", // save changes to IndexedDB, WebSQL or SnapDB!
          tables: [
            // tables can be created as part of createDatabase or created later with create table queries
            ...counterModelTables,
          ],
          version: 3, // current schema/database version
          onVersionUpdate: (prevVersion: number) => {
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
                  console.log(`Consider version Upgrade gor nano-SQL from ${prevVersion}`);
              }
            });
          },
        })
        .then(() => {
          // ready to query!
          nSQL().useDatabase("shoplist_local");
          setReady("BEFORE_READY");
        })
        .catch((err: Error) => {
          console.warn(err);
        });
    }
  }, [ready]);
  useEffect(() => {
    if (ready !== "BEFORE_READY") return;
    nSQL("contactsTable")
      .query("select")
      .exec()
      .then(items => {
        if (isPROD || items.length > 0) {
          dispatch({
            type: DatabaseActionEnums.REGISTER_DATABASE,
            action: { nSQL: nSQL },
          });
        } else {
          const contacts = createRandomContacts(50);

          nSQL("contactsTable")
            .query("upsert", contacts)
            .exec()
            .then(() => {
              dispatch({
                type: DatabaseActionEnums.REGISTER_DATABASE,
                action: { nSQL: nSQL },
              });
            });
        }
      });
  });

  return (
    <>
      {ready === "READY" && <>{children}</>}
      {ready !== "READY" && <Loading />}
    </>
  );
};

export default NanoDatabase;
