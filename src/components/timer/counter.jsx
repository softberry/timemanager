import React from "react";
import styles from './counter.module.css'
function twoDigit(n) {
  return `0${n}`.slice(-2);
}

export default function Counter({ hour, minute, second }) {
  return (
    <div>
      <span>{twoDigit(hour)}</span>:<span>{twoDigit(minute)}</span>&nbsp;
      <span className={styles.Second}>{twoDigit(second)}</span>
    </div>
  );
}
