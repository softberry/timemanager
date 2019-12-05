import React, { useReducer, useEffect } from "react";
import styles from "./worklogs.module.scss";
import List from "../../components/list";
import DefaultLayout from "../../layout/layout.default";
import { nSQL } from "@nano-sql/core";

import EventsCalender from "../../__ui/eventsCalendar";
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

      nSQL("workDurationTable")
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
export default function WorkLogs({ location }) {
  location.state.toolbar = [];
  const [worklog, dispatch] = useReducer(reducer, {
    connected: "FALSE",
    title: "Worked Hours",
    type: "WORK_HISTORY",
    list: []
  });

  useEffect(() => {
    if (worklog.connected === "FALSE") {
      dispatch({ type: types.CONNECT, dispatch });
      return;
    }
    if (worklog.connected === "TRYING") {
      return;
    }
  }, [worklog.connected]);

  return (
    <DefaultLayout>
      <div className={styles.WorkLogs}>
        <EventsCalender />

        <List {...worklog} />
      </div>
    </DefaultLayout>
  );
}
