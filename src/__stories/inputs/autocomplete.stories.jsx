import React from "react";
import Autocomplete from "../../__ui/autocomplete";
import Typography from '../../__ui/typography';
import styles from "../default.module.scss";

export default {
  title: "Autocomplete"
};

export const primary = function() {
  return (
    <div className={styles.PrimaryView}>
      <Typography />
      <Autocomplete variant="primary" />
    </div>
  );
};
export const secondary = function() {
  return (
    <div className={styles.SecondaryView}>
      <Typography />
      <Autocomplete variant="secondary" />
    </div>
  );
};
