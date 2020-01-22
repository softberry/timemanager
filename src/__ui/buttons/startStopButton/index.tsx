import React, { useState, useEffect } from "react";

import { VDESIGN } from "../../../store/constant-enums";
import { useTheme, useThemeStyle } from "../../typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

import { IStartStopButtonProps } from "../../../__typings/interfaces";
const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

/**
 * Special button delays onclick event for a given time.
 * To avoid accidental clicks or touchs to start/stop timer,
 * craftmen must keep button
 * at least given `waitForSeconds` of time.
 */
function StartStopButton({
  onComplete,
  waitForSeconds = 3,
  isTurning = false,
}: IStartStopButtonProps) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isCountingDown, setIsCountingDown] = useState<boolean>(false);
  const [counter, setCounter] = useState(0);

  const [turnWheel, setTurnWheel] = useState<boolean>(isTurning);
  let strCountDown: string = isCountingDown
    ? (waitForSeconds - counter).toString()
    : "";

  const infoText = `Press and hold the button for ${strCountDown} seconds`;

  useEffect(() => {
    if (isTurning !== turnWheel) {
      setTurnWheel(isTurning);
    }
  }, [isTurning, turnWheel]);

  useEffect(() => {
    let intervalId: number = -1;
    if (isCountingDown) {
      if (waitForSeconds > counter) {
        intervalId = window.setTimeout(() => {
          setCounter(counter + 1);
        }, 1000);
      }
      if (counter >= waitForSeconds) {
        clearInterval(intervalId);
        const currentActiveState = isActive;
        setIsActive(!currentActiveState);
        onComplete();
        setIsCountingDown(false);
      }
    }
  }, [counter, isActive, isCountingDown, onComplete, waitForSeconds]);

  const stateClass = !isActive
    ? styles[`Button-${theme}`]
    : [styles[`Button-${theme}`], styles[`active-${theme}`]].join(" ");

  return (
    <div className={styles.ButtonWrapper}>
      {isCountingDown && (
        <div className={styles[`PressAndHoldInfo-${theme}`]}>{infoText}</div>
      )}
      <div
        className={stateClass}
        onMouseDown={() => {
          setCounter(0);
          setIsCountingDown(true);
        }}
        onMouseUp={() => {
          setIsCountingDown(false);
        }}
        onTouchStart={() => {
          setCounter(0);
          setIsCountingDown(true);
        }}
        onTouchEnd={() => {
          setIsCountingDown(false);
        }}
      >
        {isCountingDown && (
          <div className={styles[`CountDown-${theme}`]}>{strCountDown}</div>
        )}
        <div
          className={styles[`TimerAnimation-${theme}`]}
          data-turning={turnWheel ? "yes" : "no"}
        ></div>
      </div>
    </div>
  );
}

export default StartStopButton;
