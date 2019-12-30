import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import styles from "./confirm.module.scss";
import { useHistory } from "react-router-dom";
import TYPES from "../../store/types";

import { Checkbox } from "../../__ui/formElements";
export default function ConfirmDeleteContact({ contact, dialogId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const nSQL = useSelector(state => state.db.nSQL);
  const [worklogsCount, setWorklogsCount] = useState(-1);
  const [deleteWorklogsToo, setDeleteWorklogsToo] = useState(false);
  function checkBoxOnChangeHandler(checked) {
    setDeleteWorklogsToo(checked);
  }

  function onDeleteButtonSubmit(id, e) {
    const nSQL = this;
    if (deleteWorklogsToo) {
      nSQL("workTable")
        .query("delete")
        .where(["contactID", "=", id])
        .exec()
        .then(deletedItems => {});
    } else {
      nSQL("workTable")
        .query("select")
        .where(["contactID", "=", id])
        .exec()
        .then(selectedItems => {
          selectedItems.forEach(item => {
            nSQL("workTable")
              .query("upsert", {
                contactID: "__DELETED_CONTACT__"
              })
              .where(["id", "=", item.id])
              .exec()
              .then(deletedItems => {});
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
      .catch(err => {});
    dispatch({
      type: TYPES.MESSAGES_HIDE_MESSAGE,
      dialogId: dialogId
    });
  }

  nSQL("workTable")
    .presetQuery("getWorkLogsOfContact", { contactID: contact.id })
    .exec()
    .then(logs => {
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
            onChange={checkBoxOnChangeHandler.bind(this)}
            label={`Delete also ${worklogsCount} of saved works.`}
          ></Checkbox>
        </>
      )}
      <div className={styles.Footer}>
        <button onClick={onDeleteButtonSubmit.bind(nSQL, contact.id)}>
          Delete
        </button>
      </div>
      {/*TODO:  Custom Buttons
              https://github.com/softberry/timemanager/issues/19 */}
    </>
  );
}

ConfirmDeleteContact.protoTypes = {
  contact: PropTypes.object,
  dialogId: PropTypes.number
};
