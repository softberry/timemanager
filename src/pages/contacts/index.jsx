import React, { useReducer, useEffect } from "react";
import styles from "./contacts.module.scss";
import List from "../../components/list";
import DefaultLayout from "../../layout/layout.default";
import { nSQL } from "@nano-sql/core";
const types = {
  LIST_READY: "LIST_READY",
  CONNECT: "CONNECT",
  RETRY_CONNECT: "RETRY_CONNECT"
};
function reducer(state, action) {
  switch (action.type) {
    case types.LIST_READY: {
      return {
        ...state,
        connected: "TRUE",
        ...action.info
      };
    }
    case types.CONNECT: {
      if (state.connected === "TRYING") {
        return {
          ...state
        };
      }

      nSQL("customersTable")
        .query("select")
        .exec()
        .then(list => {
          action.dispatch({ type: types.LIST_READY, info: { list: list } });
        })
        .catch(err => {
          setTimeout(() => {
            action.dispatch({
              type: types.RETRY_CONNECT,
              dispatch: action.dispatch
            });
          }, 300);
        });
      return {
        ...state,
        connected: "TRYING"
      };
    }
    case types.RETRY_CONNECT: {
      return {
        ...state,
        connected: "FALSE"
      };
    }
    default: {
      return {
        state,
        connected: "FALSE",
        list: [{ name: "emres" }]
      };
    }
  }
}
export default function Contacts() {
  const [contacts, dispatch] = useReducer(reducer, {
    connected: "FALSE",
    title: "Customers",
    type: "CUSTOMERS_LIST",
    list: []
  });
  useEffect(() => {
    if (contacts.connected === "FALSE") {
      dispatch({ type: types.CONNECT, dispatch });
      return;
    }
    if (contacts.connected === "TRYING") {
      return;
    }
  }, [contacts.connected]);

  return (
    <DefaultLayout>
      <div className={styles.Contacts}>
        <List {...contacts} />
      </div>
    </DefaultLayout>
  );
}
