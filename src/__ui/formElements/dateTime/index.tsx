import React, {
  useState,
  useContext,
  ChangeEvent,
  useCallback,
  useEffect,
} from "react";
import moment from "moment";
import {
  timeDiffToString,
  correctedTimeFromStep,
} from "../../../lib/input.helpers";

import { DesignEnums, IDateTimeProps } from "../../../__typings/interfaces.d";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../typography";
import ViewContext from "../../../views";

const stylesMap = new Map();
stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

/**
 * Custom DateTime UI that enables users to define start/ end time of a work
 * TODO: Implement https://github.com/softberry/timemanager/issues/62
 */
function DateTime({
  start = moment(),
  end = moment(),
  step = 15,
}: IDateTimeProps) {
  const view = useContext(ViewContext);
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const [isValid, setIsValid] = useState(false);

  const [currentDate, setCurrentDate] = useState(
    moment(start).format("YYYY-MM-DD")
  );

  const [startTime, setStartTime] = useState(moment(start).format("HH:mm"));
  const [endTime, setEndTime] = useState(moment(end).format("HH:mm"));
  const [diffTime, setDiffTime] = useState("??:??");

  const diffTimeCallback = useCallback(() => {
    const startTimeFromString = moment(`${currentDate} ${startTime}`);
    const endTimeFromString = moment(`${currentDate} ${endTime}`);

    if (startTimeFromString.isAfter(endTimeFromString)) {
      setIsValid(false);

      return diffTime;
    }

    setIsValid(true);
    const hoursDiff = endTimeFromString.diff(startTimeFromString, "hours") * 1;

    const minutesDiff = endTimeFromString
      .subtract(hoursDiff, "hours")
      .diff(startTimeFromString, "minutes");

    const minutes = correctedTimeFromStep({
      minutes: minutesDiff,
      step,
      immediate: true,
    });

    return timeDiffToString({ hours: hoursDiff, minutes });
  }, [startTime, endTime, currentDate, diffTime, step]);

  const dateOnChangehandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentDate(e.target.value);
  };
  const startTimeOnChangehandler = (e: ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };
  const endTimeOnChangehandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  useEffect(() => {
    setDiffTime(diffTimeCallback());
  }, [diffTimeCallback]);
  return (
    <div className={styles[`DateTime-${theme}-${view}`]} data-valid={isValid}>
      <div className={styles[`DateTime-${theme}-Layout`]}>
        <div className={styles[`DateTime-${theme}-Date`]}>
          <input
            type="date"
            className={styles[`DateTime-${theme}-input`]}
            value={currentDate}
            onChange={dateOnChangehandler}
          />
        </div>
        <div className={styles[`DateTime-${theme}-Start`]}>
          <input
            type="time"
            className={styles[`DateTime-${theme}-input`]}
            value={startTime}
            min="00:00"
            max={endTime}
            onChange={startTimeOnChangehandler}
          />
        </div>
        <div className={styles[`DateTime-${theme}-End`]}>
          <input
            type="time"
            className={styles[`DateTime-${theme}-input`]}
            value={endTime}
            min={startTime}
            max="23:59"
            onChange={endTimeOnChangehandler}
          />
        </div>
        <div className={styles[`DateTime-${theme}-Diff`]}>
          <input
            type="text"
            className={styles[`DateTime-${theme}-input`]}
            value={diffTime}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
//TODO: Add labels,
//TODO: Labels and inputs are three lines in small devives, two lines in big
//TODO: Add a an UpdateCallback for the parent

export default DateTime;
