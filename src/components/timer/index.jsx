import React, { useEffect, useState, useReducer } from "react";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Delay from "./delay";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Button from "@material-ui/core/Button";

// import StartStop from "../startstop";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core";

import { timeDiff } from "../../lib/counter.helpers";
import Counter from "./counter";

const types = {
  TIMER_START_WAITING: "TIMER_START_WAITING",
  TIMER_START_CANCEL: "TIMER_START_CANCEL",
  TIMER_START: "TIMER_START",
  TIMER_STOP: "TIMER_STOP",
  TIMER_UPDATE: "TIMER_UPDATE"
};
const useStyle = makeStyles(theme => ({
  counter: {
    textAlign: "center"
  },
  playButton: {
    marginLeft: "auto"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  footer: {}
}));

function reducer(state, action) {
  let newState = state;
  switch (action.type) {
    case types.TIMER_START_WAITING: {
      newState = {
        ...state,
        delaying: true
      };
      break;
    }
    case types.TIMER_START_CANCEL: {
      newState = {
        ...state,
        delaying: false
      };
      break;
    }
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
  const classes = useStyle();

  let [intervalID, setIntervalID] = useState(0);
  let [delayingValue, setDelayingvalue] = useState(0);
  let [expanded, setExpanded] = useState(false);

  let [timer, dispatch] = useReducer(reducer, {
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
    let i;
    if (timer.delaying) {
      i = setTimeout(() => {
        const v = delayingValue + 1;

        if (v > 100) {
          clearTimeout(i);
          startTimer();
          return;
        }

        setDelayingvalue(v);
      }, 3000 / 100);
    } else {
      setDelayingvalue(0);
    }
    return () => {
      clearTimeout(i);
    };
  }, [delayingValue, timer.delaying]);

  function startTimer() {
    dispatch({ type: types.TIMER_START });
    const intID = window.setInterval(() => {
      dispatch({ type: types.TIMER_UPDATE });
    }, 1000);
    setIntervalID(intID);
  }
  function stopTimer() {
    dispatch({ type: types.TIMER_STOP });
    window.clearInterval(intervalID);
    setDelayingvalue(0);
    setIntervalID(0);
  }
  function handleExpandClick() {
    setExpanded(!expanded);
  }

  const StartStopButton = !timer.active ? PlayArrowIcon : PauseIcon;

  return (
    <Card>
      <CardContent>
        <Typography
          gutterBottom
          variant="h2"
          component="h2"
          className={classes.counter}
        >
          <Counter {...timer.diff} />
        </Typography>
        <Delay show={timer.delaying} value={delayingValue} />
      </CardContent>

      <CardActions className={classes.footer} disableSpacing>
        <Button
          variant="outlined"
          className={classes.playButton}
          onMouseDown={e => {
            dispatch({ type: types.TIMER_START_WAITING });
          }}
          onMouseUp={e => dispatch({ type: types.TIMER_START_CANCEL })}
        >
          <StartStopButton />
        </Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
