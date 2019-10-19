import React, { useReducer, useEffect } from "react";
import { nSQL } from "@nano-sql/core";
import { timeDiff } from "../../lib/counter.helpers";
import Counter from "./counter";
import StartStopButton from "../../__ui/buttons/startStopButton";

import styles from "./timer.module.scss";
let timerID;
const types = {
  TIMER_START: "TIMER_START",
  TIMER_STOP: "TIMER_STOP",
  TIMER_UPDATE: "TIMER_UPDATE"
};

function reducer(state, action) {
  let newState = state;

  switch (action.type) {
    case types.TIMER_START: {
      //      const now = Date.now();
      newState = {
        ...state,
        ...action.current
      };
      break;
    }
    case types.TIMER_STOP: {
      newState = {
        ...state,
        ...action.current
      };
      break;
    }
    case types.TIMER_UPDATE: {
      newState = {
        ...state,
        ...action.current
      };
      break;
    }
    default:
      throw Error(`Unknown action type for timer: "${action.type}"`);
  }
  return newState;
}
export default function Timer() {
  const [timer, dispatch] = useReducer(reducer, {
    id: "active-counter-0",
    delaying: false,
    active: false,
    start: 0,
    current: Date.now(),
    diff: {
      hour: 0,
      minute: 0,
      second: 0
    }
  });

  useEffect(() => {
    if (!timer.active) {
      return;
    }

    timerID = setTimeout(() => {
      nSQL("counters")
        .query("upsert", {
          id: "active-counter-0",
          active: true,
          diff: timeDiff(timer.start)
        })
        .exec()
        .then(current => {
          dispatch({ type: types.TIMER_UPDATE, current: current[0] });
        });
    }, 1000);
  }, [timer.active, timer.start, timer.diff]);

  if (timer.active) {
    return (
      <div className={styles.Page}>
        <Counter {...timer.diff} counting={true} />
        <StartStopButton
          buttonLabel={{ inactive: "STOP", active: "WAIT" }}
          onComplete={() => {
            clearTimeout(timerID);
            nSQL("counters")
              .query("upsert", {
                id: "active-counter-0",
                active: false
              })
              .exec()
              .then(current => {
                dispatch({ type: types.TIMER_STOP, current: current[0] });
              });
          }}
        />
      </div>
    );
  }
  return (
    <div className={styles.Page}>
      <Counter {...timer.diff} counting={false} />
      <StartStopButton
        buttonLabel={{ inactive: "START", active: "WAIT" }}
        onComplete={() => {
          nSQL("counters")
            .query("upsert", {
              id: "active-counter-0",
              delaying: false,
              active: true,
              start: Date.now(),
              current: Date.now(),
              diff: {
                hour: 0,
                minute: 0,
                second: 0
              }
            })
            .exec()
            .then(current => {
              dispatch({ type: types.TIMER_START, current: current[0] });
            });
        }}
      />
    </div>
  );
}
