import React, { useContext, useEffect } from "react";

import ViewContext from "../../views/index";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";

import { useSelector, useDispatch } from "react-redux";
import {
  ISubpageState,
  SubPageViewActionTypes,
  SizeIconEnums,
  IconEnums,
  DesignEnums,
} from "../../__typings/interfaces.d";
import Icon from "../../__ui/icon";

const stylesMap = new Map();
stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

/**
 *
 */

function SubPageView() {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);
  const dispatch = useDispatch();
  const subPage: ISubpageState = useSelector(
    ({ subpageview }: any) => subpageview
  );

  useEffect(() => {
    if (subPage.type === SubPageViewActionTypes.OUT) {
      setTimeout(() => {
        dispatch({ type: SubPageViewActionTypes.HIDE });
      }, 280);
    }
  }, [subPage, dispatch]);

  if (subPage.type === SubPageViewActionTypes.HIDE) return <></>;
  return (
    <div className={styles[`SubPageView-${theme}`]}>
      <div
        className={styles[`Content-${theme}--${view}`]}
        data-hide-subpage={subPage.type === SubPageViewActionTypes.OUT}
      >
        <div className={styles[`Caption-${theme}`]}>{subPage.caption}</div>
        <div
          className={styles[`Close-${theme}`]}
          onClick={() => {
            dispatch({ type: SubPageViewActionTypes.OUT });
          }}
        >
          <Icon size={SizeIconEnums.SMALL}>{IconEnums.CLOSE}</Icon>
        </div>
        <div className={styles[`Text-${theme}`]}>{subPage.content}</div>
      </div>
    </div>
  );
}

export default SubPageView;
