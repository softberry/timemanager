import React, { FunctionComponent, useState } from "react";
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
}
const TimeLogItem: FunctionComponent<ITimelogItemProps> = ({ timelog }) => {
  const [isValid, setIsValid] = useState(false);

  return (
    <>
      <DateTime
        uniqueId={timelog.id}
        start={moment(timelog.start)}
        finish={moment(timelog.finish)}
        step={15}
        infoCallback={({ valid }: IDateTimeCallback): void => {
          if (valid === isValid) return;
          setIsValid(valid);
        }}
      />
      <div>
        <Button
          type={ButtonTypeEnums.POSITIVE}
          align={ButtonAlignmentEnums.RIGHT}
          icon={IconNameEnums.CHECK_CIRCLE}
          isDisabled={!isValid}
          onClick={(): void => {
            //
          }}
        >
          Add
        </Button>
      </div>
    </>
  );
};
export default TimeLogItem;
