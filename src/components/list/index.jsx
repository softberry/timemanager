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
            to={`/edit/worklog/${item.id}`}
            key={key}
            className={styles.ListItem}
          >
            <div className={styles.ListItemCustomer}>{item.customer} - </div>
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

function customersList({ list }) {
  return (
    <>
      {list.map((item, key) => (
        <Link
          to={`/edit/customer/${item.id}`}
          key={key}
          className={styles.ListItem}
        >
          <div className={styles.ListItemCustomer}>
            {item.name} {item.surname}
          </div>
        </Link>
      ))}
    </>
  );
}

export default function List({ title, type, list = [], hasTableHead = false }) {
  return (
    <>
      <section className={styles.List}>
        <div className={styles.ListTitle}>
          <h1 className={styles.ListTitleText}>{title}</h1>
        </div>
        {type === "WORK_HISTORY" && workHistoryList({ list })}
        {type === "CUSTOMERS_LIST" && customersList({ list })}
      </section>
    </>
  );
}
