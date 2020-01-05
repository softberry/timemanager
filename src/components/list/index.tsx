import React from "react";
import { useSelector } from "react-redux";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../store/constant-enums";

import { Link } from "react-router-dom";

function contactsList({ list, theme, styles }: any) {
  return (
    <>
      {list.map((item: any, key: number) => (
        <Link
          to={`/contact/details/${item.id}`}
          key={key}
          className={styles[`ListItem-${theme}`]}
        >
          <div className={styles[`ListItem-${theme}-Contact`]}>
            {item.name} {item.surname}
          </div>
        </Link>
      ))}
    </>
  );
}

export default function List({ type, list = [] }: any) {
  let theme = VDESIGN.DESIGN_THEME_OCEAN;
  const styles = useSelector((state: any) => {
    switch (state.design.theme) {
      case VDESIGN.DESIGN_THEME_OCEAN:
        theme = VDESIGN.DESIGN_THEME_OCEAN;
        return themeOcean;
      case VDESIGN.DESIGN_THEME_DEFAULT:
        theme = VDESIGN.DESIGN_THEME_DEFAULT;
        return themeDefault;
      default:
        theme = VDESIGN.DESIGN_THEME_DEFAULT;
        return themeDefault;
    }
  });

  return (
    <>
      <section className={styles[`List-${theme}`]}>
        <div className={styles[`List-${theme}-Title`]}>
          <h1 className={styles[`List-${theme}-Title-Text`]}>Contacts</h1>
        </div>
        {type === "CONTACTS_LIST" && contactsList({ list, theme, styles })}
      </section>
    </>
  );
}
