import React, { useContext, useEffect, ReactElement } from "react";

import ViewContext from "../../views/index";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";

import { useSelector, useDispatch } from "react-redux";
import {
  ISubPageReducer,
  ISubPageState,
  SubPageActionEnums,
  IconSizeEnums,
  IconNameEnums,
  ThemeEnums,
} from "../../__typings/interfaces.d";
import Icon from "../../__ui/icon";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

/**
 *
 */

function SubPageView(): ReactElement {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);
  const dispatch = useDispatch();
  const subPage: ISubPageState = useSelector(({ subPage }: ISubPageReducer) => subPage);

  useEffect(() => {
    if (subPage.type === SubPageActionEnums.OUT) {
      setTimeout(() => {
        dispatch({ type: SubPageActionEnums.HIDE });
      }, 280);
    }
  }, [subPage, dispatch]);

  if (subPage.type === SubPageActionEnums.HIDE) return <></>;
  return (
    <div className={styles[`SubPageView-${theme}`]}>
      <div className={styles[`Backdrop-${theme}`]}></div>
      <div className={styles[`Content-${theme}--${view}`]} data-hide-subpage={subPage.type === SubPageActionEnums.OUT}>
        <div className={styles[`Caption-${theme}`]}>{subPage.action.caption}</div>
        <div
          className={styles[`Close-${theme}`]}
          onClick={(): void => {
            dispatch({
              type: SubPageActionEnums.OUT,
              action: { caption: "" },
            });
          }}
        >
          <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.CLOSE}</Icon>
        </div>
        <div className={styles[`Text-${theme}`]}>{subPage.action.content}</div>
      </div>
    </div>
  );
}

export default SubPageView;
