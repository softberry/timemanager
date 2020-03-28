import React, { FunctionComponent, useState, useContext, useEffect } from "react";
import Button from "../../__ui/buttons/button";
import Tipp from "../../__ui/tipp";
import List from "../../components/list";

import {
  ButtonTypeEnums,
  ButtonAlignmentEnums,
  IconNameEnums,
  IEditMaterialLogsProps,
  MaterialItemTableModel,
  IMessageAction,
  IDialogActionEnums,
  DialogTypes,
  AddEditWorklogEnums,
} from "../../__typings/interfaces.d";
import Card, { CardTitle, CardBody, CardFooter } from "../../__ui/card";
import MaterialLogItem from "./materialLogItem";
import { uuid } from "@nano-sql/core/lib/utilities";
import { useDispatch } from "react-redux";

import { WorklogContext, DispatchContext } from "./index";

const MaterialLogs: FunctionComponent<IEditMaterialLogsProps> = ({ theme, styles }) => {
  const worklog = useContext(WorklogContext);
  const dispatcher = useContext(DispatchContext);
  const [materialLogs, setMaterialLogs] = useState<MaterialItemTableModel[]>(worklog.materials);
  const dispatch = useDispatch();
  const dialogId = uuid();

  function showEditDialog(item: MaterialItemTableModel, isNew: boolean): void {
    const action: IMessageAction = {
      type: IDialogActionEnums.OPEN,
      message: {
        caption: isNew ? "New Material" : "Edit Material",
        dialogType: DialogTypes.CONFIRM,
        body: (
          <MaterialLogItem
            material={item}
            updateCallback={isNew ? newMateriallogCallback : updateMateriallogCallback}
            theme={theme}
            styles={styles}
          />
        ),
        footer: <></>,
        dialogId,
        closable: true,
      },
    };
    dispatch(action);
  }
  function closeEditDialog(): void {
    const action: IMessageAction = {
      type: IDialogActionEnums.CLOSE,
      message: {
        body: <></>,
        footer: <></>,
        dialogType: DialogTypes.INFO,
        dialogId,
      },
    };
    dispatch(action);
  }

  function newMateriallogCallback(newWorklog: MaterialItemTableModel): void {
    setMaterialLogs([...materialLogs, newWorklog]);
    closeEditDialog();
  }
  function updateMateriallogCallback(updatedWorklog: MaterialItemTableModel): void {
    const logs = materialLogs.map(log => {
      return log.id === updatedWorklog.id ? updatedWorklog : log;
    });
    setMaterialLogs(logs);
    closeEditDialog();
  }

  function createMaterialLoghandler(): void {
    const newMaterialLog: MaterialItemTableModel = {
      id: uuid(),
      amount: "",
      description: "",
      name: "",
      price: "",
      unit: "",
    };
    showEditDialog(newMaterialLog, true);
  }

  function editMaterialLogHandler(item: MaterialItemTableModel): void {
    showEditDialog(item, false);
  }
  useEffect(() => {
    dispatcher({
      type: AddEditWorklogEnums.MATERIALS,
      materials: materialLogs,
    });
  }, [dispatcher, materialLogs]);

  return (
    <Card>
      <CardTitle>Used Materials</CardTitle>

      <CardBody>
        {materialLogs.length === 0 && (
          <Tipp>
            You do not have any material log for this assignment. You can create several material list that you used for
            this assignment here.
          </Tipp>
        )}
        <List>
          {materialLogs.map((log, i) => (
            <div
              key={i}
              className={styles["WorkLogs-ListItem"]}
              onClick={(): void => {
                editMaterialLogHandler(log);
              }}
            >
              <div className={styles["WorkLogs-ListItem-Name"]}>{log.name}</div>
              <div className={styles["WorkLogs-ListItem-Amount"]}>
                {log.amount} {log.unit}{" "}
              </div>
              <div className={styles["WorkLogs-ListItem-Total"]}>
                {window.parseFloat(log.amount) * window.parseFloat(log.price)}
              </div>
              <div className={styles["WorkLogs-ListItem-Description"]}>{log.description}</div>
            </div>
          ))}
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
          add material
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MaterialLogs;
