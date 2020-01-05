import React, { useReducer, useEffect } from "react";

import { useSelector } from "react-redux";
import { timeDiff } from "../../lib/counter.helpers";
import Counter from "./counter";
import StartStopButton from "../../__ui/buttons/startStopButton";
import { createWorkLogFromCurrentCounter } from "../../lib/worklog.helpers";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import { VDESIGN } from "../../store/constant-enums";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

let timerID: number;
const types = {
  TIMER_START: "TIMER_START",
  TIMER_STOP: "TIMER_STOP",
  TIMER_UPDATE: "TIMER_UPDATE"
};

function reducer(state: any, action: { type: any; current: any }) {
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
export default function Timer({ view = "primary" }: IDesignModel): JSX.Element {
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

  const nSQL = useSelector((state: any) => state.db.nSQL);

  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  useEffect(() => {
    if (typeof nSQL !== "function") return;
  }, [nSQL]);

  nSQL("counterTable")
    .query("select")
    .where(["id", "=", "active-counter-0"])
    .exec()
    .then((item: [ICounterTableModel]) => {
      const current = item[0];
      if (current.active === true && timer.active === false) {
        dispatch({ type: types.TIMER_UPDATE, current: current });
      }
    })
    .catch((err: Error) => {});
  useEffect(() => {
    if (!timer.active) {
      return;
    }

    timerID = window.setTimeout(() => {
      const now = Date.now();

      nSQL("counterTable")
        .query("upsert", {
          id: "active-counter-0",
          active: true,
          current: now,
          diff: timeDiff(timer.start, now)
        })
        .exec()
        .then((current: [ICounterTableModel]) => {
          dispatch({ type: types.TIMER_UPDATE, current: current[0] });
        });
    }, 1000);
    return () => {
      clearTimeout(timerID);
    };
  }, [timer.active, timer.start, timer.diff, nSQL]);

  const timerClassName = styles[`Timer-${theme}-${view}`];
  if (timer.active) {
    return (
      <div className={timerClassName}>
        <Counter
          {...timer.diff}
          counting={true}
          styles={styles}
          theme={theme}
        />
        <StartStopButton
          buttonLabel={{ inactive: "STOP", active: "WAIT" }}
          onComplete={() => {
            clearTimeout(timerID);
            nSQL("counterTable")
              .query("upsert", {
                id: "active-counter-0",
                active: false
              })
              .exec()
              .then((current: [ICounterTableModel]) => {
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
    <div className={timerClassName}>
      <Counter {...timer.diff} counting={false} styles={styles} theme={theme} />
      <StartStopButton
        buttonLabel={{ inactive: "START", active: "WAIT" }}
        onComplete={() => {
          nSQL("counterTable")
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
            .then((current: [ICounterTableModel]) => {
              dispatch({ type: types.TIMER_START, current: current[0] });
            });
        }}
      />
    </div>
  );
}
