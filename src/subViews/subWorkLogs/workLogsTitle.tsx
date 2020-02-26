import React, { ReactElement } from "react";
import Input from "../../__ui/formElements";
import { ValidationTypeEnums } from "../../__typings/interfaces.d";
import Card from "../../__ui/card";

function WorkLogsTitle(): ReactElement {
  return (
    <>
      <Card>
        <Input
          name="worklog-name"
          uniqueName="worklog-name"
          validate={true}
          required={true}
          validationType={ValidationTypeEnums.TEXT}
        />
        <Input
          name="Worklog Description"
          uniqueName="worklog-desc"
          validate={false}
          required={false}
        />
      </Card>
    </>
  );
}

export default WorkLogsTitle;
