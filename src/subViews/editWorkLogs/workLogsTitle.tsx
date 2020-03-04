import React, { ReactElement } from "react";
import Input from "../../__ui/formElements";
import {
  ValidationTypeEnums,
  AddEditWorklogEnums,
  // IWorkTableModel,
  IEditWorkLogTitleProps,
  // IInputCallback,
} from "../../__typings/interfaces.d";
import Card from "../../__ui/card";

function WorkLogsTitle({
  name,
  description,
  dispatcher,
}: IEditWorkLogTitleProps): ReactElement {
  return (
    <>
      <Card>
        <Input
          name="worklog-name"
          uniqueName={AddEditWorklogEnums.TITLE}
          validate={true}
          required={true}
          value={name}
          validationType={ValidationTypeEnums.TEXT}
          infoCallback={dispatcher}
        />
        <Input
          name="Worklog Description"
          uniqueName={AddEditWorklogEnums.DESCRIPTION}
          value={description}
          validate={false}
          required={false}
          infoCallback={dispatcher}
        />
      </Card>
    </>
  );
}

export default WorkLogsTitle;
