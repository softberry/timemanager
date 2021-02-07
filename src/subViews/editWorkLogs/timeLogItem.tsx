import { FC, useState, useEffect } from "react";
import {
  ICalendarTableModel,
  ButtonTypeEnums,
  ButtonAlignmentEnums,
  IconNameEnums,
  IDateTimeCallback,
} from "../../__typings/interfaces.d";
import { DateTime } from "../../__ui/formElements";
import Button from "../../__ui/buttons/button";

import moment from "moment";

interface ITimelogItemProps {
  timelog: ICalendarTableModel;
  updateCallback: (log: ICalendarTableModel) => void;
}
const TimeLogItem: FC<ITimelogItemProps> = ({ timelog, updateCallback }) => {
  const [isValid, setIsValid] = useState(false);
  const [saveNow, setSaveNow] = useState(false);
  const [dateTimeLog, setDateTimeLog] = useState<ICalendarTableModel>(timelog);

  useEffect(() => {
    if (saveNow === false || isValid === false) return;

    updateCallback(dateTimeLog);
  }, [dateTimeLog, isValid, saveNow, updateCallback]);
  return (
    <>
      <DateTime
        start={moment(timelog.start).toISOString()}
        finish={moment(timelog.finish).toISOString()}
        step={15}
        infoCallback={({ start, finish, valid }: IDateTimeCallback): void => {
          if (valid !== isValid) {
            setIsValid(valid);
          }
          if (start !== dateTimeLog.start || finish !== dateTimeLog.finish) {
            setDateTimeLog({
              start: start,
              finish: finish,
              id: timelog.id,
              description: timelog.description,
            });
          }
        }}
      />
      <div>
        <Button
          type={ButtonTypeEnums.POSITIVE}
          align={ButtonAlignmentEnums.RIGHT}
          icon={IconNameEnums.CHECK_CIRCLE}
          isDisabled={!isValid}
          onClick={(): void => {
            setSaveNow(true);
          }}
        >
          Save
        </Button>
      </div>
    </>
  );
};
export default TimeLogItem;
