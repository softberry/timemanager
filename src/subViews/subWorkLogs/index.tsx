import React, { ReactElement } from "react";
import Button from "../../__ui/buttons/button";

import {
  ButtonTypeEnums,
  ButtonAlignmentEnums,
  IconNameEnums,
  SubPageViewActionTypes,
  IWorkLogsProps,
} from "../../__typings/interfaces.d";
import { useDispatch } from "react-redux";

import WorkLogsTitle from "./workLogsTitle";
import TimeLogs from "./timelogs";
import MaterialLogs from "./materiallogs";

const WorkLogs = ({ children, contactId }: IWorkLogsProps): ReactElement => {
  const dispatch = useDispatch();

  const cancelWorkLogViewHandler = (): void => {
    console.log("test");
  };
  const saveWorkLogViewHandler = (): void => {
    console.log("test");
  };
  const createWorklogHandler = (): void => {
    dispatch({
      type: SubPageViewActionTypes.SHOW,
      caption: "New Worklog",
      content: (
        <>
          <WorkLogsTitle />
          <TimeLogs />
          <MaterialLogs />

          <div>
            <Button
              icon={IconNameEnums.CLEAR}
              isDisabled={false}
              onClick={cancelWorkLogViewHandler}
              align={ButtonAlignmentEnums.LEFT}
              type={ButtonTypeEnums.WARNING}
            >
              Cancel
            </Button>
            <Button
              icon={IconNameEnums.ADD}
              isDisabled={false}
              onClick={saveWorkLogViewHandler}
              align={ButtonAlignmentEnums.RIGHT}
              type={ButtonTypeEnums.POISITIVE}
            >
              Save
            </Button>
          </div>
        </>
      ),
    });
  };
  return (
    <>
      <Button
        icon={IconNameEnums.ADD}
        isDisabled={false}
        onClick={createWorklogHandler}
        align={ButtonAlignmentEnums.CENTER}
        type={ButtonTypeEnums.SIMPLE}
      >
        Create Worklog
      </Button>
      {/**TODO: List of Worklogs */}
    </>
  );
};

export default WorkLogs;

// TODO: - Add Craete time log button in subpage view
// TODO: -  - Delete time log button in subpage view

// TODO: - Apply finalizes style from time log to materials log
// TODO: - Save/Update functionality to work log
// TODO: - Delete worklog from the list
