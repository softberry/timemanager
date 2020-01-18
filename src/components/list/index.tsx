import React from "react";
import { Link } from "react-router-dom";

import { H1 } from "../../__ui/headline";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import { VDESIGN } from "../../store/constant-enums";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

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
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  return (
    <>
      <section className={styles[`List-${theme}`]}>
        <div className={styles[`List-${theme}-Title`]}>
          <H1>Contacts</H1>
        </div>
        {type === "CONTACTS_LIST" && contactsList({ list, theme, styles })}
      </section>
    </>
  );
}
