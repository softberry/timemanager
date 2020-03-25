import React, { FunctionComponent, useState, useEffect } from "react";
import {
  IWorkDurationTableModel,
  ButtonTypeEnums,
  ButtonAlignmentEnums,
  IconNameEnums,
  IDateTimeCallback,
} from "../../__typings/interfaces.d";
import { DateTime } from "../../__ui/formElements";
import Button from "../../__ui/buttons/button";

import moment from "moment";

interface ITimelogItemProps {
  timelog: IWorkDurationTableModel;
  updateCallback: (log: IWorkDurationTableModel) => void;
}
const TimeLogItem: FunctionComponent<ITimelogItemProps> = ({ timelog, updateCallback }) => {
  const [isValid, setIsValid] = useState(false);
  const [saveNow, setSaveNow] = useState(false);
  const [dateTimeLog, setDateTimeLog] = useState<IWorkDurationTableModel>(timelog);

  useEffect(() => {
    if (saveNow === false || isValid === false) return;

    updateCallback(dateTimeLog);
  }, [dateTimeLog, isValid, saveNow, updateCallback]);
  return (
    <>
      <DateTime
        uniqueId={timelog.id}
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
              workID: timelog.workID,
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
          Add
        </Button>
      </div>
    </>
  );
};
export default TimeLogItem;
