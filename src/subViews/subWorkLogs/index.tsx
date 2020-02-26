import React, { ReactElement } from "react";
import Button from "../../__ui/buttons/button";
import { CardFooter } from "../../__ui/card";
import {
  ButtonTypeEnums,
  ButtonAlignmentEnums,
  IconEnums,
  SubPageViewActionTypes,
  IWorkLogsProps,
} from "../../__typings/interfaces.d";
import { useDispatch } from "react-redux";

import WorkLogsTitle from "./workLogsTitle";
import TimeLogs from "./timelogs";
import MaterialLogs from "./materiallogs";

const WorkLogs = ({ children, contactId }: IWorkLogsProps): ReactElement => {
  const dispatch = useDispatch();

  const cancelWorkLogViewHandler = () => {
    console.log("test");
  };
  const saveWorkLogViewHandler = () => {
    console.log("test");
  };
  const createWorklogHandler = () => {
    dispatch({
      type: SubPageViewActionTypes.SHOW,
      caption: "New Worklog",
      content: (
        <>
          <WorkLogsTitle />
          <TimeLogs />
          <MaterialLogs />
          <CardFooter>
            <Button
              icon={IconEnums.CLEAR}
              isDisabled={false}
              onClick={cancelWorkLogViewHandler}
              align={ButtonAlignmentEnums.LEFT}
              type={ButtonTypeEnums.WARNING}
            >
              Cancel
            </Button>
            <Button
              icon={IconEnums.ADD}
              isDisabled={false}
              onClick={saveWorkLogViewHandler}
              align={ButtonAlignmentEnums.RIGHT}
              type={ButtonTypeEnums.POISITIVE}
            >
              Save
            </Button>
          </CardFooter>
        </>
      ),
    });
  };
  return (
    <>
      <Button
        icon={IconEnums.ADD}
        isDisabled={false}
        onClick={createWorklogHandler}
        align={ButtonAlignmentEnums.CENTER}
        type={ButtonTypeEnums.SIMPLE}
      >
        Create Worklog
      </Button>

      <div>List of Works</div>
    </>
  );
};

export default WorkLogs;

// TODO: - Add collapsed/expanded state to datetIme UI Element
// TODO: - Add Craete time log button in subpage view
// TODO: -  - Delete time log button in subpage view

// TODO: - Apply finalizes style from time log to materials log
// TODO: - Save/Update functionality to work log
// TODO: - Delete worklog from the list
