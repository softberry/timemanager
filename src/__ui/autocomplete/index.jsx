import React from "react";
import PropTypes from "prop-types";
import styles from "./autocomplete.module.scss";
import Icon from "@material-ui/core/Icon";
/**
 * Autocomplete component for search everywhere
 */
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

AutoComplete.protoTypes = {
  variant: PropTypes.string
};
