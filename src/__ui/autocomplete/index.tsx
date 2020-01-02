import React from "react";
import Icon from "@material-ui/core/Icon";
import { DESIGN } from "../../store/action-types";
import styles from "./autocomplete.module.scss";

/**
 * Autocomplete component for search everywhere
 * FIXME: After following Issue concepted, fix styling of this compoenent
 * Set ViewState from store
 * https://github.com/softberry/timemanager/issues/37
 */
export default function AutoComplete({
  variant = DESIGN.DESIGN_VIEW_PRIMARY
}: any) {
  const InputItemClassName: any = {
    primary: "AutoCompletePrimaryInput",
    secondary: "AutoCompleteSecondaryInput"
  };
  return (
    <div className={styles.AutoComplete}>
      <input className={styles[InputItemClassName[variant]]} />
      <div className={styles[`${InputItemClassName[variant]}SearchIcon`]}>
        <Icon>search</Icon>
      </div>
    </div>
  );
}
