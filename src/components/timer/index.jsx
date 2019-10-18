import React, { useReducer, useEffect } from "react";

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
      const now = Date.now();
      newState = {
        ...state,
        active: !0,
        delaying: false,
        start: now,
        diff: {
          hour: 0,
          minute: 0,
          second: 0
        }
      };
      break;
    }
    case types.TIMER_STOP: {
      newState = {
        ...state,
        active: !!0,
        start: 0
      };
      clearTimeout(timerID);
      break;
    }
    case types.TIMER_UPDATE: {
      newState = {
        ...state,
        diff: timeDiff(state.start)
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
    delaying: false,
    active: false,
    start: 0,
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
      dispatch({ type: types.TIMER_UPDATE });
    }, 10000);
  }, [timer.active]);

  if (timer.active) {
    return (
      <div className={styles.Page}>
        <Counter {...timer.diff} counting={true} />
        <StartStopButton
          buttonLabel={{ inactive: "STOP", active: "WAIT" }}
          onComplete={() => {
            dispatch({ type: types.TIMER_STOP });
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
          dispatch({ type: types.TIMER_START });
        }}
      />
    </div>
  );
}
