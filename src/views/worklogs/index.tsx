import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TYPES from "../../store/action-types";

import styles from "./worklogs.module.scss";
import List from "../../components/list";
import DefaultLayout from "../../layout/layout.default";

import EventsCalendar from "../../components/eventsCalendar";

// TODO: This module currently not being used and must be re-written according to following issues:
//  https://github.com/softberry/timemanager/issues/40
//  https://github.com/softberry/timemanager/issues/32

function WorklogsView() {
  const [ready, setReady] = useState(false);
  const nSQL = useSelector((state: any) => state.db.nSQL);
  const [worklog, setWorklog] = useState([]);
  useEffect(() => {
    if (typeof nSQL !== "function") return;

    nSQL("workDurationTable")
      .query("select")
      .exec()
      .then((list: any) => {
        setWorklog(list);
        setReady(true);
      });
  }, [nSQL]);

  useEffect(() => {
    if (!ready) return;
  }, [ready]);
  useDispatch()({ type: TYPES.TOOLBAR_CALENDAR });
  return (
    <DefaultLayout>
      <div className={styles.WorkLogs}>
        <EventsCalendar />

        <List list={worklog} type="WORK_HISTORY" />
      </div>
    </DefaultLayout>
  );
}

export default WorklogsView;
