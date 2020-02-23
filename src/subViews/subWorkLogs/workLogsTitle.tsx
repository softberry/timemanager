import React from "react";
import Input from "../../__ui/formElements";
import { ValidationTypeEnums } from "../../__typings/interfaces.d";

function WorkLogsTitle() {
  return (
    <div>
      <Input
        name="worklog-name"
        uniqueName="worklog-name"
        validate={true}
        required={true}
        validationType={ValidationTypeEnums.TEXT}
      />
      <Input
        name="worklog-desc"
        uniqueName="worklog-desc"
        validate={false}
        required={false}
      />
    </div>
  );
}

export default WorkLogsTitle;
