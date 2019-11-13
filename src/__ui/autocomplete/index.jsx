import React from "react";
import styles from "./autocomplete.module.scss";
import Icon from "@material-ui/core/Icon";

export default function AutoComplete({ variant = "primary" }) {
  const InputItemClassName = {
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
