import React, { ReactElement } from "react";
import Input from "../../__ui/formElements";
import {
  ValidationTypeEnums,
  IInputCallback,
} from "../../__typings/interfaces.d";
import Card from "../../__ui/card";

function WorkLogsTitle({ name, description, dispatcher }: any): ReactElement {
  function updateTitle(result: IInputCallback) {
    // dispatcher(result);
  }

  return (
    <>
      <Card>
        <Input
          name="worklog-name"
          uniqueName="worklogName"
          validate={true}
          required={true}
          validationType={ValidationTypeEnums.TEXT}
          infoCallback={dispatcher}
        />
        <Input
          name="Worklog Description"
          uniqueName="worklogDesc"
          validate={false}
          required={false}
          infoCallback={updateTitle}
        />
      </Card>
    </>
  );
}

export default WorkLogsTitle;
