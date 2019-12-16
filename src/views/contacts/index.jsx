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

      nSQL("contactsTable")
        .query("select")
        .where(["id", "!=", "new-contact-to-edit"])
        .orderBy(["name ASC", "surname ASC"])
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
        connected: "FALSE"
      };
    }
  }
}
export default function Contacts({ location }) {
  const [contacts, dispatch] = useReducer(reducer, {
    connected: "FALSE",
    title: "Contacts",
    type: "CONTACTS_LIST",
    list: []
  });
  location.state.toolbar = [
    {
      type: "add",
      disabled: false,
      hidden: false,
      to: "/edit/contact/new-contact-to-edit"
    },
    {
      type: "edit",
      disabled: true,
      hidden: false
    }
  ];
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
