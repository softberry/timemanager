import React from "react";
import { timeDiff, twoDigit } from "../../lib/counter.helpers";
import styles from "./list.module.scss";
import { Link } from "react-router-dom";

function workHistoryList({ list }) {
  return (
    <>
      {list.map((item, key) => {
        const diffData = {
          start: new Date(item.timeStart).getTime(),
          end: new Date(item.timeEnd).getTime()
        };
        const diff = timeDiff(diffData.start, diffData.end);
        return (
          <Link
            to={`/edit/worklog/${item.id}`}
            key={key}
            className={styles.ListItem}
          >
            <div className={styles.ListItemCustomer}>{item.customer}</div>
            <div className={styles.ListItemDate}>{twoDigit(diff.hour)}</div>
            <div className={styles.ListItemDuration}>
              {twoDigit(diff.minute)}
            </div>
          </Link>
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
          <div>{item.id}</div>
        </Link>
      ))}
    </>
  );
}

export default function List({ title, type, list = [] }) {
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
/**
 * Time elapsed : 09 Hours, 59 Minutes, 59 Seconds
 * Date         : DD/MM/YYYY
 * Customer     : Surname, Name [...]
 *
 * History:
 *  - Date - Duration
 *    ...     ...
 *    ...     ...
 *    ...     ...
 *    ...     ...
 * - Add Another Work [+]
 *
 */
