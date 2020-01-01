import React from "react";

import styles from "./settings.module.scss";

export default function Settings({ view }) {
  const viewClass = styles[`Settings-${view}`];
  return (
    <section className={viewClass}>
      <h1>Settings</h1>
      <p>To be develeoped</p>
    </section>
  );
}
