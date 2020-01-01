import React, { useState } from "react";

import PropTypes from "prop-types";
import styles from "./input.module.scss";

import { getTypeFromFieldName } from "../../lib/input.helpers";
/**
 * Input element:
 */
export default function Input({ id, name, value }) {
  const [val, setVal] = useState(value);
  const type = getTypeFromFieldName(name);
  const [labelPosition, setLabelPosition] = useState(
    val === "" ? "PLACEHOLDER" : "LABEL"
  );

  function handleOnChange(e) {
    setVal(e.target.value);
    `${e.target.value}`.length === 0
      ? setLabelPosition("PLACEHOLDER")
      : setLabelPosition("LABEL");
  }

  function handleOnFocus(e) {
    `${e.target.value}`.length === 0
      ? setLabelPosition("PLACEHOLDER")
      : setLabelPosition("LABEL");
  }
  function handleOnBlur(e) {
    `${e.target.value}`.length === 0
      ? setLabelPosition("PLACEHOLDER")
      : setLabelPosition("LABEL");
  }

  if (val === null) return <></>;
  return (
    <div className={styles.Input}>
      <label htmlFor={id} className={styles[labelPosition]}>
        {name}
      </label>
      <input
        id={id}
        type={type}
        value={val}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.any,
  name: PropTypes.string,
  value: PropTypes.string
};
