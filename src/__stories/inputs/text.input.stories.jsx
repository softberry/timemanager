import React from "react";
import Input from "../../__ui/input";
import styles from "../default.module.scss";

export default {
  title: "Form Inputs"
};

export const primary = () => {
  return (
    <div className={styles.PrimaryView}>
      <Input id="001" name="name" value="input Text" />
      <Input id="002" name="Surname" value="input Text" />
      <Input id="003" name="Address" value="input Text" />
    </div>
  );
};

export const secondary = () => {
  return (
    <div className={styles.SecondaryView}>
      <Input id="004" name="name" value="input Text" />
      <Input id="005" name="Surname" value="input Text" />
      <Input id="006" name="Address" value="input Text" />
    </div>
  );
};
