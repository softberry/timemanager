import React, { FunctionComponent, useState } from "react";
import Button from "../../__ui/buttons/button";
import Tipp from "../../__ui/tipp";
import List from "../../components/list";

import {
  ButtonTypeEnums,
  ButtonAlignmentEnums,
  IconNameEnums,
  IEditMaterialLogsProps,
  IMaterialListTableModel,
} from "../../__typings/interfaces.d";
import Card, { CardTitle, CardBody, CardFooter } from "../../__ui/card";
import { uuid } from "@nano-sql/core/lib/utilities";
const MaterialLogs: FunctionComponent<IEditMaterialLogsProps> = ({ worklog }) => {
  const [materialLogs, setMaterialLogs] = useState<IMaterialListTableModel[]>(worklog.materials);

  function createMaterialLoghandler(): void {
    const newMaterialLog: IMaterialListTableModel = {
      id: uuid(),
      items: [],
      workID: worklog.id,
    };
    setMaterialLogs([...materialLogs, newMaterialLog]);
  }
  return (
    <Card>
      <CardTitle>Used Materials</CardTitle>

      <CardBody>
        {materialLogs.length === 0 && (
          <Tipp>
            You do not have any material log for this assignment. You can Add or Remove materials that you used for this
            assignment here.
          </Tipp>
        )}
        <List></List>
      </CardBody>
      <CardFooter>
        <Button
          icon={IconNameEnums.ADD}
          isDisabled={false}
          type={ButtonTypeEnums.SIMPLE}
          align={ButtonAlignmentEnums.STRETCH}
          onClick={createMaterialLoghandler}
        >
          Add material
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MaterialLogs;
