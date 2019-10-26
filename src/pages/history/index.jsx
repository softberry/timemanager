import React from "react";
import DefaultLayout from "../../layout/layout.default";
import List from "../../components/list";

import styles from "./history.module.scss";
const dummy = {
  title: "testlist",
  type:"WORK_HISTORY",
  list: [
    { customer: "Max Mustermann", date: "2019-10-24", duration: "00:30" },
    { customer: "Matt Muttermann", date: "2018-11-01", duration: "02:30" },
    { customer: "Matt Muttermann", date: "2018-11-01", duration: "02:30" },
    { customer: "Matt Muttermann", date: "2018-11-01", duration: "02:30" },
    { customer: "Matt Muttermann", date: "2018-11-01", duration: "02:30" },
    { customer: "Matt Muttermann", date: "2018-11-01", duration: "02:30" },
    { customer: "Matt Muttermann", date: "2018-11-01", duration: "02:30" },
    { customer: "Matt Muttermann", date: "2018-11-01", duration: "02:30" },
    { customer: "Matt Muttermann", date: "2018-11-01", duration: "02:30" },
    { customer: "Matt Muttermann", date: "2018-11-01", duration: "02:30" },
    { customer: "Matt Muttermann", date: "2018-11-01", duration: "02:30" },
    { customer: "M. Jemand", date: "2018-01-05", duration: "02:315" }
  ]
};
export default function History({ title, content = [] }) {
  return (
    <DefaultLayout>
      <div className={styles.History}>
        <List {...dummy} />
      </div>
    </DefaultLayout>
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
