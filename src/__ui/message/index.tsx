import React, { useContext } from "react";
import {
  IDialogBodyProp,
  IMessage,
  SizeIconEnums,
  IconEnums,
  IMessageTypeEnums,
  IConfirmTypeEnums,
} from "../../__typings/interfaces.d";

import ViewContext from "../../views/index";
import { useSelector, useDispatch } from "react-redux";
import Icon from "../../__ui/icon";
import ConfirmDeleteContactBody from "../confirm/delete.contact";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import { VDESIGN } from "../../store/constant-enums";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

function DialogBody({ type, props }: IDialogBodyProp) {
  switch (type) {
    case IConfirmTypeEnums.DELETE_CONTACT:
      return (
        <>
          <ConfirmDeleteContactBody {...props} />
        </>
      );
    case IMessageTypeEnums.INFO:
    case IMessageTypeEnums.WARNING:
    case IMessageTypeEnums.ERROR:
      return <>{props}</>;
    default:
      return <div>{type}</div>;
  }
}

/**
 * ``<Message  /> `` is always available in page and listens actions type of ``MESSAGES``.
 *  Message are typeof :  ``IMessageTypeEnums`` or ``IConfirmTypeEnums``
 * ``IMessageTypeEnums`` action types decides style/design of the dialog.
 * ``IConfirmTypeEnums`` has it's fixed desing so just extends Message box where user can make a decision.
 * More info see Notes tab in storybook
 *
 */

function Message() {
  const messages: IMessage[] = useSelector(
    ({ messages }: any) => messages.messages
  );
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);
  const dispatch = useDispatch();
  /**
   * Dispatches dialogId of binded object(action) to be removed from
   * Messages array
   */
  function hideMessage({ dialogId }: any): void {
    dispatch({
      type: IMessageTypeEnums.HIDE_MESSAGE,
      dialogId,
    });
  }

  if (!messages || messages.length === 0) return <></>;

  const dialogContent = messages.map(
    (
      {
        type,
        icon = IconEnums.MESSAGE,
        caption,
        body,
        closable = true,
        dialogId,
      },
      index
    ) => {
      return (
        <div
          key={index}
          className={styles[`Dialog-${theme}__${type}--${view}`]}
          style={{
            marginLeft: `${index * 0.5}rem`,
            marginTop: `${index * 0.5}rem`,
          }}
        >
          {closable && (
            <div
              className={styles[`Close-${theme}`]}
              onClick={hideMessage.bind({}, { dialogId })}
            >
              <Icon size={SizeIconEnums.SMALL}>{IconEnums.CLOSE}</Icon>
            </div>
          )}
          <div className={styles[`Icon-${theme}`]}>
            <Icon size={SizeIconEnums.SMALL}>{icon}</Icon>
          </div>

          <div className={styles[`Caption-${theme}`]}>{caption}</div>

          <div className={styles[`Text-${theme}`]}>
            <DialogBody type={type} props={{ ...body, dialogId }} />
          </div>
          <div className={styles[`Footer-${theme}`]}>abc</div>
        </div>
      );
    }
  );
  return <div className={styles[`Message-${theme}`]}>{dialogContent}</div>;
}

export default Message;
