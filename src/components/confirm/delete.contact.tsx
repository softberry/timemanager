import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

import {
  IConfirmDeleteContact,
  IContactsTableModel,
  ButtonAlignmentEnums,
  ButtonTypeEnums,
  IMessageTypeEnums,
  DesignEnums,
} from "../../__typings/interfaces.d";
import { Checkbox } from "../../__ui/formElements";
import Button from "../../__ui/buttons/button";

const stylesMap = new Map();
stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

function ConfirmDeleteContactBody({
  contact,
  dialogId,
}: IConfirmDeleteContact) {
  const dispatch = useDispatch();
  const history = useHistory();

  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  const nSQL = useSelector((state: any) => state.db.nSQL);
  const [worklogsCount, setWorklogsCount] = useState(-1);
  const [deleteWorklogsToo, setDeleteWorklogsToo] = useState(false);
  function checkBoxOnChangeHandler(checked: boolean) {
    setDeleteWorklogsToo(checked);
  }

  function onDeleteButtonSubmit(nSQL: any, id: string) {
    if (deleteWorklogsToo) {
      nSQL("workTable")
        .query("delete")
        .where(["contactID", "=", id])
        .exec()
        .then(() => {
          console.log("Worklogs of Contact deleted!");
        });
    } else {
      nSQL("workTable")
        .query("select")
        .where(["contactID", "=", id])
        .exec()
        .then((selectedItems: [IContactsTableModel]) => {
          selectedItems.forEach(item => {
            nSQL("workTable")
              .query("upsert", {
                contactID: "__DELETED_CONTACT__",
              })
              .where(["id", "=", item.id])
              .exec()
              .then(() => {
                console.log(
                  "contactID removed from Work logs of deleted contact!"
                );
              });
          });
        });
    }

    nSQL("contactsTable")
      .query("delete")
      .where(["id", "=", id])
      .exec()
      .then(() => {
        history.push("/contacts");
      })
      .catch((err: any) => {
        console.log("Contact deleted!");
      });
    dispatch({
      type: IMessageTypeEnums.HIDE_MESSAGE,
      dialogId: dialogId,
    });
  }

  nSQL("workTable")
    .presetQuery("getWorkLogsOfContact", { contactID: contact.id })
    .exec()
    .then((logs: []) => {
      setWorklogsCount(logs.length);
    });

  useEffect(() => {
    if (worklogsCount < 0) return;
  }, [worklogsCount, nSQL]);

  return (
    <>
      <div className={styles[`Content-${theme}`]}>
        Are you sure to delete&nbsp;
        <strong>
          {contact.name} {contact.surname}
        </strong>
        ?
      </div>
      {worklogsCount > 0 && (
        <div className={styles[`Content-${theme}`]}>
          <Checkbox
            onChange={checkBoxOnChangeHandler}
            label={`Delete also ${worklogsCount} of saved works.`}
          ></Checkbox>
        </div>
      )}
      <div className={styles[`Footer-${theme}`]}>
        <Button
          type={ButtonTypeEnums.SIMPLE}
          align={ButtonAlignmentEnums.RIGHT}
          onClick={onDeleteButtonSubmit.bind({}, nSQL, contact.id)}
          isDisabled={false}
        >
          Delete
        </Button>
      </div>
    </>
  );
}

export default ConfirmDeleteContactBody;
