import React, { useState, useEffect } from "react";

import { VDESIGN } from "../../../store/constant-enums";
import { useTheme, useThemeStyle } from "../../typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

export default function StartStopButton({
  onComplete,
  waitForSeconds = 3,
  buttonLabel = { active: "WAIT", inactive: "START" }
}: IStartStopButtonProps) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  const [active, setActive] = useState(false);
  const [countdown, setCountDown] = useState(0);

  const [turnWheel, setTurnWheel] = useState(styles[`TimerAnimation-${theme}`]);
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
          setTurnWheel(
            `${styles[`TimerAnimation-${theme}`]} 
            ${styles[`TimerAnimationOn-${theme}`]}`
          );
        } else {
          setTurnWheel(`${styles[`TimerAnimation-${theme}`]}`);
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
    buttonLabel.inactive,
    styles,
    theme
  ]);

  const stateClass = !active
    ? styles[`Button-${theme}`]
    : [styles[`Button-${theme}`], styles[`active-${theme}`]].join(" ");

  return (
    <div
      className={styles.ButtonWrapper}
      onMouseDown={() => {
        setActive(true);
      }}
      onMouseUp={() => {
        setActive(false);
      }}
      onTouchStart={() => {
        setActive(true);
      }}
      onTouchEnd={() => {
        setActive(false);
      }}
    >
      {active && (
        <div className={styles[`PressAndHoldInfo-${theme}`]}>{infoText}</div>
      )}
      <div className={stateClass}>
        {active && (
          <div className={styles[`CountDown-${theme}`]}>{strCountDown}</div>
        )}
        <div className={turnWheel}></div>
      </div>
    </div>
  );
}
