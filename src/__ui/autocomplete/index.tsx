import React from "react";
import { useSelector } from "react-redux";
import Icon from "@material-ui/core/Icon";
import { VDESIGN } from "../../store/constant-enums";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

/**
 * Autocomplete component for search everywhere
 * FIXME: After following Issue concepted, fix styling of this compoenent
 * Set ViewState from store
 * https://github.com/softberry/timemanager/issues/37
 */
export default function AutoComplete({
  variant = VDESIGN.DESIGN_VIEW_PRIMARY
}: any) {
  const InputItemClassName: any = {
    primary: "AutoCompletePrimaryInput",
    secondary: "AutoCompleteSecondaryInput"
  };

  const styles = useSelector((state: any) => {
    switch (state.design.theme) {
      case VDESIGN.DESIGN_THEME_OCEAN:
        return themeOcean;
      case VDESIGN.DESIGN_THEME_DEFAULT:
        return themeDefault;
      default:
        return themeDefault;
    }
  });
  return (
    <div className={styles.AutoComplete}>
      <input className={styles[InputItemClassName[variant]]} />
      <div className={styles[`${InputItemClassName[variant]}SearchIcon`]}>
        <Icon>search</Icon>
      </div>
    </div>
  );
}
