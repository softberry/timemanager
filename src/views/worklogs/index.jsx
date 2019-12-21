import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toolbar } from "../../store/action-types";

import styles from "./worklogs.module.scss";
import List from "../../components/list";
import DefaultLayout from "../../layout/layout.default";

import EventsCalendar from "../../__ui/eventsCalendar";

export default function WorkLogs() {
  const [ready, setReady] = useState(false);
  const nSQL = useSelector(state => state.db.nSQL);
  const [worklog, setWorklog] = useState([]);
  useEffect(() => {
    if (typeof nSQL !== "function") return;

    nSQL("workDurationTable")
      .query("select")
      .exec()
      .then(list => {
        setWorklog(list);
        setReady(true);
      });
  }, [nSQL]);

  useEffect(() => {
    if (!ready) return;
  }, [ready]);
  useDispatch()({ type: toolbar.CALENDAR });
  return (
    <DefaultLayout>
      <div className={styles.WorkLogs}>
        <EventsCalendar />

        <List title="Worked Hours" list={worklog} type="WORK_HISTORY" />
      </div>
    </DefaultLayout>
  );
}
