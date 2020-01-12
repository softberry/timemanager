import React, { useEffect, useState } from "react";
import {
  IDesignModel,
  ICounterTableModel,
  IDiff
} from "../../__typings/interfaces";

import { useSelector } from "react-redux";
import { timeDiff } from "../../lib/counter.helpers";

import Counter from "./counter";
import StartStopButton from "../../__ui/buttons/startStopButton";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";

import { VDESIGN } from "../../store/constant-enums";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

let timerID: number;

export function Timer({ view = "primary" }: IDesignModel): JSX.Element {
  const [timerActiveState, setTimerActiveState] = useState<boolean>(false);

  const [diff, setDiff] = useState<IDiff>(timeDiff(0, 0));
  const nSQL = useSelector((state: any) => state.db.nSQL);

  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  const startTimer = () => {
    const _now = Date.now();
    setTimerActiveState(true);
    nSQL("counterTable")
      .query("upsert", {
        id: "active-counter-0",
        start: _now,
        current: _now,
        active: true
      })
      .exec()
      .then((current: [ICounterTableModel]) => {
        setDiff(timeDiff(current[0].start, current[0].current));
      });
  };
  const stopTimer = () => {
    setTimerActiveState(false);
    nSQL("counterTable")
      .query("upsert", {
        id: "active-counter-0",
        active: false,
        current: Date.now()
      })
      .exec();
  };

  useEffect(() => {
    if (typeof nSQL !== "function") return;
    nSQL("counterTable")
      .query("select")
      .where(["id", "=", "active-counter-0"])
      .exec()
      .then((current: [ICounterTableModel]) => {
        if (current.length !== 1) return;
        if (current[0].active !== timerActiveState) {
          setTimerActiveState(current[0].active);
          setDiff(timeDiff(current[0].start, current[0].current));
        }
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }, [nSQL, timerActiveState]);

  useEffect(() => {
    if (!timerActiveState) {
      return;
    }

    timerID = window.setTimeout(() => {
      const now = Date.now();
      nSQL("counterTable")
        .query("upsert", {
          id: "active-counter-0",
          active: true,
          current: now
          // diff: timeDiff(timerActiveState.start, now)
        })
        .exec()
        .then((current: [ICounterTableModel]) => {
          setTimerActiveState(current[0].active);
          current[0].active
            ? setDiff(timeDiff(current[0].start, current[0].current))
            : clearTimeout(timerID);
        });
    }, 1000);
    return () => {
      clearTimeout(timerID);
    };
  }, [timerActiveState, nSQL, setDiff, diff]);

  //TODO: createWorkLogFromCurrentCounter
  // Create new WorkLog when timers stopped #42
  // https://github.com/softberry/timemanager/issues/42

  const onCompleteEventHandler = () => {
    timerActiveState ? stopTimer() : startTimer();
  };

  return (
    <div className={styles[`Timer-${theme}-${view}`]}>
      <Counter
        {...diff}
        counting={timerActiveState}
        styles={styles}
        theme={theme}
      />
      <StartStopButton
        onComplete={onCompleteEventHandler}
        waitForSeconds={3}
        turning={timerActiveState}
      />
    </div>
  );
}

export default Timer;
