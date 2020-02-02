import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IConfirmDeleteContact,
  IContactsTableModel,
} from "../../__typings/interfaces";

import { useHistory } from "react-router-dom";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../store/constant-enums";

import TYPES from "../../store/action-types";
import { EButtonActionClasses } from "../../__typings/interfaces.d";
import { Checkbox } from "../formElements";
import Button from "../buttons/button";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

function ConfirmDeleteContact({ contact, dialogId }: IConfirmDeleteContact) {
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
        .then(() => {});
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
              .then(() => {});
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
      .catch((err: any) => {});
    dispatch({
      type: TYPES.MESSAGES_HIDE_MESSAGE,
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
    if (typeof nSQL !== "function") return;
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
          actionClass={EButtonActionClasses.SIMPLE}
          onClick={onDeleteButtonSubmit.bind({}, nSQL, contact.id)}
        >
          Delete
        </Button>
      </div>
    </>
  );
}

export default ConfirmDeleteContact;
