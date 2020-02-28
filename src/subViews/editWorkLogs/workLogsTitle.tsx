import React, { ReactElement, useState, useContext, useCallback } from "react";
import Input from "../../__ui/formElements";
import {
  ValidationTypeEnums,
  IWorkLogsTitleProps,
  IInputCallback,
} from "../../__typings/interfaces.d";
import Card from "../../__ui/card";
import { WorklogContext } from "./index";

function WorkLogsTitle({
  updateTitleCallback,
}: IWorkLogsTitleProps): ReactElement {
  const worklog = useContext(WorklogContext);
  const { name, description } = worklog;
  const [titleValid, setTitleValid] = useState<boolean>(false);
  const [titleName, setTitleName] = useState<string>(name);
  const [titleDescription, setTitleDescription] = useState<string>(description);

  useCallback(() => {
    updateTitleCallback({
      name: titleName,
      description: titleDescription,
      valid: titleValid,
    });
  }, [titleName, titleDescription, titleValid, updateTitleCallback]);

  function updateTitleName(result: IInputCallback) {
    console.log(result);
    setTitleName(result.value);
    setTitleValid(result.valid);
  }
  function updateTitleDescription(result: IInputCallback) {
    setTitleDescription(result.value);
  }
  return (
    <>
      <Card>
        <Input
          name="worklog-name"
          uniqueName="worklogName"
          validate={true}
          required={true}
          value={name}
          validationType={ValidationTypeEnums.TEXT}
          infoCallback={updateTitleName}
        />
        <Input
          name="Worklog Description"
          uniqueName="worklogDesc"
          validate={false}
          required={false}
          value={description}
          infoCallback={updateTitleDescription}
        />
      </Card>
    </>
  );
}

export default WorkLogsTitle;
