import React from "react";
import Icon from "@material-ui/core/Icon";

import styles from "./nav.module.scss";

export default function Nav() {
  return (
    <nav className={styles.Nav}>
      <Icon>menu</Icon>
    </nav>
  );
}
