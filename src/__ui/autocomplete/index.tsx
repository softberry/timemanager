import React from "react";
import Icon from "../../__ui/icon";
import { VDESIGN } from "../../store/constant-enums";

import { useTheme, useThemeStyle } from "../../__ui/typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

/**
 * Autocomplete component for search everywhere
 * FIXME: After following Issue concepted, fix styling of this compoenent
 * Set ViewState from store
 * https://github.com/softberry/timemanager/issues/37
 */
function AutoComplete({
  variant = VDESIGN.DESIGN_VIEW_PRIMARY,
}: any) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  function handleAutoFocus(e: any) {
    e.currentTarget.querySelector("input").focus();
  }
  return (
    <div className={styles[`AutoComplete-${theme}`]} onClick={handleAutoFocus}>
      <input className={styles[`AutoComplete-${theme}-${variant}-input`]} />
      <div
        className={styles[`AutoComplete-${theme}-${variant}-inputSearchIcon`]}
      >
        <Icon>search</Icon>
      </div>
    </div>
  );
}

export default AutoComplete;
