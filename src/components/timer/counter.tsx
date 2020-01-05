import React from "react";

import { twoDigit } from "../../lib/counter.helpers";

export default function Counter({
  hour,
  minute,
  second,
  counting = false,
  styles,
  theme
}: ICounterDiffTime) {
  const beatClass = [styles[`Beats-${theme}`]];
  counting && beatClass.push(styles[`beats-${theme}`]);
  const containerOpacity = { opacity: counting ? 1 : 0.05 };

  return (
    <div className={styles[`Counter-${theme}`]} style={containerOpacity}>
      <span className={styles[`Hour-${theme}`]}>
        {twoDigit(hour.toString())}
      </span>
      <span className={beatClass.join(" ")}>:</span>
      <span className={styles[`Minute-${theme}`]}>
        {twoDigit(minute.toString())}
      </span>
      {counting && (
        <span className={styles[`Second-${theme}`]}>
          {twoDigit(second.toString())}
        </span>
      )}
    </div>
  );
}
