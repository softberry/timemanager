import React, { useReducer, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { timeDiff } from "../../lib/counter.helpers";
import Counter from "./counter";
import StartStopButton from "../../__ui/buttons/startStopButton";
import { createWorkLogFromCurrentCounter } from "../../lib/worklog.helpers";
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
function Timer({ history }) {
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

  const nSQL = useSelector(state => state.db.nSQL);

  useEffect(() => {
    if (typeof nSQL !== "function") return;
  }, [nSQL]);
  
  nSQL("counters")
    .query("select")
    .where(["id", "=", "active-counter-0"])
    .exec()
    .then(item => {
      const current = item[0];
      if (current.active === true && timer.active === false) {
        dispatch({ type: types.TIMER_UPDATE, current: current });
      }
    })
    .catch(err => {});
  useEffect(() => {
    if (!timer.active) {
      return;
    }

    timerID = setTimeout(() => {
      const now = Date.now();

      nSQL("counters")
        .query("upsert", {
          id: "active-counter-0",
          active: true,
          current: now,
          diff: timeDiff(timer.start, now)
        })
        .exec()
        .then(current => {
          dispatch({ type: types.TIMER_UPDATE, current: current[0] });
        });
    }, 1000);
    return () => {
      clearTimeout(timerID);
    };
  }, [timer.active, timer.start, timer.diff, nSQL]);

  if (timer.active) {
    return (
      <div className={styles.Timer}>
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
                createWorkLogFromCurrentCounter(nSQL)
                  .then(() => {
                    //  history.push("/history");
                  })
                  .catch(err => console.log(err));
              });
          }}
        />
      </div>
    );
  }
  return (
    <div className={styles.Timer}>
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

export default withRouter(Timer);
