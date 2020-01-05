import React from "react";
import Icon from "@material-ui/core/Icon";
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
export default function AutoComplete({
  variant = VDESIGN.DESIGN_VIEW_PRIMARY
}: any) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  return (
    <div className={styles[`AutoComplete-${theme}`]}>
      <input className={styles[`AutoComplete-${theme}-${variant}-input`]} />
      <div
        className={styles[`AutoComplete-${theme}-${variant}-inputSearchIcon`]}
      >
        <Icon>search</Icon>
      </div>
    </div>
  );
}
