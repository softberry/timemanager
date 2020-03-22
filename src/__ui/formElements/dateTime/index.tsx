import React, { useState, useContext, ChangeEvent, useEffect, useMemo, FunctionComponent } from "react";
import moment from "moment";
import { timeDiffToString, correctedTimeFromStep } from "../../../lib/input.helpers";

import {
  ThemeEnums,
  IDateTimeProps,
  CollapsedState,
  IconNameEnums,
  ButtonTypeEnums,
} from "../../../__typings/interfaces.d";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../typography";
import ViewContext from "../../../views";
import { uuid } from "@nano-sql/core/lib/utilities";
import Icon from "../../icon";
import Button from "../../buttons/button";

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
  collapsed = CollapsedState.COLLAPSED,
  deleteCallback,
}) => {
  const view = useContext(ViewContext);
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const [isValid, setIsValid] = useState(false);
  const [expandCollapse, setExandCollapse] = useState<CollapsedState>(collapsed);

  const [currentDate, setCurrentDate] = useState(moment(start).format("YYYY-MM-DD"));

  const [startTime, setStartTime] = useState(moment(start).format("HH:mm"));
  const [finishTime, setEndTime] = useState(moment(finish).format("HH:mm"));
  const [diffTime, setDiffTime] = useState("??:??");
  const id = { date: uuid(), start: uuid(), finish: uuid(), diff: uuid() };

  const toggleCollapse = (): void => {
    setExandCollapse(expandCollapse === CollapsedState.COLLAPSED ? CollapsedState.EXPANDED : CollapsedState.COLLAPSED);
  };

  const diffTimeCallback = useMemo(() => {
    const startTimeFromString = moment(`${currentDate} ${startTime}`);
    const finishTimeFromString = moment(`${currentDate} ${finishTime}`);

    infoCallback({
      start: startTimeFromString.toISOString(),
      finish: finishTimeFromString.toISOString(),
      valid: isValid,
    });

    if (startTimeFromString.isAfter(finishTimeFromString)) {
      setIsValid(false);

      return diffTime;
    }

    setIsValid(true);
    const hoursDiff = finishTimeFromString.diff(startTimeFromString, "hours") * 1;

    const minutesDiff = finishTimeFromString.subtract(hoursDiff, "hours").diff(startTimeFromString, "minutes");

    const minutes = correctedTimeFromStep({
      minutes: minutesDiff,
      step,
      immediate: true,
    });

    return timeDiffToString({ hours: hoursDiff, minutes });
  }, [startTime, finishTime, currentDate, diffTime, step, infoCallback, isValid]);

  const deleteCallbackHandler = (): void => {
    if (deleteCallback) {
      deleteCallback(uniqueId);
    }
  };

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
    setDiffTime(diffTimeCallback);
  }, [diffTimeCallback]);

  return (
    <div className={styles[`DateTime-${theme}-${view}`]} data-valid={isValid}>
      <div className={styles[`DateTime-${theme}-${view}-Caption`]}>
        <span>{currentDate}</span>
        <span>{diffTime} </span>
        <div onClick={toggleCollapse} className={styles[`DateTime-${theme}-${view}-Toggle`]}>
          <Icon>{expandCollapse === CollapsedState.COLLAPSED ? IconNameEnums.ARROW_DOWN : IconNameEnums.ARROW_UP}</Icon>
        </div>
      </div>
      <div className={styles[`DateTime-${theme}-${view}-Data`]} data-toggle={expandCollapse}>
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
        <div>
          <Button
            type={ButtonTypeEnums.WARNING}
            icon={IconNameEnums.TRASH}
            isDisabled={false}
            onClick={deleteCallbackHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default DateTime;
