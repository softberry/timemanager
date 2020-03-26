import React, { FunctionComponent, useState } from "react";
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

import moment from "moment";
import { uuid } from "@nano-sql/core/lib/utilities";
import { useDispatch } from "react-redux";
import { timeDiffToString } from "../../lib/input.helpers";

const TimeLogs: FunctionComponent<IEditTimeLogsProps> = ({ worklog, styles, theme }) => {
  const [timeLogs, setTimelogs] = useState<IWorkDurationTableModel[]>(worklog.labour);
  const dispatch = useDispatch();
  const dialogId = uuid();
  function createTimeLogHandler(): void {
    const time = moment();
    const newTimelog: IWorkDurationTableModel = {
      description: "",
      finish: time.toISOString(),
      start: time.toISOString(),
      id: uuid(),
      workID: worklog.id,
    };

    showEditDialog(newTimelog, true);
  }

  function showEditDialog(timelog: IWorkDurationTableModel, isNew: boolean): void {
    const action: IMessageAction = {
      type: IDialogActionEnums.OPEN,
      message: {
        caption: isNew ? "New Time log" : "Edit Time log",
        dialogType: DialogTypes.CONFIRM,
        body: <TimeLogItem timelog={timelog} updateCallback={isNew ? newTimelogCallback : updateTimelogCallback} />,
        footer: <></>,
        dialogId,
        closable: true,
      },
    };
    dispatch(action);
  }
  function closeEditDialog(): void {
    const action: IMessageAction = {
      type: IDialogActionEnums.CLOSE,
      message: {
        body: <></>,
        footer: <></>,
        dialogType: DialogTypes.INFO,
        dialogId,
      },
    };
    dispatch(action);
  }
  function updateATimeLogHandler(log: IWorkDurationTableModel): void {
    showEditDialog(log, false);
  }
  function newTimelogCallback(newlog: IWorkDurationTableModel): void {
    setTimelogs([...timeLogs, newlog]);

    closeEditDialog();
  }

  function updateTimelogCallback(updatedLog: IWorkDurationTableModel): void {
    const logs = timeLogs.map(log => {
      if (log.id === updatedLog.id) return updatedLog;
      return log;
    });
    setTimelogs(logs);
    closeEditDialog();
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
              <div
                className={styles["TimeLogListItem"]}
                onClick={(): void => {
                  updateATimeLogHandler(timelog);
                }}
              >
                <div>{moment(timelog.start).format("ddd, DD MMM YYYY HH:MM")}</div>

                <div>
                  {timeDiffToString({
                    start: timelog.start,
                    finish: timelog.finish,
                    step: 15,
                  })}
                </div>
              </div>
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
