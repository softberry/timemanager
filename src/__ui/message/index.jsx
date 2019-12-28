import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Icon from "@material-ui/core/Icon";
import ConfirmDeleteContact from "../confirm/delete.contact";

import styles from "./message.module.scss";
import TYPES from "../../store/types";

function DialogBody({ type, props }) {
  switch (type) {
    case TYPES.CONFIRM_DELETE_CONTACT:
      return (
        <>
          <ConfirmDeleteContact {...props} />
        </>
      );
    case TYPES.MESSAGES_INFO:
    case TYPES.MESSAGES_WARNING:
    case TYPES.MESSAGES_ERROR:
      return <>{props}</>;
    default:
      return <div>{type}</div>;
  }
}

export default function Message() {
  const messages = useSelector(({ messages }) => messages.messages);
  const dispatch = useDispatch();
  /**
   * Dispatches dialogId of binded object(action) to be removed from
   * Messages array
   */
  function hideMessage() {
    dispatch({
      type: TYPES.MESSAGES_HIDE_MESSAGE,
      dialogId: this.dialogId
    });
  }

  useEffect(() => {
    if (!messages || messages.length === 0) return;
  }, [messages]);

  if (!messages || messages.length === 0) return <></>;

  const dialogContent = messages.map(
    ({ type, icon, caption, body, closable = true, dialogId }, index) => {
      return (
        <div
          key={index}
          className={styles[`Dialog__${type}`]}
          style={{
            marginLeft: `${index * 0.5}rem`,
            marginTop: `${index * 0.5}rem`
          }}
        >
          {closable && (
            <div
              className={styles.Close}
              onClick={hideMessage.bind({ dialogId })}
            >
              <span>&times;</span>
              {/**
               * TODO:
               * Bundle Icons for offline experience #16
               * https://github.com/softberry/timemanager/issues/16
               * <Icon>close</Icon> */}
            </div>
          )}
          <div className={styles.Icon}>
            <Icon>{icon}</Icon>
          </div>

          <div className={styles.Caption}>{caption}</div>

          <div className={styles.Text}>
            <div>
              <DialogBody type={type} props={{ ...body, dialogId }} />
            </div>
          </div>
        </div>
      );
    }
  );
  return <div className={styles.Message}>{dialogContent}</div>;
}
