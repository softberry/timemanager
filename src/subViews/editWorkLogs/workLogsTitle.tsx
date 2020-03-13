import React, { ReactElement } from "react";
import Input from "../../__ui/formElements";
import {
  ValidationTypeEnums,
  AddEditWorklogEnums,
  IEditWorkLogTitleProps,
  IInputCallback,
} from "../../__typings/interfaces.d";
import Card from "../../__ui/card";

function WorkLogsTitle({
  name,
  description,
  dispatcher,
}: IEditWorkLogTitleProps): ReactElement {
  function dispatchInput(p: IInputCallback): void {
    dispatcher({
      type: AddEditWorklogEnums.TITLE,
      input: p,
    });
  }

  return (
    <>
      <Card>
        <Input
          name="Worklog Name"
          label="Worklog Name"
          uniqueName="name"
          validate={true}
          required={true}
          value={name}
          validationType={ValidationTypeEnums.TEXT}
          infoCallback={dispatchInput}
        />
        <Input
          name="Worklog Description"
          label="Worklog Description"
          uniqueName="description"
          value={description}
          validate={false}
          required={false}
          infoCallback={dispatchInput}
        />
      </Card>
    </>
  );
}

export default WorkLogsTitle;
