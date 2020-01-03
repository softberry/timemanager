import React from "react";
import { useSelector } from "react-redux";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../store/constant-enums";

import { Link } from "react-router-dom";

function contactsList({ list, styles }: any) {
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
  const styles = useSelector((state: any) => {
    switch (state.design.theme) {
      case VDESIGN.DESIGN_THEME_OCEAN:
        return themeOcean;
      case VDESIGN.DESIGN_THEME_DEFAULT:
        return themeDefault;
      default:
        return themeDefault;
    }
  });

  return (
    <>
      <section className={styles.List}>
        <div className={styles.ListTitle}></div>
        {type === "CONTACTS_LIST" && contactsList({ list, styles })}
      </section>
    </>
  );
}
