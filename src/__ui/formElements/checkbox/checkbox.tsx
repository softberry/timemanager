import React, { useState, useCallback } from "react";

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
}: ICheckBoxComponentProps) {
  if (typeof onChange !== "function") {
    console.error("Checkbox component must have onChange function.");
  }

  const [isChecked, setIsChecked] = useState(checked);
  const memoizedChecked = useCallback(() => {
    onChange(isChecked);
  }, [isChecked, onChange]);

  function checkOnChangeHandler() {
    setIsChecked(!isChecked);
    memoizedChecked();
  }

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
