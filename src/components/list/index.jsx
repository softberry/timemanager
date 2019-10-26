import React from "react";
import styles from "./list.module.scss";

function workHistoryList({ list }) {
  return (
    <>
      {list.map((item, key) => (
        <div key={key} className={styles.ListItem}>
          <div className={styles.ListItemCustomer}>{item.customer}</div>
          <div className={styles.ListItemDate}>
          {item.date}
          </div>
          <div className={styles.ListItemDuration}>{item.duration}</div>
        </div>
      ))}
    </>
  );
}

function customersList({ list }) {
  
  return (
    <>
      {list.map((item, key) => (
        <div key={key} className={styles.ListItem}>
          <div className={styles.ListItemCustomer}>{item.name} {item.surname}</div>
          <div>{item.id}</div>
        </div>
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
