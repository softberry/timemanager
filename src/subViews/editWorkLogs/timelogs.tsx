import React, { FunctionComponent, useState, useCallback } from "react";
import Tipp from "../../__ui/tipp";
import Button from "../../__ui/buttons/button";
import TimeLogItem from "./timeLogItem";

import List from "../../components/list";

import {
  IconNameEnums,
  ButtonTypeEnums,
  ButtonAlignmentEnums,
  IEditTimeLogsProps,
  IWorkDurationTableModel,
  IMessageAction,
  IDialogActionEnums,
  DialogTypes,
} from "../../__typings/interfaces.d";

import Card, { CardTitle, CardBody, CardFooter } from "../../__ui/card";
import { DateTime } from "../../__ui/formElements";

import moment from "moment";
import { uuid } from "@nano-sql/core/lib/utilities";
import { useDispatch } from "react-redux";

const TimeLogs: FunctionComponent<IEditTimeLogsProps> = ({ worklog }) => {
  const [timeLogs, setTimelogs] = useState<IWorkDurationTableModel[]>(worklog.labour);
  const dispatch = useDispatch();

  function createTimeLogHandler(): void {
    const time = new Date();
    const newTimelog: IWorkDurationTableModel = {
      description: "",
      finish: time,
      start: time,
      id: uuid(),
      workID: worklog.id,
    };

    const action: IMessageAction = {
      type: IDialogActionEnums.OPEN,
      message: {
        caption: "New Time log",
        dialogType: DialogTypes.CONFIRM,
        body: <TimeLogItem timelog={newTimelog} />,
        footer: <></>,
        dialogId: uuid(),
        closable: true,
      },
    };
    dispatch(action);
    // setTimelogs([...timeLogs, newTimelog]);
  }

  const deleteTimelogHandler = useCallback(
    (uid: string) => {
      const deletefromlogs = timeLogs.filter(t => t.id !== uid);
      setTimelogs(deletefromlogs);
    },
    [timeLogs]
  );
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
                uniqueId={timelog.id}
                start={moment(timelog.start)}
                finish={moment(timelog.finish)}
                step={15}
                infoCallback={(): void => {
                  //
                }}
                deleteCallback={deleteTimelogHandler}
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
          onClick={createTimeLogHandler}
        >
          Add time log
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TimeLogs;
