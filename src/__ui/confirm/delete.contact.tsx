import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../store/constant-enums";

import TYPES from "../../store/action-types";
import { Checkbox } from "../formElements";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

export default function ConfirmDeleteContact({
  contact,
  dialogId
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

  function onDeleteButtonSubmit(nSQL: any, id: string, e: any) {
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
                contactID: "__DELETED_CONTACT__"
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
      dialogId: dialogId
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
      Are you sure to delete&nbsp;
      <strong>
        {contact.name} {contact.surname}
      </strong>
      ?
      <br />
      {worklogsCount > 0 && (
        <>
          <Checkbox
            onChange={checkBoxOnChangeHandler}
            label={`Delete also ${worklogsCount} of saved works.`}
          ></Checkbox>
        </>
      )}
      <div className={styles[`Footer-${theme}`]}>
        <button onClick={onDeleteButtonSubmit.bind({}, nSQL, contact.id)}>
          Delete
        </button>
      </div>
      {/*TODO:  Custom Buttons
              https://github.com/softberry/timemanager/issues/19 */}
    </>
  );
}
