import React from "react";
import styles from "./counter.module.scss";

import { twoDigit } from "../../lib/counter.helpers";

export default function Counter({ hour, minute,second, counting = false }) {
  const beatClass = [styles.Beats];
  counting && beatClass.push(styles.beat);
  const containerOpacity = { opacity: counting ? 1 : 0.05 };
  return (
    <div className={styles.Container} style={containerOpacity}>
      <span className={styles.Hour}>{twoDigit(hour)}</span>
      <span className={beatClass.join(" ")}>:</span>
      <span className={styles.Minute}>{twoDigit(minute)}</span>
      {counting && <span className={styles.Second}>{twoDigit(second)}</span>}
    </div>
  );
}