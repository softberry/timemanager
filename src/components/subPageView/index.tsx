import React, { useContext, useEffect } from "react";

import ViewContext from "../../views/index";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import { VDESIGN } from "../../store/constant-enums";
import { useSelector, useDispatch } from "react-redux";
import {
  ISubpageState,
  ISubPageViewActionTypes,
  SizeIconEnums,
  IconEnums,
} from "../../__typings/interfaces.d";
import Icon from "../../__ui/icon";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

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
    if (subPage.type === ISubPageViewActionTypes.OUT) {
      setTimeout(() => {
        dispatch({ type: ISubPageViewActionTypes.HIDE });
      }, 500);
    }
  }, [subPage, dispatch]);

  if (subPage.type === ISubPageViewActionTypes.HIDE) return <></>;
  return (
    <div className={styles[`SubPageView-${theme}`]}>
      <div
        className={styles[`Content-${theme}--${view}`]}
        data-hide-subpage={subPage.type === ISubPageViewActionTypes.OUT}
      >
        <div className={styles[`Caption-${theme}`]}>{subPage.caption}</div>
        <div
          className={styles[`Close-${theme}`]}
          onClick={() => {
            dispatch({ type: ISubPageViewActionTypes.OUT });
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
