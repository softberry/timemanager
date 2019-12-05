import React from "react";

import styles from "./settings.module.scss";
import DefaultLayout from "../../layout/layout.default";

export default function Settings({ location }) {
  location.state.toolbar = [];
  return (
    <DefaultLayout>
      <div className={styles.Settings}>
        <p>Settings</p>
      </div>
    </DefaultLayout>
  );
}
