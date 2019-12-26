import React from "react";

import { timeDiff, twoDigit } from "../../lib/counter.helpers";
import styles from "./list.module.scss";
import { Link } from "react-router-dom";

function workHistoryList({ list }) {
  return (
    <>
      {list.map((item, key) => {
        const diffData = {
          start: new Date(item.start).getTime(),
          end: new Date(item.finish).getTime()
        };
        const diff = timeDiff(diffData.start, diffData.end);
        return (
          <div
            to={`/worklog/edit/${item.id}`}
            key={key}
            className={styles.ListItem}
          >
            <div className={styles.ListItemContact}>{item.contact} - </div>
            <div className={styles.ListItemDuration}>
              {twoDigit(diff.hour)}:{twoDigit(diff.minute)}:
              {twoDigit(diff.second)}
            </div>
          </div>
        );
      })}
    </>
  );
}

function contactsList({ list }) {
  return (
    <>
      <div className={styles.ListTitle}>
        <h1 className={styles.ListTitleText}>Contacts</h1>
      </div>
      {list.map((item, key) => (
        <Link
          to={`/contact/details/${item.id}`}
          key={key}
          className={styles.ListItem}
        >
          <div className={styles.ListItemContact}>
            {item.name} {item.surname}
          </div>
        </Link>
      ))}
    </>
  );
}

export default function List({ type, list = [] }) {
  return (
    <>
      <section className={styles.List}>
        <div className={styles.ListTitle}></div>
        {type === "WORK_HISTORY" && workHistoryList({ list })}
        {type === "CONTACTS_LIST" && contactsList({ list })}
      </section>
    </>
  );
}
