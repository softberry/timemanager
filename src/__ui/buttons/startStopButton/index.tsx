import React, { useState, useEffect } from "react";

import styles from "./button.module.scss";

export default function StartStopButton({
  onComplete,
  waitForSeconds = 3,
  buttonLabel = { active: "WAIT", inactive: "START" }
}: IStartStopButtonProps) {
  const [active, setActive] = useState(false);
  const [countdown, setCountDown] = useState(0);

  const [turnWheel, setTurnWheel] = useState(styles.TimerAnimation);
  let strCountDown: string = !active
    ? ""
    : (waitForSeconds - countdown).toString();

  const infoText = `Press and hold the button for ${strCountDown} seconds`;

  useEffect(() => {
    let intervalId: number;

    if (!active) {
      setCountDown(0);
      return;
    }
    if (active) {
      intervalId = window.setTimeout(() => {
        setCountDown(countdown + 1);
      }, 1000);

      if (countdown === waitForSeconds) {
        clearInterval(intervalId);
        setActive(false);
        if (buttonLabel.inactive === "START") {
          setTurnWheel(`${styles.TimerAnimation} ${styles.TimerAnimationOn}`);
        } else {
          setTurnWheel(`${styles.TimerAnimation}`);
        }
      }
    }
    return () => {
      if (countdown === waitForSeconds) {
        clearInterval(intervalId);
        window.setTimeout(onComplete, 500);
      }
    };
  }, [
    active,
    countdown,
    onComplete,
    waitForSeconds,
    turnWheel,
    buttonLabel.inactive
  ]);

  const stateClass = !active
    ? styles.Button
    : [styles.Button, styles.active].join(" ");
  return (
    <div
      className={styles.ButtonWrapper}
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
        <div className={turnWheel}></div>
      </div>
    </div>
  );
}