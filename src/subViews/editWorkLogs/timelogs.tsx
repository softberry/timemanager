import React, { FunctionComponent, useState } from "react";
import Tipp from "../../__ui/tipp";
import Button from "../../__ui/buttons/button";

import List from "../../components/list";

import {
  IconNameEnums,
  ButtonTypeEnums,
  ButtonAlignmentEnums,
  IEditTimeLogsProps,
  IWorkDurationTableModel,
  CollapsedState,
} from "../../__typings/interfaces.d";

import Card, { CardTitle, CardBody, CardFooter } from "../../__ui/card";
import { DateTime } from "../../__ui/formElements";
import moment from "moment";

const TimeLogs: FunctionComponent<IEditTimeLogsProps> = ({ worklog }) => {
  const [timeLogs, setTimelogs] = useState<IWorkDurationTableModel[]>(worklog.labour);
  function createTimeLoghandler(): void {
    const time = new Date();
    const newTimelog: IWorkDurationTableModel = {
      description: "",
      finish: time,
      start: time,
      id: "",
      workID: worklog.id,
    };

    setTimelogs([...timeLogs, newTimelog]);
  }

  return (
    <Card>
      <CardTitle>Spent time</CardTitle>

      <CardBody>
        {timeLogs.length === 0 && (
          <Tipp>
            You do not have any time log for this assignment. You can Add or Remove logs that you spend for this
            assignment here.
          </Tipp>
        )}
        <List>
          {timeLogs.map((timelog, i) => (
            <div key={i}>
              <DateTime
                start={moment(timelog.start)}
                finish={moment(timelog.finish)}
                step={15}
                infoCallback={(): void => {
                  //
                }}
                collapsed={CollapsedState.EXPANDED}
              />
            </div>
          ))}
        </List>
      </CardBody>
      <CardFooter>
        <Button
          icon={IconNameEnums.ADD}
          isDisabled={false}
          type={ButtonTypeEnums.SIMPLE}
          align={ButtonAlignmentEnums.STRETCH}
          onClick={createTimeLoghandler}
        >
          Add time log
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TimeLogs;
