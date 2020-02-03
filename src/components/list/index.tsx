import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Badge from "../../__ui/badge";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import { VDESIGN } from "../../store/constant-enums";
import { useSelector } from "react-redux";


const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

function WorkLogBadgeFromID({ view, contactID }: any) {
  const [queried, setQueried] = useState(false);
  const [count, setCount] = useState(0);
  const nSQL = useSelector((state: any) => state.db.nSQL);

  useEffect(() => {
    if (typeof nSQL !== "function" || queried) return;
    setQueried(true);
    nSQL("workTable")
      .presetQuery("getWorkLogsOfContact", { contactID })
      .exec()
      .then((logs: []) => {
        setCount(logs.length);
      });
  }, [nSQL, contactID, queried]);
  useEffect(() => {
    if (count === 0) return;
  }, [count]);

  return <>{count > 0 && <Badge content={count} view={view} />}</>;
}

function contactsList({ list, theme, styles, view }: any) {
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
          <div className={styles[`ListItem-${theme}-Badge`]}>
            <WorkLogBadgeFromID view={view} contactID={item.id} />
          </div>
        </Link>
      ))}
    </>
  );
}

function List({ type, list = [], view }: any) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  return (
    <>
      <section className={styles[`List-${theme}`]}>

        {type === "CONTACTS_LIST" &&
          contactsList({ list, theme, styles, view })}
      </section>
    </>
  );
}

export default List;
