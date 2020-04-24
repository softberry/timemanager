import React, { useState, useEffect, FC } from "react";

import { useTheme, useThemeStyle } from "../../typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

import { ThemeEnums } from "../../../__typings/interfaces.d";
const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

/**
 *
 * props for StartStopButton
 */
export interface IStartStopButtonProps {
  /** Apply animation on button if true */
  isTurning?: boolean;
  /** Delayed click function. This callback will  be called on delay time is up*/
  onComplete: () => void;
  /** time to be delayed befor calling the complete event */
  waitForSeconds?: number;
}

/**
 * Special button delays onclick event for a given time.
 * To avoid accidental clicks or touchs to start/stop timer,
 * craftmen must keep button
 * at least given `waitForSeconds` of time.
 */
const StartStopButton: FC<IStartStopButtonProps> = ({
  onComplete,
  waitForSeconds = 3,
  isTurning = false,
}: IStartStopButtonProps) => {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isCountingDown, setIsCountingDown] = useState<boolean>(false);
  const [counter, setCounter] = useState(0);

  const [turnWheel, setTurnWheel] = useState<boolean>(isTurning);
  const strCountDown: string = isCountingDown ? (waitForSeconds - counter).toString() : "";

  const infoText = `Press and hold the button for ${strCountDown} seconds`;

  useEffect(() => {
    if (isTurning !== turnWheel) {
      setTurnWheel(isTurning);
    }
  }, [isTurning, turnWheel]);

  useEffect(() => {
    let intervalId = -1;
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
      {isCountingDown && <div className={styles[`PressAndHoldInfo-${theme}`]}>{infoText}</div>}
      <div
        className={stateClass}
        onMouseDown={(): void => {
          setCounter(0);
          setIsCountingDown(true);
        }}
        onMouseUp={(): void => {
          setIsCountingDown(false);
        }}
        onTouchStart={(): void => {
          setCounter(0);
          setIsCountingDown(true);
        }}
        onTouchEnd={(): void => {
          setIsCountingDown(false);
        }}
      >
        {isCountingDown && <div className={styles[`CountDown-${theme}`]}>{strCountDown}</div>}
        <div className={styles[`TimerAnimation-${theme}`]} data-turning={turnWheel ? "yes" : "no"}></div>
      </div>
    </div>
  );
};

export default StartStopButton;
