import React from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./message.module.scss";
import TYPES from "../../store/types";

export default function Message() {
  const messages = useSelector(({ messages }) => messages.messages);
  const dispatch = useDispatch();
  /**
   * Dispatches key of binded object(action) to be removed from
   * Messages array
   */
  function hideMessage() {
    dispatch({
      type: TYPES.MESSAGES_HIDE_MESSAGE,
      key: this.key
    });
  }

  if (!messages || messages.length === 0) return <></>;

  const dialogContent = messages.map(
    ({ type, caption, text, closable = true, key }, index) => {
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
            <div className={styles.Close} onClick={hideMessage.bind({ key })}>
              &times;
            </div>
          )}
          <div className={styles.Caption}>
            {caption}
            <hr />
          </div>

          <div className={styles.Text}>
            <div>
              {text}
              <br />
              <a href="/" target="_self">
                <strong>Reload</strong>
              </a>
            </div>
          </div>
        </div>
      );
    }
  );
  return <div className={styles.Message}>{dialogContent}</div>;
}
