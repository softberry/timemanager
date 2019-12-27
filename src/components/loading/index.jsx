import React from "react";
import { CircularProgress } from "@material-ui/core";
import styles from "./loading.module.scss";

export default function() {
  return (
    <div className={styles.Loading}>
      <CircularProgress className={styles.Loading} />
    </div>
  );
}
