import React from "react";
import styles from "./list.module.scss";
import { Link } from "react-router-dom";

function contactsList({ list }: any) {
  return (
    <>
      <div className={styles.ListTitle}>
        <h1 className={styles.ListTitleText}>Contacts</h1>
      </div>
      {list.map((item: any, key: number) => (
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

export default function List({ type, list = [] }: any) {
  return (
    <>
      <section className={styles.List}>
        <div className={styles.ListTitle}></div>
        {type === "CONTACTS_LIST" && contactsList({ list })}
      </section>
    </>
  );
}
