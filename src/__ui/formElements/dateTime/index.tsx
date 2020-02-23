import React, {
  useState,
  useContext,
  ChangeEvent,
  useCallback,
  useEffect,
} from "react";
import moment, { Moment } from "moment";
import { correctedTimeFromStep } from "../../../lib/input.helpers";

import { DesignEnums } from "../../../__typings/interfaces.d";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../typography";
import ViewContext from "../../../views";

const stylesMap = new Map();
stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

interface IDateTimeProps {
  start?: Moment;
  end?: Moment;
  step: number;
}

const DateTime = ({
  start = moment(),
  end = moment(),
  step = 15,
}: IDateTimeProps) => {
  const view = useContext(ViewContext);
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const [isValid, setIsValid] = useState(false);

  const [currentDate, setCurrentDate] = useState(
    moment(start).format("YYYY-MM-DD")
  );

  const [startTime, setStartTime] = useState(moment(start).format("HH:mm"));
  const [endTime, setEndTime] = useState(moment(start).format("HH:mm"));
  const [diffTime, setDiffTime] = useState("??:??");

  const diffTimeCallback = useCallback(() => {
    const s = moment(`${currentDate} ${startTime}`);
    const e = moment(`${currentDate} ${endTime}`);

    if (s.isAfter(e)) {
      setIsValid(false);

      return diffTime;
    }

    setIsValid(true);
    const hours = e.diff(s, "hours");
    const minutes = correctedTimeFromStep(
      e.subtract(hours, "hours").diff(s, "minutes"),
      step
    );

    return `${hours} Hours ${minutes} Minutes`;
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
          <div className={styles[`DateTime-${theme}-input`]}>{diffTime}</div>
        </div>
      </div>
    </div>
  );
};
//TODO: Add labels,
//TODO: Labels and inputs are three lines in small devives, two lines in big
//TODO: Add a an UpdateCallback for the parent
//TODO: do not write 0 Hours or 0 minutes
// =========================================================================================================
// TODO: These todos are mostly relevent at the compoenents, where <DateTime /> be used.
// TODO: Get step value from user settings
// TODO: If a work log spreads to two days(or more) create more entries as a time log can not be spread two days.
export default DateTime;
