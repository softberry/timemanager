import React, { useState, useContext, ChangeEvent, useEffect, useMemo, FunctionComponent, useCallback } from "react";
import moment from "moment";
import { timeDiffToString } from "../../../lib/input.helpers";

import { ThemeEnums, IDateTimeProps } from "../../../__typings/interfaces.d";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../typography";
import ViewContext from "../../../views";
import { uuid } from "@nano-sql/core/lib/utilities";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

/**
 * Custom DateTime UI that enables users to define start/ finish time of a work
 * TODO: Implement https://github.com/softberry/timemanager/issues/62
 */
const DateTime: FunctionComponent<IDateTimeProps> = ({
  uniqueId,
  start = moment(),
  finish = moment(),
  step = 15,
  infoCallback,
}) => {
  const view = useContext(ViewContext);
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const [isValid, setIsValid] = useState(false);

  const [currentDate, setCurrentDate] = useState(moment(start).format("YYYY-MM-DD"));

  const [startTime, setStartTime] = useState(moment(start).format("HH:mm"));
  const [finishTime, setEndTime] = useState(moment(finish).format("HH:mm"));
  const [diffTime, setDiffTime] = useState("??:??");
  const id = { date: uuid(), start: uuid(), finish: uuid(), diff: uuid() };

  const diffTimeMemo = useMemo(() => {
    return timeDiffToString({
      start: moment(`${currentDate} ${startTime}`).toISOString(),
      finish: moment(`${currentDate} ${finishTime}`).toISOString(),
      step,
    });
  }, [step, startTime, finishTime, currentDate]);

  const validCallback = useCallback(() => {
    const startTimeFromString = moment(`${currentDate} ${startTime}`);
    const finishTimeFromString = moment(`${currentDate} ${finishTime}`);

    const valid = !startTimeFromString.isAfter(finishTimeFromString);

    return valid;
  }, [currentDate, startTime, finishTime]);

  const dateOnChangehandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setCurrentDate(e.target.value);
  };
  const startTimeOnChangehandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setStartTime(e.target.value);
  };
  const finishTimeOnChangehandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setEndTime(e.target.value);
  };

  useEffect(() => {
    if (JSON.stringify(diffTimeMemo) !== JSON.stringify(diffTime)) {
      setDiffTime(diffTimeMemo);
    }
  }, [diffTimeMemo, diffTime]);

  useEffect(() => {
    const valid = validCallback();
    if (isValid !== valid) {
      setIsValid(valid);
    }
  }, [isValid, validCallback]);

  useEffect(() => {
    const startTimeFromString = moment(`${currentDate} ${startTime}`).toISOString();
    const finishTimeFromString = moment(`${currentDate} ${finishTime}`).toISOString();

    infoCallback({
      start: startTimeFromString,
      finish: finishTimeFromString,
      valid: isValid,
    });
  }, [currentDate, startTime, finishTime, infoCallback, isValid]);
  return (
    <div className={styles[`DateTime-${theme}-${view}`]} data-valid={isValid}>
      <div className={styles[`DateTime-${theme}-${view}-Caption`]}>
        <span>{currentDate}</span>
        <span>{diffTime} </span>
      </div>
      <div className={styles[`DateTime-${theme}-${view}-Data`]}>
        <div>
          <label htmlFor={id.date} className={styles[`DateTime-${theme}-label`]}>
            Date
          </label>
          <input
            id={id.date}
            type="date"
            className={styles[`DateTime-${theme}-input`]}
            value={currentDate}
            onChange={dateOnChangehandler}
          />
        </div>
        <div>
          <label htmlFor={id.start} className={styles[`DateTime-${theme}-label`]}>
            From
          </label>
          <input
            id={id.start}
            type="time"
            className={styles[`DateTime-${theme}-input`]}
            value={startTime}
            min="00:00"
            max={finishTime}
            onChange={startTimeOnChangehandler}
          />
        </div>
        <div>
          <label htmlFor={id.finish} className={styles[`DateTime-${theme}-label`]}>
            Until
          </label>
          <input
            id={id.finish}
            type="time"
            className={styles[`DateTime-${theme}-input`]}
            value={finishTime}
            min={startTime}
            max="23:59"
            onChange={finishTimeOnChangehandler}
          />
        </div>
      </div>
    </div>
  );
};

export default DateTime;
