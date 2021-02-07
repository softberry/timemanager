import { FC, useContext } from "react";
import Input from "../../__ui/formElements";
import { ValidationTypeEnums, AddEditWorklogEnums, IInputCallback } from "../../__typings/interfaces.d";
import Card from "../../__ui/card";
import { WorklogContext, DispatchContext } from "./index";

const WorkLogsTitle: FC = () => {
  const worklog = useContext(WorklogContext);
  const dispatcher = useContext(DispatchContext);
  const { name, description } = worklog;

  function dispatchInput(p: IInputCallback): void {
    switch (p.name) {
      case "name":
        dispatcher({
          type: AddEditWorklogEnums.TITLE,
          input: p,
        });
        break;

      case "description":
        dispatcher({
          type: AddEditWorklogEnums.DESCRIPTION,
          input: p,
        });
        break;
      default:
    }
  }

  return (
    <>
      <Card>
        <Input
          name="name"
          label="Worklog Name"
          type="text"
          validate={true}
          required={true}
          value={name}
          validationType={ValidationTypeEnums.TEXT}
          infoCallback={dispatchInput}
        />
        <Input
          name="description"
          label="Worklog Description"
          type="text"
          value={description}
          validate={false}
          required={false}
          infoCallback={dispatchInput}
        />
      </Card>
    </>
  );
};

export default WorkLogsTitle;
