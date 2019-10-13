import React, { useState, useEffect } from "react";

import styles from "./style.module.css";
export default function StartStopButton({
  onComplete,
  waitForSeconds = 3,
  buttonLabel = { active: "WAIT", inactive: "START" }
}) {
  const [active, setActive] = useState(false);
  const [countdown, setCountDown] = useState(0);
  let label = active ? buttonLabel.active : buttonLabel.inactive;
  let strCountDown = active === 0 ? "" : waitForSeconds - countdown;

  const infoText = `Press and hold the button for ${strCountDown} seconds`;

  useEffect(() => {
    let intervalId;

    if (!active) {
      setCountDown(0);
      return;
    }
    if (active) {
      intervalId = setTimeout(() => {
        setCountDown(countdown + 1);
      }, 1000);

      if (countdown === waitForSeconds) {
        setActive(false);
      }
    }
    return () => {
      if (countdown === waitForSeconds) {
        clearInterval(intervalId);
        onComplete();
      }
    };
  }, [active, countdown, onComplete, waitForSeconds]);

  const stateClass = !active
    ? styles.Button
    : [styles.Button, styles.active].join(" ");
  return (
    <div
      className={styles.Container}
      onMouseDown={e => {
        setActive(true);
      }}
      onMouseUp={e => {
        setActive(false);
      }}
      onTouchStart={e => {
        setActive(true);
      }}
      onTouchEnd={e => {
        setActive(false);
      }}
    >
      {active && <div className={styles.PressAndHoldInfo}>{infoText}</div>}
      <div className={stateClass}>
        {active && <div className={styles.CountDown}>{strCountDown}</div>}
        {label}
      </div>
    </div>
  );
}
