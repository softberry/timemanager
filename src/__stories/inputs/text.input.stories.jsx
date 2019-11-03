import React from "react";
import Input from "../../__ui/input";
import styles from "../default.module.scss";

export default {
  title: "Form Inputs"
};

export const primary = () => {
  return (
    <div className={styles.PrimaryView}>
      <Input name="name" value="input Text" />
      <Input name="Surname" value="input Text" />
      <Input name="Address" value="input Text" />
    </div>
  );
};

export const secondary = () => {
  return (
    <div className={styles.SecondaryView}>
      <Input name="name" value="input Text" />
      <Input name="Surname" value="input Text" />
      <Input name="Address" value="input Text" />
    </div>
  );
};