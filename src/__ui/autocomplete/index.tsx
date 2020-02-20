import React from "react";
import Icon from "../../__ui/icon";

import { useTheme, useThemeStyle } from "../../__ui/typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { IconEnums, DesignEnums } from "../../__typings/interfaces.d";

const stylesMap = new Map();
stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

/**
 * Autocomplete component for search everywhere
 * FIXME: After following Issue concepted, fix styling of this compoenent
 * Set ViewState from store
 * https://github.com/softberry/timemanager/issues/37
 */
function AutoComplete({ variant = DesignEnums.PRIMARY_VIEW }: any) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  function handleAutoFocus(e: any) {
    e.currentTarget.querySelector("input").focus();
  }
  return (
    <div className={styles[`AutoComplete-${theme}`]} onClick={handleAutoFocus}>
      <div className={styles[`AutoComplete-${theme}-inner`]}>
        <input className={styles[`AutoComplete-${theme}-${variant}-input`]} />
        <div
          className={styles[`AutoComplete-${theme}-${variant}-inputSearchIcon`]}
        >
          <Icon>{IconEnums.SEARCH}</Icon>
        </div>
      </div>
    </div>
  );
}

export default AutoComplete;
