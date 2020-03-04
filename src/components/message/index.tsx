import React, { useContext, ReactElement } from "react";
import {
  IDialogBodyProp,
  IMessage,
  IconSizeEnums,
  IconNameEnums,
  IMessageTypeEnums,
  IConfirmTypeEnums,
  DesignEnums,
} from "../../__typings/interfaces.d";

import ViewContext from "../../views/index";
import { useSelector, useDispatch } from "react-redux";
import Icon from "../../__ui/icon";
import ConfirmDeleteContactBody from "../confirm/delete.contact";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";

const stylesMap = new Map();
stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

const DialogBody = ({ type, props }: IDialogBodyProp): ReactElement => {
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
};

/**
 * ``<Message  /> `` is always available in page and listens actions type of ``MESSAGES``.
 *  Message are typeof :  ``IMessageTypeEnums`` or ``IConfirmTypeEnums``
 * ``IMessageTypeEnums`` action types decides style/design of the dialog.
 * ``IConfirmTypeEnums`` has it's fixed desing so just extends Message box where user can make a decision.
 * More info see Notes tab in storybook
 *
 */

const Message = (): ReactElement => {
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
        dialogType,
        icon = IconNameEnums.MESSAGE,
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
          className={styles[`Dialog-${theme}__${dialogType}--${view}`]}
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
              <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.CLOSE}</Icon>
            </div>
          )}
          <div className={styles[`Icon-${theme}`]}>
            <Icon size={IconSizeEnums.SMALL}>{icon}</Icon>
          </div>

          <div className={styles[`Caption-${theme}`]}>{caption}</div>

          <div className={styles[`Text-${theme}`]}>
            <DialogBody type={dialogType} props={{ ...body, dialogId }} />
          </div>
          <div className={styles[`Footer-${theme}`]}>&nbsp;</div>
        </div>
      );
    }
  );
  return <div className={styles[`Message-${theme}`]}>{dialogContent}</div>;
};

export default Message;
