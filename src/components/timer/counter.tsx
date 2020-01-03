import React from "react";

import { twoDigit } from "../../lib/counter.helpers";

export default function Counter({
  hour,
  minute,
  second,
  counting = false,
  styles
}: ICounterDiffTime) {
  const beatClass = [styles.Beats];
  counting && beatClass.push(styles.beat);
  const containerOpacity = { opacity: counting ? 1 : 0.05 };
  return (
    <div className={styles.Container} style={containerOpacity}>
      <span className={styles.Hour}>{twoDigit(hour.toString())}</span>
      <span className={beatClass.join(" ")}>:</span>
      <span className={styles.Minute}>{twoDigit(minute.toString())}</span>
      {counting && (
        <span className={styles.Second}>{twoDigit(second.toString())}</span>
      )}
    </div>
  );
}
