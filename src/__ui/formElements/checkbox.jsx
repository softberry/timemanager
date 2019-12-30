import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./checkbox.module.scss";
/**
 * Checkbox Component
 *
 */
export default function Checkbox({
  children,
  checked = false,
  label,
  onChange
}) {
  if (typeof onChange !== "function") {
    console.error("Checkbox component must have onChange function.");
  }

  const [isChecked, setIsChecked] = useState(checked);


  function checkOnChangeHandler() {
    setIsChecked(!isChecked);
  }
  useEffect(() => {
    onChange(isChecked);
  });

  return (
    <>
      <div className={styles.Checkbox} onClick={checkOnChangeHandler}>
        <div
          className={
            isChecked ? styles.CheckboxIconSelected : styles.CheckboxIcon
          }
        ></div>
        <div className={styles.CheckboxLabel}>{label}</div>
        <div className={styles.CheckboxContent}>{children}</div>
      </div>
    </>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  children: PropTypes.element,
  onChange: PropTypes.func
};
