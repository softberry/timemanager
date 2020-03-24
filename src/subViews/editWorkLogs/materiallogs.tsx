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
  MaterialItemTableModel,
} from "../../__typings/interfaces.d";
import Card, { CardTitle, CardBody, CardFooter } from "../../__ui/card";
import MaterialLogItem from "./materialLogItem";
import { uuid } from "@nano-sql/core/lib/utilities";
const MaterialLogs: FunctionComponent<IEditMaterialLogsProps> = ({ worklog, theme, styles }) => {
  const [materialLogs, setMaterialLogs] = useState<IMaterialListTableModel[]>(worklog.materials);

  function createMaterialLoghandler(): void {
    const newMaterialLog: IMaterialListTableModel = {
      id: uuid(),
      items: [],
      workID: worklog.id,
    };
    setMaterialLogs([...materialLogs, newMaterialLog]);
  }
  const item: MaterialItemTableModel = {
    id: "",
    amount: 99,
    description: "",
    name: "",
    price: 0,
    unit: "",
    materialListID: "",
  };
  return (
    <Card>
      <CardTitle>Used Materials</CardTitle>

      <CardBody>
        {materialLogs.length === 0 && (
          <Tipp>
            You do not have any material log for this assignment. You can create several material list that you used for
            this assignment here.
            <br />A material list can contain any number of items adn can be paired with time log.
          </Tipp>
        )}
        <List>
          <MaterialLogItem item={item} theme={theme} styles={styles} />
        </List>
      </CardBody>
      <CardFooter>
        <Button
          icon={IconNameEnums.ADD}
          isDisabled={false}
          type={ButtonTypeEnums.SIMPLE}
          align={ButtonAlignmentEnums.STRETCH}
          onClick={createMaterialLoghandler}
        >
          create material list
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MaterialLogs;
