import React, { useContext, ReactElement } from "react";
import {
  IMessage,
  IconSizeEnums,
  IconNameEnums,
  ThemeEnums,
  IDialogActionEnums,
  IMessageReducer,
} from "../../__typings/interfaces.d";

import ViewContext from "../../views/index";
import { useSelector, useDispatch } from "react-redux";
import Icon from "../../__ui/icon";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

const Message = (): ReactElement => {
  const messages: IMessage[] = useSelector(
    ({ messages }: IMessageReducer) => messages
  );

  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);
  const dispatch = useDispatch();
  /**
   * Dispatches dialogId of binded object(action) to be removed from
   * Messages array
   */
  function hideMessage(dialogId: string): void {
    dispatch({
      type: IDialogActionEnums.CLOSE,
      message: { dialogId },
    });
  }

  if (!messages || messages.length === 0) return <></>;

  const dialogContent = messages.map(
    ({ dialogType, icon, closable, dialogId, caption, body }, index) => {
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
              onClick={hideMessage.bind({}, dialogId)}
            >
              <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.CLOSE}</Icon>
            </div>
          )}
          <div className={styles[`Icon-${theme}`]}>
            <Icon size={IconSizeEnums.SMALL}>{icon}</Icon>
          </div>

          <div className={styles[`Caption-${theme}`]}>{caption}</div>

          <div className={styles[`Text-${theme}`]}>{body}</div>
          <div className={styles[`Footer-${theme}`]}>&nbsp;</div>
        </div>
      );
    }
  );
  return <div className={styles[`Message-${theme}`]}>{dialogContent}</div>;
};

export default Message;
