import React, { ReactElement, useContext, FocusEvent } from "react";
import Icon from "../../__ui/icon";

import { useTheme, useThemeStyle } from "../../__ui/typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { IconNameEnums, DesignEnums } from "../../__typings/interfaces.d";

import ViewContext from "../../views";
const stylesMap = new Map();
stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

/**
 * Autocomplete component for search everywhere
 * FIXME: After following Issue concepted, fix styling of this compoenent
 * Set ViewState from store
 * https://github.com/softberry/timemanager/issues/37
 */
const AutoComplete = (): ReactElement => {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);

  function handleAutoFocus(e: FocusEvent<HTMLInputElement>): void {
    e.currentTarget.focus();
  }
  return (
    <div className={styles[`AutoComplete-${theme}`]} onFocus={handleAutoFocus}>
      <div className={styles[`AutoComplete-${theme}-inner`]}>
        <input className={styles[`AutoComplete-${theme}-${view}-input`]} />
        <div
          className={styles[`AutoComplete-${theme}-${view}-inputSearchIcon`]}
        >
          <Icon>{IconNameEnums.SEARCH}</Icon>
        </div>
      </div>
    </div>
  );
};

export default AutoComplete;
