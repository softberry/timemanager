import React, { FC } from "react";
import { ICounterDiffTime } from "../../__typings/interfaces.d";

import { twoDigit } from "../../lib/counter.helpers";

const Counter: FC<ICounterDiffTime> = ({ hour, minute, second, counting = false, styles, theme }) => {
  const beatClass = [styles[`Beats-${theme}`]];
  counting && beatClass.push(styles[`beats-${theme}`]);
  const containerOpacity = { opacity: counting ? 1 : 0.05 };

  return (
    <div className={styles[`Counter-${theme}`]} style={containerOpacity}>
      <span className={styles[`Hour-${theme}`]}>{twoDigit(hour.toString())}</span>
      <span className={beatClass.join(" ")}>:</span>
      <span className={styles[`Minute-${theme}`]}>{twoDigit(minute.toString())}</span>
      {counting && <span className={styles[`Second-${theme}`]}>{twoDigit(second.toString())}</span>}
    </div>
  );
};

export default Counter;
