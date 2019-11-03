import React, { useState } from "react";
import styles from "./input.module.scss";

import { getTypeFromFieldName } from "../../lib/input.helpers";

function Input(props) {
  const { name, value } = props;

  const [val, setVal] = useState(value);
  const [labelPosition, setLabelPosition] = useState(
    val === "" ? "PLACEHOLDER" : "LABEL"
  );
  function onChange(e) {
    setVal(e.target.value);
    `${e.target.value}`.length === 0
      ? setLabelPosition("PLACEHOLDER")
      : setLabelPosition("LABEL");
  }

  function onFocus(e) {
    `${e.target.value}`.length === 0
      ? setLabelPosition("PLACEHOLDER")
      : setLabelPosition("LABEL");
  }
  function onBlur(e) {
    `${e.target.value}`.length === 0
      ? setLabelPosition("PLACEHOLDER")
      : setLabelPosition("LABEL");
  }
  if (val === null) return <></>;

  return (
    <div className={styles.Input}>
      <label className={styles[labelPosition]}>{name}</label>
      <input
        type={getTypeFromFieldName(name)}
        value={val}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
}

export default Input;
